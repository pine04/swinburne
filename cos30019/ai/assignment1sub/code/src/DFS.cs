using System.Collections.Generic;

namespace Assignment1 {
    // The depth-first search strategy.
    public class DFS : SearchStrategy {
        public override Result Search(Problem problem)
        {
            Node node = new Node(problem.InitialState);
            int nodeCreated = 1;

            if (problem.GoalTest(node.State)) return new Solution(node, nodeCreated);

            Stack<Node> frontier = new Stack<Node>();
            frontier.Push(node);

            HashSet<State> explored = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Failure(nodeCreated);

                node = frontier.Pop();

                if (explored.Contains(node.State)) {
                    continue; // This handles the case when two or more nodes of the same state are added to the frontier. If one node has been explored, we can ignore the other nodes with the same state.
                }

                explored.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);
                actions.Reverse();

                foreach (Action action in actions) {
                    Node childNode = new Node(node, action);
                    nodeCreated++;
                    if (!explored.Contains(childNode.State)) {
                        if (problem.GoalTest(childNode.State)) return new Solution(childNode, nodeCreated);
                        frontier.Push(childNode);
                    }
                }
            }
        }
    }
}