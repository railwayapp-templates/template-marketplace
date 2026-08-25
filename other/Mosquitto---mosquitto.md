# Deploy Mosquitto on Railway

Mesagse broker that connects devices and apps over MQTT

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mosquitto)

## About

Eclipse Mosquitto is the reference open-source MQTT broker: a small, fast message router connecting sensors, controllers, mobile apps and backend services over a publish/subscribe protocol built for unreliable networks and tiny devices. Publishers send to topics like `factory/line1/temperature`, subscribers ask for `factory/#`, and the broker handles fan-out, delivery retries, retained "last known value" messages and offline queueing. It runs in a few megabytes of RAM, speaks MQTT 3.1, 3.1.1 and 5.0, and is the broker behind most Home Assistant installs.

Self-host Mosquitto on Railway and your devices talk through a broker you control, with no per-message billing and nobody else holding your telemetry. This template deploys **Mosquitto 2.1** and a small **Caddy gateway** that owns the public domain. The broker offers four transports: plain MQTT on the private network for your other Railway services, MQTT over TLS through a TCP proxy for devices on the internet, MQTT over WebSockets for browsers, and the dashboard that ships with 2.1. All of them require a username and password — anonymous access is off, and the gateway forwards credentials to the broker, so there is only one set to manage. Sessions, subscriptions and retained messages live on a volume, so a redeploy does not lose your topic tree.

![Mosquitto broker and Caddy gateway services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787303550/mosquitto-architecture.png)

MQTT solves a problem HTTP handles badly: thousands of intermittently connected devices pushing small messages and reacting to each other without polling. A broker sits in the middle, so a device never needs to know who is listening. Teams self-host Mosquitto when telemetry is commercially sensitive, or when a cloud IoT bill scales with message count.

Key features:

- **MQTT 3.1, 3.1.1 and 5.0**, including shared subscriptions, topic aliases and message expiry
- **QoS 0, 1 and 2** delivery guarantees, with offline queues for persistent sessions
- **Retained messages**, so a new subscriber immediately learns a topic's current value
- **Last will and testament** messages announcing a device that dropped off the network
- **Built-in dashboard** in 2.1, with live client, traffic and memory charts
- **Bridging** to other brokers, including cloud MQTT services

**Mosquitto** is the broker. It holds no public domain and keeps its state — persistence store, password file, TLS material — on a volume at `/mosquitto/data`. **Gateway** is a Caddy proxy that takes the single public domain and splits traffic by protocol: `Upgrade: websocket` reaches the WebSocket listener, everything else the dashboard. That split exists because a Railway domain maps to one container port and Mosquitto needs two. The gateway adds no login of its own — it passes `Authorization` through to the broker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mosquitto | [gridalpha/mosquitto-railway](https://github.com/gridalpha/mosquitto-railway) | Database |
| Gateway | [gridalpha/mosquitto-railway](https://github.com/gridalpha/mosquitto-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mosquitto | 9884 | Health check listener port |
| `MQTT_URL` | Mosquitto | - | Private connection string |
| `MQTTS_URL` | Mosquitto | - | Public TLS connection string |
| `MQTT_HOST` | Mosquitto | - | Private hostname for consumers |
| `MQTT_PORT` | Mosquitto | 1883 | Private MQTT port for consumers |
| `MQTT_LOG_TYPE` | Mosquitto | error,warning,notice,information | Log levels the broker prints |
| `MQTT_PASSWORD` | Mosquitto | (secret) | Password for that account |
| `MQTT_USERNAME` | Mosquitto | (secret) | Account for MQTT and the dashboard |
| `MQTT_EXTRA_USERS` | Mosquitto | - | Optional user:password,user2:password2 list |
| `MQTT_PASSWORD_HASH` | Mosquitto | (secret) | Password hash algorithm |
| `MQTT_MAX_PACKET_SIZE` | Mosquitto | 2000000 | Largest accepted MQTT packet, bytes |
| `PORT` | Gateway | 8080 | HTTP server listening port |
| `BROKER_HOST` | Gateway | - | Private hostname of the broker |

## Configuration

- **Healthcheck:** `/api/v1/version`
- **TCP Proxies:** 8883
- **Volume:** `/mosquitto/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mosquitto)
