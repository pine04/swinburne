namespace AI3 {
    public class Node {
        private Node? _parent;
        private State _state;
        private int _pathCost;
        private Action? _action;

        public Node(State startingState) {
            _parent = null;
            _state = startingState;
            _pathCost = 0;
            _action = null;
        }

        public Node(Node parent, Problem problem, Action action) {
            _parent = parent;
            _state = problem.GetResult(parent.State, action);
            _pathCost = parent.PathCost + problem.GetCost(parent.State, action);
            _action = action;
        }

        public Node? Parent {
            get { return _parent; }
        }

        public State State {
            get { return _state; }
        }

        public int PathCost {
            get { return _pathCost; }
        }

        public Action? Action {
            get { return _action; }
        }
    }
}