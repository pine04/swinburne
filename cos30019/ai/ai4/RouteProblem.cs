using System;
using System.IO;
using System.Collections.Generic;

namespace AI4 {
    public class RouteProblem : Problem {
        private string _goalCity;
        private List<RouteAction> _routes; // Each route corresponds to a possible action.
        private Dictionary<string, int> _straightLineHeuristics;

        public RouteProblem(string startCity, string goalCity, string mapFile) : base(new RouteState(startCity)) {
            _goalCity = goalCity;
            _routes = new List<RouteAction>();
            _straightLineHeuristics = new Dictionary<string, int>();

            try {
                using (StreamReader reader = new StreamReader(mapFile)) {
                    string? line = reader.ReadLine();

                    while (line != null) {
                        string[] routeComponents = line.Split(" ");
                        
                        _routes.Add(new RouteAction(routeComponents[0], routeComponents[1], Convert.ToInt32(routeComponents[2])));
                        if (!_straightLineHeuristics.ContainsKey(routeComponents[1])) {
                            _straightLineHeuristics.Add(routeComponents[1], Convert.ToInt32(routeComponents[3]));
                        }

                        line = reader.ReadLine();
                    }
                }
            } catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        public override List<Action> GetActions(State state) {
            RouteState? routeState = state as RouteState;
            List<Action> possibleActions = new List<Action>();

            if (routeState == null) {
                return possibleActions;
            }

            string city = routeState.CityName;
            foreach (RouteAction action in _routes) {
                if (city == action.From && action.Cost != -1) {
                    possibleActions.Add(action);
                }
            }
            return possibleActions;
        }

        public override State GetResult(State state, Action action) {
            RouteState? routeState = state as RouteState;
            RouteAction? routeAction = action as RouteAction;

            if (routeState != null && routeAction != null) {
                if (routeState.CityName == routeAction.From) {
                    return new RouteState(routeAction.To);
                }
            }

            return state;
        }

        public override int GetCost(State state, Action action) {
            RouteState? routeState = state as RouteState;
            RouteAction? routeAction = action as RouteAction;

            if (routeState != null && routeAction != null) {
                if (routeState.CityName == routeAction.From) {
                    return routeAction.Cost;
                }
            }

            return 0;
        }

        public override int GetHeuristicCost(State state)
        {
            RouteState? routeState = state as RouteState;

            if (routeState == null) {
                return 0;
            }

            return _straightLineHeuristics[routeState.CityName];
        }

        public override bool GoalTest(State state)
        {
            RouteState? routeState = state as RouteState;

            if (routeState == null) {
                return false;
            }

            return routeState.CityName == _goalCity;
        }
    }
}