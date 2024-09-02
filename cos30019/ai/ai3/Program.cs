using System;

namespace AI3 {
    public class Program {
        public static void Main(string[] args) {
            SearchStrategy strategy;
            Problem problem;
            Solution solution;

            if (args[0] == "bfs") {
                strategy = new BFS();
            } else if (args[0] == "dfs") {
                strategy = new DFS();
            } else {
                strategy = new BFS();
            }

            if (args[1] == "route") {
                string mapFile = args[2];
                State initialState = new RouteState(args[3]);
                State goalState = new RouteState(args[4]);

                problem = new RouteProblem(initialState, goalState, mapFile);
            } else if (args[1] == "jug") {
                int capacityA = Convert.ToInt32(args[2]);
                int capacityB = Convert.ToInt32(args[3]);
                int goal = Convert.ToInt32(args[4]);

                problem = new JugProblem(capacityA, capacityB, goal);
            } else {
                problem = new JugProblem(5, 3, 1);
            }

            solution = strategy.Search(problem);

            Console.WriteLine(solution.GetSolutionPerformance());
            Console.WriteLine(solution.TraceSolution());
        }
    }
}