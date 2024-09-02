using System;
using System.Collections.Generic;

namespace AI4 {
    public class Solution {
        private Node? _lastNode;
        private int _searched, _discovered;

        public Solution(Node? lastNode, int searched, int discovered) {
            _lastNode = lastNode;
            _searched = searched;
            _discovered = discovered;
        }

        public string GetSolutionPerformance() {
            return "Searched: " + _searched + ", discovered: " + _discovered;
        }

        public string TraceSolution() {
            List<string> steps = new List<string>();

            Node? current = _lastNode;

            while (current != null) {
                if (current.Action != null) {
                    steps.Add(current.Action.ActionDescription);
                }
                current = current.Parent;
            }

            if (steps.Count == 0) {
                if (_lastNode != null) {
                    return "Already at the solution.";
                }
                return "No solution found.";
            } else {
                steps.Reverse();
                return String.Join("\n", steps);
            }            
        }
    }
}