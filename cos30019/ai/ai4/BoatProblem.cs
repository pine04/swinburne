using System.Collections.Generic;

namespace AI4 {
    public class BoatProblem : Problem {
        private int _n;
        private List<BoatAction> _possibleActions;

        public BoatProblem(int n) : base(new BoatState(0, 0, 0)) {
            _n = n;
            _possibleActions = new List<BoatAction> {
                new BoatAction(0, 1, 0),
                new BoatAction(1, 0, 0),
                new BoatAction(1, 1, 0),
                new BoatAction(2, 0, 0),
                new BoatAction(0, 2, 0),
                new BoatAction(0, 1, 1),
                new BoatAction(1, 0, 1),
                new BoatAction(1, 1, 1),
                new BoatAction(2, 0, 1),
                new BoatAction(0, 2, 1)
            };
        }

        public override int GetCost(State state, Action action)
        {
            return 1;
        }

        public override int GetHeuristicCost(State state)
        {
            BoatState? boatState = state as BoatState;

            if (boatState == null) {
                return 0;
            }

            return 2 * _n - boatState.MissionaryRight - boatState.CannibalRight;
        }

        public override bool GoalTest(State state)
        {
            BoatState? boatState = state as BoatState;

            if (boatState == null) {
                return false;
            }

            return boatState.MissionaryRight == _n && boatState.CannibalRight == _n;
        }

        public override List<Action> GetActions(State state) {
            BoatState? boatState = state as BoatState;
            List<Action> actions = new List<Action>();
        
            if (boatState == null) {
                return actions;
            }

            foreach (BoatAction action in _possibleActions) {
                if (boatState.BoatLocation == action.CurrentBoatLocation) {
                    if (IsValidAction(boatState, action)) {
                        actions.Add(action);
                    }
                }
            }

            return actions;
        }

        private bool IsValidAction(BoatState boatState, BoatAction action) {
            int missionaryRight, cannibalRight;

            if (boatState.BoatLocation == 0) {
                missionaryRight = boatState.MissionaryRight + action.MissionaryMoved;
                cannibalRight = boatState.CannibalRight + action.CannibalMoved;
            } else {
                missionaryRight = boatState.MissionaryRight - action.MissionaryMoved;
                cannibalRight = boatState.CannibalRight - action.CannibalMoved;
            }

            return _n >= missionaryRight && (missionaryRight >= cannibalRight || missionaryRight == 0) && cannibalRight >= 0 &&
                   (_n - missionaryRight >= _n - cannibalRight || missionaryRight == _n);
        }

        public override State GetResult(State state, Action action)
        {
            BoatState? boatState = state as BoatState;
            BoatAction? boatAction = action as BoatAction;

            if (boatState == null || boatAction == null) {
                return state;
            }

            return boatState + boatAction;
        }
    }
}