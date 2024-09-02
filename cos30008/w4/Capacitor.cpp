#define _USE_MATH_DEFINES

#include "Capacitor.h"
#include "ResistorBase.h"

#include <cmath>

bool Capacitor::mustScale(double aValue) const {
    return aValue < 1.0;
}

const double Capacitor::getMultiplier() const {
    return 1000.0;
}

const std::string Capacitor::getMajorUnit() const {
    return "F";
}

const std::string Capacitor::getMinorUnits() const {
    return "Fmunp";
}

Capacitor::Capacitor(double aBaseValue) : ResistorBase::ResistorBase(aBaseValue) { }

double Capacitor::getReactance(double aFrequency) const {
    double PI = atan(1.0) * 4.0;
    return 1.0 / (2.0 * PI * aFrequency * getBaseValue());
}