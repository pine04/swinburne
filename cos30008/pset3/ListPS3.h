#pragma once

#include "DoublyLinkedList.h"
#include "DoublyLinkedListIterator.h"
#include <stdexcept>
#include <iostream>

template<typename T>
class List {
    private:
        using Node = DoublyLinkedList<T>;

        Node* fRoot;
        size_t fCount;
    
    public:
        using Iterator = DoublyLinkedListIterator<T>;

        List() : fCount(0), fRoot(nullptr) { }

        List(const List& aOtherList) {
            fCount = 0;
            fRoot = nullptr;

            for (size_t i = 0; i < aOtherList.size(); i++) {
                this->push_back(aOtherList[i]);
            }
        }

        List& operator=(const List& aOtherList) {
            this->~List();

            fCount = 0;
            fRoot = nullptr;

            for (size_t i = 0; i < aOtherList.size(); i++) {
                this->push_back(aOtherList[i]);
            }

            return *this;
        }

        // ~List() {
        //     Node* node = fRoot;
        //     Node* next = nullptr;

        //     while (node != nullptr) {
        //         next = const_cast<Node*>(&(node->getNext()));
        //         delete node;
        //         node = next;
        //     }
        // }

        ~List()
        {
            while (fRoot != nullptr)
            {
                if (fRoot != &fRoot->getPrevious())
                {
                    Node* lTemp = const_cast<Node*>(&fRoot->getPrevious());
                    lTemp->isolate();
                    delete lTemp;
                }
                else
                {
                    delete fRoot;
                    break;
                }
            }
        }

        bool empty() const {
            return fCount == 0;
        }

        size_t size() const {
            return fCount;
        }

        void push_front(const T& aElement) {
            Node* newNode = new Node(aElement);
            
            if (fRoot != nullptr) {
                fRoot->push_front(*newNode);
            }
            
            fRoot = newNode;
            fCount++;
        }

        void push_back(const T& aElement) {
            Node* newNode = new Node(aElement);
            
            if (fRoot != nullptr) {
                fRoot->push_front(*newNode);
            } else {
                fRoot = newNode;
            }

            fCount++;
        }

        void remove(const T& aElement) {
            Node* lNode = fRoot;
            while (lNode != nullptr)
            {
                if (**lNode == aElement)
                {
                    break;
                }
                if (lNode != &fRoot->getPrevious())
                {
                    lNode = const_cast<Node*>(&lNode->getNext());
                }
                else
                {
                    lNode = nullptr;
                }
            }
            if (lNode != nullptr)
            {
                if (fCount != 1)
                {
                    if (lNode == fRoot)
                    {
                        fRoot = const_cast<Node*>(&fRoot->getNext());
                    }
                }
                else
                {
                    fRoot = nullptr;
                }
                lNode->isolate();
                delete lNode;
                fCount--;
            }
        }

        const T& operator[](size_t aIndex) const {
            if (aIndex >= fCount) {
                throw std::out_of_range("Index out of bounds.");
            }

            Node* targetNode = fRoot;
            for (size_t i = 0; i < aIndex; i++) {
                targetNode = const_cast<Node*>(&(targetNode->getNext()));
            }

            return targetNode->getPayload();
        }

        Iterator begin() const {
            Iterator begin = Iterator(fRoot).begin();
            return begin;
        }

        Iterator end() const {
            Iterator end = Iterator(fRoot).end();
            return end;
        }

        Iterator rbegin() const {
            Iterator rbegin = Iterator(fRoot).rbegin();
            return rbegin;
        }

        Iterator rend() const {
            Iterator rend = Iterator(fRoot).rend();
            return rend;
        }

        List(List&& aOtherList) {
            fCount = aOtherList.size();
            fRoot = aOtherList.fRoot;

            aOtherList.fRoot = nullptr;
            aOtherList.fCount = 0;
        }

        List& operator=(List&& aOtherList) {
            this->~List();

            fCount = aOtherList.size();
            fRoot = aOtherList.fRoot;

            aOtherList.fRoot = nullptr;
            aOtherList.fCount = 0;

            return *this;
        }

        void push_front(T&& aElement) {
            Node* newNode = new Node(std::move(aElement));
            
            if (fRoot != nullptr) {
                fRoot->push_front(*newNode);
            }
            
            fRoot = newNode;
            fCount++;
        }

        void push_back(T&& aElement) {
            Node* newNode = new Node(std::move(aElement));
            
            if (fRoot != nullptr) {
                fRoot->push_front(*newNode);
            } else {
                fRoot = newNode;
            }

            fCount++;
        }
};