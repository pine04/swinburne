#include "SortableIntVector.h"

SortableIntVector::SortableIntVector(const int aArrayOfIntegers[], size_t aNumberOfElements) : IntVector::IntVector(aArrayOfIntegers, aNumberOfElements) {}

void SortableIntVector::sort(Comparable aOrderFunction)
{
    for (size_t i = size() - 1; i > 0; i--)
    {
        for (size_t j = 0; j < i; j++)
        {
            if (aOrderFunction(get(j), get(j + 1)))
            {
                swap(j, j + 1);
            }
        }
    }
}