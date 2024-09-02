namespace AI4 {
    public class RouteState : State {
        private string _cityName;
        
        public RouteState(string cityName) {
            _cityName = cityName;
        }

        public string CityName {
            get { return _cityName; }
        }

        public override bool IsEqualTo(State target)
        {
            RouteState? routeTarget = target as RouteState;

            if (routeTarget == null) {
                return false;
            } else {
                return CityName == routeTarget.CityName;
            }
        }

        public override int GetHash()
        {
            return _cityName.GetHashCode();
        }
    }
}