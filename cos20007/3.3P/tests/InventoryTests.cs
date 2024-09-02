using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class InventoryTests
    {
        private Inventory _inventory;

        [SetUp]
        public void Setup()
        {
            _inventory = new Inventory();
            _inventory.Put(new Item(new string[] { "phone", "cellphone" }, "a phone", "Your phone."));
            _inventory.Put(new Item(new string[] { "money", "cash" }, "13 dollars", "Your pocket money."));
        }

        [TestCase("money")]
        [TestCase("phone")]
        public void TestFindItem(string id)
        {
            Assert.True(_inventory.HasItem(id));
        }

        [TestCase("laptop")]
        [TestCase("notebook")]
        public void TestNoItemFind(string id)
        {
            Assert.False(_inventory.HasItem(id));
        }

        [TestCase("phone")]
        [TestCase("money")]
        public void TestFetchItem(string id)
        {
            Item fetchedItem = _inventory.Fetch(id);
            Assert.True(fetchedItem.AreYou(id) && _inventory.HasItem(id));
        }

        [TestCase("phone")]
        [TestCase("money")]
        public void TestTakeItem(string id)
        {
            Item takenItem = _inventory.Take(id);
            Assert.True(takenItem.AreYou(id) && !_inventory.HasItem(id));
        }

        [Test]
        public void TestItemList()
        {
            string expected = "\ta phone (phone)\n\t13 dollars (money)\n";
            Assert.AreEqual(expected, _inventory.ItemList);
        }
    }
}
