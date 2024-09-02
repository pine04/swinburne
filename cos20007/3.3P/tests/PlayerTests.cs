using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class PlayerTests
    {
        private Player _player;

        [SetUp]
        public void Setup()
        {
            _player = new Player("Pine", "Swinburne student");
            _player.Inventory.Put(new Item(new string[] { "phone", "cellphone" }, "a phone", "Your phone."));
            _player.Inventory.Put(new Item(new string[] { "money", "cash" }, "13 dollars", "Your pocket money."));
        }

        [TestCase("me")]
        [TestCase("inventory")]
        public void TestPlayerIdentifiable(string id)
        {
            Assert.True(_player.AreYou(id));
        }

        [TestCase("phone")]
        [TestCase("money")]
        public void TestLocateItem(string id)
        {
            GameObject locatedItem = _player.Locate(id);
            Assert.True(locatedItem == _player.Inventory.Fetch(id) && _player.Inventory.HasItem(id));
        }

        [TestCase("me")]
        [TestCase("inventory")]
        public void TestLocateSelf(string id)
        {
            Assert.AreEqual(_player, _player.Locate(id));
        }

        [TestCase("laptop")]
        [TestCase("notebook")]
        public void TestLocateNothing(string id)
        {
            Assert.AreEqual(null, _player.Locate(id));
        }

        [Test]
        public void TestFullDescription()
        {
            string expected = "You are Pine, Swinburne student. You are carrying:\n\ta phone (phone)\n\t13 dollars (money)\n";
            Assert.AreEqual(expected, _player.FullDescription);
        }
    }
}
