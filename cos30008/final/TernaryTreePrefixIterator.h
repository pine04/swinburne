
// COS30008, Final Exam, 2022

#pragma once

#include "TernaryTree.h"

#include <stack>

template<typename T>
class TernaryTreePrefixIterator
{
private:
    using TTree = TernaryTree<T>;
    using TTreeNode = TTree*;
    using TTreeStack = std::stack<const TTree*>;
    
    const TTree* fTTree;                // ternary tree
    TTreeStack fStack;                  // traversal stack

public:

    using Iterator = TernaryTreePrefixIterator<T>;
       
    Iterator operator++(int)
    {
        Iterator old = *this;

        ++(*this);
           
        return old;
    }
       
    bool operator!=( const Iterator& aOtherIter ) const
    {
        return !(*this == aOtherIter);
    }

/////////////////////////////////////////////////////////////////////////
// Problem 4: TernaryTree Prefix Iterator

private:
    
    // push subtree of aNode [30]
    void push_subtrees( const TTree* aNode ) {
        if (aNode->empty()) {
            throw std::domain_error("Node is NIL");
        }

        if (!aNode->getRight().empty()) fStack.push(const_cast<const TTree*>(&aNode->getRight()));
        if (!aNode->getMiddle().empty()) fStack.push(const_cast<const TTree*>(&aNode->getMiddle()));
        if (!aNode->getLeft().empty()) fStack.push(const_cast<const TTree*>(&aNode->getLeft()));
    }

public:
    
	// iterator constructor [12]
	TernaryTreePrefixIterator( const TTree* aTTree ) : fTTree(aTTree) {
        fStack = TTreeStack();

        if (fTTree != &TTree::NIL) {
            fStack.push(fTTree);
        }
    }

	// iterator dereference [8]
	const T& operator*() const {
        return **(fStack.top());
    }

    // prefix increment [12]
	Iterator& operator++() {
        TTree* node = const_cast<TTree*>(fStack.top());
        fStack.pop();
        push_subtrees(node);

        return *this;
    }

	// iterator equivalence [12]
	bool operator==( const Iterator& aOtherIter ) const {
        return fTTree == aOtherIter.fTTree && fStack == aOtherIter.fStack;
    }

	// auxiliaries [4,10]
	Iterator begin() const {
        Iterator beginIterator = *this;

        beginIterator.fStack = std::stack<const TTree*>();
        if (beginIterator.fTTree != &TTree::NIL) {
            beginIterator.fStack.push(beginIterator.fTTree);
        }

        return beginIterator;
    }

	Iterator end() const {
        Iterator endIterator = *this;
        endIterator.fStack = std::stack<const TTree*>();
        return endIterator;
    }
};
