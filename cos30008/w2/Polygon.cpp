#include "Polygon.h"

#include <iostream>

Polygon::Polygon() : fNumberOfVertices(0) { }

size_t Polygon::getNumberOfVertices() const {
    return fNumberOfVertices;
}

const Vector2D& Polygon::getVertex(size_t index) const {
    if (index < fNumberOfVertices) {
        return fVertices[index];
    }

    throw std::out_of_range("Index out of range.");
}

void Polygon::readData(std::istream& aIstream) {
    while (aIstream >> fVertices[fNumberOfVertices]) {
        fNumberOfVertices++;
    }
}

float Polygon::getPerimeter() const {
    float perimeter = 0.0f;

    for (int i = 0; i < fNumberOfVertices; i++) {
        perimeter += (fVertices[(i + 1) % fNumberOfVertices] - fVertices[i]).length();
    }

    return perimeter;
}

Polygon Polygon::scale(float aScalar) {
    Polygon result = *this;

    for (int i = 0; i < fNumberOfVertices; i++) {
        result.fVertices[i] = result.fVertices[i] * aScalar;
    }

    return result;
}