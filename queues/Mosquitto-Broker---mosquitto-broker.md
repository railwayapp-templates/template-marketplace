# Deploy Mosquitto Broker on Railway

Lightweight MQTT message broker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mosquitto-broker)

## About

Eclipse Mosquitto is an open source **lightweight** message broker that implements the MQTT. It's a **alternative to Kafka** for small projects.

This template provides a straightforward setup for Eclipse Mosquitto with minimal configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mosquitto Broker | [Lima-e-Silva/mosquitto_railway_template](https://github.com/Lima-e-Silva/mosquitto_railway_template) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MOSQUITTO_WS_HOST` | - | The host for websockets connections |
| `MOSQUITTO_WS_PORT` | 443 | The external port for websocket connections |
| `MOSQUITTO_PASSWORD` | (secret) | The password for connections |
| `MOSQUITTO_TCP_HOST` | - | The host for TCP connections |
| `MOSQUITTO_TCP_PORT` | - | The external port for the TCP Proxy |
| `MOSQUITTO_USERNAME` | (secret) | The username for connections |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1883

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mosquitto-broker)
