using System.Collections.Generic;

namespace Assignment1 {
    // The greedy best-first search strategy.
    public class GBFS : SearchStrategy {
        public override Result Search(Problem problem)
        {
            Node node = new Node(problem.InitialState);
            int nodeCreated = 1;
            int enqueuePosition = 0;

            if (problem.GoalTest(node.State)) return new Solution(node, nodeCreated);

            PriorityQueue<Node, (int, int)> frontier = new PriorityQueue<Node, (int, int)>();
            frontier.Enqueue(node, (problem.GetHeuristicCost(node.State), enqueuePosition));
            enqueuePosition++;

            HashSet<State> explored = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Failure(nodeCreated);

                node = frontier.Dequeue();
                explored.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, action);
                    nodeCreated++;

                    if (!explored.Contains(childNode.State) && !IsStateInFrontier(frontier, childNode.State)) {
                        if (problem.GoalTest(childNode.State)) return new Solution(childNode, nodeCreated);
                        frontier.Enqueue(childNode, (problem.GetHeuristicCost(childNode.State), enqueuePosition));
                        enqueuePosition++;
                    }
                }
            }
        }
    }
}