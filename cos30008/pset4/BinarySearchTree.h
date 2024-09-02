#pragma once

#include "BinaryTreeNode.h"

#include <stdexcept>

template<typename T>
class BinarySearchTreeIterator;

template<typename T>
class BinarySearchTree {
    private:
        using BNode = BinaryTreeNode<T>;
        using BTreeNode = BNode*;

        BTreeNode fRoot;

    public:
        BinarySearchTree() {
            fRoot = &BNode::NIL;
        }

        ~BinarySearchTree() {
            delete fRoot;
        }

        bool empty() const {
            return fRoot->empty();
        }

        size_t height() const {
            if (empty()) {
                throw std::domain_error("Empty tree has no height.");
            }
            return fRoot->height();
        }

        bool insert(const T& aKey) {
            if (fRoot->empty()) {
                fRoot = new BinaryTreeNode<T>(aKey);
                return true;
            } else {
                return fRoot->insert(aKey);
            }
        }

        bool remove(const T& aKey) {
            return fRoot->remove(aKey, fRoot);
        }

        using Iterator = BinarySearchTreeIterator<T>;

        friend class BinarySearchTreeIterator<T>;

        Iterator begin() const {
            Iterator begin = BinarySearchTreeIterator<T>(*this).begin();
            return begin;
        }

        Iterator end() const {
            Iterator end = BinarySearchTreeIterator<T>(*this).end();
            return end;
        }
};