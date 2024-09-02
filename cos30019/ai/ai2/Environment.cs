using System;
using System.IO;

namespace AI2 {
    public class Environment {
        private Tile[,] _tiles;

        public Environment(string layout) {
            int width = 0, height = 0;
            _tiles = new Tile[0, 0]; // To suppress the warning.

            try {
                using (StreamReader reader = new StreamReader(layout)) {
                    string? dimensions = reader.ReadLine();
                    if (dimensions != null) {
                        string[] splitDimensions = dimensions.Split("x");
                        width = Int32.Parse(splitDimensions[0].Trim());
                        height = Int32.Parse(splitDimensions[1].Trim());
                    }

                    _tiles = new Tile[width, height];

                    for (int i = 0; i < height; i++) {
                        string? row = reader.ReadLine();
                        if (row != null) {
                            string[] cells = row.Split(" ");
                            for (int j = 0; j < width; j++) {
                                _tiles[j, i] = new Tile(new Location(j, i), StringToState(cells[j]));
                            }
                        }
                    }
                }
            } catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        private TileState StringToState(string state) {
            switch (state.ToLower()) {
                case "clean":
                    return TileState.Clean;
                case "dirty":
                    return TileState.Dirty;
            }
            return TileState.Nil;
        }

        public int TakeAction(Agent agent, Action action) {
            switch (action) {
                case Action.Suck:
                    _tiles[agent.Location.X, agent.Location.Y].TileState = TileState.Clean;
                    break;
                case Action.Up:
                    if (IsWithinBound(agent.Location.X, agent.Location.Y - 1) && _tiles[agent.Location.X, agent.Location.Y - 1].TileState != TileState.Nil) {
                        agent.Location = new Location(agent.Location.X, agent.Location.Y - 1);
                    }
                    break;
                case Action.Down:
                    if (IsWithinBound(agent.Location.X, agent.Location.Y + 1) && _tiles[agent.Location.X, agent.Location.Y + 1].TileState != TileState.Nil) {
                        agent.Location = new Location(agent.Location.X, agent.Location.Y + 1);
                    }
                    break;
                case Action.Left:
                    if (IsWithinBound(agent.Location.X - 1, agent.Location.Y) && _tiles[agent.Location.X - 1, agent.Location.Y].TileState != TileState.Nil) {
                        agent.Location = new Location(agent.Location.X - 1, agent.Location.Y);
                    }
                    break;
                case Action.Right:
                    if (IsWithinBound(agent.Location.X + 1, agent.Location.Y) && _tiles[agent.Location.X + 1, agent.Location.Y].TileState != TileState.Nil) {
                        agent.Location = new Location(agent.Location.X + 1, agent.Location.Y);
                    }
                    break;
                case Action.NoOp:
                    break;
            }

            return CalculatePerformanceScore();
        }

        private int CalculatePerformanceScore() {
            int score = 0;

            foreach (Tile tile in _tiles) {
                if (tile.TileState == TileState.Clean) {
                    score++;
                }
            }

            return score;
        }

        public bool IsWithinBound(int x, int y) {
            return x >= 0 && x < _tiles.GetLength(0) && y >= 0 && y < _tiles.GetLength(1);
        }

        public TileState GetTileState(Location location) {
            return _tiles[location.X, location.Y].TileState;
        }

        public void DebugPrintMap() {
            for (int i = 0; i < _tiles.GetLength(1); i++) {
                for (int j = 0; j < _tiles.GetLength(0); j++) {
                    Console.Write(_tiles[j, i].TileState + " ");
                }
                Console.WriteLine();
            }
        }
    }
}