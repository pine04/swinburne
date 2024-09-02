#pragma once

#include <cstddef>

class IntVector
{
private:
    int *fElements;
    size_t fNumberOfElements;

public:
    IntVector(const int aArrayOfIntegers[], size_t aNumberOfElements);

    virtual ~IntVector();

    size_t size() const;

    const int get(size_t aIndex) const;

    void swap(size_t aSourceIndex, size_t aTargetIndex);

    const int operator[](size_t aIndex) const;
};