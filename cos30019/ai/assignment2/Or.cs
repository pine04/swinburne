using System.Collections.Generic;

namespace Assignment2 {
    public class Or : ComplexSentence {
        public Or(Sentence left, Sentence right) : base(left, right) { }

        public override bool GetTruth(Dictionary<string, bool> model)
        {
            if (_left == null) return false;
            return _left.GetTruth(model) || _right.GetTruth(model);
        }

        public override string GetNotation()
        {
            if (_left == null) return "";
            return $"Or({_left.GetNotation()}, {_right.GetNotation()})";
        }
    }
}