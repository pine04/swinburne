using System;

namespace ClockClass
{
    class Program
    {
        static void Main(string[] args)
        {
            Clock myClock = new Clock();
            for (int i = 0; i < 100; i++)
            {
                myClock.Tick();
            }
            Console.WriteLine(myClock.Time);
            Console.ReadLine();
        }
    }
}
