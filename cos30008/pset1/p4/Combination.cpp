#include "Combination.h"

// Constructor for the Combination class.
// Initializes the values of N and K.
Combination::Combination(size_t aN, size_t aK) : fN(aN), fK(aK) { }

// Getter function for fN.
size_t Combination::getN() const {
    return fN;
}

// Getter function for fK.
size_t Combination::getK() const {
    return fK;
}

// Calculates the result of N choose K.
// Procedure description:
//  n    (n-0)   (n-1)         (n - (k - 1))
// ( ) = ----- * ----- * ... * -------------
//  k      1       2                 k
unsigned long long Combination::operator()() const {
    unsigned long long numerator = 1, denominator = 1;

    for (size_t i = 0; i < fK; i++) {
        numerator *= fN - i;
        denominator *= i + 1;
    }

    return numerator / denominator;
}