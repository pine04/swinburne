#include <iostream>
#include "Polygon.h"

// Constructor for the Polygon class.
// Initializes the number of vertices to 0.
Polygon::Polygon() : fNumberOfVertices(0) {}

// Getter for the number of vertices.
size_t Polygon::getNumberOfVertices() const
{
    return fNumberOfVertices;
}

// Getter for a specific vertex of the polygon.
const Vector2D &Polygon::getVertex(size_t index) const
{
    if (index < fNumberOfVertices)
    {
        return fVertices[index];
    }

    throw std::out_of_range("Index out of range.");
}

// Reads the polygon data from an input stream.
void Polygon::readData(std::istream &aIstream)
{
    while (aIstream >> fVertices[fNumberOfVertices])
    {
        fNumberOfVertices++;
    }
}

// Calculates the perimeter of the polygon.
// The perimeter is the sum of all the polygon's sides.
// Each side is made up of two consecutive vertices.
// Note: The first and last vertices in the array make up a side.
float Polygon::getPerimeter() const
{
    float perimeter = 0.0f;

    for (int i = 0; i < fNumberOfVertices; i++)
    {
        perimeter += (fVertices[(i + 1) % fNumberOfVertices] - fVertices[i]).length();
    }

    return perimeter;
}

// Scales the polygon by a scalar factor, resulting in a new polygon.
Polygon Polygon::scale(float aScalar)
{
    Polygon result = *this;

    for (int i = 0; i < fNumberOfVertices; i++)
    {
        result.fVertices[i] = result.fVertices[i] * aScalar;
    }

    return result;
}

// Calculates the signed area of the polygon using the shoelace algorithm.
float Polygon::getSignedArea() const
{
    float signedArea = 0.0f, determinant;

    for (int i = 0; i < fNumberOfVertices - 1; i++)
    {
        determinant = fVertices[i].getX() * fVertices[i + 1].getY() - fVertices[i].getY() * fVertices[i + 1].getX();
        signedArea += determinant;
    }

    determinant = fVertices[fNumberOfVertices - 1].getX() * fVertices[0].getY() - fVertices[fNumberOfVertices - 1].getY() * fVertices[0].getX();
    signedArea += determinant;

    signedArea *= 0.5;

    return signedArea;
}