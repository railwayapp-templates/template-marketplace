# Deploy Mosquitto Broker with JWT Auth on Railway

MQTT message broker with JWT authentication and authorization

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mosquitto-broker-with-jwt-auth)

## About

This project provides a **lightweight** configuration for the Mosquitto MQTT broker with **JSON Web Tokens (JWT) authentication and authorization**.

This template provides a straightforward setup for Eclipse Mosquitto with JWT Auth plugin

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MQTT Broker with JWT | [Lima-e-Silva/mosquitto-jwt](https://github.com/Lima-e-Silva/mosquitto-jwt) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JWT_SECRET` | (secret) | Secret key for JWT authentication |
| `MAX_CONNECTIONS` | 65536 | The maximum number of client connections allowed |
| `MOSQUITTO_WS_HOST` | - | The host for websockets connections |
| `MOSQUITTO_WS_PORT` | 443 | The external port for websocket connections |
| `MOSQUITTO_TCP_HOST` | - | The host for TCP connections |
| `MOSQUITTO_TCP_PORT` | - | The external port for the TCP Proxy |
| `MAX_QUEUED_MESSAGES` | 1024 | The maximum number of QoS 1 or 2 messages to hold in the queue (per client) above those messages that are currently in flight |
| `MAX_INFLIGHT_MESSAGES` | 20 | The maximum number of outgoing QoS 1 or 2 messages that can be in the process of being transmitted simultaneously |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1883

**Category:** Queues · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/mosquitto-broker-with-jwt-auth)
