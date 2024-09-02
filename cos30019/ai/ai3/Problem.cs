using System.Collections.Generic;

namespace AI3 {
    public abstract class Problem {
        protected State _initial;
        protected List<State> _goals;

        public Problem(State initialState, List<State> goalStates) {
            _initial = initialState;
            _goals = goalStates;
        }

        public State InitialState {
            get { return _initial; }
        }

        public abstract List<Action> GetActions(State currentState);
        public abstract State GetResult(State state, Action action);
        public abstract int GetCost(State state, Action action);
        public virtual bool GoalTest(State state) {
            foreach (State goalState in _goals) {
                if (goalState.IsEqualTo(state)) {
                    return true;
                }
            }
            return false;
        }
    }
}