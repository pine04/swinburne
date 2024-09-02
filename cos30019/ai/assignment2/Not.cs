using System.Collections.Generic;

namespace Assignment2 {
    public class Not : ComplexSentence {
        public Not(Sentence right) : base(null, right) { }

        public override bool GetTruth(Dictionary<string, bool> model)
        {
            return !_right.GetTruth(model);
        }

        public override string GetNotation()
        {
            return $"Not({_right.GetNotation()})";
        }
    }
}