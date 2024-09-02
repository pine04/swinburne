#include "Vigenere.h"

void Vigenere::initializeTable()
{
    for (char row = 0; row < CHARACTERS; row++)
    {
        char lChar = 'B' + row;
        for (char column = 0; column < CHARACTERS; column++)
        {
            if (lChar > 'Z')
                lChar = 'A';
            fMappingTable[row][column] = lChar++;
        }
    }
}

Vigenere::Vigenere(const std::string &aKeyword) : fKeyword(aKeyword), fKeywordProvider(KeyProvider(aKeyword)) {
    initializeTable();
}

std::string Vigenere::getCurrentKeyword() {
    std::string keyword = "";

    size_t length = fKeyword.length();

    for (size_t i = 0; i < length; i++) {
        char c = *fKeywordProvider;
        keyword += c;
        fKeywordProvider << c;
    }

    return keyword;
}

void Vigenere::reset() {
    fKeywordProvider.initialize(fKeyword);
}

char Vigenere::encode(char aCharacter) {
    bool isLower = islower(aCharacter);

    char currentKeyChar = *fKeywordProvider;
    char charToEncode = toupper(aCharacter);

    char encoded;

    if (isalpha(currentKeyChar) && isalpha(charToEncode)) {
        encoded = fMappingTable[currentKeyChar - 'A'][charToEncode - 'A'];
        fKeywordProvider << charToEncode;
    } else {
        encoded = charToEncode;
    }

    if (isLower) {
        return tolower(encoded);
    } else {
        return encoded;
    }
}

char Vigenere::decode(char aCharacter) {
    bool isLower = islower(aCharacter);

    char currentKeyChar = *fKeywordProvider;
    char charToDecode = toupper(aCharacter);

    char decoded = charToDecode;

    if (isalpha(currentKeyChar) && isalpha(charToDecode)) {
        size_t row = currentKeyChar - 'A';
        
        for (size_t col = 0; col < CHARACTERS; col++) {
            if (charToDecode == fMappingTable[row][col]) {
                decoded = col + 'A';
                break;
            }
        }

        fKeywordProvider << decoded;
    }

    if (isLower) {
        return tolower(decoded);
    } else {
        return decoded;
    }
}