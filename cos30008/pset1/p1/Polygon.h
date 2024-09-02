#pragma once

#include "Vector2D.h"

#define MAX_VERTICES 30 // The maximum number of vertices.

class Polygon
{
private:
    Vector2D fVertices[MAX_VERTICES]; // Vertices are stored as 2D vectors in an array.
    size_t fNumberOfVertices;         // The number of vertices. It is initialized to 0.

public:
    // Constructor for the Polygon class.
    // Initializes the number of vertices to 0.
    Polygon();

    // Getter for the number of vertices.
    size_t getNumberOfVertices() const;
    // Getter for a specific vertex of the polygon.
    const Vector2D &getVertex(size_t aIndex) const;

    // Reads the polygon data from an input stream.
    void readData(std::istream &aIstream);

    // Calculates the perimeter of the polygon.
    float getPerimeter() const;

    // Scales the polygon by a scalar factor, resulting in a new polygon.
    Polygon scale(float aScalar);

    // Calculates the signed area of the polygon using the shoelace algorithm.
    float getSignedArea() const;
};