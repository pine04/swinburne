using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class BagTests
    {
        private Bag _bag1;

        [SetUp]
        public void Setup()
        {
            _bag1 = new Bag(new string[] { "b1", "bag1" }, "Bag 1", "The bigger bag.");
            _bag1.Inventory.Put(new Item(new string[] { "phone", "cellphone" }, "a phone", "Your phone."));
            _bag1.Inventory.Put(new Item(new string[] { "money", "cash" }, "13 dollars", "Your pocket money."));
        }

        [TestCase("phone")]
        [TestCase("money")]
        public void TestLocateItem(string id)
        {
            Assert.IsNotNull(_bag1.Locate(id));
        }

        [TestCase("b1")]
        [TestCase("bag1")]
        public void TestLocateSelf(string id)
        {
            Assert.AreEqual(_bag1, _bag1.Locate(id));
        }

        [TestCase("notebook")]
        [TestCase("doesnotexist")]
        public void TestLocateNothing(string id)
        {
            Assert.IsNull(_bag1.Locate(id));
        }

        [Test]
        public void TestFullDescription()
        {
            string expected = "In the Bag 1 you can see:\n\ta phone (phone)\n\t13 dollars (money)\n";
            Assert.AreEqual(expected, _bag1.FullDescription);
        }

        [Test]
        public void TestLocateBagInBag()
        {
            Bag bag2 = new Bag(new string[] { "b2", "bag2" }, "Bag 2", "The smaller bag.");
            _bag1.Inventory.Put(bag2);

            Assert.AreEqual(bag2, _bag1.Locate("b2"));
        }

        // Tests that the bigger bag can still locate its own content.
        [TestCase("phone")]
        [TestCase("money")]
        public void TestLocateOthers(string id)
        {
            Bag bag2 = new Bag(new string[] { "b2", "bag2" }, "Bag 2", "The smaller bag.");
            _bag1.Inventory.Put(bag2);

            Assert.IsNotNull(_bag1.Locate(id));
        }

        // Tests that the bigger bag cannot locate the inner bag's content.
        [TestCase("key")]
        public void TestCannotLocateInnerBagContent(string id)
        {
            Bag bag2 = new Bag(new string[] { "b2", "bag2" }, "Bag 2", "The smaller bag.");
            bag2.Inventory.Put(new Item(new string[] { "key", "door key" }, "Rusty key", "A key to a door."));
            _bag1.Inventory.Put(bag2);

            Assert.IsNull(_bag1.Locate(id));
        }
    }
}
