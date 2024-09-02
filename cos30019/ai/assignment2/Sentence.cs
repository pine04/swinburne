using System.Collections.Generic;

namespace Assignment2 {
    public abstract class Sentence {
        public abstract bool GetTruth(Dictionary<string, bool> model);
        public abstract string GetNotation();
    }
}