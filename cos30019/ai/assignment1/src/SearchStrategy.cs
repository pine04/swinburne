using System.Collections.Generic;

namespace Assignment1 {
    // Represents an abstract search strategy. Must be overriden and implemented.
    public abstract class SearchStrategy {
        public abstract Result Search(Problem problem);

        protected bool IsStateInFrontier(IEnumerable<Node> frontier, State state) {
            foreach (Node node in frontier) {
                if (node.State.RobotPosition == state.RobotPosition) {
                    return true;
                }
            }

            return false;
        }

        protected bool IsStateInFrontier<T>(PriorityQueue<Node, T> frontier, State state) {
            IEnumerable<(Node, T)> frontierItems = frontier.UnorderedItems;

            foreach ((Node, T) node in frontierItems) {
                if (node.Item1.State.RobotPosition == state.RobotPosition) {
                    return true;
                }
            }

            return false;
        }
    }
}