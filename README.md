<img width="1280" height="400" alt="banner" src="https://github.com/user-attachments/assets/013f79f7-9c84-404c-92c0-90bb16c91327" />

# Arcadia

## Overview
Arcadia is an emulation console built on a laptop’s motherboard that runs games from consoles like Xbox, Game Boy and Wii. It connects to the mother board using a wired raspberry pi pico based controller inspired by an XBOX controller. The main mission of Arcadia is to make games of various consoles playable at a single machine using a common controller.
...

## Features
- **The controller consists of two alps alpine joysticks(ALPSALPINE RKJXV1224005)** with **digital tactile switches** for menu, view, home, reset etc. It also contains **4 right angled trigger buttons** (XKB Connection TC-1102N-C-DL-B) for LB, LT, RB, RT.
- The controller is run with a raspberry pi pico.
- The User interface consists of options to select various consoles and its not complete yet as other team members (Rishu and Siddak) were focused on designing and object oriented programmign and somewhat CAD.
- The Main Board has 4 mounting holes to connect to the controller

## PCB Architecture and design plus VERSION 1 of Controller design(will be improved drastically by next week)

<img width="1500" height="882" alt="image" src="https://github.com/user-attachments/assets/e07d0d3f-ba62-4615-84f0-e0cbde2840b3" />

**Schematic diagram of main pcb**

<img width="1562" height="866" alt="image" src="https://github.com/user-attachments/assets/3ffb7dcc-1673-407a-93a4-d78e2ca00c09" />

**pcb diagram of main pcb**

<img width="1551" height="845" alt="image" src="https://github.com/user-attachments/assets/8a18bf92-9916-4f6d-bcd2-391da6cd8dff" />
<img width="1662" height="945" alt="image" src="https://github.com/user-attachments/assets/5f7a8185-6fc0-463c-b5d3-dc94b3ef520f" />

**Main Pcb in 3d viewer**

<img width="1647" height="817" alt="image" src="https://github.com/user-attachments/assets/ff3a3fb3-79c7-45b8-b730-617fce480914" />

**Schematic diagram of shoulder board(lt,lb,rt,rb)**

<img width="1237" height="768" alt="image" src="https://github.com/user-attachments/assets/f937e1e3-886e-4a41-8bd6-f3825b0c28fe" />

**Pcb diagram of shoulder pcb**

<img width="1213" height="572" alt="image" src="https://github.com/user-attachments/assets/6b477c23-7f5e-44a0-83f0-11ea2e6d4218" />
<img width="1265" height="690" alt="image" src="https://github.com/user-attachments/assets/755f6e9a-c22c-40a9-b52f-12eea42210d6" />

**Shoulder Pcb in 3d viewer**
...

## How do these baords connect/will connect to the 3d model:
There will be two copies used of shoulder board one for lb and lt and another for rb and rt and they will be tilted inwards at an angle of 45 degree and will be attatched to the main pcb

## UI images
<img width="1497" height="1051" alt="image" src="https://github.com/user-attachments/assets/f33d0dd5-4c26-4366-a307-96c16c0d711f" />

**Title Screen**

<img width="888" height="888" alt="arcadia logo" src="https://github.com/user-attachments/assets/8ce8acd6-6953-4bc8-b9c2-7ccdc067cd3f" />

**Arcadia Logo**

<img width="700" height="400" alt="image" src="https://github.com/user-attachments/assets/45a1cd0e-fdf8-4b45-a79b-410e865a006a" />

**Concept UI (to be done by next week)**

<img width="1177" height="757" alt="image" src="https://github.com/user-attachments/assets/929e32c5-680e-4fdc-a9f5-bd317c1d683d" />

**Main Screen Designed on figma**

## Cad Images

<img width="1032" height="732" alt="image" src="https://github.com/user-attachments/assets/c0cee25d-5aa2-4043-85ad-b3f4e7ffad4a" />

**Console case designed by Rishu**

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


## Ai usage Declaration
AI model was used to write 30 % of firmware, this would be rectified as the whole firmware from scratch will be written by us next week

## Hardware Requirements
* Raspberry Pi Pico (RP2040)
* 1x Arcadia main PCB + 2x shoulder PCBs
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

Made by **thenobrainers** -- Rishu, Araadh and Siddak.
