namespace AI3 {
    public class JugState : State {
        private int _amountA, _amountB;

        public JugState(int amountA, int amountB) {
            _amountA = amountA;
            _amountB = amountB;
        }

        public override bool IsEqualTo(State target)
        {
            JugState? targetState = target as JugState;

            if (targetState == null) {
                return false;
            }

            if (AmountA == -1 || targetState.AmountA == -1) return AmountB == targetState.AmountB;
            if (AmountB == -1 || targetState.AmountB == -1) return AmountA == targetState.AmountA;

            return AmountA == targetState.AmountA && AmountB == targetState.AmountB;
        }

        public override int GetHash()
        {
            return $"{AmountA} - #{AmountB}".GetHashCode();
        }

        public int AmountA {
            get { return _amountA; }
        }

        public int AmountB {
            get { return _amountB; }
        }
    }
}