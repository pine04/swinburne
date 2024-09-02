#pragma once

#include "DoublyLinkedList.h"

template<typename T>
class DoublyLinkedListIterator {
    private:
        enum class States { BEFORE, DATA, AFTER };
        using Node = DoublyLinkedList<T>;

        const Node* fRoot;
        State fState;
        const Node* fCurrent;
    
    public:
        using Iterator = DoublyLinkedListIterator<T>;

        DoublyLinkedListIterator(const Node* aRoot) : fRoot(aRoot) { }

        const T& operator*() const {
            return **fCurrent;
        }

        Iterator& operator++() {
            if (fState == States.DATA) {
                if (fCurrent == fRoot->fPrevious)
            }
        }

        Iterator operator++(int) {
        }
        Iterator& operator--();
        Iterator operator--(int);
        bool operator==(const Iterator& aOtherIter) const;
        bool operator!=(const Iterator& aOtherIter) const;

        Iterator begin() const;
        Iterator end() const;
        Iterator rbegin() const;
        Iterator rend() const;
};