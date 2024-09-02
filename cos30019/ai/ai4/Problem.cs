using System.Collections.Generic;

namespace AI4 {
    public abstract class Problem {
        protected State _initial;

        public Problem(State initialState) {
            _initial = initialState;
        }

        public State InitialState {
            get { return _initial; }
        }

        public abstract List<Action> GetActions(State currentState);
        public abstract State GetResult(State state, Action action);
        public abstract int GetCost(State state, Action action);
        public abstract bool GoalTest(State state);
        public abstract int GetHeuristicCost(State state);
    }
}