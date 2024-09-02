using System.Collections.Generic;

namespace Assignment2 {
    public class KnowledgeBase {
        private List<Sentence> _sentences;
        private HashSet<string> _symbols;
        private HashSet<string> _leftSymbols;
        private HashSet<string> _rightSymbols;
        
        public KnowledgeBase(List<Sentence> sentences) {
            _sentences = sentences;
            _symbols = new HashSet<string>();
            _rightSymbols = new HashSet<string>();
            _leftSymbols = new HashSet<string>();

            foreach (Sentence sentence in sentences) {
                _symbols.UnionWith(sentence.GetSymbols());
                if(sentence is Imply){
                    _leftSymbols.UnionWith(sentence.GetLeftSymbols());
                    _rightSymbols.UnionWith(sentence.GetRightSymbols());
                }
            }
        }

        public HashSet<string> GetSymbols() {
            return new HashSet<string>(_symbols);
        }

        public bool GetTruth(Dictionary<string, bool> model) {
            bool truth = true;

            foreach (Sentence s in _sentences) {
                truth = truth && s.GetTruth(model);
            }

            return truth;
        }

        public List<Sentence> GetSentences(){
            return _sentences;
        }
    }
}