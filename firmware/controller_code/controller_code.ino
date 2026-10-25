// Arcadia controller firmware
// Raspberry Pi Pico + MCP3008, USB gamepad

#include <SPI.h>
#include <Adafruit_MCP3008.h>
#include <Joystick.h>

// ---------- Buttons ----------
// Position 0 = gamepad button 1, position 1 = button 2, etc.
const int BUTTONPINS[] = {
  10,  // 1  A
  9,   // 2  B
  8,   // 3  X
  7,   // 4  Y
  6,   // 5  LB
  4,   // 6  RB
  0,   // 7  View
  2,   // 8  Menu
  26,  // 9  L3
  27,  // 10 R3
  1,   // 11 Home
  5,   // 12 LT
  3,   // 13 RT
  14,  // 14 D-Up
  13,  // 15 D-Down
  12,  // 16 D-Left
  11   // 17 D-Right
};
const int BUTTONCOUNT = 17;

// ---------- MCP3008 SPI pins ----------
const int SPI_RX  = 16;  // MCP3008 DOUT
const int SPI_CS  = 17;  // MCP3008 CS
const int SPI_SCK = 18;  // MCP3008 CLK
const int SPI_TX  = 19;  // MCP3008 DIN

// ---------- MCP3008 channels ----------
const int LEFT_X  = 0;
const int LEFT_Y  = 1;
const int RIGHT_X = 2;
const int RIGHT_Y = 3;

// ---------- Stick settings ----------
const int DEADZONE = 20;                                   // ignore tiny movements around centre
const bool AXIS_INVERT[4] = {false, false, false, false};  // LX, LY, RX, RY - set true if an axis is backwards
int STICK_CENTRES[4] = {512, 512, 512, 512};               // filled in during setup

Adafruit_MCP3008 adc;

// Takes a raw reading (0-1023), applies deadzone and inversion, returns 0-1023
int processAxis(int raw, int centre, bool invert) {
  int offset = raw - centre;
  if (abs(offset) < DEADZONE) {
    offset = 0;
  }
  int value = constrain(512 + offset, 0, 1023);
  if (invert) {
    value = 1023 - value;
  }
  return value;
}

void setup() {
  // Buttons: pull-up, so pressed = LOW
  for (int i = 0; i < BUTTONCOUNT; i++) {
    pinMode(BUTTONPINS[i], INPUT_PULLUP);
  }

  // MCP3008 on SPI0 (CS is handled by the library)
  SPI.setRX(SPI_RX);
  SPI.setSCK(SPI_SCK);
  SPI.setTX(SPI_TX);
  adc.begin(SPI_CS);

  // USB gamepad, send one full report per loop
  Joystick.begin();
  Joystick.useManualSend(true);

  // Calibrate stick centres: average 8 readings per axis while sticks are at rest
  delay(100);
  for (int ch = 0; ch < 4; ch++) {
    long sum = 0;
    for (int s = 0; s < 8; s++) {
      sum += adc.readADC(ch);
      delay(2);
    }
    STICK_CENTRES[ch] = sum / 8;
  }
}

void loop() {
  // Buttons
  for (int i = 0; i < BUTTONCOUNT; i++) {
    bool pressed = (digitalRead(BUTTONPINS[i]) == LOW);
    Joystick.button(i + 1, pressed);
  }

  // Sticks
  int lx = processAxis(adc.readADC(LEFT_X),  STICK_CENTRES[0], AXIS_INVERT[0]);
  int ly = processAxis(adc.readADC(LEFT_Y),  STICK_CENTRES[1], AXIS_INVERT[1]);
  int rx = processAxis(adc.readADC(RIGHT_X), STICK_CENTRES[2], AXIS_INVERT[2]);
  int ry = processAxis(adc.readADC(RIGHT_Y), STICK_CENTRES[3], AXIS_INVERT[3]);

  Joystick.X(lx);        // left stick
  Joystick.Y(ly);
  Joystick.Z(rx);        // right stick
  Joystick.Zrotate(ry);

  Joystick.send_now();
  delay(1);
}