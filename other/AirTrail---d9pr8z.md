# Deploy AirTrail on Railway

A modern, open-source personal flight tracking system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/d9pr8z)

## About

# AirTrail: Your Personal Flight Tracker

![preview](https://airtrail.johan.ohly.dk/_next/static/media/dark.f74b3c3e.png)

AirTrail is a self-hosted, open-source platform designed to help you track and analyze your flight history. This modern application provides a user-friendly interface to log your journeys, visualize them on a world map, and gain insights into your travel patterns.

## Why Use AirTrail?

* **Keep a comprehensive record of your flights:**  Never lose track of your travel experiences. 
* **Visualize your journeys:** See your flights plotted on an interactive world map.
* **Gain insights from your travel data:**  Uncover travel trends and statistics with built-in analytics.
* **Take control of your data:** Self-host AirTrail for maximum privacy and security.
* **Enjoy a modern and customizable experience:**  Benefit from a responsive design, dark mode, and multiple user support.

## Key Features

* **Interactive World Map:**  Plot your flights on a world map to visualize your travel history.
* **Detailed Flight History:**  Maintain a detailed log of all your flights, including dates, routes, and airlines.
* **Comprehensive Statistics:**  Gain insights into your travel patterns with various statistics.
* **Multi-User Support:** Share AirTrail with others and manage flights across multiple users. Secure your data with user authentication and OAuth integration.
* **Responsive Design:** Access and use AirTrail seamlessly across various devices (desktops, tablets, and phones).
* **Dark Mode:** Choose between light and dark themes for a personalized viewing experience.
* **Flight Import:** Easily import flight data from popular platforms like MyFlightRadar24, App in the Air, and JetLog.

## Getting Started

AirTrail is designed to be easy to install and use, especially for those familiar with Docker.  

* **Automated Installation (Linux):** A convenient installation script streamlines the setup process on Linux systems with Docker.
* **Docker Compose:**  Alternatively, use Docker Compose for manual installation on any platform that supports Docker.

For detailed installation instructions and further information, refer to the official AirTrail documentation and GitHub repository:

* **Website:** https://airtrail.johan.ohly.dk/
* **GitHub:** https://github.com/johanohly/AirTrail

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AirTrail | `johly/airtrail:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AirTrail | 3000 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/d9pr8z)
