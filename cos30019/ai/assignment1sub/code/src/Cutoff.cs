namespace Assignment1 {
    // Represents a cutoff result returned by depth-limited search or A* limited search.
    public class Cutoff : Result {
        private string _cutoffDescription;

        public Cutoff(int nodeCreated, string description = "No solution found at this cutoff limit.") : base(nodeCreated) {
            _cutoffDescription = description;
        }

        public override string Description
        {
            get { return _cutoffDescription; }            
        }
    }
}