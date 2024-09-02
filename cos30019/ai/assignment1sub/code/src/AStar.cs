using System.Collections.Generic;

namespace Assignment1 {
    // The A* search strategy.
    public class AStar : SearchStrategy {
        public override Result Search(Problem problem)
        {
            int nodeCreated = 1;
            int enqueuePosition = 0;

            Node node = new Node(problem.InitialState);

            PriorityQueue<Node, (int, int)> frontier = new PriorityQueue<Node, (int, int)>(new PriorityComparer());
            frontier.Enqueue(node, (problem.GetHeuristicCost(node.State), enqueuePosition));
            enqueuePosition++;

            HashSet<State> explored = new HashSet<State>(new StateComparer());

            while (true) {
                if (frontier.Count == 0) return new Failure(nodeCreated);
                
                node = frontier.Dequeue();

                if (problem.GoalTest(node.State)) return new Solution(node, nodeCreated);

                explored.Add(node.State);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, action);
                    nodeCreated++;

                    if (!explored.Contains(childNode.State) && !IsStateInFrontier(frontier, childNode.State)) {
                        frontier.Enqueue(childNode, (childNode.PathCost + problem.GetHeuristicCost(childNode.State), enqueuePosition));
                        enqueuePosition++;
                    }
                }
            }
        }
    }
}