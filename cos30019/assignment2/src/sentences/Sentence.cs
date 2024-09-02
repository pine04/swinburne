using System.Collections.Generic;

namespace Assignment2 {
    // Base sentence class.
    public abstract class Sentence {
        public static readonly Sentence EmptySentence = new AtomicSentence("");
        public abstract bool GetTruth(Dictionary<string, bool> model);
        public abstract string GetNotation();
        public abstract HashSet<string> GetSymbols();
        public abstract HashSet<string> GetLeftSymbols(); 
        public abstract HashSet<string> GetRightSymbols();
    }
}