#include "KeyProvider.h"
#include <cstring>

KeyProvider::KeyProvider(const std::string& aKeyword) { 
    fSize = aKeyword.length();
    fIndex = 0;
    fKeyword = new char[fSize];

    for (size_t i = 0; i < fSize; i++) {
        fKeyword[i] = toupper(aKeyword[i]);
    }
}

KeyProvider::~KeyProvider() {
    delete[] fKeyword;
}

void KeyProvider::initialize(const std::string& aKeyword) {
    // If the length of the new keyword is the same as the old one, there is no need to delete the char array.
    if (fSize != aKeyword.length()) {
        delete[] fKeyword;
        fSize = aKeyword.length();
        fKeyword = new char[fSize];
    }

    fIndex = 0;

    for (size_t i = 0; i < fSize; i++) {
        fKeyword[i] = toupper(aKeyword[i]);
    }
}

char KeyProvider::operator*() const {
    return fKeyword[fIndex];
}

KeyProvider& KeyProvider::operator<<(char aKeyCharacter) {
    fKeyword[fIndex] = toupper(aKeyCharacter);

    fIndex++;
    if (fIndex >= fSize) {
        fIndex = 0;
    }

    return *this;
}