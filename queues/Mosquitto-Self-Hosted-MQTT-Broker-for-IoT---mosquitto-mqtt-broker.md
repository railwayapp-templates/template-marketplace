# Deploy Mosquitto — Self-Hosted MQTT Broker for IoT on Railway

Self-host Mosquitto: lightweight MQTT broker for IoT & Home Assistant.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mosquitto-mqtt-broker)

## About

Eclipse Mosquitto is the most widely used open-source MQTT broker — the lightweight pub/sub
backbone for IoT devices, sensors, home automation, and machine-to-machine messaging. Devices
publish to topics, subscribers receive them, and Mosquitto routes it all with QoS delivery
guarantees and retained messages, so devices reconnecting after downtime still get the latest
state. It supports MQTT 5.0, 3.1.1, and 3.1, plus WebSockets and TLS, and it's famously tiny —
around 3MB RAM for 1,000 connected clients, with tested deployments up to 100,000 clients.

This template deploys Mosquitto with password authentication and persistent storage, pre-wired on
Railway. Connect any MQTT client, Home Assistant, or Node-RED, and run an always-on broker for
~$5/month — unlimited connections and messages, with no per-device cloud fees.

---

MQTT is the standard IoT protocol — lightweight, low-bandwidth, reliable on flaky networks — and
Mosquitto is its reference broker. Any project with sensors, smart-home devices, microcontrollers,
or mobile clients wants an MQTT broker in the middle, decoupling publishers from subscribers.

Running it means a persistent broker, a config file, storage for retained messages, and network
access for devices. Railway runs Mosquitto as a managed container with HTTPS on WebSockets and a
persistent volume — set your credentials, connect devices, and you have an always-on broker without
keeping a Raspberry Pi or home server running 24/7.

> **Config and security note:** Mosquitto needs a config file to do anything useful, and by default
> a secure setup requires `allow_anonymous false` plus a password file (created with
> `mosquitto_passwd`). This template ships with authentication configured so the broker isn't open
> on first boot — always set your own credentials before connecting production devices.

Typical cost: **~$5/month** on Railway's Hobby plan — Mosquitto's footprint is negligible. Hosted
MQTT services like HiveMQ Cloud and cloud IoT hubs charge per-connection or per-message; self-
hosting gives you unlimited connections and messages at flat compute with full ACL control.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mosquitto | [Lima-e-Silva/mosquitto_railway_template](https://github.com/Lima-e-Silva/mosquitto_railway_template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MOSQUITTO_WS_PORT` | 443 | - |
| `MOSQUITTO_PASSWORD` | (secret) | - |
| `MOSQUITTO_USERNAME` | (secret) | The username for connections |

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mosquitto-mqtt-broker)
