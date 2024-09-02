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
            OffsetMap['('] = 1;
            OffsetMap[')'] = 1;
            OffsetMap['['] = 1;
            OffsetMap[']'] = 1;
        }

        public static KnowledgeBase ParseKnowledgeBase(string kb) {
            List<Sentence> knowledgeBase = new List<Sentence>();

            string[] sentences = kb.Split(";", StringSplitOptions.RemoveEmptyEntries);

            foreach (string sentence in sentences) {
                knowledgeBase.Add(ParseSentence(sentence));
            }

            return new KnowledgeBase(knowledgeBase);
        }

        public static Sentence ParseSentence(string sentence) {
            List<Token> tokens = Tokenize(sentence);
            Stack<Token> parsing = new Stack<Token>();

            foreach (Token token in tokens) {
                OperatorToken? parenthesisToken = token as OperatorToken;

                if (parenthesisToken != null && (parenthesisToken.Operation == ')' || parenthesisToken.Operation == ']')) {
                    Stack<Token> subsentence = new Stack<Token>();

                    while (true) {
                        if (parsing.Count == 0) break;

                        Token t = parsing.Pop();
                        OperatorToken? openingBracketToken = t as OperatorToken;

                        if (openingBracketToken != null && (openingBracketToken.Operation == '(' || openingBracketToken.Operation == '[')) {
                            if ((openingBracketToken.Operation == '(' && parenthesisToken.Operation == ')') || (openingBracketToken.Operation == '[' && parenthesisToken.Operation == ']')) {
                                break;
                            } else {
                                throw new Exception("Syntax error");
                            }
                        }

                        subsentence.Push(t);
                    }

                    parsing.Push(new SentenceToken(SimpleParser(subsentence)));
                    continue;
                }

                parsing.Push(token);
            }

            Stack<Token> reversed = new Stack<Token>();
            while (parsing.Count != 0) {
                reversed.Push(parsing.Pop());
            }

            return SimpleParser(reversed);
        }        

        public static Sentence SimpleParser(Stack<Token> tokens) {
            if (tokens.Count == 0) {
                throw new Exception("Syntax error");
            }

            int mainOperatorIndex = 0;
            int mainOperatorSignificance = Int32.MaxValue; // The least significant operator is the operator of this sentence.
            char mainOperator = '\0';

            int i = 0;
            foreach (Token token in tokens) {
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
                i++;
            }

            switch (mainOperator) {
                case '\0':
                    // Atomic sentence
                    if (tokens.Count != 1) throw new Exception("Propositional logic syntax error");
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
                    Stack<Token> temp = new Stack<Token>();
                    Stack<Token> leftStack = new Stack<Token>();

                    for (i = 0; i < mainOperatorIndex; i++) {
                        temp.Push(tokens.Pop());
                    }
                    while (temp.Count != 0) {
                        leftStack.Push(temp.Pop()); // reverses the stack;
                    }

                    Sentence left = SimpleParser(leftStack);

                    tokens.Pop(); // pops the operator

                    Stack<Token> rightStack = new Stack<Token>();
                    while (tokens.Count != 0) {
                        temp.Push(tokens.Pop());
                    }
                    while (temp.Count != 0) {
                        rightStack.Push(temp.Pop()); // reverses the stack;
                    }


                    Sentence right = SimpleParser(rightStack);

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

        // Returns a list of tokens that represent meaningful parts of the sentence.
        public static List<Token> Tokenize(string sentence) {
            List<Token> tokens = new List<Token>();

            int i = 0;
            string symbol = "";
            while (i < sentence.Length) {
                switch (sentence[i]) {
                    case ' ':
                        if (symbol != "") {
                            tokens.Add(new SymbolToken(symbol));
                            symbol = "";
                        }
                        i++;
                        break;
                    case '~':
                    case '&':
                    case '|':
                    case '=':
                    case '<':
                    case '(':
                    case ')':
                    case '[':
                    case ']':
                        if (symbol != "") {
                            tokens.Add(new SymbolToken(symbol));
                            symbol = "";
                        }
                        tokens.Add(new OperatorToken(sentence[i]));
                        i += OffsetMap[sentence[i]];
                        break;
                    default:
                        symbol += sentence[i];
                        i++;
                        break;
                }
            }
            if (symbol != "") tokens.Add(new SymbolToken(symbol));

            return tokens;
        }
    }
}