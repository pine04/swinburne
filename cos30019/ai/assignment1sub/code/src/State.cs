namespace Assignment1 { 
    // Represents the state of the robot, which is its position.
    public struct State {
        private Vector2D<int> _robotPosition;

        public State(Vector2D<int> robotPosition) {
            _robotPosition = robotPosition;
        }

        public Vector2D<int> RobotPosition {
            get { return _robotPosition; }
        }

        public static State operator +(State state, Action action) {
            return new State(Vector.Add(state.RobotPosition, action.Displacement));
        }
    }
}