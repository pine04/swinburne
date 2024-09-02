using System;
using System.Collections.Generic;

namespace Assignment1 {
    // Represents the robot navigation problem.
    public class Problem {        
        private static readonly List<Action> Actions = new List<Action>() {
            new Action(Direction.Up),
            new Action(Direction.Left),
            new Action(Direction.Down),
            new Action(Direction.Right)
        };
        private Map _map;
        private State _initialState;

        public Problem(Map map) {
            _map = map;
            _initialState = new State(_map.Start);
        }

        public List<Action> GetActions(State state)
        {
            List<Action> actions = new List<Action>();

            foreach (Action action in Actions) {
                State result = state + action;
                if (IsValidState(result)) {
                    actions.Add(action);
                }
            }

            return actions;
        }

        private bool IsValidState(State state) {
            return !_map.IsWall(state.RobotPosition) && !_map.IsOutsideMap(state.RobotPosition);
        }

        public int GetHeuristicCost(State state)
        {
            int cost, minCost = Int32.MaxValue;

            foreach (Vector2D<int> goal in _map.Goals) {
                cost = Math.Abs(state.RobotPosition.X - goal.X) + Math.Abs(state.RobotPosition.Y - goal.Y);
                
                if (cost < minCost) {
                    minCost = cost;
                }
            }

            return minCost;
        }

        public bool GoalTest(State state)
        {
            return _map.IsGoal(state.RobotPosition);
        }

        public State InitialState {
            get { return _initialState; }
        }
    }
}