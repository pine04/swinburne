using System;
using System.Collections.Generic;

namespace Assignment1
{
    // Represents a Solution result returned when the search algorithm finds a path.
    public class Solution : Result
    {
        private Node _lastNode;

        public Solution(Node lastNode, int nodeCreated) : base(nodeCreated)
        {
            _lastNode = lastNode;
        }

        public override string Description
        {
            get
            {
                List<string> steps = new List<string>();

                Node? current = _lastNode;
                while (current != null)
                {
                    if (current.Action != null)
                    {
                        steps.Add(current.Action.Description);
                    }
                    current = current.Parent;
                }

                if (steps.Count == 0)
                {
                    return "Already at the solution.";
                }
                else
                {
                    steps.Reverse();
                    return String.Join("; ", steps);
                }
            }
        }

        public Node LastNode {
            get { return _lastNode; }
        }
    }
}