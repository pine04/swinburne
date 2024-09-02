#include <iostream>
#include <utility>

int main() {
    int&& number = 120;
    int movedNumber = std::move(number);

    std::cout << number << std::endl;
    std::cout << movedNumber << std::endl;

    return 0;
}