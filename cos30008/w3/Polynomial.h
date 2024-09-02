#pragma once

#include <iostream>

#define MAX_POLYNOMIAL 10               // Max degree for input polynomial.
#define MAX_DEGREE MAX_POLYNOMIAL * 2   // Max degree for product polynomial.

class Polynomial {
    private:
        size_t fDegree;                 // The maximum degree of the polynomial.
        double fCoeffs[MAX_DEGREE + 1]; // The coefficients stored as an array in order of decreasing degree.
    
    public:
        Polynomial();

        // This binary operator multiplies two polynomials of degrees i and j.
        // Results in a new polynomial of degree i + j.
        Polynomial operator*(const Polynomial& aRHS) const;
        
        // This binary operator compares two polynomials.
        // Returns true if two polynomials are structurally equivalent (a.k.a. same degrees and coefficients.)
        bool operator==(const Polynomial& aRHS) const;
        
        // This operator reads the polynomial data from the input stream. (Highest to lowest coefficients.)
        friend std::istream& operator>>(std::istream& aIStream, Polynomial& aObject);
        
        // This operator writes the polynomial data into the output stream. (Highest to lowest coefficients.)
        // Ignores terms with coefficients of 0.
        friend std::ostream& operator<<(std::ostream& aOStream, const Polynomial& aObject);
};