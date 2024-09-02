#include "DataWrapper.h"
#include <fstream>
#include <iostream>
#include <stdexcept>

const char DataMap::getAsChar() const {
    return static_cast<const char>(fDatum);
}

DataWrapper::DataWrapper() {
    fSize = 0;
    fData = nullptr;
}

DataWrapper::~DataWrapper() {
    delete fData;
}

bool DataWrapper::load(const std::string& aFileName) {
    std::ifstream stream(aFileName);

    stream >> fSize;

    fData = new DataMap[fSize];

    size_t a, b;
    DataMap map;

    for (size_t i = 0; i < fSize; i++) {
        stream >> a >> b;
        map = DataMap();
        map.fIndex = a;
        map.fDatum = b;
        fData[i] = map;
    }

    return true;
}

size_t DataWrapper::size() const {
    return fSize;
}

const DataMap& DataWrapper::operator[]( size_t aIndex ) const {
    if (aIndex >= fSize) {
        throw std::out_of_range("Index is out of bounds.");
    }

    return fData[aIndex];
}

const char DataWrapper::get(size_t aIndex, Callable aSelector) {
    return aSelector(aIndex);
}