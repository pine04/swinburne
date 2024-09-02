namespace AI4 {
    public class BoatState : State {
        private int _missionaryRight, _cannibalRight, _boatLocation;

        public BoatState(int missionaryRight, int cannibalRight, int boatLocation) {
            _missionaryRight = missionaryRight;
            _cannibalRight = cannibalRight;
            _boatLocation = boatLocation;
        }

        public static BoatState operator +(BoatState boatState, BoatAction action) {
            if (boatState.BoatLocation == 0) {
                return new BoatState(boatState.MissionaryRight + action.MissionaryMoved, boatState.CannibalRight + action.CannibalMoved, 1);
            } else {
                return new BoatState(boatState.MissionaryRight - action.MissionaryMoved, boatState.CannibalRight - action.CannibalMoved, 0);
            }
        }

        public override bool IsEqualTo(State target)
        {
            BoatState? boatState = target as BoatState;

            if (boatState == null) {
                return false;
            }

            return MissionaryRight == boatState.MissionaryRight && CannibalRight == boatState.CannibalRight && BoatLocation == boatState.BoatLocation;
        }

        public override int GetHash()
        {
            return $"{MissionaryRight}-{CannibalRight}-{BoatLocation}".GetHashCode();
        }

        public int MissionaryRight {
            get { return _missionaryRight; }
        }

        public int CannibalRight {
            get { return _cannibalRight; }
        }

        public int BoatLocation {
            get { return _boatLocation; }
        }
    }
}