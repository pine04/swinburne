using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class LocationTests
    {
        private Location _location;
        private Player _player;

        [SetUp]
        public void Setup()
        {
            _location = new Location(new string[] { "garden" }, "garden", "a lush garden with many plants and trees");
            _location.Inventory.Put(new Item(new string[] { "trowel" }, "a trowel", "a trowel for shoving up dirt"));
            _player = new Player("Pine", "Swinburne student", _location);
        }

        [Test]
        public void TestLocationIdentifySelf()
        {
            Assert.True(_location.AreYou("garden"));
        }

        [Test]
        public void TestLocationLocateSelf()
        {
            Assert.AreEqual(_location, _location.Locate("garden"));
        }

        [TestCase("trowel")]
        public void TestLocationLocateItem(string id)
        {
            Assert.IsNotNull(_location.Locate(id));
        }

        [TestCase("trowel")]
        public void TestPlayerLocateItem(string id)
        {
            Assert.IsNotNull(_player.Locate(id));
        }
    }
}
