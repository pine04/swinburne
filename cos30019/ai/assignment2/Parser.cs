using System;
using System.Collections.Generic;

namespace Assignment2 {
    public static class Parser {
        static Dictionary<char, int> PrecedenceMap, OffsetMap;

        static Parser() {
            PrecedenceMap = new Dictionary<char, int>();
            PrecedenceMap['~'] = 5;
            PrecedenceMap['&'] = 4;
            PrecedenceMap['|'] = 3;
            PrecedenceMap['='] = 2;
            PrecedenceMap['<'] = 1;

            OffsetMap = new Dictionary<char, int>();
            OffsetMap['~'] = 1;
            OffsetMap['&'] = 1;
            OffsetMap['|'] = 2;
            OffsetMap['='] = 2;
            OffsetMap['<'] = 3;
        }

        public static List<Sentence> ParseKnowledgeBase(string kb) {
            List<Sentence> knowledgeBase = new List<Sentence>();

            string[] sentences = kb.Split(";");

            foreach (string sentence in sentences) {
                //knowledgeBase.Add(ParseSentence(sentence, 0, sentence.Length - 1));
            }

            return knowledgeBase;
        }

        public static void ParseSentence(string input, int start, int end) {
            int mainOperatorIndex = start;
            int mainOperatorSignificance = Int32.MaxValue; // The least significant operator is the operator of this sentence.
            char mainOperator = '\0';
            Stack<char> brackets = new Stack<char>();

            int i = start;
            while (i <= end) {
                char currentChar = input[i];

                switch (currentChar) {
                    case '(':
                    case '[':
                        brackets.Push(currentChar);
                        i++;
                        break;
                    case ')':
                    case ']':
                        if (brackets.Count == 0) {
                            throw new Exception("Propositional logic syntax error.");
                        }

                        char openingBracket = brackets.Pop();
                        if ((currentChar == ')' && openingBracket == '[') || (currentChar == ']' && openingBracket == '(')) {
                            throw new Exception("Propositional logic syntax error.");
                        }
                        mainOperatorSignificance = Int32.MaxValue;
                        i++;
                        break;
                    case '~':
                    case '&':
                    case '|':
                    case '=':
                    case '<':
                        if (PrecedenceMap[currentChar] < mainOperatorSignificance) {
                            mainOperatorSignificance = PrecedenceMap[currentChar];
                            mainOperatorIndex = i;
                            mainOperator = currentChar;
                        }
                        i += OffsetMap[currentChar];
                        break;
                    default:
                        i++;
                        break;
                }
            }
            Console.WriteLine(mainOperatorIndex);
            Console.WriteLine(mainOperator);
        }

        public static Sentence SimpleParser(string input, int start, int end) {
            // This method cannot handle parentheses.

            if (start > end) {
                throw new Exception("Propositional logic syntax error.");
            }

            int mainOperatorIndex = start;
            int mainOperatorSignificance = Int32.MaxValue; // The least significant operator is the operator of this sentence.
            char mainOperator = '\0';

            int i = start;
            while (i <= end) {
                char currentChar = input[i];

                switch (currentChar) {
                    case '~':
                    case '&':
                    case '|':
                    case '=':
                    case '<':
                        if (PrecedenceMap[currentChar] < mainOperatorSignificance) {
                            mainOperatorSignificance = PrecedenceMap[currentChar];
                            mainOperatorIndex = i;
                            mainOperator = currentChar;
                        }
                        i += OffsetMap[currentChar];
                        break;
                    default:
                        i++;
                        break;
                }
            }

            switch (mainOperator) {
                case '\0':
                    // Atomic sentence
                    string symbol = "";
                    bool symbolEndReached = false;
                    for (i = start; i <= end; i++) {
                        if (input[i] != ' ' && symbolEndReached) throw new Exception("Propositional logic syntax error");
                        if (input[i] == ' ' && symbol != "") symbolEndReached = true;
                        if (input[i] != ' ') symbol += input[i];
                    }
                    return new AtomicSentence(symbol);
                case '~':
                    // Negation
                    // If this sentence is only a negation, there should be nothing but spaces before the negation symbol.
                    i = mainOperatorIndex - 1;
                    while (i >= start) {
                        if (input[i] != ' ') throw new Exception("Propositional logic syntax error");
                        i--;
                    }
                    return new Not(SimpleParser(input, mainOperatorIndex + OffsetMap[mainOperator], end));
                default:
                    // Every other operation.
                    Sentence left = SimpleParser(input, start, mainOperatorIndex - 1);
                    Sentence right = SimpleParser(input, mainOperatorIndex + OffsetMap[mainOperator], end);

                    switch (mainOperator) {
                        case '&':
                            return new And(left, right);
                        case '|':
                            return new Or(left, right);
                        case '=':
                            return new Imply(left, right);
                        case '<':
                            return new Iff(left, right);
                    }

                    break;
            }

            throw new Exception("Prepositional logic syntax error.");
        }

        public static Sentence SimpleParser(Stack<Token> tokens) {
            if (tokens.Count == 0) {
                throw new Exception("Syntax error");
            }

            int mainOperatorIndex = 0;
            int mainOperatorSignificance = Int32.MaxValue; // The least significant operator is the operator of this sentence.
            char mainOperator = '\0';

            int tokenCount = tokens.Count;
            for (int i = 0; i < tokenCount; i++) {
                Token token = tokens.Pop();
                // If token is an operation...

                OperatorToken? operation = token as OperatorToken;
                if (operation != null) {
                    char operationChar = operation.Operation;
                    switch (operationChar) {
                        case '~':
                        case '&':
                        case '|':
                        case '=':
                        case '<':
                            if (PrecedenceMap[operationChar] < mainOperatorSignificance) {
                                mainOperatorSignificance = PrecedenceMap[operationChar];
                                mainOperatorIndex = i;
                                mainOperator = operationChar;
                            }
                            break;
                        default:
                            break;
                    }
                }

                tokens.Push(token);
            }

            switch (mainOperator) {
                case '\0':
                    // Atomic sentence
                    if (tokenCount != 1) throw new Exception("Propositional logic syntax error");
                    Token token = tokens.Pop();
                    SymbolToken? symbol = token as SymbolToken;
                    SentenceToken? sentence = token as SentenceToken;
                    if (symbol == null && sentence == null) throw new Exception("Propositional logic syntax error");
                    if (symbol != null) return new AtomicSentence(symbol.Symbol);
                    if (sentence != null) return sentence.Sentence;
                    break;
                case '~':
                    // Negation
                    // If this sentence is only a negation, there should be nothing but spaces before the negation symbol.
                    OperatorToken? negationToken = tokens.Pop() as OperatorToken;
                    if (negationToken == null || negationToken.Operation != '~') throw new Exception("Propositional logic syntax error");
                    return new Not(SimpleParser(tokens));
                default:
                    // Every other operation.
                    Sentence left = SimpleParser(input, start, mainOperatorIndex - 1);
                    Sentence right = SimpleParser(input, mainOperatorIndex + OffsetMap[mainOperator], end);

                    switch (mainOperator) {
                        case '&':
                            return new And(left, right);
                        case '|':
                            return new Or(left, right);
                        case '=':
                            return new Imply(left, right);
                        case '<':
                            return new Iff(left, right);
                    }

                    break;
            }
        }
    }

    public class Token {

    }

    public class SymbolToken : Token {
        private string _symbol;

        public SymbolToken(string symbol) {
            _symbol = symbol;
        }

        public string Symbol {
            get { return _symbol; }
        }
    }

    public class OperatorToken : Token {
        private char _operation;

        public OperatorToken(char operation) {
            _operation = operation;
        }

        public char Operation {
            get { return _operation; }
        }
    }

    public class SentenceToken : Token {
        private Sentence _sentence;

        public SentenceToken(Sentence sentence) {
            _sentence = sentence;
        }

        public Sentence Sentence {
            get { return _sentence; }
        }
    }
}