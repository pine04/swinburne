#include "FibonacciSequence.h"
#include "FibonacciSequenceIterator.h"
#include <stdexcept>

FibonacciSequence::FibonacciSequence(uint64_t aLimit) : fPrevious(0), fCurrent(1), fPosition(1), fLimit(aLimit) { }

const uint64_t& FibonacciSequence::current() const {
    return fCurrent;
}

void FibonacciSequence::advance() {
    if (fLimit != 0 && fPosition > fLimit) {
        throw std::out_of_range("Out of range.");
    }

    uint64_t temp = fPrevious + fCurrent;
    fPrevious = fCurrent;
    fCurrent = temp;
    fPosition++;
}

const uint64_t& FibonacciSequence::getLimit() const {
    return fLimit;
}

void FibonacciSequence::reset() {
    fPrevious = 0;
    fCurrent = 1;
    fPosition = 1;
}

FibonacciSequenceIterator FibonacciSequence::begin() const {
    FibonacciSequenceIterator iterator(*this);
    return iterator.begin();
}

FibonacciSequenceIterator FibonacciSequence::end() const {
    FibonacciSequenceIterator iterator(*this);
    return iterator.end();
}