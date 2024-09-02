using System;

namespace AI2 {
    public class Program {
        public static void Main(string[] args) {
            if (args.Length != 3) {
                Console.WriteLine("Please specify the floor map file, agent's start location, and agent's lifespan.");
                return;
            }
            Environment environment = new Environment(args[0]);
            environment.DebugPrintMap();

            
            int x, y;
            string[] splitCoordinates = args[1].Substring(1, args[1].Length - 2).Split(",");
            x = Int32.Parse(splitCoordinates[0].Trim());
            y = Int32.Parse(splitCoordinates[1].Trim());

            Console.WriteLine(x + " " + y);

            if (!environment.IsWithinBound(x, y)) {
                Console.WriteLine("Please specify a start position within the map bounds.");
                return;
            }

            Agent agent = new Agent(new Location(x, y));

            int lifespan = Int32.Parse(args[2]);
            
            int performanceScore = agent.Live(lifespan, environment);
            Console.WriteLine("The agent's performance score is " + performanceScore);

            environment.DebugPrintMap();
        }
    }
}