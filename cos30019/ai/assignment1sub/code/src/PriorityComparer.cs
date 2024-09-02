using System.Collections.Generic;

namespace Assignment1 {
    public class PriorityComparer : IComparer<(int, int)> {
        public int Compare((int, int) priorityA, (int, int) priorityB) {
            if (priorityA.Item1 > priorityB.Item1) {
                return 1;
            } else if (priorityA.Item1 < priorityB.Item1) {
                return -1;
            } else if (priorityA.Item2 > priorityB.Item2) {
                return 1;
            } else if (priorityA.Item2 < priorityB.Item2) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}