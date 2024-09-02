namespace SwinAdventure
{
    public class MoveCommand : Command
    {
        public MoveCommand() : base(new string[] { "move", "head", "go", "leave" }) { }

        public override string Execute(Player p, string[] text)
        {
            if (text.Length != 2)
            {
                return "I don't know how to move like that.";
            }
            if (!AreYou(text[0]))
            {
                return "Error in move input.";
            }

            Path path = GetPath(p, text[1]);
            if (path != null)
            {
                return path.MovePlayer(p);
            } else
            {
                return "There is no path there.";
            }
        }

        private Path GetPath(Player p, string pathId)
        {
            return p.Locate(pathId) as Path;
        }
    }
}
