using System;

namespace AI4 {
    public class Program {
        public static void Main(string[] args) {
            SearchStrategy strategy;
            Problem problem;
            Solution solution;

            if (args[0] == "bfs") {
                strategy = new BFS();
            } else if (args[0] == "dfs") {
                strategy = new DFS();
            } else if (args[0] == "gbfs") {
                strategy = new GBFS();
            } else if (args[0] == "as") {
                strategy = new AStar();
            } else {
                strategy = new BFS();
            }

            if (args[1] == "route") {
                string mapFile = args[2];
                string startCity = args[3];
                string endCity = args[4];

                problem = new RouteProblem(startCity, endCity, mapFile);
            } else if (args[1] == "jug") {
                int capacityA = Convert.ToInt32(args[2]);
                int capacityB = Convert.ToInt32(args[3]);
                int goal = Convert.ToInt32(args[4]);

                problem = new JugProblem(capacityA, capacityB, goal);
            } else if (args[1] == "boat") {
                int n = Convert.ToInt32(args[2]);

                problem = new BoatProblem(n);
            } else {
                problem = new JugProblem(5, 3, 1);
            }

            solution = strategy.Search(problem);

            Console.WriteLine(solution.GetSolutionPerformance());
            Console.WriteLine(solution.TraceSolution());
        }
    }
}