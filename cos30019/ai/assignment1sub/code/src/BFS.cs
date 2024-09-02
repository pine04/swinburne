using System.Collections.Generic;

namespace Assignment1 {
    // The breadth-first search strategy.
    public class BFS : SearchStrategy {
        public override Result Search(Problem problem) {
            Node node = new Node(problem.InitialState);
            int nodeCreated = 1;

            if (problem.GoalTest(node.State)) return new Solution(node, nodeCreated);

            Queue<Node> frontier = new Queue<Node>();
            frontier.Enqueue(node);

            HashSet<State> exploredState = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Failure(nodeCreated);

                node = frontier.Dequeue();
                exploredState.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, action);
                    nodeCreated++;

                    if (!exploredState.Contains(childNode.State) && !IsStateInFrontier(frontier, childNode.State)) {
                        if (problem.GoalTest(childNode.State)) {
                            return new Solution(childNode, nodeCreated);
                        }
                        frontier.Enqueue(childNode);
                    }
                }
            }
        }
    }
}