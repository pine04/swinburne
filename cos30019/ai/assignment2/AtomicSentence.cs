using System.Collections.Generic;

namespace Assignment2 {
    public class AtomicSentence : Sentence {
        private string _symbol;

        public AtomicSentence(string propositionalSymbol) {
            _symbol = propositionalSymbol;
        }

        public override bool GetTruth(Dictionary<string, bool> model) {
            return model[_symbol];
        }

        public override string GetNotation()
        {
            return _symbol;
        }
    }
}