using System;

namespace SwinAdventure
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter your name: ");
            string name = Console.ReadLine();
            Console.Write("Describe yourself: ");
            string description = Console.ReadLine();
            Player player = new Player(name, description);

            Item gem = new Item(new string[] { "gem" }, "a gem", "a shiny gemstone");
            Item torch = new Item(new string[] { "torch" }, "a torch", "provides light");
            Bag bag = new Bag(new string[] { "bag" }, "a bag", "a bag containing items");
            Item map = new Item(new string[] { "map" }, "a map", "a map of where you are");

            bag.Inventory.Put(map);
            player.Inventory.Put(gem);
            player.Inventory.Put(torch);
            player.Inventory.Put(bag);

            Location location = new Location(new string[] { "garden" }, "garden", "a lush garden with many plants and trees");
            location.Inventory.Put(new Item(new string[] { "trowel" }, "a trowel", "a trowel for shoving up dirt"));
            player.Location = location;

            Location shed = new Location(new string[] { "shed" }, "shed", "a wooden shed containing a few gardening items");
            Path gardenToShed = new Path(Direction.North, "You enter a shed. It smells funky.", shed);
            Path shedToGarden = new Path(Direction.South, "You exit the shed into the garden.", location);
            location.AddPath(gardenToShed);
            shed.AddPath(shedToGarden);

            string[] command;
            CommandProcessor processor = new CommandProcessor();

            while (true)
            {
                Console.Write("Command -> ");
                command = Console.ReadLine().ToLower().Split(" ");

                if (command[0] == "exit")
                {
                    break;
                } else
                {
                    Console.WriteLine(processor.Execute(player, command));
                }
            }
        }
    }
}