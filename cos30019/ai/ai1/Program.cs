using System;
using System.IO;
using System.Collections.Generic;

namespace Parser {
    class Route {
        private string _from;
        private string _to;
        private int _actualDistance;
        private int _straightDistance;

        public Route(string routeInformation) {
            string[] information = routeInformation.Split(" ");

            _from = information[0];
            _to = information[1];
            _actualDistance = Convert.ToInt32(information[2]);
            _straightDistance = Convert.ToInt32(information[3]);
        }

        public void PrintRoute() {
            if (_actualDistance == -1) {
                Console.WriteLine("Cannot drive from " + _from + " to " + _to + ", however there is a straight line distance of " + _straightDistance + ".");
            } else {
                Console.WriteLine("Travel from city " + _from + " to city " + _to + " with a straight line distance of " + _straightDistance + " and an actual distance of " + _actualDistance + ".");
            }
        }
    }

    class Program {
        public static void Main(string[] args) {
            List<Route> routes = new List<Route>();

            try {
                StreamReader reader = new StreamReader("C:\\Users\\gnut\\Downloads\\Week 3 Programming Solution_Java (1)\\Week 3 Programming Solution_Java\\README.TXT");

                string? line = reader.ReadLine();
                while (line != null) {
                    routes.Add(new Route(line));
                    line = reader.ReadLine();
                }

                foreach (Route route in routes) {
                    route.PrintRoute();
                }
            } catch {
                Console.WriteLine("An error occurred.");
            }
        }
    }
}