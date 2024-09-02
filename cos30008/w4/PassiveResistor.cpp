#include "PassiveResistor.h"
#include "ResistorBase.h"

bool PassiveResistor::mustScale(double aValue) const {
    if (aValue >= 1000.0) {
        return true;
    } else {
        return false;
    }
}

const double PassiveResistor::getMultiplier() const {
    return 0.001;
}

const std::string PassiveResistor::getMajorUnit() const {
    return "Ohm";
}

const std::string PassiveResistor::getMinorUnits() const {
    return "OkM";
}

PassiveResistor::PassiveResistor(double aBaseValue) : ResistorBase::ResistorBase(aBaseValue) { }

double PassiveResistor::getReactance(double aFrequency) const {
    return getBaseValue();
}