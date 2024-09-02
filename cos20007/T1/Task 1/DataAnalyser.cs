using System.Collections.Generic;

namespace SemTest {
    public class DataAnalyser {
        private List<int> _numbers;
        private SummaryStrategy _strategy;

        public DataAnalyser() {
            _numbers = new List<int>();
            _strategy = new AverageSummary();
        }

        public DataAnalyser(List<int> numbers) {
            _numbers = numbers;
            _strategy = new AverageSummary();
        }

        public DataAnalyser(SummaryStrategy strategy) {
            _numbers = new List<int>();
            _strategy = strategy;
        }

        public DataAnalyser(List<int> numbers, SummaryStrategy strategy) {
            _numbers = numbers;
            _strategy = strategy;
        }

        public SummaryStrategy Strategy {
            get { return _strategy; }
            set { _strategy = value; }
        }

        public void AddNumber(int number) {
            _numbers.Add(number);
        }

        public void Summarise() {
            _strategy.PrintSummary(_numbers);
        }
    }
}