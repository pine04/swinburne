using System;
using System.Diagnostics;
using System.Collections.Generic;

namespace Research {
    class Program {
        public static void Main(string[] args) {
            // Console.WriteLine("Add end: list, dictionary, queue, linked list");
            // GetAverage(MeasureAddEndList(100, 1000000));
            // GetAverage(MeasureAddEndDictionary(100, 1000000));
            // GetAverage(MeasureAddEndQueue(100, 1000000));
            // GetAverage(MeasureAddEndLinkedList(100, 1000000));
            
            // Console.WriteLine("Add start: list, stack, linked list");
            // GetAverage(MeasureAddStartList(100, 100000));
            // GetAverage(MeasureAddStartStack(100, 100000));
            // GetAverage(MeasureAddStartLinkedList(100, 100000));

            // Console.WriteLine("Insert at i: list");
            GetAverage(MeasureInsertList(100, 100000));

            // Random random = new Random();

            // int[] numberPool = new int[1000000];
            // for (int i = 0; i < numberPool.Length; i++) {
            //     numberPool[i] = random.Next(0, 1000001);
            // }

            // int[] targetPool = new int[100];
            // for (int i = 0; i < targetPool.Length; i++) {
            //     targetPool[i] = random.Next(0, 1000001);
            // }

            // Console.WriteLine("Find: array, list, linked list");
            // GetAverage(MeasureFindArray(numberPool, targetPool));
            // GetAverage(MeasureFindList(numberPool, targetPool));
            // GetAverage(MeasureFindLinkedList(numberPool, targetPool));

            // GetAverage(MeasureRemoveByValueList(100, numberPool, targetPool));
            // GetAverage(MeasureRemoveByValueLinkedList(100, numberPool, targetPool));

            // GetAverage(MeasureRemoveStartList(100, 100, numberPool));
            // GetAverage(MeasureRemoveStartQueue(100, 100, numberPool));
            // GetAverage(MeasureRemoveStartLinkedList(100, 100, numberPool));

            // GetAverage(MeasureRemoveEndList(100, 100, numberPool));
            // GetAverage(MeasureRemoveEndStack(100, 100, numberPool));
            // GetAverage(MeasureRemoveEndLinkedList(100, 100, numberPool));

            // GetAverage(MeasureRemoveIndexList(100, 100, numberPool));
        }

        public static long[] MeasureAddEndList(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    list.Add(i);
                }

                timer.Stop();
                list = new List<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureAddEndDictionary(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            Dictionary<int, int> dictionary = new Dictionary<int, int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    dictionary.Add(i, i);
                }

                timer.Stop();
                dictionary = new Dictionary<int, int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureAddEndQueue(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            Queue<int> queue = new Queue<int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    queue.Enqueue(i);
                }

                timer.Stop();
                queue = new Queue<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureAddEndLinkedList(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            LinkedList<int> linkedList = new LinkedList<int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    linkedList.AddLast(i);
                }

                timer.Stop();
                linkedList = new LinkedList<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureAddStartList(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    list.Insert(0, i);
                }

                timer.Stop();
                list = new List<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureAddStartStack(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            Stack<int> stack = new Stack<int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    stack.Push(i);
                }

                timer.Stop();
                stack = new Stack<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureAddStartLinkedList(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            LinkedList<int> linkedList = new LinkedList<int>();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    linkedList.AddFirst(i);
                }

                timer.Stop();
                linkedList = new LinkedList<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static long[] MeasureInsertList(int times, int numberOfValues) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>();
            Random random = new Random();

            long[] results = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    list.Insert(random.Next(0, list.Count), i);
                }

                timer.Stop();
                list = new List<int>();
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }
        
        public static long[] MeasureFindArray(int[] numberPool, int[] targetPool) {
            var timer = Stopwatch.StartNew();

            long[] result = new long[targetPool.Length];

            for (int t = 0; t < targetPool.Length; t++) {
                timer.Reset();
                timer.Start();

                Array.Find<int>(numberPool, (e) => e == targetPool[t]);

                timer.Stop();
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureFindList(int[] numberPool, int[] targetPool) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>(numberPool);

            long[] result = new long[targetPool.Length];

            for (int t = 0; t < targetPool.Length; t++) {
                timer.Reset();
                timer.Start();

                list.Find((e) => e == targetPool[t]);

                timer.Stop();
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureFindLinkedList(int[] numberPool, int[] targetPool) {
            var timer = Stopwatch.StartNew();

            LinkedList<int> linkedList = new LinkedList<int>(numberPool);

            long[] result = new long[targetPool.Length];

            for (int t = 0; t < targetPool.Length; t++) {
                timer.Reset();
                timer.Start();

                linkedList.Find(targetPool[t]);

                timer.Stop();
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveByValueList(int times, int[] numberPool, int[] targetPool) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < targetPool.Length; i++) {
                    list.Remove(targetPool[i]);
                }

                timer.Stop();
                list = new List<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveByValueLinkedList(int times, int[] numberPool, int[] targetPool) {
            var timer = Stopwatch.StartNew();

            LinkedList<int> linkedList = new LinkedList<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < targetPool.Length; i++) {
                    linkedList.Remove(targetPool[i]);
                }

                timer.Stop();
                linkedList = new LinkedList<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveStartList(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    list.RemoveAt(0);
                }

                timer.Stop();
                list = new List<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveStartQueue(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            Queue<int> queue = new Queue<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    queue.Dequeue();
                }

                timer.Stop();
                queue = new Queue<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveStartLinkedList(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            LinkedList<int> linkedList = new LinkedList<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    linkedList.RemoveFirst();
                }

                timer.Stop();
                linkedList = new LinkedList<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveEndList(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    list.RemoveAt(list.Count - 1);
                }

                timer.Stop();
                list = new List<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveEndStack(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            Stack<int> stack = new Stack<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    stack.Pop();
                }

                timer.Stop();
                stack = new Stack<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveEndLinkedList(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            LinkedList<int> linkedList = new LinkedList<int>(numberPool);

            long[] result = new long[times];
            int i;

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    linkedList.RemoveLast();
                }

                timer.Stop();
                linkedList = new LinkedList<int>(numberPool);
                result[t] = timer.ElapsedMilliseconds;
            }

            return result;
        }

        public static long[] MeasureRemoveIndexList(int times, int numberOfValues, int[] numberPool) {
            var timer = Stopwatch.StartNew();

            List<int> list = new List<int>(numberPool);

            long[] results = new long[times];
            int i;

            Random random = new Random();

            for (int t = 0; t < times; t++) {
                timer.Reset();
                timer.Start();

                for (i = 0; i < numberOfValues; i++) {
                    list.RemoveAt(random.Next(0, list.Count));
                }

                timer.Stop();
                list = new List<int>(numberPool);
                results[t] = timer.ElapsedMilliseconds;
            }

            return results;
        }

        public static void GetAverage(long[] result) {
            long sum = 0;
            double average;

            foreach (long r in result) sum += r;
            average = (double)sum / result.Length;

            Console.WriteLine("Average elapsed time: {0}ms.", average);
        }
    }
}