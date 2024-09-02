#pragma once

template<typename T>
class DoublyLinkedList {
    private:
        T fPayload;
        DoublyLinkedList* fNext;
        DoublyLinkedList* fPrevious;
    
    public:
        explicit DoublyLinkedList(const T& aPayload) : fPayload(aPayload), fNext(this), fPrevious(this) { }
        explicit DoublyLinkedList(T&& aPayload) : fPayload(aPayload), fNext(this), fPrevious(this) { }

        DoublyLinkedList& push_front(DoublyLinkedList& aNode) {
            aNode.fPrevious = fPrevious;
            aNode.fNext = this;
            fPrevious->fNext = &aNode;
            fPrevious = &aNode;

            return aNode;
        }
        DoublyLinkedList& push_back(DoublyLinkedList& aNode) {
            aNode.fNext = fNext;
            aNode.fPrevious = this;
            fNext->fPrevious = &aNode;
            fNext = &aNode;

            return aNode;
        }

        void isolate() {
            fPrevious->fNext = fNext;
            fNext->fPrevious = fPrevious;
        }

        void swap(DoublyLinkedList& aNode) {
            T temp = fPayload;
            fPayload = aNode.fPayload;
            aNode.fPayload = temp;
        }

        const T& operator*() const {
            return fPayload;
        }
        const T& getPayload() const {
            return **this;
        }

        const DoublyLinkedList& getNext() const {
            return *fNext;
        }
        const DoublyLinkedList& getPrevious() const {
            return *fPrevious;
        }
};