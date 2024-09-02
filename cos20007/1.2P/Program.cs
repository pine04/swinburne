using System;

namespace HelloWorld
{
    class MainClass
    {
        static void Main(string[] args)
        {
            Message myMessage = new Message("Hello World...");
            myMessage.Print();

            Message[] messages = new Message[5];
            messages[0] = new Message("Welcome back!");
            messages[1] = new Message("What a lovely name");
            messages[2] = new Message("Great name");
            messages[3] = new Message("Oh hi!");
            messages[4] = new Message("That is a silly name");

            Console.Write("Enter name: ");
            string name = Console.ReadLine().ToLower();

            if (name == "tung")
            {
                messages[0].Print();
            } else if (name == "huy")
            {
                messages[1].Print();
            } else if (name == "minh")
            {
                messages[2].Print();
            } else if (name == "trung")
            {
                messages[3].Print();
            } else
            {
                messages[4].Print();
            }

            Console.ReadLine();
        }
    }
}
