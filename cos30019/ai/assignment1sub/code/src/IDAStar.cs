using System;
using System.Collections.Generic;

namespace Assignment1
{
    // The iterative deepening A* search strategy.
    public class IDAStar : SearchStrategy
    {
        public override Result Search(Problem problem)
        {
            int cutoffLimit = 0;
            int nodeCreated = 0;

            while (cutoffLimit < Int32.MaxValue)
            {
                Result result = ALS(problem, ref cutoffLimit, ref nodeCreated);

                if (!(result is Cutoff)) return result;
            }

            return new Failure(0);
        }

        private Result ALS(Problem problem, ref int cutoffLimit, ref int nodeCreated)
        {
            Node node = new Node(problem.InitialState);
            nodeCreated += 1;
            int enqueuePosition = 0;            

            PriorityQueue<Node, (int, int)> frontier = new PriorityQueue<Node, (int, int)>(new PriorityComparer());
            frontier.Enqueue(node, (problem.GetHeuristicCost(node.State), enqueuePosition));
            enqueuePosition++;

            int minExceed = problem.GetHeuristicCost(node.State);

            while (true)
            {
                if (minExceed <= cutoffLimit && frontier.Count == 0) return new Failure(nodeCreated);
                if (minExceed > cutoffLimit && frontier.Count == 0) {
                    cutoffLimit = minExceed;
                    return new Cutoff(nodeCreated);
                }

                node = frontier.Dequeue();

                if (problem.GoalTest(node.State)) return new Solution(node, nodeCreated);

                List<Action> actions = problem.GetActions(node.State);

                foreach (Action action in actions) {
                    Node childNode = new Node(node, action);
                    nodeCreated++;

                    if (!IsStateInFrontier(frontier, childNode.State)) {
                        int fCost = childNode.PathCost + problem.GetHeuristicCost(childNode.State);

                        if (fCost > cutoffLimit) {
                            if (minExceed <= cutoffLimit) {
                                minExceed = fCost;
                            } else {
                                minExceed = Math.Min(minExceed, fCost);
                            }
                        }

                        if (fCost <= cutoffLimit) {
                            frontier.Enqueue(childNode, (fCost, enqueuePosition));
                            enqueuePosition++;
                        }
                    }
                }
            }
        }
    }
}