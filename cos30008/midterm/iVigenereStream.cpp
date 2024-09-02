#include "iVigenereStream.h"

iVigenereStream::iVigenereStream(Cipher aCipher, const std::string &aKeyword, const char *aFileName) : fCipher(aCipher), fCipherProvider(Vigenere(aKeyword))
{
    if (aFileName != nullptr) {
        open(aFileName);
    }
}

iVigenereStream::~iVigenereStream() {
    if (is_open()) {
        close();
    }
}

void iVigenereStream::open(const char* aFileName) {
    fIStream.open(aFileName, std::ifstream::binary);
}

void iVigenereStream::close() {
    fIStream.close();
}

void iVigenereStream::reset() {
    fCipherProvider.reset();
    seekstart();
}

bool iVigenereStream::good() const {
    return fIStream.good();
}

bool iVigenereStream::is_open() const {
    return fIStream.is_open();
}

bool iVigenereStream::eof() const {
    return fIStream.eof();
}

iVigenereStream& iVigenereStream::operator>>(char &aCharacter) {
    char c = fIStream.get();
    aCharacter = fCipher(fCipherProvider, c);
    return *this;
}