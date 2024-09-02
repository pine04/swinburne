using System.Collections.Generic;

namespace Assignment2
{
    public class AtomicSentence : Sentence
    {
        private string _symbol;

        public AtomicSentence(string propositionalSymbol)
        {
            _symbol = propositionalSymbol.Trim();
        }

        public override bool GetTruth(Dictionary<string, bool> model)
        {
            return model[_symbol];
        }

        public override string GetNotation()
        {
            return _symbol;
        }

        public override HashSet<string> GetSymbols()
        {
            if (_symbol == "")
            {
                return new HashSet<string>();
            }
            else
            {
                return new HashSet<string>() { _symbol };
            }
        }

        public override HashSet<string> GetLeftSymbols()
        {
            return GetSymbols();
        }
        public override HashSet<string> GetRightSymbols()
        {
            return GetSymbols();
        }
    }
}