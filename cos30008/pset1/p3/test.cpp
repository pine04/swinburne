#include <iostream>
#include "Combination.h"

int main() {
    size_t n, k;

    std::cin >> n >> k;

    Combination combination(n, k);
    std::cout << combination() << std::endl;

    std::cout << (n / k) << std::endl;
}