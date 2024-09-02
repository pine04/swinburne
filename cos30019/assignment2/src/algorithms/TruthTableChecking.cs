using System.Collections.Generic;

namespace Assignment2 {
    public static class TruthTableChecking {
        public static (bool, int) Entails(KnowledgeBase kb, Sentence a) {
            HashSet<string> symbols = kb.GetSymbols();
            symbols.UnionWith(a.GetSymbols());

            int models = 0;
            bool result = CheckAll(kb, a, symbols, new Dictionary<string, bool>(), ref models);

            return (result, models);
        }

        // Check all models.
        private static bool CheckAll(KnowledgeBase kb, Sentence a, HashSet<string> symbols, Dictionary<string, bool> model, ref int modelCount) {
            if (symbols.Count == 0) {
                if (kb.GetTruth(model)) {
                    bool isSentenceTrue = a.GetTruth(model);
                    if (isSentenceTrue) modelCount += 1;
                    return isSentenceTrue;
                }

                return true;
            } else {
                string first = First(symbols);
                HashSet<string> rest = Rest(symbols);

                Dictionary<string, bool> modelA = new Dictionary<string, bool>(model);
                modelA[first] = true;

                Dictionary<string, bool> modelB = new Dictionary<string, bool>(model);
                modelB[first] = false;

                return CheckAll(kb, a, rest, modelA, ref modelCount) && CheckAll(kb, a, rest, modelB, ref modelCount);
            }
        }
        
        // Gets the first symbol of the set.
        private static string First(HashSet<string> symbols) {
            int i = 1;

            foreach (string symbol in symbols) {
                if (i == 1) return symbol;
            }

            return "";
        }

        // Returns the set except the first symbol.
        private static HashSet<string> Rest(HashSet<string> symbols) {
            HashSet<string> rest = new HashSet<string>();

            int i = 1;

            foreach (string symbol in symbols) {
                if (i != 1) rest.Add(symbol);
                i++;
            }

            return rest;
        }
    }
}