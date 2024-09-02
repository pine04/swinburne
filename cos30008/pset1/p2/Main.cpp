#include <iostream>
#include "Polynomial.h"

using namespace std;

void runProblem2()
{
    Polynomial A;
    cout << "Specify polynomial:" << endl;
    cin >> A;
    cout << "A = " << A << endl;
    double x;
    cout << "Specify value of x:" << endl;
    cin >> x;
    cout << "A(x) = " << A(x) << endl;
    Polynomial B;
    if (B == B.getDerivative())
    {
        cout << "Derivative programmatically sound." << endl;
    }
    else
    {
        cout << "Derivative is broken." << endl;
    }
    if (A == A.getIndefiniteIntegral().getDerivative())
    {
        cout << "Polynomial operations are sound." << endl;
    }
    else
    {
        cout << "Polynomial operations are broken." << endl;
    }
    cout << "Indefinite integral of A = "
         << A.getIndefiniteIntegral() << endl;
    cout << "Derivativeof A = "
         << A.getDerivative() << endl;
    cout << "Derivative of indefinite integral of A = "
         << A.getIndefiniteIntegral().getDerivative() << endl;
    cout << "Definite integral of A(xlow=0, xhigh=12.0) = "
         << A.getDefiniteIntegral(0, 12.0) << endl;
}

int main()
{
    runProblem2();
}