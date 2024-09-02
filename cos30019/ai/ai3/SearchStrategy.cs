using System.Collections.Generic;

namespace AI3 {
    public abstract class SearchStrategy {
        public abstract Solution Search(Problem problem);

        protected virtual bool IsStateInFrontier(IEnumerable<Node> frontier, State state) {
            foreach (Node node in frontier) {
                if (node.State.IsEqualTo(state)) {
                    return true;
                }
            }

            return false;
        }
    }
}