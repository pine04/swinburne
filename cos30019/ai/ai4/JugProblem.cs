using System;
using System.Collections.Generic;

namespace AI4 {
    public class JugProblem : Problem {
        private int _capacityA, _capacityB, _goalAmount;

        public JugProblem(int capacityA, int capacityB, int goalAmount) : base(new JugState(0, 0)) {
            _capacityA = capacityA;
            _capacityB = capacityB;
            _goalAmount = goalAmount;
        }

        public override List<Action> GetActions(State state) {
            JugState? jugState = state as JugState;
            List<Action> potentialActions = new List<Action>();

            if (jugState == null) {
                return potentialActions;
            }           

            if (jugState.AmountA > 0) potentialActions.Add(new JugAction(JugActionType.EmptyA));
            if (jugState.AmountB > 0) potentialActions.Add(new JugAction(JugActionType.EmptyB));
            if (jugState.AmountA < _capacityA) potentialActions.Add(new JugAction(JugActionType.FillA));
            if (jugState.AmountB < _capacityB) potentialActions.Add(new JugAction(JugActionType.FillB));
            if (jugState.AmountA > 0 && jugState.AmountB < _capacityB) potentialActions.Add(new JugAction(JugActionType.BToA));
            if (jugState.AmountA < _capacityA && jugState.AmountB > 0) potentialActions.Add(new JugAction(JugActionType.BToA));

            return potentialActions;
        }

        public override State GetResult(State state, Action action)
        {
            JugState? jugState = state as JugState;
            JugAction? jugAction = action as JugAction;

            if (jugState == null || jugAction == null) {
                return state;
            }

            int amountMoved;

            switch (jugAction.Action) {
                case JugActionType.EmptyA:
                    return new JugState(0, jugState.AmountB);
                case JugActionType.EmptyB:
                    return new JugState(jugState.AmountA, 0);
                case JugActionType.FillA:
                    return new JugState(_capacityA, jugState.AmountB);
                case JugActionType.FillB:
                    return new JugState(jugState.AmountA, _capacityB);
                case JugActionType.AToB:
                    amountMoved = Math.Min(jugState.AmountA, _capacityB - jugState.AmountB);
                    return new JugState(jugState.AmountA - amountMoved, jugState.AmountB + amountMoved);
                case JugActionType.BToA:
                    amountMoved = Math.Min(jugState.AmountB, _capacityA - jugState.AmountA);
                    return new JugState(jugState.AmountA + amountMoved, jugState.AmountB - amountMoved);
                default:
                    return state;
            }
        }

        public override int GetCost(State state, Action action)
        {
            return action.Cost;
        }

        public override int GetHeuristicCost(State state)
        {
            return 0;
        }

        public override bool GoalTest(State state)
        {
            JugState? jugState = state as JugState;

            if (jugState == null) {
                return false;
            }

            return jugState.AmountA == _goalAmount || jugState.AmountB == _goalAmount;
        }
    }
}