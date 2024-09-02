#define _USE_MATH_DEFINES

#include "Inductor.h"
#include "ResistorBase.h"

#include <cmath>

bool Inductor::mustScale(double aValue) const {
    return aValue < 1.0;
}

const double Inductor::getMultiplier() const {
    return 1000.0;
}

const std::string Inductor::getMajorUnit() const {
    return "H";
}

const std::string Inductor::getMinorUnits() const {
    return "Hmunp";
}

Inductor::Inductor(double aBaseValue) : ResistorBase::ResistorBase(aBaseValue) {}

double Inductor::getReactance(double aFrequency) const {
    double PI = atan(1.0) * 4.0;
    return 2 * PI * aFrequency * getBaseValue();
}