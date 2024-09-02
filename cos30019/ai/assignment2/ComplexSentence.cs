namespace Assignment2 {
    public abstract class ComplexSentence : Sentence {
        protected Sentence? _left;
        protected Sentence _right;

        public ComplexSentence(Sentence? left, Sentence right) {
            _left = left;
            _right = right;
        }
    }
}