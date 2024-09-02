using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class CommandProcessorTests
    {
        private Player _player;
        private Bag _bag;
        private Item _map;
        private Location _garden, _shed;
        private Path _gardenToShed;
        private CommandProcessor _processor;

        [SetUp]
        public void SetUp()
        {
            _player = new Player("Pine", "curious adventurer");

            _bag = new Bag(new string[] { "bag" }, "bag", "A bag containing items.");
            _map = new Item(new string[] { "map" }, "map", "A map of where you are.");

            _bag.Inventory.Put(_map);
            _player.Inventory.Put(_bag);

            _garden = new Location(new string[] { "garden" }, "garden", "a lush garden with many plants and trees");
            _shed = new Location(new string[] { "shed" }, "shed", "a wooden shed containing a few gardening items");

            _player.Location = _garden;

            _gardenToShed = new Path(Direction.North, "You enter a shed. It smells funky.", _shed);
            _garden.AddPath(_gardenToShed);

            _processor = new CommandProcessor();
        }

        [Test]
        public void TestCanLookAtLocation()
        {
            Assert.AreEqual(_garden.FullDescription, _processor.Execute(_player, new string[] { "look" }));
        }

        [Test]
        public void TestCanLookAtInventory()
        {
            string[] command = new string[] { "look", "at", "bag" };
            Assert.AreEqual(_bag.FullDescription, _processor.Execute(_player, command));
        }

        [Test]
        public void TestCanLookInBag()
        {
            string[] command = new string[] { "look", "at", "map", "in", "bag" };
            Assert.AreEqual(_map.FullDescription, _processor.Execute(_player, command));
        }

        [TestCase("move north")]
        [TestCase("head north")]
        [TestCase("go n")]
        public void TestCanMove(string command)
        {
            string[] parsedCommand = command.Split(" ");
            _processor.Execute(_player, parsedCommand);
            Assert.AreEqual(_shed, _player.Location);
        }

        [TestCase("walk north")]
        [TestCase("get item")]
        [TestCase("attack enemy")]
        public void TestUnknownCommand(string command)
        {
            string[] parsedCommand = command.Split(" ");
            Assert.AreEqual("I don't know how to do that.", _processor.Execute(_player, parsedCommand));
        }
    }
}
