<img width="350" height="341" alt="Screenshot 2026-11-01 233602" src="https://github.com/user-attachments/assets/68f00545-0cda-4ea9-9d1d-18774e85e1fb" />


# Arcadia

## Overview
Arcadia is an emulation console built on an old laptop’s motherboard that runs games from Retroarch's cores. The custom controller connects to the mother board using a wired Raspberry Pi Pico based controller made on an XBOX controller layout. The end goal of Arcadia is to make games of various retro consoles playable at a single machine using any controller.

## PCB Architecture and design plus VERSION 1 of Controller design(will be improved drastically by next week)

<img width="1500" height="882" alt="image" src="https://github.com/user-attachments/assets/e07d0d3f-ba62-4615-84f0-e0cbde2840b3" />

**Schematic diagram of main PCB**

<img width="1562" height="866" alt="image" src="https://github.com/user-attachments/assets/3ffb7dcc-1673-407a-93a4-d78e2ca00c09" />

**PCB diagram of main PCB**

<img width="1551" height="845" alt="image" src="https://github.com/user-attachments/assets/8a18bf92-9916-4f6d-bcd2-391da6cd8dff" />
<img width="1662" height="945" alt="image" src="https://github.com/user-attachments/assets/5f7a8185-6fc0-463c-b5d3-dc94b3ef520f" />

**Main PCB in 3d viewer**

<img width="1647" height="817" alt="image" src="https://github.com/user-attachments/assets/ff3a3fb3-79c7-45b8-b730-617fce480914" />

**Schematic diagram of Shoulder Board(LT,LB,RT,RB)**

<img width="1230" height="692" alt="PCB controller + shell (Assembly)" src="https://github.com/user-attachments/assets/503f1809-fdfb-4e13-a98e-9df89af5ebc3" />

**Rendered Image**

<img width="1237" height="768" alt="image" src="https://github.com/user-attachments/assets/f937e1e3-886e-4a41-8bd6-f3825b0c28fe" />

**PCB diagram of shoulder PCB**

<img width="1213" height="572" alt="image" src="https://github.com/user-attachments/assets/6b477c23-7f5e-44a0-83f0-11ea2e6d4218" />
<img width="1265" height="690" alt="image" src="https://github.com/user-attachments/assets/755f6e9a-c22c-40a9-b52f-12eea42210d6" />

**Shoulder PCB in 3d viewer**
...

## How do these boards connect/will connect to the 3d model:
There will be two copies used of shoulder board one for LB and LT and another for RB and RT and they will be tilted inwards at an angle of 45 degree and will be attached to the main PCB.

## UI images
**Title Screen(Animations)**


**Loading Screen**
<img width="1440" height="1024" alt="Arcadia" src="https://github.com/user-attachments/assets/31fe5880-4edc-4c95-b8ab-7ec24ad9cd34" />


**Main Screen (designed on figma)**
<img width="1440" height="1024" alt="Arcadia1" src="https://github.com/user-attachments/assets/3f8295f7-ea3f-41df-baa2-9f868e9bde02" />
<img width="1440" height="1024" alt="Arcadia2" src="https://github.com/user-attachments/assets/3509efe8-1121-4b02-a6b8-19dff5c17352" />
<img width="1440" height="1024" alt="Arcadia3" src="https://github.com/user-attachments/assets/925e0d78-5ee1-4ee9-9a86-00efba787ac5" />



## CAD Images
<img width="1032" height="732" alt="image" src="https://github.com/user-attachments/assets/c0cee25d-5aa2-4043-85ad-b3f4e7ffad4a" />

**Console Case with compartment for controller storage**

<img width="1150" height="747" alt="image" src="https://github.com/user-attachments/assets/34bf74c8-6391-4a58-8f68-003fc5ddf4bf" />

**Controller Cad for first week it is bad will be improved a lot by next week**

<img width="1160" height="696" alt="image" src="https://github.com/user-attachments/assets/ad56a799-9f2f-4f81-a1a2-aa13ec4ed743" />

**Controller PCB together with Shoulder PCB**

## File Structure

Arcadia/

├── Cad(stil under development)/                  # Fusion 360 model, assembly to be finished by next week.

├── Kicad/       # KiCad project files with their step models.

├── firmware/                 # Control software for the Raspberry Pi Pico controller written in arduino IDE.

├── Gerber files             # Gerber files for PCB manufacturing.

└── README.md             # Project documentation.

# Controller
## Controller Description
- **The controller consists of two alps alpine joysticks(ALPSALPINE RKJXV1224005)** with **digital tactile switches** for menu, view, home, reset etc. It also contains **4 right angled trigger buttons** (XKB Connection TC-1102N-C-DL-B) for LB, LT, RB, RT.
- The controller runs with a raspberry pi pico.
---
## Hardware Requirements
* Raspberry Pi Pico (RP2040)
* 1x Controller main PCB + 2x shoulder PCBs
* 2x Alps RKJXV1224005 analog joysticks
* 1x MCP3008-I/P ADC (DIP-16) + DIP-16 socket
* 12x 6x6 mm tactile switches (D-pad, ABXY, Menu, View, Home, Reset)
* 4x TC-1102N-C-DL-B right-angle tactile switches (LB, LT, RB, RT)
* 2x 100 nF ceramic capacitors
* 4x JST-XH 3-pin headers (B3B-XH-A) + 2x JST-XH 3-pin cables (straight-through)
* 4x M3 screws (main board) + 2x M2 screws (shoulder boards)
* Micro-USB cable
* 3D printed shell and button caps (PLA/PETG recommended)

## Pin Map

### Buttons
| Button | Pico GPIO |
|---|---|
| A | GPIO10 |
| B | GPIO9 |
| X | GPIO8 |
| Y | GPIO7 |
| LB | GPIO6 (via J1) |
| LT | GPIO5 (via J1) |
| RB | GPIO4 (via J2) |
| RT | GPIO3 (via J2) |
| View | GPIO0 |
| Home | GPIO1 |
| Menu | GPIO2 |
| D-pad Up | GPIO14 |
| D-pad Down | GPIO13 |
| D-pad Left | GPIO12 |
| D-pad Right | GPIO11 |
| L3 (left stick click) | GPIO26 |
| R3 (right stick click) | GPIO27 |
| Reset | RUN (pin 30) |

All buttons are active-low (internal pull-ups, other side to GND).

### Joysticks (via MCP3008)
| Axis | MCP3008 channel |
|---|---|
| Left stick X | CH0 |
| Left stick Y | CH1 |
| Right stick X | CH2 |
| Right stick Y | CH3 |

### MCP3008 SPI
| MCP3008 pin | Pico GPIO |
|---|---|
| DOUT (12) | GPIO16 (SPI0 RX) |
| CS (10) | GPIO17 |
| CLK (13) | GPIO18 (SPI0 SCK) |
| DIN (11) | GPIO19 (SPI0 TX) |

### Shoulder board connectors (JST-XH)
| Connector | Pin 1 | Pin 2 | Pin 3 |
|---|---|---|---|
| J1 (left) | GND | LB (GPIO6) | LT (GPIO5) |
| J2 (right) | GND | RB (GPIO4) | RT (GPIO3) |

## Credits:

Made by **thenobrainers** -- Rishu, Araadh and Siddak with love ❤️.
