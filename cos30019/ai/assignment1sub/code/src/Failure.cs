namespace Assignment1 {
    // Represents a failure result when the search algorithm cannot find a solution.
    public class Failure : Result {
        private string _failureDescription;

        public Failure(int nodeCreated, string description = "No solution found.") : base(nodeCreated) {
            _failureDescription = description;
        }

        public override string Description
        {
            get { return _failureDescription; }
        }
    }
}