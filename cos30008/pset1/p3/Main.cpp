#include <iostream>
#include <iomanip>
#include "Combination.h"

using namespace std;

void runProblem3()
{
    cout << "The first ten levels of Pascal's triangle:" << endl;

    for (size_t n = 0; n < 10; n++)
    {
        cout << "(n=" << n << ", 0<=k<=" << n << "):";

        int lLead = ((10 - static_cast<int>(n))) * 3;
        for (size_t k = 0; k <= n; k++)
        {
            Combination lC(n, k);
            cout << setw(lLead) << " " << setw(3) << lC();
            lLead = 3;
        }

        cout << endl;
    }

    cout << "\nLarge Numbers:" << endl;
    Combination a(28, 14);
    Combination b(52, 5);
    cout << a.getN() << " over " << a.getK() << " = " << a() << endl;
    cout << b.getN() << " over " << b.getK() << " = " << b() << endl;
}

int main() {
    runProblem3();
}