namespace SwinAdventure
{
    public class Path : GameObject
    {
        private Location _destination;

        public Path(Direction direction, string desc, Location destination) : base(GetIdsForDirection(direction), direction.ToString(), desc) 
        {
            _destination = destination;
        }

        private static string[] GetIdsForDirection(Direction direction)
        {
            switch (direction)
            {
                case Direction.North:
                    return new string[] { "north", "n" };
                case Direction.East:
                    return new string[] { "east", "e" };
                case Direction.South:
                    return new string[] { "south", "s" };
                case Direction.West:
                    return new string[] { "west", "w" };
                case Direction.Northeast:
                    return new string[] { "northeast", "ne" };
                case Direction.Southeast:
                    return new string[] { "southeast", "se" };
                case Direction.Southwest:
                    return new string[] { "southwest", "sw" };
                case Direction.Northwest:
                    return new string[] { "northwest", "nw" };
                case Direction.Up:
                    return new string[] { "up", "u" };
                case Direction.Down:
                    return new string[] { "down", "d" };
                default:
                    return new string[] { };
            }
        }

        public string MovePlayer(Player p)
        {
            p.Location = _destination;
            return "You head " + Name + ".\n" + FullDescription + ".\nYou have arrived in " + _destination.Name + "."; 
        }
    }
}
