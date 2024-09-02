namespace AI4 {
    public class BoatAction : Action {
        private int _missionaryMoved, _cannibalMoved, _currentBoatLocation;

        public BoatAction(int missionaryMoved, int cannibalMoved, int currentBoatLocation) : base (1, GetDescription(missionaryMoved, cannibalMoved, currentBoatLocation)) {
            _missionaryMoved = missionaryMoved;
            _cannibalMoved = cannibalMoved;
            _currentBoatLocation = currentBoatLocation;
        }

        private static string GetDescription(int missionaryMoved, int cannibalMoved, int currentBoatLocation) {
            if (currentBoatLocation == 0) {
                return $"Move {missionaryMoved} missionaries and {cannibalMoved} cannibals to the right bank.";
            } else {
                return $"Move {missionaryMoved} missionaries and {cannibalMoved} cannibals to the left bank.";
            }
        }

        public int MissionaryMoved {
            get { return _missionaryMoved; }
        }

        public int CannibalMoved {
            get { return _cannibalMoved; }
        }

        public int CurrentBoatLocation {
            get { return _currentBoatLocation; }
        }
    }
}