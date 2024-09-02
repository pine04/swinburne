using System;
using System.Collections.Generic;

namespace SemTest {
    public class MinMaxSummary : SummaryStrategy {
        private int Minimum(List<int> numbers) {
            int min = Int32.MaxValue;
            foreach (int number in numbers) {
                if (number < min) {
                    min = number;
                }
            }
            return min;
        }

        private int Maximum(List<int> numbers) {
            int max = Int32.MinValue;
            foreach (int number in numbers) {
                if (number > max) {
                    max = number;
                }
            }
            return max;
        }

        public override void PrintSummary(List<int> numbers) {
            Console.WriteLine("Min: {0}", Minimum(numbers));
            Console.WriteLine("Max: {0}", Maximum(numbers));
        }
    }
}