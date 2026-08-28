# Deploy EMQX on Railway

MQTT broker that connects IoT devices and routes their messages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emqx)

## About

EMQX is an MQTT 5.0 broker built in Erlang/OTP for connecting large fleets of devices — industrial sensors, vehicles, smart meters, building controllers — and moving their messages to the systems that act on them. It speaks MQTT 5.0, 3.1.1 and 3.1 over TCP and WebSocket, holds retained messages and offline sessions, enforces per-user and per-topic access rules, and ships a Dashboard and REST API covering all of it.

Self-host EMQX on Railway and you get a broker with authentication already switched on, not an open relay you have to remember to lock down. The template runs two services: `emqx`, the broker, with a persistent volume for its built-in database, and `gateway`, a small Caddy proxy that is the only public service. Railway routes one domain to one container port, and EMQX serves its Dashboard on 18083 while MQTT-over-WebSocket lives on 8083 — so the gateway splits them on the `Upgrade` header. One hostname gives you `https://` for the Dashboard and `wss://.../mqtt` as a TLS-terminated MQTT endpoint, and a TCP proxy exposes port 1883 for devices that speak only plain MQTT.

![Diagram of the EMQX broker behind a Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787794513/emqx-architecture.png)

MQTT is a publish/subscribe protocol designed for unreliable networks and small devices, and the broker is what everything else depends on. Self-hosting EMQX makes sense when device data should not leave your infrastructure, or when a managed broker's per-connection pricing stops adding up.

- MQTT 5.0, 3.1.1 and 3.1 over TCP, TLS, WebSocket and secure WebSocket
- Built-in credential database, plus PostgreSQL, MySQL, MongoDB, Redis, LDAP, JWT and HTTP auth backends
- Topic-level authorization with wildcards and `${username}` / `${clientid}` placeholders
- A SQL rules engine routing messages in flight to Kafka, PostgreSQL, webhooks and other sinks
- Retained messages, shared subscriptions, delayed publish and offline queues

The `emqx` service runs the official image with a small wrapper that prepares its volume and configuration at boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [gridalpha/emqx-railway](https://github.com/gridalpha/emqx-railway) (root: edge) | Web service |
| emqx | [gridalpha/emqx-railway](https://github.com/gridalpha/emqx-railway) (root: broker) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | Public HTTP listener |
| `EMQX_WS_UPSTREAM` | gateway | - | Broker MQTT-over-WebSocket listener |
| `EMQX_DASHBOARD_UPSTREAM` | gateway | - | Broker Dashboard listener |
| `PORT` | emqx | 18083 | Dashboard and REST API listener |
| `MQTT_PASSWORD` | emqx | (secret) | Seeded MQTT client password |
| `MQTT_USERNAME` | emqx | (secret) | Seeded MQTT client username |
| `EMQX_NODE_NAME` | emqx | emqx@127.0.0.1 | Erlang node name, must stay fixed |
| `EMQX_NODE__COOKIE` | emqx | - | Erlang distribution cookie |
| `EMQX_SECURITY_PROFILE` | emqx | hardened | Fail-closed authentication defaults |
| `EMQX_DASHBOARD__DEFAULT_PASSWORD` | emqx | (secret) | Administrator password, first boot only |
| `EMQX_DASHBOARD__DEFAULT_USERNAME` | emqx | (secret) | First Dashboard administrator |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1883
- **Volume:** `/opt/emqx/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/emqx)
