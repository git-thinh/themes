//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------
namespace System.Collections.Generic
{
    using System;
    using System.Collections; 

    [System.Runtime.InteropServices.ComVisible(false)]
    public class SynchronizedDictionary<TKey, TValue> : IDictionary<TKey, TValue>, IDictionary
    {
        private static Dictionary<TKey, TValue> db = new Dictionary<TKey, TValue>() { };
        private static readonly object _lock = new object();

        public object this[object key]
        {
            get
            {
                TValue v;
                db.TryGetValue((TKey)key, out v);
                return v;
            }

            set
            {
                lock (_lock)
                    if (db.ContainsKey((TKey)key))
                        db[(TKey)key] = (TValue)value;
                    else
                        db.Add((TKey)key, (TValue)value);
            }
        }

        public TValue this[TKey key]
        {
            get
            {
                TValue v;
                db.TryGetValue(key, out v);
                return v;
            }

            set
            {
                lock (_lock)
                    if (db.ContainsKey(key))
                        db[key] = value;
                    else
                        db.Add(key, value);
            }
        }

        public int Count
        {
            get
            {
                return db.Count;
            }
        }

        public bool IsFixedSize
        {
            get
            {
                return false;
            }
        }

        public bool IsReadOnly
        {
            get
            {
                return false;
            }
        }

        public bool IsSynchronized
        {
            get
            {
                return true;
            }
        }

        public ICollection<TKey> Keys
        {
            get
            {
                return db.Keys;
            }
        }

        public object SyncRoot
        {
            get
            {
                return false;
            }
        }

        public ICollection<TValue> Values
        {
            get
            {
                return db.Values;
            }
        }

        ICollection IDictionary.Keys
        {
            get
            {
                return db.Keys;
            }
        }

        ICollection IDictionary.Values
        {
            get
            {
                return db.Values;
            }
        }

        public void Add(KeyValuePair<TKey, TValue> item)
        {
            lock (_lock)
                if (db.ContainsKey(item.Key))
                    db[item.Key] = item.Value;
                else
                    db.Add(item.Key, item.Value);
        }

        public void Add(object key, object value)
        {
            try
            {
                lock (_lock)
                    if (db.ContainsKey((TKey)key))
                        db[(TKey)key] = (TValue)value;
                    else
                        db.Add((TKey)key, (TValue)value);
            }
            catch { }
        }

        public void Add(TKey key, TValue value)
        {
            lock (_lock)
                if (db.ContainsKey(key))
                    db[key] = value;
                else
                    db.Add(key, value);
        }

        public void Clear()
        {
            lock (_lock)
                db.Clear();
        }

        public bool Contains(object key)
        {
            return db.ContainsKey((TKey)key);
        }

        public bool Contains(KeyValuePair<TKey, TValue> item)
        {
            return db.ContainsKey(item.Key);
        }

        public bool ContainsKey(TKey key)
        {
            return db.ContainsKey(key);
        }

        public void CopyTo(Array array, int index)
        {
            throw new NotImplementedException();
        }

        public void CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public void Remove(object key)
        {
            lock (_lock)
                if (db.ContainsKey((TKey)key))
                    db.Remove((TKey)key);
        }

        public bool Remove(KeyValuePair<TKey, TValue> item)
        {
            lock (_lock)
                if (db.ContainsKey(item.Key))
                {
                    db.Remove(item.Key);
                    return true;
                }
            return false;
        }

        public bool Remove(TKey key)
        {
            lock (_lock)
                if (db.ContainsKey(key))
                {
                    db.Remove(key);
                    return true;
                }
            return false;
        }
         

        public bool TryGetValue(TKey key, out TValue value)
        {
            return db.TryGetValue(key, out value);
        }

        IDictionaryEnumerator IDictionary.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
    }
}
