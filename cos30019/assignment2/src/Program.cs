using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Assignment2
{
    public class Program
    {
        static string[] AllowedMethods = { "TT", "FC", "BC", "RP" };

        static void Main(string[] args)
        {
            if (args.Length != 2) {
                Console.WriteLine("Usage: iengine <method> <filename>");
                Console.WriteLine("    <method> can be TT|FC|BC|RP");
                return;
            }

            string method = args[0].ToUpper();
            if (!AllowedMethods.Contains(method)) {
                Console.WriteLine("<method> must be TT, FC, BC, or RP");
                return;
            }

            try {
                string kbInput = "", queryInput = "";
                
                string filename = args[1];
                using (StreamReader reader = new StreamReader("cases/" + filename)) {
                    string? line;
                    bool readingKB = true;

                    while ((line = reader.ReadLine()) != null) {
                        line = line.Trim();

                        if (line == "TELL") {
                            readingKB = true;
                            continue;
                        } else if (line == "ASK") {
                            readingKB = false;
                            continue;
                        }

                        if (readingKB) {
                            kbInput += line;
                        } else {
                            queryInput += line;
                        }
                    }
                }

                KnowledgeBase kb = Parser.ParseKnowledgeBase(kbInput);
                Sentence query = Parser.ParseSentence(queryInput);

                switch (method) {
                    case "TT":
                        (bool ttEntails, int modelCount) = TruthTableChecking.Entails(kb, query);

                        if (ttEntails) {
                            Console.WriteLine("YES: " + modelCount);
                        } else {
                            Console.WriteLine("NO");
                        }

                        break;
                    case "FC":
                        (bool fcEntails, HashSet<string> fcSymbols) = ForwardChaining.Entails(kb, queryInput);

                        if (fcEntails) {
                            Console.Write("YES: ");
                            foreach (string symbol in fcSymbols) {
                                Console.Write(symbol + " ");
                            }
                            Console.WriteLine();
                        } else {
                            Console.WriteLine("NO");
                        }

                        break;
                    case "BC":
                        (bool bcEntails, HashSet<string> bcSymbols) = BackwardChaining.Entails(kb, queryInput);

                        if (bcEntails) {
                            Console.Write("YES: ");
                            foreach (string symbol in bcSymbols) {
                                Console.Write(symbol + " ");
                            }
                            Console.WriteLine();
                        } else {
                            Console.WriteLine("NO");
                        }

                        break;
                    case "RP":
                        bool rpEntails = ResolutionSolver.PLResolution(kb, query);

                        if (rpEntails) {
                            Console.WriteLine("YES");
                        } else {
                            Console.WriteLine("NO");
                        }

                        break;
                }
            } catch (Exception e) {
                Console.WriteLine("Error: " + e.Message);
            }
        }
    }
}
