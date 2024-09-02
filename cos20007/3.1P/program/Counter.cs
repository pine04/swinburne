namespace ClockClass
{
    public class Counter
    {
        private int _count;
        private string _name;

        public Counter(string name)
        {
            _count = 0;
            _name = name;
        }

        public void Increment()
        {
            _count++;
        }

        public void Reset()
        {
            _count = 0;
        }

        public string Name
        {
            get
            {
                return _name;
            }
            set
            {
                _name = value;
            }
        }

        public int Ticks
        {
            get
            {
                return _count;
            }
        }
    }
}
