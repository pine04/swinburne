namespace AI2 {
    public struct Percept {
        private Location _location;
        private TileState _tileState;

        public Percept(Location location, TileState tileState) {
            _location = location;
            _tileState = tileState;
        }

        public Location Location {
            get { return _location; }
        }

        public TileState TileState {
            get { return _tileState; }
        }
    }
}