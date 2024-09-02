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
            Item map = new Item(new string[] { "map" }, "a map", "a map of where you are");
            Bag bag = new Bag(new string[] { "bag" }, "a bag", "a bag containing items");

            bag.Inventory.Put(map);
            player.Inventory.Put(gem);
            player.Inventory.Put(torch);
            player.Inventory.Put(bag);

            LookCommand look = new LookCommand();
            string[] command;

            while (true)
            {
                Console.Write("Command -> ");
                command = Console.ReadLine().ToLower().Split(" ");
                if (command[0] == "exit")
                {
                    break;
                } else
                {
                    Console.WriteLine(look.Execute(player, command));
                }
            }
        }
    }
}