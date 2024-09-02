using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class PathTests
    {
        private Player _player;
        private Location _garden, _shed;
        private Path _gardenToShed, _shedToGarden;
        private MoveCommand _moveCommand;

        [SetUp]
        public void SetUp() {
            _player = new Player("Pine", "curious adventurer");

            _garden = new Location(new string[] { "garden" }, "garden", "a lush garden with many plants and trees");
            _shed = new Location(new string[] { "shed" }, "shed", "a wooden shed containing a few gardening items");

            _player.Location = _garden;

            _gardenToShed = new Path(Direction.North, "You enter a shed. It smells funky.", _shed);
            _shedToGarden = new Path(Direction.South, "You exit the shed into the garden.", _garden);

            _garden.AddPath(_gardenToShed);
            _shed.AddPath(_shedToGarden);

            _moveCommand = new MoveCommand();
        }

        [TestCase("north")]
        [TestCase("n")]
        public void TestPathIdentifiable(string identifier)
        {
            Assert.True(_gardenToShed.AreYou(identifier));
        }

        [TestCase("north")]
        [TestCase("n")]
        public void TestLocationCanLocatePath(string identifier)
        {
            Assert.AreEqual(_gardenToShed, _garden.Locate(identifier));
        }

        [Test]
        public void TestPathCanMovePlayer()
        {
            _gardenToShed.MovePlayer(_player);
            Assert.AreEqual(_shed, _player.Location);
        }

        [TestCase("move")]
        [TestCase("leave")]
        [TestCase("head")]
        [TestCase("go")]
        public void TestMoveCommandIdentifiable(string identifier)
        {
            Assert.True(_moveCommand.AreYou(identifier));
        }

        [TestCase("move to north", "I don't know how to move like that.")]
        [TestCase("walk north", "Error in move input.")]
        public void TestInvalidMoveCommand(string command, string expectedOutput)
        {
            string[] parsedCommand = command.Split(" ");
            Assert.AreEqual(expectedOutput, _moveCommand.Execute(_player, parsedCommand));
        }

        [TestCase("move north")]
        [TestCase("go n")]
        public void TestMoveCommandValidPath(string command)
        {
            string[] parsedCommand = command.Split(" ");
            _moveCommand.Execute(_player, parsedCommand);
            Assert.AreEqual(_shed, _player.Location);
        }

        [TestCase("move somewhere")]
        [TestCase("go nort")]
        public void TestMoveCommandInvalidPath(string command)
        {
            string[] parsedCommand = command.Split(" ");
            _moveCommand.Execute(_player, parsedCommand);
            // The player starts in the garden, so if the path ID is invalid they should remain in the garden.
            Assert.AreEqual(_garden, _player.Location);
        }
    }
}
