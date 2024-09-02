using System;
using System.Collections.Generic;

namespace SemTest {
    class Program {
        public static void Main(string[] args) {
            List<int> numbers = new List<int> { 1, 0, 4, 2, 2, 2, 1, 9, 6 };
            MinMaxSummary minmax = new MinMaxSummary();
            // Create a DataAnalyser object with the list of numbers and minmax strategy.
            DataAnalyser analyser = new DataAnalyser(numbers, minmax);
            // Summarise the list of numbers.
            analyser.Summarise();
            // Add three more numbers.
            analyser.AddNumber(10);
            analyser.AddNumber(11);
            analyser.AddNumber(12);
            // Change the strategy to average.
            AverageSummary average = new AverageSummary();
            analyser.Strategy = average;
            // Summarise again.
            analyser.Summarise();

            Console.ReadLine();
        }
    }
}
