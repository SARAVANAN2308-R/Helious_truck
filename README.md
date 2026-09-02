# Electric Truck Energy Monitoring Dashboard

## Project Overview

The Electric Truck Energy Monitoring Dashboard is a web-based monitoring system developed to visualize the electrical parameters of an electric truck charging system.

The project is based on a hybrid energy concept that combines:

- Solar Energy
- Inductive Wireless Power Transfer
- Battery Energy Storage

The dashboard was initially designed to receive real-time electrical data from an ESP32 microcontroller. For the web demonstration and GitHub deployment, the current version uses simulated live data so that the dashboard can operate independently without ESP32 hardware.

---

## Project Objective

The objective of this project is to develop a smart energy monitoring interface for an electric truck that can display and monitor different electrical parameters involved in the charging system.

The system focuses on monitoring:

- Solar Voltage
- Solar Power
- Inductive Charging Voltage
- Inductive Charging Power
- Battery Energy Level
- Forward Radar Distance
- System Charging Status

---

## Features

### Energy Monitoring

The dashboard displays real-time simulated values for:

- Solar Voltage
- Solar Power
- Inductive Voltage
- Inductive Power

### Battery Monitoring

The battery section displays:

- Battery Percentage
- Dynamic Battery Level Animation
- Energy Reserve Status

### Vehicle Status Monitoring

The dashboard includes indicators for:

- AMT System
- Brake System
- Solar Charging
- Inductive Charging
- Forward Radar
- Temperature Monitoring

### System Control

The dashboard provides:

- SYSTEM START Button
- SYSTEM SHUTDOWN Button
- Truck Startup Animation
- Charging Mode Indicator

### Standalone Web Version

The original project used ESP32 as a local server for transferring sensor data.

For GitHub deployment, the ESP32 dependency has been removed and replaced with simulated dynamic data.

This allows the website to run directly in any browser without additional hardware.

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Website Structure |
| CSS3 | User Interface and Styling |
| JavaScript | Dashboard Logic and Data Simulation |
| ESP32 | Original Hardware Data Acquisition |
| GitHub | Source Code Hosting |

---

## Project Structure

```text
Electric-Truck-Dashboard/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── images/
    └── truck3.jpg
