using NUnit.Framework;
using ClockClass;

namespace ClockClassTest
{
    [TestFixture]
    public class ClockTests
    {
        private Clock _clock;

        [SetUp]
        public void Setup()
        {
            _clock = new Clock();
        }

        [Test]
        public void TestTimeOnInitialize()
        {
            Assert.AreEqual("00:00:00", _clock.Time);
        }

        [Test]
        public void TestTimeAfterOneTick()
        {
            _clock.Tick();
            Assert.AreEqual("00:00:01", _clock.Time);
        }

        [TestCase(5)]
        [TestCase(64)]
        [TestCase(129)]
        [TestCase(84399)]
        [TestCase(86400)]
        public void TestTimeAfterTicks(int times)
        {
            int expectedHours = (times / 3600) % 24;
            int expectedMinutes = (times / 60) % 60;
            int expectedSeconds = times % 60;
            string expectedTime = expectedHours.ToString().PadLeft(2, '0') + ":" + expectedMinutes.ToString().PadLeft(2, '0') + ":" + expectedSeconds.ToString().PadLeft(2, '0');

            for (int i = 0; i < times; i++)
            {
                _clock.Tick();
            }

            Assert.AreEqual(expectedTime, _clock.Time);
        }

        [Test]
        public void TestReset()
        {
            for (int i = 0; i < 3; i++)
            {
                _clock.Tick();
            }
            _clock.Reset();
            Assert.AreEqual("00:00:00", _clock.Time);
        }
    }
}
