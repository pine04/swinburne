using System.Collections.Generic;

namespace Assignment2 {
    public abstract class ComplexSentence : Sentence {
        protected Sentence _left;
        protected Sentence _right;
        protected HashSet<string> _symbols;
        protected HashSet<string> _leftSymbols;
        protected HashSet<string> _rightSymbols;

        public ComplexSentence(Sentence left, Sentence right) {
            _left = left;
            _right = right;

            _symbols = new HashSet<string>();
            _rightSymbols = new HashSet<string>();
            _leftSymbols = new HashSet<string>();
            if (left != null) _leftSymbols.UnionWith(left.GetSymbols());
            _rightSymbols.UnionWith(right.GetSymbols());
            _symbols.UnionWith(_leftSymbols);
            _symbols.UnionWith(_rightSymbols);
        }

        public override HashSet<string> GetSymbols() {
            return _symbols;
        }
        public override HashSet<string> GetLeftSymbols() {
            return _leftSymbols;
        }
        public override HashSet<string> GetRightSymbols() {
            return _rightSymbols;
        }

        public Sentence Left {
            get { return _left; }
            set { _left = value; }
        }

        public Sentence Right {
            get { return _right; }
            set { _right = value;}
        }
    }
}