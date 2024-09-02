namespace Assignment1 {
    // Represents an abstract result. Result can be Solution, Failure, or Cutoff.
    public abstract class Result {
        private int _nodeCreated;

        public Result(int nodeCreated) {
            _nodeCreated = nodeCreated;
        }

        public abstract string Description { get; }

        public int NodeCreated { 
            get { return _nodeCreated; }
        }
    }
}