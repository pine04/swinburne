#pragma once

#include "BinarySearchTree.h"

#include <stack>

template <typename T>
class BinarySearchTreeIterator
{
private:
    using BSTree = BinarySearchTree<T>;
    using BNode = BinaryTreeNode<T>;
    using BTreeNode = BNode *;
    using BTNStack = std::stack<BTreeNode>;

    const BSTree &fBSTree;
    BTNStack fStack;

    void pushLeft(BTreeNode aNode) {
        while (!aNode->empty()) {
            fStack.push(aNode);
            aNode = aNode->left;
        }
    }

public:
// do we need checks?
    using Iterator = BinarySearchTreeIterator<T>;

    BinarySearchTreeIterator(const BSTree &aBSTree) : fBSTree(aBSTree) {
        fStack = std::stack<BTreeNode>();
        pushLeft(fBSTree.fRoot);
    }

    const T &operator*() const {
        return fStack.top()->key;
    }

    Iterator &operator++() {
        BTreeNode top = fStack.top();
        fStack.pop();

        if (!top->right->empty()) {
            pushLeft(top->right);
        }

        return *this;
    }

    Iterator operator++(int) {
        Iterator original = *this;
        ++(*this);
        return original;
    }

    bool operator==(const Iterator &aOtherIter) const {
        return (&fBSTree == &aOtherIter.fBSTree) && (fStack == aOtherIter.fStack);
    }
    bool operator!=(const Iterator &aOtherIter) const {
        return !(*this == aOtherIter);
    }

    Iterator begin() const {
        Iterator beginIterator = *this;
        beginIterator.fStack = std::stack<BTreeNode>();
        beginIterator.pushLeft(fBSTree.fRoot);
        return beginIterator;
    }

    Iterator end() const {
        Iterator endIterator = *this;
        endIterator.fStack = std::stack<BTreeNode>();
        return endIterator;
    }
};