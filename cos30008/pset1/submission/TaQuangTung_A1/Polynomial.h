#pragma once

#include <iostream>

#define MAX_POLYNOMIAL 10                   // Max degree for input polynomial.
#define MAX_DEGREE MAX_POLYNOMIAL * 2 + 1   // Max degree for any polynomial. The extra 1 accommodates indefinite integrals.

class Polynomial
{
private:
    size_t fDegree;                 // The maximum degree of the polynomial.
    double fCoeffs[MAX_DEGREE + 1]; // The coefficients stored as an array in order of decreasing degree.

public:
    Polynomial();

    // This binary operator multiplies two polynomials of degrees i and j.
    // Results in a new polynomial of degree i + j.
    Polynomial operator*(const Polynomial &aRHS) const;
        
    // This binary operator compares two polynomials.
    // Returns true if two polynomials are structurally equivalent (a.k.a. same degrees and coefficients.)        
    bool operator==(const Polynomial &aRHS) const;
    
    // This operator reads the polynomial data from the input stream. (Highest to lowest coefficients.)
    friend std::istream &operator>>(std::istream &aIStream, Polynomial &aObject);

    // This operator writes the polynomial data into the output stream. (Highest to lowest coefficients.)
    // Ignores terms with coefficients of 0.
    friend std::ostream &operator<<(std::ostream &aOStream, const Polynomial &aObject);

    // Call operator to calculate the value of the polynomial for a given X.
    double operator()(double aX) const;

    // Returns the derivative of the polynomial as a new polynomial with degree fDegree - 1.
    Polynomial getDerivative() const;

    // Returns the indefinite integral of the polynomial as a new polynomial with degree fDegree + 1.
    Polynomial getIndefiniteIntegral() const;

    // Returns the definite integral of the polynomial on the interval [aXLow, aXHigh].
    // This method calculates the indefinite integral, calculates it with respect to aXLow and aXHigh, and returns the difference.
    double getDefiniteIntegral(double aXLow, double aXHigh) const;
};