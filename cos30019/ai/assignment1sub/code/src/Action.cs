namespace Assignment1 {
    // The four directions the robot can follow.
    public enum Direction {
        Up,
        Left,
        Down,
        Right
    }

    // Represents the action that can be taken by the robot.
    public class Action {
        private Vector2D<int> _displacement;
        private int _cost;
        private string _description;

        public Action(Direction direction) {
            _cost = 1;

            switch (direction) {
                case Direction.Up:
                    _displacement = new Vector2D<int>(0, -1);
                    _description = "up";
                    break;
                case Direction.Left:
                    _displacement = new Vector2D<int>(-1, 0);
                    _description = "left";
                    break;
                case Direction.Down:
                    _displacement = new Vector2D<int>(0, 1);
                    _description = "down";
                    break;
                case Direction.Right:
                default:
                    _displacement = new Vector2D<int>(1, 0);
                    _description = "right";
                    break;
            }
        }

        public int Cost {
            get { return _cost; }
        }

        public string Description {
            get { return _description; }
        }

        public Vector2D<int> Displacement {
            get { return _displacement; }
        }
    }
}