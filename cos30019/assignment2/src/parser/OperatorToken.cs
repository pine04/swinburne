namespace Assignment2 {
    public class OperatorToken : Token {
        private char _operation;

        public OperatorToken(char operation) {
            _operation = operation;
        }

        public char Operation {
            get { return _operation; }
        }
    }
}