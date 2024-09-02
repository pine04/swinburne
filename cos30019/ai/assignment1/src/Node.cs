namespace Assignment1 {
    // Represents a node of the search tree.
    public class Node {
        private Node? _parent;
        private State _state;
        private int _pathCost;
        private Action? _action;
        private uint _depth;

        public Node(State startingState) {
            _parent = null;
            _state = startingState;
            _pathCost = 0;
            _action = null;
            _depth = 0;
        }

        public Node(Node parent, Action action) {
            _parent = parent;
            _state = parent.State + action;
            _pathCost = parent.PathCost + action.Cost;
            _action = action;
            _depth = parent.Depth + 1;
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

        public uint Depth {
            get { return _depth; }
        }
    }
}