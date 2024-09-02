#include "FibonacciSequenceIterator.h"
#include "FibonacciSequence.h"

FibonacciSequenceIterator::FibonacciSequenceIterator(const FibonacciSequence& aSequenceObject, uint64_t aStart) : fSequenceObject(aSequenceObject), fIndex(aStart) { }

FibonacciSequenceIterator::FibonacciSequenceIterator(uint64_t aLimit, uint64_t aStart) : fSequenceObject(FibonacciSequence(aLimit)), fIndex(aStart) { }

const uint64_t& FibonacciSequenceIterator::operator*() const {
    return fSequenceObject.current();
}

FibonacciSequenceIterator& FibonacciSequenceIterator::operator++() {
    fSequenceObject.advance();
    fIndex++;
    return *this;
}

FibonacciSequenceIterator FibonacciSequenceIterator::operator++(int) {
    FibonacciSequenceIterator copy = *this;
    fSequenceObject.advance();
    fIndex++;
    return copy;
}

bool FibonacciSequenceIterator::operator==(const FibonacciSequenceIterator& aOther) const {
    return fIndex == aOther.fIndex;
}

bool FibonacciSequenceIterator::operator!=(const FibonacciSequenceIterator& aOther) const {
    return fIndex != aOther.fIndex;
}

FibonacciSequenceIterator FibonacciSequenceIterator::begin() const {
    FibonacciSequenceIterator iterator = *this;
    iterator.fIndex = 1;
    iterator.fSequenceObject.reset();
    return iterator;
}

FibonacciSequenceIterator FibonacciSequenceIterator::end() const {
    FibonacciSequenceIterator iterator = *this;
    uint64_t lIndex = fSequenceObject.getLimit();

    if (lIndex == 0) {
        iterator.fIndex = 0;
    } else {
        iterator.fIndex = lIndex + 1;
    }
    
    return iterator;
}