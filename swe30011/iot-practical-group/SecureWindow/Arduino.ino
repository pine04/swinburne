#include "Arduino.h"
#include "DFRobotDFPlayerMini.h"
#include <SoftwareSerial.h>

int tripwireInputPin = A0;
int tripwireStatusPin = 2; // Value 0 = Untripped, 1 = Tripped.
int lightPin = 3; // Value 0 = Off, 1 = On.
int tripwireStatePin = 4;
int laserEmitterPin = 5;
int threshold = 900;
unsigned long tripwireCooldown = 15 * 1000;
unsigned long timeWhenTripped = -tripwireCooldown;
unsigned long lightOnDuration = 1000 * 10;
unsigned long timeWhenLightTurnsOn = -lightOnDuration;

SoftwareSerial softSerial(/*rx =*/10, /*tx =*/11);

DFRobotDFPlayerMini myDFPlayer;

void setup() {
  softSerial.begin(9600);
  Serial.begin(115200);

  pinMode(tripwireInputPin, INPUT);
  pinMode(tripwireStatusPin, OUTPUT);
  pinMode(tripwireStatePin, INPUT);
  pinMode(lightPin, OUTPUT);
  pinMode(laserEmitterPin, OUTPUT);

  Serial.println();
  Serial.println(F("Initializing DFPlayer ..."));

  if (!myDFPlayer.begin(softSerial, true, true)) {
    Serial.println(F("Unable to begin player..."));
    while(true);
  }
  Serial.println(F("DFPlayer Mini online."));

  myDFPlayer.setTimeOut(500);
  myDFPlayer.volume(20);
  myDFPlayer.EQ(DFPLAYER_EQ_NORMAL);
  myDFPlayer.outputDevice(DFPLAYER_DEVICE_SD);
}

void loop() {
  unsigned long now = millis();
  
  int tripwireState = digitalRead(tripwireStatePin);
  digitalWrite(laserEmitterPin, tripwireState);

  int laserReading = analogRead(tripwireInputPin);

  if (tripwireState == HIGH && laserReading < threshold && (now - timeWhenTripped >= tripwireCooldown)) {
    // tripped and can be detected
    digitalWrite(tripwireStatusPin, HIGH);
    myDFPlayer.play(1);
    timeWhenTripped = now;
    timeWhenLightTurnsOn = now;
  } else {
    digitalWrite(tripwireStatusPin, LOW);
  }

  if (now - timeWhenLightTurnsOn < lightOnDuration) {
    digitalWrite(lightPin, HIGH);
  } else {
    digitalWrite(lightPin, LOW);
  }
}