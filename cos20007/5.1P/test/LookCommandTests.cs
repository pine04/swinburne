using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class LookCommandTests
    {
        private LookCommand _lookCmd;
        private Player _player;
        private Item _gem;
        private Bag _bag;

        [SetUp]
        public void Setup()
        {
            _lookCmd = new LookCommand();
            _player = new Player("Pine", "Swinburne student");
            _gem = new Item(new string[] { "gem" }, "Gem", "a shiny gemstone");
            _bag = new Bag(new string[] { "bag" }, "Bag", "a bag of items");
        }

        [TestCase("inventory")]
        [TestCase("me")]
        public void TestLookAtMe(string id)
        {
            string[] command = { "look", "at", id };
            Assert.AreEqual(_player.FullDescription, _lookCmd.Execute(_player, command));
        }

        [Test]
        public void TestLookAtGem()
        {
            _player.Inventory.Put(_gem);
            string[] command = { "look", "at", "gem" };
            Assert.AreEqual(_gem.FullDescription, _lookCmd.Execute(_player, command));
        }

        [Test]
        public void TestLookAtUnknownGem()
        {
            string[] command = { "look", "at", "gem" };
            Assert.AreEqual("I cannot find the gem in the Pine", _lookCmd.Execute(_player, command));
        }

        [Test]
        public void TestLookAtGemInMe()
        {
            _player.Inventory.Put(_gem);
            string[] command = { "look", "at", "gem", "in", "inventory" };
            Assert.AreEqual(_gem.FullDescription, _lookCmd.Execute(_player, command));
        }

        [Test]
        public void TestLookAtGemInBag()
        {
            _bag.Inventory.Put(_gem);
            _player.Inventory.Put(_bag);
            string[] command = { "look", "at", "gem", "in", "bag" };
            Assert.AreEqual(_gem.FullDescription, _lookCmd.Execute(_player, command));
        }

        [Test]
        public void TestLookAtGemInNoBag()
        {
            string[] command = { "look", "at", "gem", "in", "bag" };
            Assert.AreEqual("I cannot find the bag", _lookCmd.Execute(_player, command));
        }

        [Test]
        public void TestLookAtNoGemInBag()
        {
            _player.Inventory.Put(_bag);
            string[] command = { "look", "at", "gem", "in", "bag" };
            Assert.AreEqual("I cannot find the gem in the Bag", _lookCmd.Execute(_player, command));
        }

        [TestCase("look", "I don't know how to look like that")]
        [TestCase("see at gem", "Error in look input")]
        [TestCase("look on gem", "What do you want to look at?")]
        [TestCase("look at gem at bag", "What do you want to look in?")]
        public void TestInvalidLook(string command, string expectedError)
        {
            string[] processedCommand = command.Split(" ");
            Assert.AreEqual(expectedError, _lookCmd.Execute(_player, processedCommand));
        }
    }
}
