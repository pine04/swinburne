#pragma once

#include "Combination.h"

// https://en.wikipedia.org/wiki/Bernstein_polynomial
class BernsteinBasisPolynomial
{
private:
    Combination fFactor;

public:
    // Constructor for b(v, n) with defaults.
    BernsteinBasisPolynomial(unsigned int aV = 0, unsigned int aN = 0);

    // Call operator to calculate Bernstein base polynomial for a given x.
    double operator()(double aX) const;
};