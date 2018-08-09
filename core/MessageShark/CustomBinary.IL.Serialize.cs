﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Collections.Concurrent;
using System.IO;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;

namespace MessageShark {
    public static partial class CustomBinary {
        static void WriteSerializerArray(TypeBuilder typeBuilder, ILGenerator il, Type type, MethodInfo valueMethod,
            int? valueLocalIndex = null, OpCode? valueLocalOpCode = null) {
            var itemType = type.GetElementType();
            var itemLocal = il.DeclareLocal(itemType);
            var listLocal = il.DeclareLocal(type);
            var indexLocal = il.DeclareLocal(typeof(int));
            var startLabel = il.DefineLabel();
            var endLabel = il.DefineLabel();

            if (valueLocalIndex != null) il.Emit(valueLocalOpCode.Value, valueLocalIndex.Value);
            if (valueMethod != null) {
                if (valueLocalIndex == null) il.Emit(OpCodes.Ldarg_2);
                il.Emit(OpCodes.Callvirt, valueMethod);
            }

            il.Emit(OpCodes.Stloc, listLocal.LocalIndex);
            il.Emit(OpCodes.Ldc_I4_0);
            il.Emit(OpCodes.Stloc_S, indexLocal.LocalIndex);
            il.Emit(OpCodes.Br, startLabel);
            il.MarkLabel(endLabel);
            il.Emit(OpCodes.Ldloc, listLocal.LocalIndex);
            il.Emit(OpCodes.Ldloc_S, indexLocal.LocalIndex);
            il.Emit(OpCodes.Ldelem, itemType);
            il.Emit(OpCodes.Stloc, itemLocal.LocalIndex);
            if (itemType.IsComplexType()) {
                if (itemType.IsCollectionType())
                    WriteSerializerClass(typeBuilder, il, itemType, 1, null, callerType: itemType, valueLocalIndex: itemLocal.LocalIndex,
                    valueLocalOpCode: OpCodes.Ldloc);
                else
                    WriteSerializerCallClassMethod(typeBuilder, il, itemType, OpCodes.Ldloc, itemLocal.LocalIndex, 1, null,
                        needClassHeader: false);
            } else {
                WriteSerializerBytesToStream(il, itemType, OpCodes.Ldloc, itemLocal.LocalIndex, 1, null, isTargetCollection: true);
            }
            il.Emit(OpCodes.Ldloc_S, indexLocal.LocalIndex);
            il.Emit(OpCodes.Ldc_I4_1);
            il.Emit(OpCodes.Add);
            il.Emit(OpCodes.Stloc_S, indexLocal.LocalIndex);
            il.MarkLabel(startLabel);
            il.Emit(OpCodes.Ldloc_S, indexLocal.LocalIndex);
            il.Emit(OpCodes.Ldloc, listLocal.LocalIndex);
            il.Emit(OpCodes.Ldlen);
            il.Emit(OpCodes.Conv_I4);
            il.Emit(OpCodes.Blt, endLabel);
        }

        static Type FindGenericType(Type type) {
            return InterfaceTypes.GetOrAdd(type, key =>
            {
                Type[] genericTypes = type.GetInterfaces();

                if (genericTypes != null) {
                    for (int i = 0; i < genericTypes.Length; i++) {
                        var genericType = genericTypes[i];
                        if (genericType.IsGenericType && GenericIListType.IsAssignableFrom(genericType.GetGenericTypeDefinition()))
                            return genericType.GetGenericArguments()[0];
                    }
                }
                return ObjectType;
            });
        }

        static Type GetGenericListType(Type type, out bool useGenericArguments) {
            useGenericArguments = false;
            if (type.IsGenericType) {
                Type[] genericTypes = type.GetGenericArguments();

                if (genericTypes != null && genericTypes.Length > 0) {
                    useGenericArguments = true;
                    return genericTypes[0];
                }
            }
            return CustomBinary.FindGenericType(type);
        }

        static void WriteSerializerList(TypeBuilder typeBuilder, ILGenerator il, Type type, MethodInfo valueMethod,
            int? valueLocalIndex = null, OpCode? valueLocalOpCode = null) {
            //var arguments = type.GetGenericArguments();
            bool useGenericArguments;
            var listType = GetGenericListType(type, out useGenericArguments);//arguments.Length > 0 ? arguments[0] : ObjectType;
            var genericListType = GenericListType.MakeGenericType(listType);
            var iEnumerableType = !useGenericArguments ? GenericIEnumeratorType.MakeGenericType(listType) : null;
            var hasIEnumerable = iEnumerableType != null;
            var enumeratorType = hasIEnumerable ? iEnumerableType : GenericListEnumerator.MakeGenericType(listType);
            var enumeratorLocal = il.DeclareLocal(enumeratorType);
            var moveNextType = hasIEnumerable ? EnumeratorType : enumeratorType;
            var entryLocal = il.DeclareLocal(listType);
            var startEnumeratorLabel = il.DefineLabel();
            var moveNextLabel = il.DefineLabel();
            var endEnumeratorLabel = il.DefineLabel();
            
            if (valueLocalIndex != null) il.Emit(valueLocalOpCode.Value, valueLocalIndex.Value);

            if (valueLocalIndex == null) il.Emit(OpCodes.Ldarg_2);

            if (valueMethod != null) {
                
                il.Emit(OpCodes.Callvirt, valueMethod);
            }

            if (type.Name == "IList`1") il.Emit(OpCodes.Castclass, genericListType);
            il.Emit(OpCodes.Callvirt, (hasIEnumerable ? type : genericListType).GetMethod("GetEnumerator"));
            il.Emit(OpCodes.Stloc_S, enumeratorLocal.LocalIndex);
            il.BeginExceptionBlock();
            il.Emit(OpCodes.Br, startEnumeratorLabel);
            il.MarkLabel(moveNextLabel);
            il.Emit(hasIEnumerable ? OpCodes.Ldloc : OpCodes.Ldloca_S, enumeratorLocal.LocalIndex);
            il.Emit(hasIEnumerable ? OpCodes.Callvirt : OpCodes.Call,
                enumeratorLocal.LocalType.GetProperty("Current")
                .GetGetMethod());


            il.Emit(OpCodes.Stloc, entryLocal.LocalIndex);
            if (listType.IsComplexType()) {
                if (listType.IsCollectionType())
                    WriteSerializerClass(typeBuilder, il, listType, 1, null, callerType: listType, valueLocalIndex: entryLocal.LocalIndex,
                    valueLocalOpCode: OpCodes.Ldloc);
                else
                    WriteSerializerCallClassMethod(typeBuilder, il, listType, OpCodes.Ldloc, entryLocal.LocalIndex, 1, null, needClassHeader: false);
            } else {
                WriteSerializerBytesToStream(il, listType, OpCodes.Ldloc, entryLocal.LocalIndex, 1, null, isTargetCollection: true);
            }
            il.MarkLabel(startEnumeratorLabel);
            il.Emit(hasIEnumerable ? OpCodes.Ldloc : OpCodes.Ldloca_S, enumeratorLocal.LocalIndex);
            il.Emit(hasIEnumerable ? OpCodes.Callvirt : OpCodes.Call, moveNextType.GetMethod("MoveNext", MethodBinding));
            il.Emit(OpCodes.Brtrue, moveNextLabel);
            il.Emit(OpCodes.Leave, endEnumeratorLabel);
            il.BeginFinallyBlock();
            il.Emit(hasIEnumerable ? OpCodes.Ldloc : OpCodes.Ldloca_S, enumeratorLocal.LocalIndex);
            if (!hasIEnumerable)
                il.Emit(OpCodes.Constrained, enumeratorLocal.LocalType);
            il.Emit(OpCodes.Callvirt, IDisposableDisposeMethod);
            il.EndExceptionBlock();
            il.MarkLabel(endEnumeratorLabel);
        }

        static void WriteSerializerDictionary(TypeBuilder typeBuilder, ILGenerator il, Type type, MethodInfo getValueMethod,
            int? valueLocalIndex = null, OpCode? valueLocalOpCode = null) {

            var keyType = typeof(object);
            var valueType = typeof(object);

            if (type.ContainsGenericParameters) {
                var arguments = type.GetGenericArguments();
                keyType = arguments[0];
                valueType = arguments[1];
            } else {
                // Custom IDictionary implementation
                var interfaces = type.GetInterfaces();
                for (int i = 0; i < interfaces.Length; i++) {
                    var @interface = interfaces[i];
                    if (@interface.IsGenericType && @interface.GetGenericTypeDefinition() == GenericIDictType) {
                        var arguments = @interface.GetGenericArguments();
                        keyType = arguments[0];
                        valueType = arguments[1];
                        break;
                    }
                }
            }


            var keyValuePairType = GenericKeyValuePairType.MakeGenericType(keyType, valueType);
            var enumeratorType = GenericDictionaryEnumerator.MakeGenericType(keyType, valueType);
            var enumeratorLocal = il.DeclareLocal(enumeratorType);
            var entryLocal = il.DeclareLocal(keyValuePairType);
            var startEnumeratorLabel = il.DefineLabel();
            var moveNextLabel = il.DefineLabel();
            var endEnumeratorLabel = il.DefineLabel();

            if (valueLocalIndex != null) il.Emit(valueLocalOpCode.Value, valueLocalIndex.Value);
            if (getValueMethod != null) {
                if (valueLocalIndex == null) il.Emit(OpCodes.Ldarg_2);
                il.Emit(OpCodes.Callvirt, getValueMethod);
            }

            if (type.ContainsGenericParameters)
                il.Emit(OpCodes.Callvirt, GenericDictType.MakeGenericType(keyType, valueType).GetMethod("GetEnumerator"));
            else
                il.Emit(OpCodes.Callvirt, type.GetMethod("GetEnumerator"));


            il.Emit(OpCodes.Stloc_S, enumeratorLocal.LocalIndex);
            il.BeginExceptionBlock();
            il.Emit(OpCodes.Br, startEnumeratorLabel);
            il.MarkLabel(moveNextLabel);
            il.Emit(OpCodes.Ldloca_S, enumeratorLocal.LocalIndex);
            il.Emit(OpCodes.Call,
                enumeratorLocal.LocalType.GetProperty("Current")
                .GetGetMethod());
            il.Emit(OpCodes.Stloc, entryLocal.LocalIndex);
            if (keyType.IsComplexType()) {
                var keyMethod = keyValuePairType.GetProperty("Key").GetGetMethod();
                if (keyType.IsCollectionType())
                    WriteSerializerClass(typeBuilder, il, keyType, 1, keyMethod, callerType: keyType, valueLocalIndex: entryLocal.LocalIndex,
                    valueLocalOpCode: OpCodes.Ldloca_S);
                else
                    WriteSerializerCallClassMethod(typeBuilder, il, keyType, OpCodes.Ldloca_S, entryLocal.LocalIndex, 1, keyMethod,
                    needClassHeader: false);
            } else {
                var keyMethod = keyValuePairType.GetProperty("Key").GetGetMethod();
                WriteSerializerBytesToStream(il, keyType, OpCodes.Ldloca_S, entryLocal.LocalIndex, 1, keyMethod, isTargetCollection: true);
            }
            if (valueType.IsComplexType()) {
                var valueMethod = keyValuePairType.GetProperty("Value").GetGetMethod();
                if (valueType.IsCollectionType())
                    WriteSerializerClass(typeBuilder, il, valueType, 2, valueMethod, callerType: valueType, valueLocalIndex: entryLocal.LocalIndex,
                    valueLocalOpCode: OpCodes.Ldloca_S);
                else
                    WriteSerializerCallClassMethod(typeBuilder, il, valueType, OpCodes.Ldloca_S, entryLocal.LocalIndex, 2, valueMethod,
                    needClassHeader: false);
            } else {
                var valueMethod = keyValuePairType.GetProperty("Value").GetGetMethod();
                WriteSerializerBytesToStream(il, valueType, OpCodes.Ldloca_S, entryLocal.LocalIndex, 2, valueMethod, isTargetCollection: true);
            }
            il.MarkLabel(startEnumeratorLabel);
            il.Emit(OpCodes.Ldloca_S, enumeratorLocal.LocalIndex);
            il.Emit(OpCodes.Call, enumeratorType.GetMethod("MoveNext", MethodBinding));
            il.Emit(OpCodes.Brtrue, moveNextLabel);
            il.Emit(OpCodes.Leave, endEnumeratorLabel);
            il.BeginFinallyBlock();
            il.Emit(OpCodes.Ldloca_S, enumeratorLocal.LocalIndex);
            il.Emit(OpCodes.Constrained, enumeratorLocal.LocalType);
            il.Emit(OpCodes.Callvirt, IDisposableDisposeMethod);
            il.EndExceptionBlock();
            il.MarkLabel(endEnumeratorLabel);
        }

        static void WriteSerializerBytesToStream(ILGenerator il, Type type, OpCode valueOpCode, int valueLocalIndex, int tag, 
            MethodInfo valueMethod, bool isTargetCollection) {
            var isTypeEnum = type.IsEnum;
            il.Emit(OpCodes.Ldarg_1);
            il.Emit(valueOpCode, valueLocalIndex);
            if (valueMethod != null) 
                il.Emit(OpCodes.Call, valueMethod);//Virt

            if (type.IsNullable())
                il.Emit(OpCodes.Call, type.GetNullableValueMethod());

            if (isTypeEnum) il.Emit(OpCodes.Box, type);
            il.Emit(OpCodes.Ldc_I4, tag);
            if (isTypeEnum) type = EnumType;
            il.Emit(OpCodes.Ldc_I4, isTargetCollection ? 1 : 0);
            il.Emit(OpCodes.Call, PrimitiveWriterMethods[type.GetNonNullableType()]);
        }

        static MethodBuilder GenerateSerializerClass(TypeBuilder typeBuilder, Type objType, bool isEntryPoint = false,
            Type baseType = null, Type ownerType = null) {
            MethodBuilder method;
            var suffix = ownerType == objType ? "Method" : string.Empty;
            var key = objType.FullName + suffix;
            var methodPrefix = objType.Name + suffix;
            if (WriterMethodBuilders.TryGetValue(key, out method)) return method;
            var methodName = String.Intern("Write") + methodPrefix;
            method = typeBuilder.DefineMethod(methodName, MethodAttribute,
                typeof(void), new[] { typeof(CustomBuffer), objType,
                    typeof(int), typeof(bool) });

            WriterMethodBuilders[key] = method;
            var methodIL = method.GetILGenerator();

            WriteSerializerClass(typeBuilder, methodIL, objType, tag: 0, valueMethod: null, callerType: objType, isEntryPoint: isEntryPoint,
                baseType: baseType);
            
            methodIL.Emit(OpCodes.Ret);
            return method;
        }

        static void WriteSerializerClass(TypeBuilder typeBuilder, ILGenerator il, Type type, int tag, MethodInfo valueMethod,
            Type callerType = null, bool isEntryPoint = false, Type baseType = null, 
            int? valueLocalIndex = null, OpCode? valueLocalOpCode = null) {
            var isDict = type.IsDictionaryType();
            var isList = type.IsListType();
            var isClass = !isDict && !isList;
            var needCondition = !type.IsValueType;
            var isDefaultLabel = needCondition ? il.DefineLabel() : DefaultLabel;

            if (needCondition) {
                if (valueLocalIndex != null) il.Emit(valueLocalOpCode.Value, valueLocalIndex.Value);
                if (valueLocalIndex == null) il.Emit(OpCodes.Ldarg_2);
                if (valueMethod != null) {
                    il.Emit(OpCodes.Callvirt, valueMethod);
                }
                il.Emit(OpCodes.Brfalse, isDefaultLabel);
            }
            if (type.IsClassType()) {
                WriteSerializerProperties(typeBuilder, il, type, callerType, isEntryPoint, baseType: baseType);
            } else {
                il.Emit(OpCodes.Ldarg_1);
                if (valueLocalIndex != null) il.Emit(valueLocalOpCode.Value, valueLocalIndex.Value);
                if (valueMethod != null) {
                    if (valueLocalIndex == null) il.Emit(OpCodes.Ldarg_2);
                    il.Emit(OpCodes.Callvirt, valueMethod);
                }
                il.Emit(OpCodes.Castclass, ICollectionType);
                il.Emit(OpCodes.Ldc_I4, tag);
                il.Emit(OpCodes.Call, WriteCollectionHeaderMethod);
                if (isDict)
                    WriteSerializerDictionary(typeBuilder, il, type, valueMethod, valueLocalIndex: valueLocalIndex, valueLocalOpCode: valueLocalOpCode);
                else if (isList) {
                    if (type.IsArray) WriteSerializerArray(typeBuilder, il, type, valueMethod, valueLocalIndex: valueLocalIndex, valueLocalOpCode: valueLocalOpCode);
                    else WriteSerializerList(typeBuilder, il, type, valueMethod, valueLocalIndex: valueLocalIndex, valueLocalOpCode: valueLocalOpCode);
                }
            }
            if (needCondition)
                il.MarkLabel(isDefaultLabel);
        }

        static void WriteSerializerCallClassMethod(TypeBuilder typeBuilder, ILGenerator il, Type type,
            OpCode valueOpCode, int valueLocalIndex, int tag, MethodInfo valueMethod, bool needClassHeader) {
            MethodBuilder method;

            if (TypeMapping.ContainsKey(type)) {
                var index = 0;
                var typeMapping = TypeMapping[type];
                var count = typeMapping.Count;
                var types = typeMapping.Select(kv => kv.Key);
                var needBranchLabel = count > 1;
                var branchLabel = needBranchLabel ? il.DefineLabel() : DefaultLabel;
                var valueLocal = il.DeclareLocal(type);
                var valueTypeLocal = il.DeclareLocal(TypeType);
                il.Emit(valueOpCode, valueLocalIndex);
                if (valueMethod != null) il.Emit(OpCodes.Callvirt, valueMethod);
                il.Emit(OpCodes.Stloc, valueLocal.LocalIndex);
                il.Emit(OpCodes.Ldloc, valueLocal.LocalIndex);
                il.Emit(OpCodes.Callvirt, GetTypeMethod);
                il.Emit(OpCodes.Stloc, valueTypeLocal.LocalIndex);

                foreach (var mapType in types) {
                    index++;
                    var isLastIndex = index == count;
                    var isLastCondition = isLastIndex && needBranchLabel;
                    var conditionLabel = !isLastCondition ? il.DefineLabel() : DefaultLabel;
                    var currentConditionLabel = isLastCondition ? branchLabel : conditionLabel;
                    il.Emit(OpCodes.Ldloc, valueTypeLocal.LocalIndex);
                    il.Emit(OpCodes.Ldtoken, mapType);
                    il.Emit(OpCodes.Call, GetTypeFromHandleMethod);
                    il.Emit(OpCodes.Call, GetTypeOpEqualityMethod);
                    il.Emit(OpCodes.Brfalse, currentConditionLabel);

                    method = GenerateSerializerClass(typeBuilder, mapType, baseType: type);
                    il.Emit(OpCodes.Ldarg_0);
                    il.Emit(OpCodes.Ldarg_1);
                    il.Emit(OpCodes.Ldloc, valueLocal.LocalIndex);
                    if (mapType.IsClass)
                        il.Emit(OpCodes.Castclass, mapType);
                    else il.Emit(OpCodes.Unbox_Any, mapType);
                    il.Emit(OpCodes.Ldc_I4, tag);
                    il.Emit(OpCodes.Ldc_I4, needClassHeader ? 1 : 0);
                    il.Emit(OpCodes.Call, method);

                    if (!isLastIndex)
                        il.Emit(OpCodes.Br, branchLabel);
                    il.MarkLabel(currentConditionLabel);
                }
                return;
            }

            method = GenerateSerializerClass(typeBuilder, type);
            il.Emit(OpCodes.Ldarg_0);
            il.Emit(OpCodes.Ldarg_1);
            il.Emit(valueOpCode, valueLocalIndex);
            if (valueMethod != null) il.Emit(OpCodes.Call, valueMethod);
            il.Emit(OpCodes.Ldc_I4, tag);
            il.Emit(OpCodes.Ldc_I4, needClassHeader ? 1 : 0);
            il.Emit(OpCodes.Call, method);
        }

        static void WriteSerializerProperties(TypeBuilder typeBuilder, ILGenerator il, Type type,
            Type callerType, bool isEntryPoint, bool needClassHeader = true, Type baseType = null) {

            baseType = baseType ?? type;
            var props = GetTypeProperties(type);
            var tag = 1;
            var isTypeClass = type.IsClass;

            if (!isEntryPoint) {
                var needClassHeaderLabel = il.DefineLabel();
                il.Emit(OpCodes.Ldarg, 4);
                il.Emit(OpCodes.Brfalse, needClassHeaderLabel);
                il.Emit(OpCodes.Ldarg_1);
                il.Emit(OpCodes.Ldc_I4_1);
                il.Emit(OpCodes.Ldarg_3);
                il.Emit(OpCodes.Call, EncodeLengthMethod);
                il.Emit(OpCodes.Call, BufferStreamWriteBytesMethod);
                il.MarkLabel(needClassHeaderLabel);
            }

            if (TypeIDMapping.ContainsKey(baseType)) {
                il.Emit(OpCodes.Ldarg_1);
                il.Emit(OpCodes.Ldtoken, baseType);
                il.Emit(OpCodes.Call, GetTypeFromHandleMethod);
                il.Emit(OpCodes.Ldarg_2);
                il.Emit(OpCodes.Callvirt, GetTypeMethod);
                il.Emit(OpCodes.Call, WriteTypeIDForMethod);
            }

            foreach (var prop in props) {
                var propType = prop.PropertyType;

                if (!prop.CanRead || !prop.CanWrite) continue;

                var getMethod = prop.GetGetMethod();

                if (propType.IsComplexType()) {
                    if (propType.IsCollectionType())
                        WriteSerializerClass(typeBuilder, il, propType, tag, getMethod, callerType: callerType);
                    else {
                        WriteSerializerCallClassMethod(typeBuilder, il, propType, getMethod, tag, needClassHeader, callerType, ownerType: type);
                    }
                } else {
                    var isTypeEnum = propType.IsEnum;
                    var isNullable = propType.IsNullable();
                    var nullLocal = isNullable ? il.DeclareLocal(propType) : default(LocalBuilder);
                    il.Emit(OpCodes.Ldarg_1);
                    if (isTypeClass)
                        il.Emit(OpCodes.Ldarg_2);
                    else il.Emit(OpCodes.Ldarga, 2);
                    il.Emit(isTypeClass ? OpCodes.Callvirt : OpCodes.Call, getMethod);
                    if (isNullable) {
                        il.Emit(OpCodes.Stloc, nullLocal.LocalIndex);
                        il.Emit(OpCodes.Ldloc, nullLocal.LocalIndex);
                        il.Emit(OpCodes.Call, propType.GetNullableValueMethod());  
                    }
                    if (isTypeEnum) il.Emit(OpCodes.Box, propType);
                    il.Emit(OpCodes.Ldc_I4, tag);
                    if (isTypeEnum) propType = EnumType;
                    if (isNullable) {
                        il.Emit(OpCodes.Ldloca, nullLocal.LocalIndex);
                        il.Emit(OpCodes.Call, propType.GetNullableHasValueMethod()); 
                    } 
                    else {
                        il.Emit(OpCodes.Ldc_I4_0);
                    }
                    il.Emit(OpCodes.Call, PrimitiveWriterMethods[propType.GetNonNullableType()]);
                }
                tag++;
            }
        }

        static void WriteSerializerCallClassMethod(TypeBuilder typeBuilder, ILGenerator il, Type type, MethodInfo valueMethod, int tag,
            bool needClassHeader, Type callerType, Type ownerType = null) {
            MethodBuilder method;
            var isTypeClass = callerType.IsClass;
            if (TypeMapping.ContainsKey(type)) {
                var index = 0;
                var typeMapping = TypeMapping[type];
                var count = typeMapping.Count;
                var types = typeMapping.Select(kv => kv.Key);
                var needBranchLabel = count > 1;
                var branchLabel = needBranchLabel ? il.DefineLabel() : DefaultLabel;
                var valueLocal = il.DeclareLocal(type);
                var valueTypeLocal = il.DeclareLocal(TypeType);
                var nullConditionLabel = il.DefineLabel();

                if (isTypeClass)
                    il.Emit(OpCodes.Ldarg_2);
                else il.Emit(OpCodes.Ldarga, 2);
                il.Emit(OpCodes.Call, valueMethod);
                il.Emit(OpCodes.Stloc, valueLocal.LocalIndex);


                il.Emit(OpCodes.Ldloc, valueLocal.LocalIndex);
                il.Emit(OpCodes.Brfalse, nullConditionLabel);


                il.Emit(OpCodes.Ldloc, valueLocal.LocalIndex);
                il.Emit(OpCodes.Callvirt, GetTypeMethod);
                il.Emit(OpCodes.Stloc, valueTypeLocal.LocalIndex);

                foreach (var mapType in types) {
                    index++;
                    var isLastIndex = index == count;
                    var isLastCondition = isLastIndex && needBranchLabel;
                    var conditionLabel = !isLastCondition ? il.DefineLabel() : DefaultLabel;
                    var currentConditionLabel = isLastCondition ? branchLabel : conditionLabel;
                    il.Emit(OpCodes.Ldloc, valueTypeLocal.LocalIndex);
                    il.Emit(OpCodes.Ldtoken, mapType);
                    il.Emit(OpCodes.Call, GetTypeFromHandleMethod);
                    il.Emit(OpCodes.Call, GetTypeOpEqualityMethod);
                    il.Emit(OpCodes.Brfalse, currentConditionLabel);

                    method = GenerateSerializerClass(typeBuilder, mapType, baseType: type, ownerType: ownerType);
                    il.Emit(OpCodes.Ldarg_0);
                    il.Emit(OpCodes.Ldarg_1);
                    il.Emit(OpCodes.Ldloc, valueLocal.LocalIndex);
                    if (mapType.IsClass)
                        il.Emit(OpCodes.Castclass, mapType);
                    else il.Emit(OpCodes.Unbox_Any, mapType);
                    il.Emit(OpCodes.Ldc_I4, tag);
                    il.Emit(OpCodes.Ldc_I4, needClassHeader ? 1 : 0);
                    il.Emit(OpCodes.Call, method);

                    if (!isLastIndex)
                        il.Emit(OpCodes.Br, branchLabel);
                    il.MarkLabel(currentConditionLabel);
                }

                il.MarkLabel(nullConditionLabel);
                return;
            }
            method = GenerateSerializerClass(typeBuilder, type, ownerType: ownerType);
            il.Emit(OpCodes.Ldarg_0);
            il.Emit(OpCodes.Ldarg_1);
            if (isTypeClass)
                il.Emit(OpCodes.Ldarg_2);
            else il.Emit(OpCodes.Ldarga, 2);
            il.Emit(OpCodes.Call, valueMethod);//Virt
            il.Emit(OpCodes.Ldc_I4, tag);
            il.Emit(OpCodes.Ldc_I4, needClassHeader ? 1 : 0);
            il.Emit(OpCodes.Call, method);
        }
    }
}
