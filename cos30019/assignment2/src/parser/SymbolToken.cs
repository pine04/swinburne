namespace Assignment2 {
    public class SymbolToken : Token {
        private string _symbol;

        public SymbolToken(string symbol) {
            _symbol = symbol;
        }

        public string Symbol {
            get { return _symbol; }
        }
    }
}