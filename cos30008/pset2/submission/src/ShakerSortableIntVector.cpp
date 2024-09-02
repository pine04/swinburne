#include "ShakerSortableIntVector.h"
#include <iostream>

using namespace std;

ShakerSortableIntVector::ShakerSortableIntVector(const int aArrayOfIntegers[], size_t aNumberOfElements) : SortableIntVector::SortableIntVector(aArrayOfIntegers, aNumberOfElements) { }

void ShakerSortableIntVector::sort(Comparable aOrderFunction) {
    size_t start = 0, end = size() - 1;

    while (start < end) {
        for (size_t i = start; i < end; i++) {
            if (aOrderFunction(get(i), get(i + 1))) {
                swap(i, i + 1);
            }
        }

        end--;

        for (size_t i = end; i > start; i--) {
            if (aOrderFunction(get(i - 1), get(i))) {
                swap(i - 1, i);
            }
        }

        start++;
    }
} 