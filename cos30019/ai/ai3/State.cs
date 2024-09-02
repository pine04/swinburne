namespace AI3 {
    public abstract class State {
        public abstract bool IsEqualTo(State target);
        public abstract int GetHash();
    }   
}