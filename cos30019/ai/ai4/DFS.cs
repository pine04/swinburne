using System.Collections.Generic;

namespace AI4 {
    public class DFS : SearchStrategy {
        public override Solution Search(Problem problem)
        {
            int searched = 0, discovered = 0;
            Node node = new Node(problem.InitialState);

            if (problem.GoalTest(node.State)) return new Solution(node, searched, discovered);

            Stack<Node> frontier = new Stack<Node>();
            frontier.Push(node);

            HashSet<State> explored = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Solution(null, searched, discovered);

                node = frontier.Pop();
                searched++;

                explored.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, problem, action);
                    discovered++;
                    if (!explored.Contains(childNode.State) && !IsStateInFrontier(frontier, childNode.State)) {
                        if (problem.GoalTest(childNode.State)) return new Solution(childNode, searched, discovered);
                        frontier.Push(childNode);
                    }
                }
            }
        }
    }
}