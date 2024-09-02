using System.Collections.Generic;

namespace AI4 {
    public class StateComparer : IEqualityComparer<State> {
        public bool Equals(State? s1, State? s2) {
            if (ReferenceEquals(s1, s2)) return true;
            if (s1 is null || s2 is null) return false;

            return s1.IsEqualTo(s2);
        }

        public int GetHashCode(State state) {
            return state.GetHash();
        }
    }
}