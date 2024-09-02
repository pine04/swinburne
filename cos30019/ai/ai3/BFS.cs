using System.Collections.Generic;

namespace AI3 {
    public class BFS : SearchStrategy {
        public override Solution Search(Problem problem) {
            int searched = 0, discovered = 0;

            Node node = new Node(problem.InitialState); // The starting node.

            if (problem.GoalTest(node.State)) return new Solution(node, searched, discovered);

            Queue<Node> frontier = new Queue<Node>();
            frontier.Enqueue(node);

            HashSet<State> exploredState = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Solution(null, searched, discovered);

                node = frontier.Dequeue();

                searched++;

                exploredState.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, problem, action);

                    discovered++;

                    if (!exploredState.Contains(childNode.State) && !IsStateInFrontier(frontier, childNode.State)) {
                        if (problem.GoalTest(childNode.State)) return new Solution(childNode, searched, discovered);
                        frontier.Enqueue(childNode);
                    }
                }
            }
        }
    }
}