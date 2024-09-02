#include <cmath>
#include "BernsteinBasisPolynomial.h"

// Constructor for the BernsteinBasisPolynomial class.
// Initializes the Combination factor fFactor with the supplied V and N values.
BernsteinBasisPolynomial::BernsteinBasisPolynomial(unsigned int aV, unsigned int aN) : fFactor(Combination(aN, aV)) {}

// Calculates the result of the polynomial for a given value of X.
// Procedure description:
// Output = nCv * x^v * (1-x)^(n-v)
// Note: Due to the implementation of Combination, v is denoted k instead.
double BernsteinBasisPolynomial::operator()(double aX) const
{
    return fFactor() * pow(aX, fFactor.getK()) * pow(1 - aX, fFactor.getN() - fFactor.getK());
}