using System;
using System.Collections.Generic;

namespace Assignment2
{
    public static class BackwardChaining
    {
        public static (bool,HashSet<string>) Entails(KnowledgeBase kb, string q)
        {
            HashSet<string> entailedSymbols = new HashSet<string>();
            List<Sentence> sentences = kb.GetSentences();
            (bool, HashSet<string>) result = (IsTrue(q,sentences,entailedSymbols), entailedSymbols);
            entailedSymbols.Add(q);
            return result;
        }
        private static bool IsTrue(string subgoal, List<Sentence> sentences, HashSet<string> entailedSymbols)
        {
            foreach (Sentence sentence in sentences)
            {
                if (sentence is AtomicSentence && sentence.GetSymbols().Contains(subgoal)){
                    
                    entailedSymbols.Add(subgoal);
                    return true;
                }
                if (sentence.GetRightSymbols().Contains(subgoal))
                {
                    bool result = true;

                    foreach (string symbol in sentence.GetLeftSymbols())
                    {
                        result = result && IsTrue(symbol, sentences, entailedSymbols);
                        if(result){
                            entailedSymbols.Add(symbol);
                            return result;
                        }                        
                    }                 
                }
            }
            return false;
        }
    }
}