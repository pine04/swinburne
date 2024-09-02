using System.Collections.Generic;

namespace Assignment1 {
    public class StateComparer : IEqualityComparer<State> {
        public bool Equals(State s1, State s2) {
            return s1.RobotPosition == s2.RobotPosition;
        }

        public int GetHashCode(State state) {
            return $"{state.RobotPosition.X}-{state.RobotPosition.Y}".GetHashCode();
        }
    }
}