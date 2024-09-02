using System;
using System.Collections.Generic;

namespace Assignment2
{
    public static class ForwardChaining
    {
        public static (bool, HashSet<string>) Entails(KnowledgeBase KB, string q)
        {
            HashSet<string> entailedSymbols = new HashSet<string>();
            Dictionary<Sentence, int> count = new Dictionary<Sentence, int>();
            Dictionary<string, bool> inferred = new Dictionary<string, bool>();
            Queue<string> agenda = new Queue<string>();
            HashSet<string> symbols = KB.GetSymbols();
            List<Sentence> sentences = KB.GetSentences();

            foreach (string symbol in symbols)
            {
                inferred[symbol] = false;
            }
            foreach (Sentence sentence in sentences)
            {
                count[sentence] = sentence.GetLeftSymbols().Count;
                if (sentence is AtomicSentence)
                {
                    foreach (string symbol in sentence.GetSymbols())
                    {
                        agenda.Enqueue(symbol);
                    }
                }
            }

            while (agenda.Count > 0)
            {
                string p = agenda.Dequeue();
                entailedSymbols.Add(p);
                if (p == q)
                {
                    return (true,entailedSymbols);
                }

                if (inferred[p] == false)
                {
                    inferred[p] = true;
                    foreach(Sentence sentence in sentences){
                        if(sentence.GetLeftSymbols().Contains(p)){
                            count[sentence]--;
                            if(count[sentence]==0){
                                foreach(string symbol in sentence.GetRightSymbols()){
                                    agenda.Enqueue(symbol);
                                }
                            }
                        }
                    }
                }
            }
            return (false, entailedSymbols);
        }
    }
}
