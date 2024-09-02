using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using SwinAdventure;

namespace SwinAdventureTests
{
    [TestFixture]
    public class IdentifiableObjectTest
    {
        private IdentifiableObject _identifiableObject;

        [SetUp]
        public void SetUp()
        {
            _identifiableObject = new IdentifiableObject(new string[] { "id1", "id2" });
        }

        [TestCase("id1")]
        [TestCase("id2")]
        public void TestAreYou(string id)
        {
            Assert.True(_identifiableObject.AreYou(id));
        }

        [TestCase("id3")]
        [TestCase("id4")]
        public void TestNotAreYou(string id)
        {
            Assert.False(_identifiableObject.AreYou(id));
        }

        [TestCase("ID1")]
        [TestCase("iD1")]
        [TestCase("Id2")]
        [TestCase("ID2")]
        public void TestCaseSensitive(string id)
        {
            Assert.True(_identifiableObject.AreYou(id));
        }

        [Test]
        public void TestFirstId()
        {
            Assert.AreEqual("id1", _identifiableObject.FirstId);
        }

        [Test] 
        public void TestFirstIdWithNoId()
        {
            _identifiableObject = new IdentifiableObject(new string[] { });
            Assert.AreEqual("", _identifiableObject.FirstId);
        }

        [TestCase("id3")]
        [TestCase("id4")]
        public void TestAddId(string newId)
        {
            _identifiableObject.AddIdentifier(newId);
            Assert.True(_identifiableObject.AreYou(newId));
        }
    }
}