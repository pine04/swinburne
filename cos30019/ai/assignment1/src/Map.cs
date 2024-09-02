using System;
using System.Collections.Generic;
using System.IO;

namespace Assignment1 {
    // Represents a map, which is the environment of the search problem.
    public class Map {
        private int _width, _height;
        private Vector2D<int> _start;
        private List<Vector2D<int>> _goals;
        private bool[,] _walls;

        public Map(string fileName) {
            using (StreamReader reader = new StreamReader("input/" + fileName)) {
                string? line = reader.ReadLine();
                if (line != null) {
                    string[] mapDimensions = line.Substring(1, line.Length - 2).Split(",");
                    _height = Convert.ToInt32(mapDimensions[0]);
                    _width = Convert.ToInt32(mapDimensions[1]);
                }                

                line = reader.ReadLine();
                if (line != null) {
                    string[] startPosition = line.Substring(1, line.Length - 2).Split(",");
                    _start = new Vector2D<int>(Convert.ToInt32(startPosition[0]), Convert.ToInt32(startPosition[1]));
                }                

                line = reader.ReadLine();
                _goals = new List<Vector2D<int>>();
                if (line != null) {
                    string[] goalPositions = line.Split("|");

                    foreach (string goal in goalPositions) {
                        string goalTrimmed = goal.Trim();
                        string[] goalCoordinates = goalTrimmed.Substring(1, goalTrimmed.Length - 2).Split(",");
                        _goals.Add(new Vector2D<int>(Convert.ToInt32(goalCoordinates[0]), Convert.ToInt32(goalCoordinates[1])));
                    }
                }

                _walls = new bool[_height, _width];
                while ((line = reader.ReadLine()) != null) {
                    string[] wall = line.Substring(1, line.Length - 2).Split(",");

                    int wallX = Convert.ToInt32(wall[0]);
                    int wallY = Convert.ToInt32(wall[1]);
                    int wallW = Convert.ToInt32(wall[2]);
                    int wallH = Convert.ToInt32(wall[3]);

                    for (int x = 0; x < wallW; x++) {
                        for (int y = 0; y < wallH; y++) {
                            _walls[y + wallY, x + wallX] = true;
                        }
                    }
                }
            }
        }

        public Map(int width, int height, int numberOfGoals = 2, float frequency = 0.5f) {
            _width = width;
            _height = height;
            _walls = new bool[height, width];

            Random random = new Random();
            int randomSeed = random.Next(256);

            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    float value = PerlinNoise.Perlin(x * frequency + randomSeed, y * frequency + randomSeed);
                    _walls[y, x] = PerlinNoise.Step(value, 0.25f);
                }
            }

            List<List<Vector2D<int>>> islands = FindIslands(_walls);
            List<Vector2D<int>> largestIsland = FindLargestIsland(islands);

            _start = largestIsland[random.Next(largestIsland.Count)];
            _goals = new List<Vector2D<int>>();

            for (int i = 0; i < numberOfGoals; i++) {
                Vector2D<int> goal = largestIsland[random.Next(largestIsland.Count)];

                bool alreadyChosen = goal == _start;

                foreach (Vector2D<int> chosenGoal in _goals) {
                    alreadyChosen = alreadyChosen || (goal == chosenGoal);
                }

                if (!alreadyChosen) {
                    _goals.Add(goal);
                }
            }

            ExportMapToFile("input/" + DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss") + ".txt");
        }

        private List<List<Vector2D<int>>> FindIslands(bool[,] map) {
            int width = map.GetLength(1), height = map.GetLength(0);
            bool[,] visited = new bool[height, width];

            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    visited[y, x] = map[y, x];
                }
            }            

            List<List<Vector2D<int>>> islands = new List<List<Vector2D<int>>>();

            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    if (visited[y, x]) {
                        continue;
                    }

                    Vector2D<int> currentCell = new Vector2D<int>(x, y);
                    Vector2D<int> neighborCell;

                    List<Vector2D<int>> island = new List<Vector2D<int>>() { currentCell };

                    Queue<Vector2D<int>> frontier = new Queue<Vector2D<int>>();
                    frontier.Enqueue(currentCell);

                    visited[y, x] = true;

                    while (frontier.Count != 0) {
                        currentCell = frontier.Dequeue();

                        int cellX = currentCell.X;
                        int cellY = currentCell.Y;

                        if (cellX > 0 && !visited[cellY, cellX - 1]) {
                            neighborCell = new Vector2D<int>(cellX - 1, cellY);
                            island.Add(neighborCell);
                            frontier.Enqueue(neighborCell);
                            visited[cellY, cellX - 1] = true;
                        }

                        if (cellX < width - 1 && !visited[cellY, cellX + 1]) {
                            neighborCell = new Vector2D<int>(cellX + 1, cellY);
                            island.Add(neighborCell);
                            frontier.Enqueue(neighborCell);
                            visited[cellY, cellX + 1] = true;
                        }

                        if (cellY > 0 && !visited[cellY - 1, cellX]) {
                            neighborCell = new Vector2D<int>(cellX, cellY - 1);
                            island.Add(neighborCell);
                            frontier.Enqueue(neighborCell);
                            visited[cellY - 1, cellX] = true;
                        }

                        if (cellY < height - 1 && !visited[cellY + 1, cellX]) {
                            neighborCell = new Vector2D<int>(cellX, cellY + 1);
                            island.Add(neighborCell);
                            frontier.Enqueue(neighborCell);
                            visited[cellY + 1, cellX] = true;
                        }
                    }

                    islands.Add(island);
                }
            }

            return islands;
        }

        private List<Vector2D<int>> FindLargestIsland(List<List<Vector2D<int>>> islands) {
            if (islands.Count == 0) {
                return new List<Vector2D<int>>();
            }

            List<Vector2D<int>> largestIsland = islands[0];

            foreach (List<Vector2D<int>> island in islands) {
                if (island.Count > largestIsland.Count) {
                    largestIsland = island;
                }
            }

            return largestIsland;
        }

        public void ExportMapToFile(string fileName) {
            using (StreamWriter writer = new StreamWriter(fileName)) {
                writer.WriteLine($"[{_height},{_width}]");
                writer.WriteLine($"({_start.X},{_start.Y})");
                
                List<string> goalList = new List<string>();
                foreach (Vector2D<int> goal in _goals) {
                    goalList.Add($"({goal.X},{goal.Y})");
                }
                writer.WriteLine(String.Join(" | ", goalList));

                for (int y = 0; y < _walls.GetLength(0); y++) {
                    int wallStart = -1, wallLength = 0;
                    
                    for (int x = 0; x < _walls.GetLength(1); x++) {
                        if (_walls[y, x]) {
                            if (wallStart == -1) wallStart = x;
                            wallLength++;
                        } else {
                            if (wallStart != -1) {
                                writer.WriteLine($"({wallStart},{y},{wallLength},1)");
                                wallStart = -1;
                                wallLength = 0;
                            }
                        }
                    }
                }
            }
        }

        public void PrintMap(Solution solution) {
            char[,] map = new char[_height, _width];

            for (int x = 0; x < _width; x++) {
                for (int y = 0; y < _height; y++) {
                    map[y, x] = '■';
                }
            }

            Node? node = solution.LastNode;
            do {
                if (node.Action == null) continue;
                if (IsGoal(node.State.RobotPosition) || node.State.RobotPosition == _start) continue;

                char pathChar;
                switch (node.Action.Description) {
                    case "up":
                        pathChar = '↑';
                        break;
                    case "down":
                        pathChar = '↓';
                        break;
                    case "left":
                        pathChar = '←';
                        break;
                    case "right":
                    default:
                        pathChar = '→';
                        break;
                }
                
                Vector2D<int> position = node.State.RobotPosition;
                map[position.Y, position.X] = pathChar;
            } while ((node = node.Parent) != null);

            Console.OutputEncoding = System.Text.Encoding.UTF8;

            for (int y = 0; y < _height; y++) {
                for (int x = 0; x < _width; x++) {
                    if (map[y, x] == '■') {
                        Console.ForegroundColor = ConsoleColor.DarkGray;

                        if (_walls[y, x]) {
                            Console.ForegroundColor = ConsoleColor.Blue;
                        }

                        if (IsGoal(new Vector2D<int>(x, y))) {
                            Console.ForegroundColor = ConsoleColor.Green;
                        }

                        if (_start == new Vector2D<int>(x, y)) {
                            Console.ForegroundColor = ConsoleColor.Red;
                        }
                    }

                    if (map[y, x] == '↑' || map[y, x] == '↓' || map[y, x] == '←' || map[y, x] == '→') {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                    }

                    Console.Write(map[y, x] + " ");
                    Console.ForegroundColor = ConsoleColor.White;
                }
                Console.WriteLine();
            }
        }

        public bool IsWall(Vector2D<int> position) {
            if (position.X < 0 || position.X >= _width || position.Y < 0 || position.Y >= _height) {
                return false;
            }

            return _walls[position.Y, position.X];
        }

        public bool IsGoal(Vector2D<int> position) {
            foreach (Vector2D<int> goal in _goals) {
                if (position == goal) {
                    return true;
                }
            }
            
            return false;
        }

        public bool IsOutsideMap(Vector2D<int> position) {
            return position.X < 0 || position.X >= _width || position.Y < 0 || position.Y >= _height;
        }

        public Vector2D<int> Start {
            get { return _start; }
        }

        public List<Vector2D<int>> Goals {
            get { return _goals; }
        }
    }
}
