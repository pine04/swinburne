#pragma once

#include <stdexcept>
#include <algorithm>

#include <iostream>

template<typename T>
struct BinaryTreeNode {
    using BNode = BinaryTreeNode<T>;
    using BTreeNode = BNode*;

    T key;
    BTreeNode left;
    BTreeNode right;

    static BNode NIL;

    const T& findMax() const {
        if (empty()) {
            throw std::domain_error("Empty tree encountered.");
        }

        if (right == &NIL) return key;
        return right->findMax();
    }

    const T& findMin() const {
        if (empty()) {
            throw std::domain_error("Empty tree encountered.");
        }

        if (left == &NIL) return key;
        return left->findMin();
    }

    // ASK JAMES ABOUT THIS ----------------------------------------
    // bool remove(const T& aKey, BTreeNode aParent) {
    //     if (empty()) {
    //         return false;
    //     }

    //     std::cout << "Current node: " << key << ", to remove: " << aKey << std::endl;

    //     if (key != aKey) {
    //         return left->remove(aKey, this) || right->remove(aKey, this);
    //     }

    //     // By now, key == aKey.
    //     // if it has no children? -> just delete this node and set the left/right of its parent to nil
    //     if (left == &NIL && right == &NIL) {
    //         if (this == aParent) *aParent = NIL;
    //         if (aParent->left == this) aParent->left = &NIL;
    //         if (aParent->right == this) aParent->right = &NIL;
    //         delete this;
    //         return true;
    //     }

    //     // if it has one children -> link it to parent? link left or right tho
    //     if (left == &NIL && right != &NIL) {
    //         std::cout << "Before: " << key << std::endl;
    //         if (this == aParent) {
    //             *aParent = *right;
    //         std::cout << "After: " << key << std::endl;
    //         if (aParent->left == this) aParent->left = right;
    //         if (aParent->right == this) aParent->right = right;
    //         right = &NIL;
    //         delete this;
    //         return true;
    //     }

    //     if (left != &NIL && right == &NIL) {
    //         if (this == aParent) *aParent = *left;
    //         if (aParent->left == this) aParent->left = left;
    //         if (aParent->right == this) aParent->right = left;
    //         left = &NIL;
    //         delete this;
    //         return true;
    //     }

    //     // It has two children
    //     T maxLeft = left->findMax();
    //     left->remove(maxLeft, this);
    //     key = maxLeft;
    //     return true;
    // }

    bool remove( const T& aKey, BTreeNode aParent )
    {
        BTreeNode x = this;
        BTreeNode y = aParent;

        while ( !x->empty() )
        {
            if ( aKey == x->key )
            {
                break;
            }

            y = x;                                      // new parent
            
            x = aKey < x->key ? x->left : x->right;
        }

        if ( x->empty() )
        {
            return false;                               // delete failed
        }
        
        if ( !x->left->empty() )
        {
            const T& lKey = x->left->findMax();         // find max to left
            x->key = lKey;
            x->left->remove( lKey, x );
        }
        else
        {
            if ( !x->right->empty() )
            {
                const T& lKey = x->right->findMin();    // find min to right
                x->key = lKey;
                x->right->remove( lKey, x );
            }
            else
            {
                if ( y != &NIL )                        // y can be NIL
                {
                    if ( y->left == x )
                    {
                        y->left = &NIL;
                    }
                    else
                    {
                        y->right = &NIL;
                    }
                }
                
                delete x;                               // free deleted node
            }
        }

        return true;
    }

    BinaryTreeNode() {
        key = T();
        left = &NIL;
        right = &NIL;
    }

    BinaryTreeNode(const T& aKey) {
        key = aKey;
        left = &NIL;
        right = &NIL;
    }

    BinaryTreeNode(T&& aKey) {
        key = std::move(aKey);
        left = &NIL;
        right = &NIL;
    }

    ~BinaryTreeNode() {
        if (left != &NIL) delete left;
        if (right != &NIL) delete right;
    }

    bool empty() const {
        return this == &NIL;
    }

    bool leaf() const {
        return left == &NIL && right == &NIL;
    }

    size_t height() const {
        if (empty()) {
            throw std::domain_error("Empty tree encountered");
        }

        size_t maxSubtreeHeight = 0;

        if (left != &NIL) {
            size_t heightLeft = left->height() + 1;
            if (heightLeft > maxSubtreeHeight) maxSubtreeHeight = heightLeft;
        }

        if (right != &NIL) {
            size_t heightRight = right->height() + 1;
            if (heightRight > maxSubtreeHeight) maxSubtreeHeight = heightRight;
        }

        return maxSubtreeHeight;
    }

    bool insert(const T& aKey) {
        if (empty()) {
            return false;
        }

        if (aKey == key) {
            return false;
        }

        if (aKey < key) {
            if (left == &NIL) {
                left = new BinaryTreeNode<T>(aKey);
                return true;
            } else {
                return left->insert(aKey);
            }
        } else {
            if (right == &NIL) {
                right = new BinaryTreeNode<T>(aKey);
                return true;
            } else {
                return right->insert(aKey);
            }
        }
    }
};

template<typename T>
BinaryTreeNode<T> BinaryTreeNode<T>::NIL;