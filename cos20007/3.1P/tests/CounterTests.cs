using NUnit.Framework;
using ClockClass;

namespace ClockClassTests
{
    [TestFixture]
    public class CounterTests
    {
        private Counter _counter;

        [SetUp]
        public void Setup()
        {
            _counter = new Counter("counter");
        }

        [Test]
        public void TestValueOnInitialize()
        {
            Assert.AreEqual(0, _counter.Ticks);
        }

        [Test]
        public void TestIncrementOnce()
        {
            _counter.Increment();
            Assert.AreEqual(1, _counter.Ticks);
        }

        [TestCase(3)]
        [TestCase(4)]
        public void TestIncrement(int times)
        {
            for (int i = 0; i < times; i++)
            {
                _counter.Increment();
            }
            Assert.AreEqual(times, _counter.Ticks);
        }

        [Test]
        public void TestReset()
        {
            for (int i = 0; i < 5; i++)
            {
                _counter.Increment();
            }
            _counter.Reset();
            Assert.AreEqual(0, _counter.Ticks);
        }
    }
}