using System;

namespace Assignment2 {
    public class Program {
        static void Main(string[] args) {
            //string s = "((a & b) & (c & d) || ((e & ~f) || d))";
            // Console.WriteLine(s.Length);
            // ParseSentence(s, 0, s.Length - 1);

            string s = " a  ||    b ||     c & ~d    => ~e   ";
            Sentence sSentence = Parser.SimpleParser(s, 0, s.Length - 1);
            Console.WriteLine(sSentence.GetNotation());
        }        
    }
}
