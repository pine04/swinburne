using SplashKitSDK;
using System.Collections.Generic;

namespace DescendBelow {
    // Defines a Room, which can be thought of as a level containing enemies and other objects the player can interact with. 
    public class Room {
        private static Rectangle[] ENEMY_SPAWN_ZONES = new Rectangle[] {
            SplashKit.RectangleFrom(SplashKit.PointAt(216, 216), 96, 96),
            SplashKit.RectangleFrom(SplashKit.PointAt(408, 216), 96, 96),
            SplashKit.RectangleFrom(SplashKit.PointAt(288, 288), 144, 144),
            SplashKit.RectangleFrom(SplashKit.PointAt(216, 408), 96, 96),
            SplashKit.RectangleFrom(SplashKit.PointAt(408, 408), 96, 96)
        };

        private static Point2D[] CHEST_SPAWN_LOCATIONS = new Point2D[] {
            SplashKit.PointAt(168, 168), SplashKit.PointAt(216, 168), SplashKit.PointAt(264, 168), SplashKit.PointAt(168, 216), SplashKit.PointAt(168, 264),
            SplashKit.PointAt(456, 168), SplashKit.PointAt(504, 168), SplashKit.PointAt(552, 168), SplashKit.PointAt(552, 216), SplashKit.PointAt(552, 264),
            SplashKit.PointAt(168, 456), SplashKit.PointAt(168, 504), SplashKit.PointAt(168, 552), SplashKit.PointAt(216, 552), SplashKit.PointAt(264, 552),
            SplashKit.PointAt(456, 552), SplashKit.PointAt(504, 552), SplashKit.PointAt(552, 552), SplashKit.PointAt(552, 504), SplashKit.PointAt(552, 456)
        };

        private List<GameObject> _gameObjects;
        private bool _entered;

        // Prohibits the use of "new Room()" outside the class. To create a new room, the static methods CreateRoomZero, CreateRoom, or CreateEndRoom
        // must be used instead.
        private Room() { 
            _gameObjects = new List<GameObject>();
            _entered = false;
        }

        // Creates the starting room for the player.
        public static Room CreateRoomZero() {
            Room room = new Room();

            room._gameObjects.Add(new Wall(SplashKit.PointAt(360, 120), 432, 48, SplashKit.BitmapNamed("longHorizontalGrassWall")));
            room._gameObjects.Add(new Wall(SplashKit.PointAt(360, 600), 432, 48, SplashKit.BitmapNamed("longHorizontalGrassWall")));
            room._gameObjects.Add(new Wall(SplashKit.PointAt(600, 360), 48, 528, SplashKit.BitmapNamed("longVerticalGrassWall")));
            room._gameObjects.Add(new Wall(SplashKit.PointAt(120, 360), 48, 528, SplashKit.BitmapNamed("longVerticalGrassWall")));
            room._gameObjects.Add(new Staircase(SplashKit.PointAt(360, 360)));

            return room;
        }

        // Creates a normal room.
        public static Room CreateRoom(int floorLevel, bool hasNorthExit, bool hasEastExit, bool hasSouthExit, bool hasWestExit) {
            Room room = new Room();

            if (hasNorthExit) {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(240, 120), 192, 48, SplashKit.BitmapNamed("shortHorizontalGrassWall")));
                room._gameObjects.Add(new Wall(SplashKit.PointAt(480, 120), 192, 48, SplashKit.BitmapNamed("shortHorizontalGrassWall")));
            } else {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(360, 120), 432, 48, SplashKit.BitmapNamed("longHorizontalGrassWall")));
            }

            if (hasSouthExit) {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(240, 600), 192, 48, SplashKit.BitmapNamed("shortHorizontalGrassWall")));
                room._gameObjects.Add(new Wall(SplashKit.PointAt(480, 600), 192, 48, SplashKit.BitmapNamed("shortHorizontalGrassWall")));
            } else {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(360, 600), 432, 48, SplashKit.BitmapNamed("longHorizontalGrassWall")));
            }

            if (hasEastExit) {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(600, 216), 48, 240, SplashKit.BitmapNamed("shortVerticalGrassWall")));
                room._gameObjects.Add(new Wall(SplashKit.PointAt(600, 504), 48, 240, SplashKit.BitmapNamed("shortVerticalGrassWall")));
            } else {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(600, 360), 48, 528, SplashKit.BitmapNamed("longVerticalGrassWall")));
            }

            if (hasWestExit) {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(120, 216), 48, 240, SplashKit.BitmapNamed("shortVerticalGrassWall")));
                room._gameObjects.Add(new Wall(SplashKit.PointAt(120, 504), 48, 240, SplashKit.BitmapNamed("shortVerticalGrassWall")));
            } else {
                room._gameObjects.Add(new Wall(SplashKit.PointAt(120, 360), 48, 528, SplashKit.BitmapNamed("longVerticalGrassWall")));
            }

            int enemyCount = RandGen.RandomIntBetween(3, 6);
            for (int i = 0; i < enemyCount; i++) {
                if (RandGen.RandomDoubleBetween(0, 1) >= 0.5) {
                    room._gameObjects.Add(new Shrub(GetRandomEnemySpawnPosition(), floorLevel));
                } else {
                    room._gameObjects.Add(new Wizard(GetRandomEnemySpawnPosition(), floorLevel));
                }
            }

            if (RandGen.RandomDoubleBetween(0, 1) <= 0.2) {
                room._gameObjects.Add(new Chest(GetRandomChestSpawnPosition(), floorLevel));
            }

            return room;
        }

        // Creates a room with an staircase to descend into a new floor.
        public static Room CreateEndRoom(int floorLevel, bool hasNorthExit, bool hasEastExit, bool hasSouthExit, bool hasWestExit) {
            Room room = CreateRoom(floorLevel, hasNorthExit, hasEastExit, hasSouthExit, hasWestExit);
            room._gameObjects.Add(new Staircase(SplashKit.PointAt(360, 360)));
            return room;
        }

        private static Point2D GetRandomEnemySpawnPosition() {
            Rectangle zone = ENEMY_SPAWN_ZONES[RandGen.RandomIntBetween(0, 5)];
            double x = zone.X + zone.Width * RandGen.RandomDoubleBetween(0, 1);
            double y = zone.Y + zone.Height * RandGen.RandomDoubleBetween(0, 1);

            return SplashKit.PointAt(x, y);
        }

        private static Point2D GetRandomChestSpawnPosition() {
            return CHEST_SPAWN_LOCATIONS[RandGen.RandomIntBetween(0, 20)];
        }

        public bool Entered {
            get { return _entered; }
        }

        // Determines if the room is cleared of all enemies.
        public bool IsClear() {
            foreach (GameObject gameObject in _gameObjects) {
                if (gameObject is Enemy) {
                    return false;
                }
            }
            return true;
        }

        public List<GameObject> GameObjects {
            get { return _gameObjects; }
        }

        public void Enter() {
            _entered = true;

            foreach (GameObject gameObject in _gameObjects) {
                Enemy? enemy = gameObject as Enemy;

                if (enemy != null) {
                    enemy.Cooldown();
                }
            }
        }

        public void AddExit(Direction direction, Room destination) {
            if (direction == Direction.North) {
                _gameObjects.Add(new Exit(SplashKit.PointAt(360, 108), 48, 24, SplashKit.BitmapNamed("blockedExitHorizontal"), direction, this, destination));
            } else if (direction == Direction.South) {
                _gameObjects.Add(new Exit(SplashKit.PointAt(360, 612), 48, 24, SplashKit.BitmapNamed("blockedExitHorizontal"), direction, this, destination));
            } else if (direction == Direction.East) {
                _gameObjects.Add(new Exit(SplashKit.PointAt(612, 360), 24, 48, SplashKit.BitmapNamed("blockedExitVertical"), direction, this, destination));
            } else if (direction == Direction.West) {
                _gameObjects.Add(new Exit(SplashKit.PointAt(108, 360), 24, 48, SplashKit.BitmapNamed("blockedExitVertical"), direction, this, destination));
            }
        }
    }
}