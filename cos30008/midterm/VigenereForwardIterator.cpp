#include "VigenereForwardIterator.h"

VigenereForwardIterator::VigenereForwardIterator(iVigenereStream& aIStream) : fIStream(aIStream), fEOF(fIStream.eof()) {
    if (!fEOF) {
        fIStream >> fCurrentChar;
    } else {
        fCurrentChar = 0;
    }
}

char VigenereForwardIterator::operator*() const {
    return fCurrentChar;
}

VigenereForwardIterator& VigenereForwardIterator::operator++() {
    fIStream >> fCurrentChar;
    fEOF = fIStream.eof();
    return *this;
}

VigenereForwardIterator VigenereForwardIterator::operator++(int) {
    VigenereForwardIterator iterator = *this;
    ++(*this);
    return iterator;
}

bool VigenereForwardIterator::operator==(const VigenereForwardIterator& aOther) const {
    return &fIStream == &aOther.fIStream && fEOF == aOther.fEOF;
}

bool VigenereForwardIterator::operator!=(const VigenereForwardIterator& aOther) const {
    return !(*this == aOther);
}

VigenereForwardIterator VigenereForwardIterator::begin() const {
    VigenereForwardIterator begin = *this;
    begin.fIStream.reset();
    begin.fEOF = begin.fIStream.eof();
    begin.fIStream >> begin.fCurrentChar;

    return begin;
}

VigenereForwardIterator VigenereForwardIterator::end() const {
    VigenereForwardIterator end = *this;
    end.fEOF = true;
    return end;
}