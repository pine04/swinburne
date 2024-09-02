#include <iostream>
#include <cmath>

#include "Polynomial.h"

// Constructor for the Polynomial class.
// Initializes the degree and all coefficients to 0.
Polynomial::Polynomial() : fDegree(0)
{
    for (size_t i = 0; i < MAX_DEGREE + 1; i++)
    {
        fCoeffs[i] = 0.0;
    }
}

// Reads the degree of the polynomial first, then all the coefficients.
// The number of coefficients = the degree + 1.
std::istream &operator>>(std::istream &aIStream, Polynomial &aObject)
{
    aIStream >> aObject.fDegree;

    for (size_t i = 0; i <= aObject.fDegree; i++)
    {
        aIStream >> aObject.fCoeffs[i];
    }

    return aIStream;
}

// Prints the polynomial, ignoring the 0.0 coefficients.
std::ostream &operator<<(std::ostream &aOStream, const Polynomial &aObject)
{
    for (size_t i = 0; i <= aObject.fDegree; i++)
    {
        if (aObject.fCoeffs[i] != 0.0)
        {
            if (i != 0)
            {
                aOStream << " + ";
            }

            aOStream << aObject.fCoeffs[i] << "x^" << aObject.fDegree - i;
        }
    }

    return aOStream;
}

// Multiplies the two polynomials of degrees a, b to produce a new polynomial of degree a + b.
// Procedure description:
// Given polynomial A of degree a, the coefficient at index i (0 <= i <= a) corresponds to the term of degree a - i.
//       polynomial B of degree b, the coefficient at index j (0 <= j <= b) corresponds to the term of degree b - j.
// Let polynomial C be the product of A and B. Therefore, its degree is a + b.
// Multiplying A by B means multiplying each term of A by each term of B then summing all the pairwise products.
// Each pairwise product is a term with coefficient A.coeff[i] * B.coeff[j] and degree (a - i) + (b - j).
// This degree corresponds to index (a + b) - [(a - i) + (b - j)] = i + j in the coefficient array.
// Since some pairwise products may share the same degree, their coefficients must be added at the end of the process.
Polynomial Polynomial::operator*(const Polynomial &aRHS) const
{
    Polynomial result;
    result.fDegree = fDegree + aRHS.fDegree;

    size_t i, j;

    for (i = 0; i <= fDegree; i++)
    {
        for (j = 0; j <= aRHS.fDegree; j++)
        {
            result.fCoeffs[i + j] += fCoeffs[i] * aRHS.fCoeffs[j];
        }
    }

    return result;
}

// Compares the two polynomials, first by their degrees then by their coefficients.
bool Polynomial::operator==(const Polynomial &aRHS) const
{
    if (fDegree != aRHS.fDegree)
        return false;

    for (size_t i = 0; i <= fDegree; i++)
    {
        if (fCoeffs[i] != aRHS.fCoeffs[i])
        {
            return false;
        }
    }

    return true;
}

// Calculates the value of the polynomial for a given X.
double Polynomial::operator()(double aX) const
{
    double result = 0.0;

    for (size_t i = 0; i <= fDegree; i++)
    {
        result += fCoeffs[i] * pow(aX, fDegree - i);
    }

    return result;
}

// Calculates the derivative as a new polynomial with degree fDegree - 1.
Polynomial Polynomial::getDerivative() const
{
    Polynomial derivative;

    if (fDegree == 0)
    {
        derivative.fDegree = 0;
    }
    else
    {
        derivative.fDegree = fDegree - 1;
    }

    for (size_t i = 0; i <= derivative.fDegree; i++)
    {
        derivative.fCoeffs[i] = fCoeffs[i] * (fDegree - i);
    }

    return derivative;
}

// Calculates the indefinite integral as a new polynomial with degree fDegree + 1.
Polynomial Polynomial::getIndefiniteIntegral() const
{
    Polynomial integral;

    integral.fDegree = fDegree + 1;

    for (size_t i = 0; i <= fDegree; i++)
    {
        integral.fCoeffs[i] = fCoeffs[i] / (fDegree - i + 1);
    }

    return integral;
}

// Calculates the definite integral on the interval [aXLow, aXHigh].
double Polynomial::getDefiniteIntegral(double aXLow, double aXHigh) const
{
    Polynomial indefiniteIntegral = getIndefiniteIntegral();
    return indefiniteIntegral(aXHigh) - indefiniteIntegral(aXLow);
}