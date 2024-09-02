using System;
using System.Collections.Generic;

namespace Assignment2
{
    using Clause = HashSet<string>;

    public static class ResolutionSolver
    {
        public static bool PLResolution(KnowledgeBase kb, Sentence a)
        {
            HashSet<Clause> clauses = new HashSet<Clause>(Clause.CreateSetComparer());
            HashSet<Clause> newClauses = new HashSet<Clause>(Clause.CreateSetComparer());

            foreach (Sentence kbSentence in kb.GetSentences()) {
                clauses.UnionWith(GetClauses(ToCNF(kbSentence)));
            }
            clauses.UnionWith(GetClauses(ToCNF(new Not(a))));

            HashSet<Clause> resolvents;
            Clause emptyClause = new Clause();

            while (true) {
                foreach (Clause c1 in clauses) {
                    foreach (Clause c2 in clauses) {
                        if (c1 == c2) continue;

                        resolvents = PLResolve(c1, c2);

                        if (resolvents.Contains(emptyClause)) return true;

                        newClauses.UnionWith(resolvents);
                    }
                }

                if (newClauses.IsSubsetOf(clauses)) return false;

                clauses.UnionWith(newClauses);
            }            
        }

        private static Sentence ToCNF(Sentence sentence) {
            Sentence cnf = DistributeOr(EliminateNot(EliminateImply(EliminateIff(sentence))));
            return cnf;
        }

        private static HashSet<Clause> GetClauses(Sentence cnfSentence) {
            if (cnfSentence is Or || cnfSentence is Not || cnfSentence is AtomicSentence) {
                return new HashSet<Clause>(Clause.CreateSetComparer()) { ToSetRepresentation(cnfSentence) };
            }

            And? and = cnfSentence as And;

            if (and != null) {
                HashSet<Clause> clauses = new HashSet<Clause>(Clause.CreateSetComparer());
                clauses.UnionWith(GetClauses(and.Left));
                clauses.UnionWith(GetClauses(and.Right));

                return clauses;
            } else {
                return new HashSet<Clause>(Clause.CreateSetComparer());
            }
        }

        private static Sentence EliminateIff(Sentence sentence) {
            // Cast the sentence object into a complex sentence.
            ComplexSentence? complexSentence = sentence as ComplexSentence;

            // If sentence is not a complex sentence, it is an atomic sentence. No more work is needed.
            if (complexSentence == null) return sentence;

            // Recursively eliminate Iffs on the left and right operands.
            if (complexSentence.Left != null) complexSentence.Left = EliminateIff(complexSentence.Left);
            complexSentence.Right = EliminateIff(complexSentence.Right);

            // If this complex sentence is an Iff operation, return the transformation consisting of And and Implies.
            // The condition complexSentence.Left != null suppresses compiler warnings.
            if (complexSentence is Iff && complexSentence.Left != null) {
                return new And(new Imply(complexSentence.Left, complexSentence.Right), new Imply(complexSentence.Right, complexSentence.Left));
            } else {
                return sentence;
            }
        }

        private static Sentence EliminateImply(Sentence sentence) {
            // Cast the sentence object into a complex sentence.
            ComplexSentence? complexSentence = sentence as ComplexSentence;

            // If sentence is not a complex sentence, it is an atomic sentence. No more work is needed.
            if (complexSentence == null) return sentence;

            // Recursively eliminate Implies on the left and right operands.
            if (complexSentence.Left != null) complexSentence.Left = EliminateImply(complexSentence.Left);
            complexSentence.Right = EliminateImply(complexSentence.Right);

            // If this complex sentence is an Imply operation, return the transformation consisting of Or and Not.
            // The condition complexSentence.Left != null suppresses compiler warnings.
            if (complexSentence is Imply && complexSentence.Left != null) {
                return new Or(new Not(complexSentence.Left), complexSentence.Right);
            } else {
                return sentence;
            }
        }

        private static Sentence EliminateNot(Sentence sentence) {
            // Cast the sentence object into a complex sentence.
            ComplexSentence? complexSentence = sentence as ComplexSentence;

            // If sentence is not a complex sentence, it is an atomic sentence. No more work is needed.
            if (complexSentence == null) return sentence;

            // Recursively eliminate Nots on the left and right operands.
            complexSentence.Left = EliminateNot(complexSentence.Left);
            complexSentence.Right = EliminateNot(complexSentence.Right);

            // If this complex sentence is a Not operation, return the correct transformation depending on what is inside it.
            // The operand encapsulated in the Not operation is stored in complexSentence.Right.
            if (complexSentence is Not) {
                // Case Not(Not(A)): return A.
                Not? not = complexSentence.Right as Not;
                if (not != null) {
                    return not.Right;
                }

                // Case Not(And(A, B)): return Or(Not(A), Not(B)).
                // The condition and.Left != null suppresses compiler warnings.
                And? and = complexSentence.Right as And;
                if (and != null) {
                    Or equivalent = new Or(new Not(and.Left), new Not(and.Right));
                    EliminateNot(equivalent);
                    return equivalent;
                }

                // Case Not(Or(A, B)): return And(Not(A), Not(B)).
                // The condition or.Left != null suppresses compiler warnings.
                Or? or = complexSentence.Right as Or;
                if (or != null) {
                    And equivalent = new And(new Not(or.Left), new Not(or.Right));
                    EliminateNot(equivalent);
                    return equivalent;
                }
            }

            // If none of the above cases happens, return the sentence.
            return sentence;
        }

        private static Sentence DistributeOr(Sentence sentence) {
            // Cast the sentence object into a complex sentence.
            ComplexSentence? complexSentence = sentence as ComplexSentence;
            
            // If sentence is not a complex sentence, it is an atomic sentence. No more work is needed.
            if (complexSentence == null) return sentence;

            // Recursively distribute OR on the left and right operands
            complexSentence.Left = DistributeOr(complexSentence.Left);
            complexSentence.Right = DistributeOr(complexSentence.Right);

            // If this complex sentence is Or, return the correct transformation depending on what is inside it.
            if (complexSentence is Or) {
                // One of these cases will eventually handle the case Or(And(A, B), And(C, D)).
                if (complexSentence.Left is And) {
                    // Case Or(And(A, B), C): return And(Or(A, C), Or(B, C)).
                    And? left = complexSentence.Left as And;

                    if (left != null) {
                        And equivalent = new And(new Or(left.Left, complexSentence.Right), new Or(left.Right, complexSentence.Right));

                        // The transformation may introduce new Or(And) terms. We need to distribute them on both sides of AND.
                        equivalent.Left = DistributeOr(equivalent.Left);
                        equivalent.Right = DistributeOr(equivalent.Right);

                        return equivalent;
                    }
                } else if (complexSentence.Right is And) {
                    // Case Or(A, And(B, C)): return And(Or(A, B), Or(A, C)).
                    And? right = complexSentence.Right as And;
                    
                    if (right != null) {
                        And equivalent = new And(new Or(complexSentence.Left, right.Left), new Or(complexSentence.Left, right.Right));

                        // The transformation may introduce new Or(And) terms. We need to distribute them on both sides of AND.
                        equivalent.Left = DistributeOr(equivalent.Left);
                        equivalent.Right = DistributeOr(equivalent.Right);

                        return equivalent;
                    }
                }
            }

            return sentence;
        }

        private static HashSet<Clause> PLResolve(Clause clauseA, Clause clauseB)
        {
            HashSet<string> complementaryLiteralsA = new HashSet<string>();
            HashSet<string> complementaryLiteralsB = new HashSet<string>();

            foreach (string literal in clauseA) {
                string complement;

                if (literal[0] != '~') {
                    complement = '~' + literal;
                } else {
                    complement = literal.Substring(1);
                }

                if (clauseB.Contains(complement)) {
                    complementaryLiteralsA.Add(literal);
                    complementaryLiteralsB.Add(complement);
                }
            }

            // If there are more than one pair of complementary literals, applying the resolution rule will result in tautologies (clauses that are always true).
            // If that is the case, we return an empty set of resolvents back.
            // Returning an empty set of resolvents is not the same as returning an empty clause.
            if (complementaryLiteralsA.Count != 1) {
                return new HashSet<Clause>(Clause.CreateSetComparer());
            }

            // We construct a new clause.
            // First, we remove the complementary literals in both A and B.
            clauseA.ExceptWith(complementaryLiteralsA);
            clauseB.ExceptWith(complementaryLiteralsB);

            // Then, we construct a new clause.
            Clause resolvent = new Clause();
            resolvent.UnionWith(clauseA);
            resolvent.UnionWith(clauseB);

            // Finally, we add the complementaries back to A and B because we might use A and B later for other resolutions.
            clauseA.UnionWith(complementaryLiteralsA);
            clauseB.UnionWith(complementaryLiteralsB);

            // We return a set containing the single resolvent.
            return new HashSet<Clause>(Clause.CreateSetComparer()) {
                resolvent
            };
        }

        private static Clause ToSetRepresentation(Sentence clauseSentence) {
            Clause clause = new Clause();

            Queue<Sentence> queue = new Queue<Sentence>();
            queue.Enqueue(clauseSentence);

            while (queue.Count != 0) {
                Sentence next = queue.Dequeue();

                if (next is And || next is Imply || next is Iff) {
                    throw new Exception("Input sentence to ToSetRepresentation is not a clause.");
                }

                AtomicSentence? nextAtomic = next as AtomicSentence;
                if (nextAtomic != null) clause.Add(nextAtomic.GetNotation());

                Not? nextNot = next as Not;
                if (nextNot != null) clause.Add("~" + nextNot.Right.GetNotation()); // right is guaranteed to be atomic

                Or? nextOr = next as Or;
                if (nextOr != null) {
                    queue.Enqueue(nextOr.Left);
                    queue.Enqueue(nextOr.Right);
                }
            }

            return clause;
        }
    }
}