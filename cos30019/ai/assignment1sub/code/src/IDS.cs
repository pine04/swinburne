using System;
using System.Collections.Generic;

namespace Assignment1 {
    public class NodeComparer : IEqualityComparer<Node> {
        public bool Equals(Node? n1, Node? n2) {
            if (ReferenceEquals(n1, n2)) return true;
            if (n1 is null || n2 is null) return false;

            return n1.State.RobotPosition == n2.State.RobotPosition && n1.Depth == n2.Depth;
        }

        public int GetHashCode(Node node) {
            return $"{node.State.RobotPosition.X}-{node.State.RobotPosition.Y}-{node.Depth}".GetHashCode();
        }
    }
    // The iterative deepening search strategy.
    
    public class IDS : SearchStrategy {
        public override Result Search(Problem problem)
        {
            uint limit = 0;
            int nodeCreated = 0;

            while (limit < uint.MaxValue) {

                Result result = DLS(problem, limit, ref nodeCreated);

                if (!(result is Cutoff)) {
                    return result;
                }

                limit++;
            }

            return new Failure(0);
        }

        private Result DLS(Problem problem, uint limit, ref int nodeCreated) {
            Node node = new Node(problem.InitialState);
            nodeCreated += 1;

            if (problem.GoalTest(node.State)) return new Solution(node, nodeCreated);

            Stack<Node> frontier = new Stack<Node>();
            frontier.Push(node);

            HashSet<Node> explored = new HashSet<Node>(new NodeComparer());

            uint deepestNode = 0;

            while (true) {
                if (frontier.Count == 0 && deepestNode > limit) {
                    return new Cutoff(nodeCreated);
                } else if (frontier.Count == 0 && deepestNode <= limit) {
                    return new Failure(nodeCreated);
                }

                node = frontier.Pop();
                deepestNode = Math.Max(deepestNode, node.Depth);

                if (explored.Contains(node)) {
                    continue; // This handles the case when two or more nodes of the same state are added to the frontier. If one node has been explored, we can ignore the other nodes with the same state.
                }

                explored.Add(node);                

                if (node.Depth <= limit) {
                    List<Action> actions = problem.GetActions(node.State);
                    actions.Reverse();

                    foreach (Action action in actions) {
                        Node childNode = new Node(node, action);
                        nodeCreated++;

                        if (!explored.Contains(childNode)) {
                            if (problem.GoalTest(childNode.State)) return new Solution(childNode, nodeCreated);
                            frontier.Push(childNode);
                        }
                    }
                }
            }
        }
    }
}