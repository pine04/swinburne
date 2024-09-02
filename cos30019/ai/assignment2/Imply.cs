using System.Collections.Generic;

namespace Assignment2 {
    public class Imply : ComplexSentence {
        public Imply(Sentence left, Sentence right) : base(left, right) { }

        public override bool GetTruth(Dictionary<string, bool> model)
        {
            if (_left == null) return false;

            if (_left.GetTruth(model) && !_right.GetTruth(model)) {
                return false;
            } else {
                return true;
            }
        }

        public override string GetNotation()
        {
            if (_left == null) return "";
            return $"Imply({_left.GetNotation()}, {_right.GetNotation()})";
        }
    }
}