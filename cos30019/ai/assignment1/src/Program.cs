using System;
using System.Collections.Generic;
using System.Linq;

namespace Assignment1 {
    public class Program {
        // The search methods supported.
        private static string[] SupportedSearches = {
            "bfs",
            "dfs",
            "gbfs",
            "as",
            "ids",
            "idas"
        };

        public static void Main(string[] args) {
            try {
                // Parses the command-line arguments.
                Dictionary<string, string> arguments = ParseArguments(args);

                // Creates the map and the problem.
                Map map;
            
                if (arguments["map"] == "rangen") {
                    int width = Convert.ToInt32(arguments["width"]);
                    int height = Convert.ToInt32(arguments["height"]);
                    map = new Map(width, height, 2, 0.3f);
                } else {
                    map = new Map(arguments["map"]);
                }

                Problem problem = new Problem(map);

                // Initializes the search strategy.
                SearchStrategy strategy;

                switch (arguments["method"]) {
                    case "bfs":
                        strategy = new BFS();
                        break;
                    case "dfs":
                        strategy = new DFS();
                        break;
                    case "gbfs": 
                        strategy = new GBFS();
                        break;
                    case "ids":
                        strategy = new IDS();
                        break;
                    case "idas":
                        strategy = new IDAStar();
                        break;
                    default:
                    case "as":
                        strategy = new AStar();
                        break;
                }

                // Solves the problem.
                Result result = strategy.Search(problem);

                Console.WriteLine($"{arguments["map"]} {arguments["method"]} {result.NodeCreated}");
                Console.WriteLine(result.Description);
                Console.WriteLine();

                // Draws the solution to the screen if there is one.
                Solution? solution = result as Solution;
                if (solution != null) map.PrintMap(solution);
            } catch (InputException e) {
                // Catches errors related to command-line arguments.
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(e.Message);
                Console.ForegroundColor = ConsoleColor.White;

                Console.WriteLine("Usage:");
                Console.WriteLine("\tsearch <file_name> <search_method>");
                Console.WriteLine("\tsearch rangen <search_method> <map_width> <map_height>");
            } catch (Exception e) {
                // Catches other errors.
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(e.Message);
                Console.ForegroundColor = ConsoleColor.White;
            }
        }

        static Dictionary<string, string> ParseArguments(string[] args) {
            Dictionary<string, string> parsedArguments = new Dictionary<string, string>();

            if (args.Length < 2) {
                throw new InputException("Invalid number of arguments.");
            }

            parsedArguments["map"] = args[0];
            parsedArguments["method"] = args[1];

            if (parsedArguments["map"] == "rangen") {
                if (args.Length < 4) {
                    throw new InputException("The width and height of the random map must be specified.");
                }                

                int tryWidth, tryHeight;
                if (Int32.TryParse(args[2], out tryWidth) && tryWidth >= 5 && Int32.TryParse(args[3], out tryHeight) && tryHeight >= 5) {
                    parsedArguments["width"] = args[2];
                    parsedArguments["height"] = args[3];
                } else {
                    throw new InputException("The width and height of the random map must be integers greater than or equal to 5.");
                }
            }

            if (!SupportedSearches.Contains(parsedArguments["method"])) {
                throw new InputException(parsedArguments["method"] + " is an invalid search method. The search method must be one of bfs, dfs, gbfs, as, ids, idas.");
            }

            return parsedArguments;
        } 
    }

    public class InputException : Exception {
        public InputException(string message) : base(message) { }
    }
}