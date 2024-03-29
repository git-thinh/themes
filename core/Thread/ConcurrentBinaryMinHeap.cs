﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;

namespace System.Collections.Concurrent
{
    /// <summary>
    /// The ConcurrentBinaryMinHeap class is a thread-safe generic binary heap for sorting
    /// such that the largest element is always the root element. This heap uses the min-heap
    /// property, therefore the element with the highest priority will always be removed first.
    /// </summary>
    /// <typeparam name="T">The type of data to be queued.</typeparam>
    public class ConcurrentBinaryMinHeap<T> : ICollection<PriorityValuePair<T>>
    {

        #region Instance members

        /// <summary>
        /// The actual List array structure that backs the implementation of the heap.
        /// </summary>
        private List<PriorityValuePair<T>> __data;


        /// <summary>
        /// Returns the number of elements the heap can hold without auto-resizing.
        /// </summary>
        public int Capacity
        {
            get
            {
                // Lock the heap -- CRITICAL SECTION BEGIN
                System.Threading.Monitor.Enter(__data);
                int result = 0;
                try
                {
                    // Compute the property value
                    result = __data.Capacity;
                }
                finally
                {
                    System.Threading.Monitor.Exit(__data);
                    // Unlock the heap -- CRITICAL SECTION END
                }
                return result;
            }
        }


        /// <summary>
        /// Return the number of elements in the heap.
        /// </summary>
        public int Count
        {
            get
            {
                // Lock the heap -- CRITICAL SECTION BEGIN
                System.Threading.Monitor.Enter(__data);
                int result = 0;
                try
                {
                    // Compute the property value
                    result = __data.Count;
                }
                finally
                {
                    System.Threading.Monitor.Exit(__data);
                    // Unlock the heap -- CRITICAL SECTION END
                }
                return result;
            }
        }


        /// <summary>
        /// Returns whether or not the heap is empty.
        /// </summary>
        public bool IsEmpty
        {
            get
            {
                // Lock the heap -- CRITICAL SECTION BEGIN
                System.Threading.Monitor.Enter(__data);
                bool result = false;
                try
                {
                    // Compute the property value
                    result = __data.Count == 0;
                }
                finally
                {
                    System.Threading.Monitor.Exit(__data);
                    // Unlock the heap -- CRITICAL SECTION END
                }
                return result;
            }
        }


        /// <summary>
        /// Returns whether or not the collection is read-only. For a heap this property returns
        /// <c>false</c>.
        /// </summary>
        public bool IsReadOnly { get { return false; } }

        #endregion


        #region Constructors

        public ConcurrentBinaryMinHeap(List<T> list)
        {
            __data = new List<PriorityValuePair<T>>() { };
            for (int k = 0; k < list.Count; k++)
                __data.Add(new PriorityValuePair<T>(1000.0, list[k]));
        }

        /// <summary>
        /// Create a new default heap.
        /// </summary>
        public ConcurrentBinaryMinHeap()
        {
            __data = new List<PriorityValuePair<T>>() { };
        }


        /// <summary>
        /// Create a new heap with the given initial size of the array implementing it internally.
        /// </summary>
        /// <param name="initialCapacity">The initial size of the data List internal to the heap.
        /// </param>
        /// <exception cref="ArgumentOutOfRangeException">
        /// Thrown by the List constructor when the given initialCapacity is less than 0.
        /// </exception>
        public
        ConcurrentBinaryMinHeap(int initialCapacity)
        {
            try
            {
                __data = new List<PriorityValuePair<T>>(initialCapacity);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion


        #region Public methods

        /// <summary>
        /// Inserts a PriorityValuePair as a new element into the heap.
        /// </summary>
        /// <param name="item">PriorityValuePair to add as a new element.</param>
        public
        void
        Add(PriorityValuePair<T> element)
        {
            Push(element);
        }


        /// <summary>
        /// Clears all elements from the heap.
        /// </summary>
        public
        void
        Clear()
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                __data.Clear();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
        }


        /// <summary>
        /// Returns whether or not the heap contains the given PriorityValuePair element.
        /// </summary>
        /// <param name="item">The PriorityValuePair to locate in the heap.</param>
        /// <returns><c>true</c> if item is found in the heap; otherwise, <c>false</c>.</returns>
        public
        bool
        Contains(PriorityValuePair<T> element)
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            bool result = false;
            try
            {
                result = __data.Contains(element);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }

            return result;
        }


        /// <summary>
        /// Copies the elements of the heap to an Array, starting at a particular index. This
        /// method does not guarantee that elements will be copied in the sorted order.
        /// </summary>
        /// <param name="array">The one-dimensional Array that is the destination of the elements
        /// copied from the heap. The Array must have zero-based indexing. </param>
        /// <param name="arrayIndex">The zero-based index in array at which copying begins.</param>
        public
        void
        CopyTo(PriorityValuePair<T>[] array, int arrayIndex)
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                __data.CopyTo(array, arrayIndex);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
        }


        /// <summary>
        /// Returns an enumerator that iterates through the heap's elements. This enumerator is
        /// not guaranteed to iterate through elements in sorted order, and indeed, is not even 
		/// guaranteed to iterate through elements by priority (although in general the iterated
		/// elements will tend from high to low priority values).
        /// </summary>
        /// <returns>An generic enumerator of the heap's contents.</returns>
        public
        IEnumerator<PriorityValuePair<T>>
        GetEnumerator()
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            IEnumerator<PriorityValuePair<T>> result = null;
            try
            {
                result = __data.GetEnumerator();
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
            return result;
        }


        /// <summary>
        /// Returns an enumerator that iterates through the heap's elements. This enumerator is
        /// not guaranteed to iterate through elements in sorted order, and indeed, is not even 
		/// guaranteed to iterate through elements by priority (although in general the iterated
		/// elements will tend from high to low priority values).
        /// </summary>
        /// <returns>An enumerator of the heap's contents.</returns>
        IEnumerator
        IEnumerable.GetEnumerator()
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            IEnumerator result = null;
            try
            {
                // Call the above function (pretty sure? -- Thread lock this anyway to be safe!)
                result = this.GetEnumerator();
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
            return result;
        }


        /// <summary>
        /// Return the current root element of the heap, but don't remove it.
        /// </summary>
        public
        PriorityValuePair<T>
        Peek()
        {
            if (IsEmpty)
            {
                //throw new InvalidOperationException( "The heap is empty." );
                return null;
            }

            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            PriorityValuePair<T> result;
            try
            {
                // Return the root element of the heap.
                result = __data[0];
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }

            return result;
        }


        /// <summary>
        /// Return the current root element of the heap, and then remove it. This operation will
        /// heapify the heap after removal to ensure that it remains sorted.
        /// </summary>
        public PriorityValuePair<T>Pop()
        {
            if (IsEmpty)
            {
                return null;
            }

            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            PriorityValuePair<T> result;
            try
            {
                // Keep a reference to the element at the root of the heap.
                result = __data[0];

                if (__data.Count <= 1)
                {
                    // Clear the last element. No need to heapify since there's nothing left.
                    __data.Clear();
                }
                else
                {
                    // Move the last element up to be the root of the heap.
                    __data[0] = __data[__data.Count - 1];
                    __data.RemoveAt(__data.Count - 1);

                    // Heapify to move the new root into its correct position within the heap.
                    HeapifyTopDown(0);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }

            return result;
        }


        /// <summary>
        /// Insert a new element into the heap and heapify it into its correct position, given
        /// an existing PriorityValuePair containing a double priority as its key and a value.
        /// </summary>
        /// <param name="element">A PriorityValuePair containing a double priority as its key and a
        /// generically-typed value.</param>
        public void Push(PriorityValuePair<T> element)
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                // Add a new element to the heap at the end of the data list.
                __data.Add(element);

                // Heapify bottom up to sort the element into the correct position in the heap.
                HeapifyBottomUp(__data.Count - 1);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
        }


        public void Push(T item)
        {
            PriorityValuePair<T> element = new PriorityValuePair<T>(1000.0, item);
            Push(element);
        }

        /// <summary>
        /// Insert a new element into the heap and heapify it into its correct position, given
        /// a double priority and some value to create an element from.
        /// </summary>
        /// <param name="priority">A double priority.</param>
        /// <param name="value">A generically-typed object.</param>
        public
        void
        Push(double priority, T value)
        {
            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                // Add a new element to the heap at the end of the data list.
                __data.Add(new PriorityValuePair<T>(priority, value));

                // Heapify bottom up to sort the element into the correct position in the heap.
                HeapifyBottomUp(__data.Count - 1);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
        }


        /// <summary>
        /// Removes the first occurrence of the given PriorityValuePair element within the heap.
        /// </summary>
        /// <param name="item">The PriorityValuePair element to remove from the heap.</param>
        /// <returns><c>true</c> if item was successfully removed from the priority heap.
        /// This method returns <c>false</c> if item is not found in the collection.</returns>
        public
        bool
        Remove(PriorityValuePair<T> element)
        {
            if (IsEmpty)
            {
                //throw new InvalidOperationException( "The heap is empty." );
                return false;
            }

            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            bool result = false;
            try
            {
                // Find the element within the heap.
                int index = __data.IndexOf(element);
                //Console.WriteLine( "index: " + index + ", count: " + __data.Count );
                if (index < 0)
                {
                    // Return false to indicate that the element was not found in the heap.
                    result = false;
                }
                else if (index == __data.Count - 1)
                {
                    // If we're removing the last element, we can simply remove it. There is no 
                    // need to heapify following the removal.
                    __data.RemoveAt(index);
                    result = true;
                }
                else
                {
                    // In most cases, we need to swap the element from the index where it was found 
                    // with the last element in the set, then remove the last element (since it is
                    // now the one we aimed to get rid of). Then, once this has been done, we need 
                    // to heapify up (and potentially also down) to re-sort the heap.
                    SwapElements(index, __data.Count - 1);
                    __data.RemoveAt(__data.Count - 1);
                    int newIndex = HeapifyBottomUp(index);
                    if (newIndex == index)
                    {
                        HeapifyTopDown(index);
                    }
                    result = true;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }

            return result;
        }

        #endregion


        #region Private methods (these are conditionally compiled as public for DEBUG builds)

        /// <summary>
        /// Swap the heap element at index1 with the heap element at index2.
        /// </summary>
        /// <param name="index1">The first heap element to swap.</param>
        /// <param name="index2">The second heap element to swap.</param>
        /// <exception cref="ArgumentOutOfRangeException">
        /// Thrown when the given index1 is out of range.
        /// </exception>
        /// <exception cref="ArgumentOutOfRangeException">
        /// Thrown when the given index2 is out of range.
        /// </exception>
        /// <exception cref="InvalidOperationException">
        /// Thrown when the heap contains less than 2 elements.
        /// </exception>
#if DEBUG
        public
#else
		private
#endif
        void
        SwapElements(int index1, int index2)
        {
            if (__data.Count < 2)
            {
                throw new InvalidOperationException("The heap must contain at least 2 elements.");
            }
            if (index1 < 0 || index1 >= __data.Count)
            {
                throw new ArgumentOutOfRangeException("index1 must be within the range [0,Count-1].");
            }
            if (index2 < 0 || index2 >= __data.Count)
            {
                throw new ArgumentOutOfRangeException("index2 must be within the range [0,Count-1].");
            }

            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                // Do a plain old swap of the elements at index1 and index2 in the heap.
                PriorityValuePair<T> temp = __data[index1];
                __data[index1] = __data[index2];
                __data[index2] = temp;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
        }


        /// <summary>
        /// Use the upward-sorting heapify algorithm to sort the element at the given index
        /// upward to the correct position it should have within the heap. To be a bit clearer,
        /// an element sorted using this heapify tends to move up through the tree, closer to
        /// the root node.
        /// </summary>
        /// <param name="index">The index of the element to sort within the heap.</param>
        /// <exception cref="ArgumentOutOfRangeException">
        /// Thrown when the given index is out of range.
        /// </exception>
        /// <exception cref="ArgumentOutOfRangeException">
        /// Thrown by SwapElements() when the inputs to SwapElements() are invalid.
        /// </exception>
        /// <exception cref="InvalidOperationException">
        /// Thrown by SwapElements() when there are less than 2 elements in the heap.
        /// </exception>
        /// <exception cref="InvalidOperationException">
        /// Thrown when the heap is empty.
        /// </exception>
#if DEBUG
        public
#else
		private
#endif
        int
        HeapifyBottomUp(int index)
        {
            if (IsEmpty)
            {
                throw new InvalidOperationException("The heap is empty.");
            }
            if (index < 0 || index >= __data.Count)
            {
                throw new ArgumentOutOfRangeException("index must be within the range [0,Count-1].");
            }

            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                // Given an index i of some heap node:
                // Index of the LEFT CHILD of i:  j = 2i + 1
                // Index of the RIGHT CHILD of i: j = 2i + 2
                // Index of the PARENT of i:      j = (i - 1) / 2

                double priority = 0.0;
                double priorityParent = 0.0;
                while (index > 0)
                {
                    int parentIndex = (index - 1) / 2;
                    priority = __data[index].Priority;
                    priorityParent = __data[parentIndex].Priority;

                    if (priority > priorityParent)
                    {
                        SwapElements(index, parentIndex);
                        index = parentIndex;
                    }
                    else
                    {
                        break;
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }

            return index;
        }


        /// <summary>
        /// Use the downward-sorting heapify algorithm to sort the element at the given index
        /// downward to the correct position it should have within the heap. To be a bit clearer,
        /// an element sorted using this heapify tends to move down through the tree, further from
        /// the root node (and toward the leaves at the bottom).
        /// </summary>
        /// <param name="index">The index of the element to sort within the heap.</param>
        /// <exception cref="ArgumentOutOfRangeException">
        /// Thrown when the given index is out of range.
        /// </exception>
        /// <exception cref="InvalidOperationException">
        /// Thrown when the heap is empty.
        /// </exception>
#if DEBUG
        public
#else
		private
#endif
        void
        HeapifyTopDown(int index)
        {
            if (IsEmpty)
            {
                throw new InvalidOperationException("The heap is empty.");
            }
            if (index < 0 || index >= __data.Count)
            {
                throw new ArgumentOutOfRangeException("Index must be a valid index within the heap.");
            }

            // Lock the thread -- CRITICAL SECTION BEGIN
            System.Threading.Monitor.Enter(__data);
            try
            {
                // Given an index i of some heap node:
                // Index of the LEFT CHILD of i:  j = 2i + 1
                // Index of the RIGHT CHILD of i: j = 2i + 2
                // Index of the PARENT of i:      j = (i - 1) / 2

                // I wish there were a cleaner way to write this but I have fought like hell to make this 
                // better and gained nothing. Tamper with this god-awful syntax at your own risk.
                while (true)
                {
                    // highestPriority is initialized here since it can't be set before the while 
                    // condition (index != highestPriority would result in the while never running 
                    // if so).
                    int highestPriority = index;
                    double priority = __data[index].Priority;

                    // Check if the priority of the left child is greater than that of the element 
                    // at the current index.
                    int leftIndex = 2 * index + 1;
                    if (leftIndex < __data.Count)
                    {
                        double priorityLeftChild = __data[leftIndex].Priority;
                        if (priority < priorityLeftChild)
                        {
                            // Update the highestPriority index with the index of the left child.
                            highestPriority = leftIndex;
                            priority = __data[leftIndex].Priority;
                        }
                    }

                    // Check if the priority of the left child is greater than that of the element 
                    // at the current index.
                    int rightIndex = 2 * index + 2;
                    if (rightIndex < __data.Count)
                    {
                        double priorityRightChild = __data[rightIndex].Priority;
                        if (priority < priorityRightChild)
                        {
                            // Update the highestPriority index with the index of the right child.
                            highestPriority = rightIndex;
                            priority = __data[rightIndex].Priority;
                        }
                    }

                    // Swap the highest priority element with the current index or break the loop since the 
                    // heapify operation is complete.
                    if (highestPriority != index)
                    {
                        SwapElements(highestPriority, index);
                        index = highestPriority;
                    }
                    else
                    {
                        break;
                    }
                }
            }
            finally
            {
                System.Threading.Monitor.Exit(__data);
                // Unlock the thread -- CRITICAL SECTION END
            }
        }

        #endregion
    }


    public class PriorityValuePair<TValue>
    {
        #region Instance members

        /// <summary>
        /// The double-precision floating-point value indicating the priority value of this pair. 
        /// Typically this affects how it will be sorted in a binary heap or priority queue.
        /// </summary>
        public double Priority { get; set; }


        /// <summary>
        /// A generically-typed value that may contain any kind of data.
        /// </summary>
        public TValue Value { get; set; }

        #endregion


        #region Constructors

        /// <summary>
        /// Create a new default priority-value pair.
        /// </summary>
        public PriorityValuePair()
        {
            Priority = 0f;
            Value = default(TValue);
        }


        /// <summary>
        /// Create a new priority-value pair by specifying its initial priority and value.
        /// </summary>
        /// <param name="priority">The double-precision floating-point value indicating the 
        /// priority value of this pair. Typically this affects how it will be sorted in a binary 
        /// heap or priority queue.
        /// </param>
        /// <param name="value">A generically-typed value that may contain any kind of data.
        /// </param>
        public PriorityValuePair(double priority, TValue value)
        {
            Priority = priority;
            Value = value;
        }

        #endregion
    }
}