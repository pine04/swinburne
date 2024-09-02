namespace AI3 {
    public enum JugActionType {
        FillA,
        FillB,
        EmptyA,
        EmptyB,
        AToB,
        BToA
    }

    public class JugAction : Action {
        private JugActionType _action;

        public JugAction(JugActionType action) : base(1, GetDescription(action)) {
            _action = action;
        }

        private static string GetDescription(JugActionType action) {
            if (action == JugActionType.AToB) {
                return "Pour water from jug A to jug B.";
            } else if (action == JugActionType.BToA) {
                return "Pour water from jug B to jug A.";
            } else if (action == JugActionType.EmptyA) {
                return "Empty jug A.";
            } else if (action == JugActionType.EmptyB) {
                return "Empty jug B.";
            } else if (action == JugActionType.FillA) {
                return "Fill jug A to full.";
            } else if (action == JugActionType.FillB) {
                return "Fill jug B to full.";
            } else {
                return "Unknown action.";
            }
        }

        public JugActionType Action {
            get { return _action; }
        }
    }
}