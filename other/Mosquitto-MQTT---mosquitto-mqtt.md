# Deploy Mosquitto MQTT on Railway

Deploy and Host Mosquitto MQTT with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mosquitto-mqtt)

## About

**What is Mosquitto MQTT?** [Eclipse Mosquitto](https://mosquitto.org/) is a lightweight open-source message broker that implements the MQTT protocol. Publishers send messages to named topics; subscribers receive them in real time. It is widely used for IoT, telemetry, and event-driven backends where many clients need reliable, low-overhead messaging over TCP.

Running Mosquitto in production means packaging the broker (often via Docker), exposing the correct TCP port (typically **1883** for plain MQTT), and persisting state if you rely on retained messages or durable sessions. You configure listeners, logging, and persistence paths, then decide whether connections are anonymous or authenticated (for example with `password_file`). On a platform like Railway, you connect the service’s public hostname and port to your clients, attach a volume for `/mosquitto/data` when you need persistence across deploys, and set environment variables for optional username/password auth so the broker starts with a consistent, secure policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mqtt | [vergissberlin/railwayapp-mqtt](https://github.com/vergissberlin/railwayapp-mqtt) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Europe/Amsterdam | Set the timezone |
| `PORT` | 1883 | D'not change this! |
| `MQTT_PASS` | - | Set the password for MQTT user |
| `MQTT_USER` | (secret) | Set the username for MQTT |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/mosquitto-mqtt)
