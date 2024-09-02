#include "ResistorBase.h"
#include <stdexcept>

using namespace std;

void ResistorBase::normalize(double& aNormalizedValue, string& aUnit) const {
    aNormalizedValue = getBaseValue();
    string lPrefixes = getMinorUnits();

    for (size_t i = 0; i < lPrefixes.size(); i++) {
        if (mustScale(aNormalizedValue) && (i < lPrefixes.size() - 1)) {
            aNormalizedValue *= getMultiplier();
        } else {
            if (i > 0) {
                aUnit += lPrefixes[i];
            }
            aUnit += getMajorUnit();
            break;
        }
    }
}

void ResistorBase::flatten(const double& aRawValue, const string& aRawUnit) {
    string lMajorUnit = getMajorUnit();
    string lMinorUnits = getMinorUnits();

    if ((aRawUnit.size() > lMajorUnit.size() + 1) || (aRawUnit.find(getMajorUnit()) == string::npos)) {
        throw invalid_argument("Invalid unit specification");
    }

    if ((aRawUnit.size() == lMajorUnit.size() + 1) && lMinorUnits.find(aRawUnit[0]) == string::npos) {
        throw invalid_argument("Invalid unit scale specification");
    }

    double lMultiplier = 1.0;
    size_t i = lMinorUnits.find(aRawUnit[0]);
    double lRawValue = aRawValue;

    for (; i > 0; i--) {
        if (mustScale(lRawValue)) {
            lRawValue /= getMultiplier();
        } else {
            break;
        }
    }

    for (; i > 0; i--) {
        lMultiplier *= 1.0 / getMultiplier();
    }

    setBaseValue(lRawValue * lMultiplier);
}

void ResistorBase::setBaseValue(double aBaseValue) {
    fBaseValue = aBaseValue;
}

ResistorBase::ResistorBase(double aBaseValue) : fBaseValue(aBaseValue) { }

double ResistorBase::getBaseValue() const {
    return fBaseValue;
}

double ResistorBase::getPotentialAt(double aCurrent, double aFrequency) const {
    return aCurrent * getReactance(aFrequency);
}

double ResistorBase::getCurrentAt(double aVoltage, double aFrequency) const {
    return aVoltage / getReactance(aFrequency);
}

std::istream& operator>>(std::istream& aIStream, ResistorBase& aObject) {
    double value;
    string unit;
    aIStream >> value >> unit;

    aObject.flatten(value, unit);

    return aIStream;
}

std::ostream& operator<<(std::ostream& aOStream, const ResistorBase& aObject) {
    double value;
    string unit;

    aObject.normalize(value, unit);

    return aOStream << value << " " << unit;
}