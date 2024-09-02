#include "IntVector.h"
#include <stdexcept>

IntVector::IntVector(const int aArrayOfIntegers[], size_t aNumberOfElements)
{
    fNumberOfElements = aNumberOfElements;
    fElements = new int[fNumberOfElements];

    for (size_t i = 0; i < fNumberOfElements; i++)
    {
        fElements[i] = aArrayOfIntegers[i];
    }
}

IntVector::~IntVector()
{
    delete[] fElements;
}

size_t IntVector::size() const
{
    return fNumberOfElements;
}

void IntVector::swap(size_t aSourceIndex, size_t aTargetIndex)
{
    if (aSourceIndex < fNumberOfElements && aTargetIndex < fNumberOfElements)
    {
        int temp = fElements[aSourceIndex];
        fElements[aSourceIndex] = fElements[aTargetIndex];
        fElements[aTargetIndex] = temp;
        return;
    }

    throw std::out_of_range("Illegal vector indices");
}

const int IntVector::get(size_t aIndex) const
{
    if (aIndex < fNumberOfElements)
    {
        return (*this)[aIndex];
    }

    throw std::out_of_range("Illegal vector index");
}

const int IntVector::operator[](size_t aIndex) const
{
    if (aIndex < fNumberOfElements)
    {
        return fElements[aIndex];
    }

    throw std::out_of_range("Illegal vector index");
}