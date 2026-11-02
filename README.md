<img width="1280" height="400" alt="arcadia banner" src="https://github.com/user-attachments/assets/1bf0332e-0315-4ffc-8f8c-6b410a3ff430" />
<img width="1440" height="251" alt="Arcadia" src="https://github.com/user-attachments/assets/75aef43b-0687-4d97-92a2-3191bcbf1009" />


# Arcadia
Arcadia is an emulation console built on an old laptop’s motherboard that runs games from Retroarch's cores. The custom controller connects to the mother board using a wired Raspberry Pi Pico based controller made on an XBOX controller layout. The end goal of Arcadia is to make games of various retro consoles playable at a single machine using any controller.

## UI images
**Title Screen(Animations)**

https://github.com/user-attachments/assets/efa5a282-93ec-4039-b4d3-f5487ecb250c

**Loading Screen**

<img width="1440" height="1024" alt="Arcadia" src="https://github.com/user-attachments/assets/31fe5880-4edc-4c95-b8ab-7ec24ad9cd34" />


**Main Screen (designed on figma)**
<img width="1440" height="1024" alt="Arcadia1" src="https://github.com/user-attachments/assets/3f8295f7-ea3f-41df-baa2-9f868e9bde02" />
<img width="1440" height="1024" alt="Arcadia2" src="https://github.com/user-attachments/assets/3509efe8-1121-4b02-a6b8-19dff5c17352" />
<img width="1440" height="1024" alt="Arcadia3" src="https://github.com/user-attachments/assets/925e0d78-5ee1-4ee9-9a86-00efba787ac5" />

## Console Design(with storage compartment)
<img width="1032" height="732" alt="image" src="https://github.com/user-attachments/assets/c0cee25d-5aa2-4043-85ad-b3f4e7ffad4a" />

# Controller

## Controller Images

**Controller Cad(1st week)**
<img width="1150" height="747" alt="image" src="https://github.com/user-attachments/assets/34bf74c8-6391-4a58-8f68-003fc5ddf4bf" />

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

## PCB Architecture and design plus VERSION 1 of Controller design:
**Schematic diagram of main PCB**
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/9c140363-2e90-4074-8d76-a9b34af81d49" />



**PCB diagram of main PCB**
<img width="1617" height="1020" alt="image" src="https://github.com/user-attachments/assets/d9903adf-c887-4b83-859e-91383c7777a8" />

Most beautiful creation by me :) 

**Main PCB in 3D viewer**
<img width="1433" height="801" alt="image" src="https://github.com/user-attachments/assets/7c26d2a3-6179-47a7-9140-6b100cce4d0f" />
<img width="1255" height="766" alt="image" src="https://github.com/user-attachments/assets/0ded5131-c870-4ee8-ab10-8d624a3fe840" />


**Schematic diagram of Shoulder Board(LT,LB,RT,RB)**
<img width="1441" height="711" alt="image" src="https://github.com/user-attachments/assets/9ecf5756-26d0-428c-8abc-09f896561e36" />


**PCB diagram of shoulder PCB**
<img width="1315" height="788" alt="image" src="https://github.com/user-attachments/assets/269d225d-2143-4fec-859a-05375bc88a4e" />



**Shoulder PCB in 3D Viewer**
<img width="1261" height="672" alt="image" src="https://github.com/user-attachments/assets/5fe131ff-6c39-4da5-a093-77e309f15c46" />
<img width="1147" height="846" alt="image" src="https://github.com/user-attachments/assets/0bbe98d1-6714-447c-8f14-33c79f01b865" />


## How do these boards connect/will connect to the 3d model:
There will be two copies used of shoulder board one for LB and LT and another for RB and RT and they will be tilted inwards at an angle of 45 degree and will be attached to the main PCB.

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

## File Structure

Arcadia/

├── Cad(stil under development)/                  # Fusion 360 model, assembly to be finished by next week.

├── Kicad/       # KiCad project files with their step models.

├── firmware/                 # Control software for the Raspberry Pi Pico controller written in arduino IDE.

├── Gerber files             # Gerber files for PCB manufacturing.

└── README.md             # Project documentation.

## Credits:

Made by **thenobrainers** -- Rishu, Araadh and Siddak with love ❤️.
