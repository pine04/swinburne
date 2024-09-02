using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class ItemTests
    {
        private Item _item;

        [SetUp]
        public void Setup()
        {
            _item = new Item(new string[] { "key", "door key" }, "Rusty key", "A key to a door.");
        }

        [TestCase("key")]
        [TestCase("door key")]
        public void TestIdentifiable(string id)
        {
            Assert.True(_item.AreYou(id));
        }

        [Test]
        public void TestShortDescription()
        {
            Assert.AreEqual("Rusty key (key)", _item.ShortDescription);
        }

        [Test]
        public void TestFullDescription()
        {
            Assert.AreEqual("A key to a door.", _item.FullDescription);
        }
    }
}
