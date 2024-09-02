namespace Assignment2 {
    public class SentenceToken : Token {
        private Sentence _sentence;

        public SentenceToken(Sentence sentence) {
            _sentence = sentence;
        }

        public Sentence Sentence {
            get { return _sentence; }
        }
    }
}