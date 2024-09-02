namespace AI3 {
    public abstract class Action {
        protected int _cost;
        protected string _actionDescription;

        public Action(int cost, string actionDescription) {
            _cost = cost;
            _actionDescription = actionDescription;
        }

        public int Cost {
            get { return _cost; }
        }

        public string ActionDescription {
            get { return _actionDescription; }
        }
    }    
}