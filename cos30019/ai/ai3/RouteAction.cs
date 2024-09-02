namespace AI3 {
    public class RouteAction : Action {
        private string _from, _to;

        public RouteAction(string from, string to, int cost) : base(cost, $"From {from}, go to {to}.") {
            _from = from;
            _to = to;
        }

        public string From {
            get { return _from; }
        }

        public string To {
            get { return _to; }
        }
    }
}