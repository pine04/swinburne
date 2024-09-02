
// COS30008, Final Exam, 2022

#pragma once

#include <stdexcept>
#include <algorithm>

template<typename T>
class TernaryTreePrefixIterator;

template<typename T>
class TernaryTree
{
public:
    
    using TTree = TernaryTree<T>;
    using TSubTree = TTree*;

private:
    
    T fKey;
    TSubTree fSubTrees[3];

    // private default constructor used for declaration of NIL
    TernaryTree() :
        fKey(T())
    {
        for ( size_t i = 0; i < 3; i++ )
        {
            fSubTrees[i] = &NIL;
        }
    }

public:

    using Iterator = TernaryTreePrefixIterator<T>;
        
    static TTree NIL;           // sentinel

    // getters for subtrees
    const TTree& getLeft() const { return *fSubTrees[0]; }
    const TTree& getMiddle() const { return *fSubTrees[1]; }
    const TTree& getRight() const { return *fSubTrees[2]; }

    // add a subtree
    void addLeft( const TTree& aTTree ) { addSubTree( 0, aTTree ); }
    void addMiddle( const TTree& aTTree ) { addSubTree( 1, aTTree ); }
    void addRight( const TTree& aTTree ) { addSubTree( 2, aTTree ); }
            
    // remove a subtree, may through a domain error
    const TTree& removeLeft() { return removeSubTree( 0 ); }
    const TTree& removeMiddle() { return removeSubTree( 1 ); }
    const TTree& removeRight() { return removeSubTree( 2 ); }

/////////////////////////////////////////////////////////////////////////
// Problem 1: TernaryTree Basic Infrastructure

private:

    // remove a subtree, may throw a domain error [22]
    const TTree& removeSubTree( size_t aSubtreeIndex ) {
        if (aSubtreeIndex > 2) {
            throw std::domain_error("Invalid subtree index!");
        }

        if (fSubTrees[aSubtreeIndex] == &NIL) {
            throw std::domain_error("Subtree is NIL");
        }

        TSubTree tmp = fSubTrees[aSubtreeIndex];
        fSubTrees[aSubtreeIndex] = &NIL;
        return *tmp;
    }
    
    // add a subtree; must avoid memory leaks; may throw domain error [18]
    void addSubTree( size_t aSubtreeIndex, const TTree& aTTree ) {
        if (aSubtreeIndex > 2) {
            throw std::domain_error("Invalid subtree index!");
        }

        if (fSubTrees[aSubtreeIndex] != &NIL) {
            throw std::domain_error("Subtree is not NIL");
        }

        fSubTrees[aSubtreeIndex] = const_cast<TSubTree>(&aTTree);
    }
    
public:
    
    // TernaryTree l-value constructor [10]
	TernaryTree( const T& aKey ) : fKey(aKey) {
        for ( size_t i = 0; i < 3; i++ )
        {
            fSubTrees[i] = &NIL;
        }
    }
    
    // destructor (free sub-trees, must not free empty trees) [14]
	~TernaryTree() {
        if (!empty()) {
            for (size_t i = 0; i < 3; i++) {
                if (fSubTrees[i] != &NIL) delete fSubTrees[i];
            }
        }
    }
    
    // return key value, may throw domain_error if empty [2]
	const T& operator*() const {
        if (empty()) {
            throw std::domain_error("Tree is empty.");
        }

        return fKey;
    }

    // returns true if this ternary tree is empty [4]
	bool empty() const {
        return this == &NIL;
    }

    // returns true if this ternary tree is a leaf [10]
	bool leaf() const {
        return fSubTrees[0]->empty() && fSubTrees[1]->empty() && fSubTrees[2]->empty();
    }

    // return height of ternary tree, may throw domain_error if empty [48]
    size_t height() const {
        if (this == &NIL) {
            throw std::domain_error("Operation not supported");
        }

        int height = 0;

        if (!fSubTrees[0]->empty()) {
            int maxLeft = fSubTrees[0]->height() + 1;
            if (maxLeft > height) height = maxLeft;
        }

        if (!fSubTrees[1]->empty()) {
            int maxMid = fSubTrees[1]->height() + 1;
            if (maxMid > height) height = maxMid;
        }

        if (!fSubTrees[2]->empty()) {
            int maxRight = fSubTrees[2]->height() + 1;
            if (maxRight > height) height = maxRight;
        }

        return height;
    }
    
/////////////////////////////////////////////////////////////////////////
// Problem 2: TernaryTree Copy Semantics
    
    // copy constructor, must not copy empty ternary tree
	TernaryTree( const TTree& aOtherTTree ) {
        if (aOtherTTree.empty()) {
            throw std::domain_error("NIL as source not permitted");
        }

        fKey = aOtherTTree.fKey;

        for ( size_t i = 0; i < 3; i++ )
        {
            fSubTrees[i] = &NIL;
        }

        if (!aOtherTTree.fSubTrees[0]->empty()) {
            fSubTrees[0] = aOtherTTree.fSubTrees[0]->clone();
        } 

        if (!aOtherTTree.fSubTrees[1]->empty()) {
            fSubTrees[1] = aOtherTTree.fSubTrees[1]->clone();
        } 

        if (!aOtherTTree.fSubTrees[2]->empty()) {
            fSubTrees[2] = aOtherTTree.fSubTrees[2]->clone();
        }
    }

    // copy assignment operator, must not copy empty ternary tree
    // may throw a domain error on attempts to copy NIL
	TTree& operator=( const TTree& aOtherTTree ) {
        if (aOtherTTree.empty()) {
            throw std::domain_error("NIL as source not permitted");
        }

        if (this != &aOtherTTree) {
            this->~TernaryTree();

            fKey = aOtherTTree.fKey;

            for ( size_t i = 0; i < 3; i++ )
            {
                fSubTrees[i] = &NIL;
            }

            if (!aOtherTTree.fSubTrees[0]->empty()) {
                fSubTrees[0] = aOtherTTree.fSubTrees[0]->clone();
            } 

            if (!aOtherTTree.fSubTrees[1]->empty()) {
                fSubTrees[1] = aOtherTTree.fSubTrees[1]->clone();
            } 

            if (!aOtherTTree.fSubTrees[2]->empty()) {
                fSubTrees[2] = aOtherTTree.fSubTrees[2]->clone();
            }
        }

        return *this;
    }
    
    // clone ternary tree, must not copy empty trees
	TSubTree clone() const {
        if (empty()) return const_cast<TSubTree>(this);

        return new TTree(*this);
    }

/////////////////////////////////////////////////////////////////////////
// Problem 3: TernaryTree Move Semantics

    // TTree r-value constructor
	TernaryTree( T&& aKey ) {
        fKey = std::move(aKey);

        for ( size_t i = 0; i < 3; i++ )
        {
            fSubTrees[i] = &NIL;
        }
    }

    // move constructor, must not copy empty ternary tree
	TernaryTree( TTree&& aOtherTTree ) {
        if (aOtherTTree.empty()) {
            throw std::domain_error("NIL as source not permitted");
        }

        for ( size_t i = 0; i < 3; i++ )
        {
            fSubTrees[i] = &NIL;
        }

        *this = std::move(aOtherTTree);
    }

    // move assignment operator, must not copy empty ternary tree
	TTree& operator=( TTree&& aOtherTTree ) {
        if (aOtherTTree.empty()) {
            throw std::domain_error("NIL as source not permitted");
        }

        if (this != &aOtherTTree) {
            this->~TernaryTree();

            for ( size_t i = 0; i < 3; i++ )
            {
                fSubTrees[i] = &NIL;
            }

            fKey = std::move(aOtherTTree.fKey);

            if (!aOtherTTree.fSubTrees[0]->empty()) {
                fSubTrees[0] = const_cast<TSubTree>(&aOtherTTree.removeLeft());
            } 

            if (!aOtherTTree.fSubTrees[1]->empty()) {
                fSubTrees[1] = const_cast<TSubTree>(&aOtherTTree.removeMiddle());
            } 

            if (!aOtherTTree.fSubTrees[2]->empty()) {
                fSubTrees[2] = const_cast<TSubTree>(&aOtherTTree.removeRight());
            }
        }

        return *this;
    }
    
/////////////////////////////////////////////////////////////////////////
// Problem 4: TernaryTree Prefix Iterator

    // return ternary tree prefix iterator positioned at start
	Iterator begin() const {
        return Iterator(this);
    }

    // return ternary prefix iterator positioned at end
	Iterator end() const {
        return Iterator(this).end();
    }
};

template<typename T>
TernaryTree<T> TernaryTree<T>::NIL;
