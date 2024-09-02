namespace ClockClass
{
    public class Clock
    {
        private Counter _hours;
        private Counter _minutes;
        private Counter _seconds;

        public Clock()
        {
            _hours = new Counter("hours");
            _minutes = new Counter("minutes");
            _seconds = new Counter("seconds");
        }

        public void Reset()
        {
            _hours.Reset();
            _minutes.Reset();
            _seconds.Reset();
        }

        public void Tick()
        {
            _seconds.Increment();

            if (_seconds.Ticks == 60)
            {
                _seconds.Reset();
                _minutes.Increment();
            }

            if (_minutes.Ticks == 60)
            {
                _minutes.Reset();
                _hours.Increment();
            }

            if (_hours.Ticks == 24)
            {
                _hours.Reset();
            }
        }

        public string Time
        {
            get
            {
                string hours = _hours.Ticks.ToString().PadLeft(2, '0');
                string minutes = _minutes.Ticks.ToString().PadLeft(2, '0');
                string seconds = _seconds.Ticks.ToString().PadLeft(2, '0');
                return hours + ":" + minutes + ":" + seconds;
            }
        }
    }
}
