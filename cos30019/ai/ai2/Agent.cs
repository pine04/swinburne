using System;
using System.Collections.Generic;

namespace AI2 {
    public class Agent {
        private Location _location;
        private List<Percept> _perceptSequence;

        public Agent(Location initialLocation) {
            _location = initialLocation;
            _perceptSequence = new List<Percept>();
        }

        public int Live(int lifespan, Environment environment) {
            int cummulativePerformance = 0;

            for (int i = 0; i < lifespan; i++) {
                Perceive(environment);
                Action nextAction = Next();
                Console.WriteLine(nextAction + " " + _location.X + " " + _location.Y);
                int performance = environment.TakeAction(this, nextAction);
                cummulativePerformance += performance;
            }

            return cummulativePerformance;
        }

        private Action Next() {
            if (_perceptSequence[_perceptSequence.Count - 1].TileState == TileState.Dirty) {
                return Action.Suck;
            }

            int random = new Random().Next(0, 4);
            switch (random) {
                case 0:
                    return Action.Up;
                case 1:
                    return Action.Down;
                case 2:
                    return Action.Left;
                case 3:
                    return Action.Right;
            }

            return Action.NoOp;
        }

        public void Perceive(Environment environment) {
            _perceptSequence.Add(new Percept(_location, environment.GetTileState(_location)));
        }

        public Location Location {
            get { return _location; }
            set { _location = value; }
        }
    }
}