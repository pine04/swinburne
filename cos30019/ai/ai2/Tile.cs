namespace AI2 {
    public class Tile {
        private Location _location;
        private TileState _tileState;

        public Tile(Location location, TileState state) {
            _location = location;
            _tileState = state;
        }

        public Location Location {
            get { return _location; }
        }

        public TileState TileState {
            get { return _tileState; }
            set { _tileState = value; }
        }
    }
}