using System.Collections.Generic;

namespace AI4 {
    public class GBFS : SearchStrategy {
        public override Solution Search(Problem problem)
        {
            int searched = 0, discovered = 0;
            Node node = new Node(problem.InitialState);

            if (problem.GoalTest(node.State)) return new Solution(node, searched, discovered);

            PriorityQueue<Node, int> frontier = new PriorityQueue<Node, int>();
            frontier.Enqueue(node, 0);

            HashSet<State> explored = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Solution(null, searched, discovered);

                node = frontier.Dequeue();
                searched++;
                explored.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, problem, action);
                    discovered++;

                    if (!explored.Contains(childNode.State) && !IsStateInFrontier(frontier, childNode.State)) {
                        if (problem.GoalTest(childNode.State)) return new Solution(childNode, searched, discovered);
                        frontier.Enqueue(childNode, problem.GetHeuristicCost(childNode.State));
                    }
                }
            }
        }

        private bool IsStateInFrontier(PriorityQueue<Node, int> frontier, State state) {
            IEnumerable<(Node, int)> frontierItems = frontier.UnorderedItems;

            foreach ((Node, int) node in frontierItems) {
                if (node.Item1.State.IsEqualTo(state)) {
                    return true;
                }
            }

            return false;
        }
    }
}