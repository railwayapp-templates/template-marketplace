# Deploy Node-Red on Railway

Visual editor for wiring APIs, devices and events together

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-flows)

## About

Node-RED is a low-code editor for wiring together hardware devices, APIs and online services. You drag nodes onto a canvas, connect them with wires, and messages travel along those wires — a request arrives, a function reshapes it, a switch routes it, a database node stores it. It began at IBM in 2013 and is now an OpenJS Foundation project under Apache-2.0, used for IoT gateways, building automation, industrial data collection, and the everyday job of gluing one API to another.

Choosing to self-host Node-RED normally means picking a machine, securing the editor and remembering to back up a directory. Deploy Node-RED with this template and that is handled: it runs on Railway behind a generated HTTPS domain, turns on editor authentication before the first boot so the canvas is never exposed, and attaches a volume at `/data` holding your flows, encrypted credentials, installed palette nodes and flow context.

![Diagram of the Node-RED service and its data volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787227651/node-red-architecture.png)

Node-RED is a runtime and an editor in one process. The runtime executes your flows continuously — listening on HTTP routes, subscribing to MQTT topics, firing timers — while the editor is served from the same port and lets you change those flows and redeploy in seconds. That is the case for self-hosting over a hosted service: flows run on infrastructure you control, reach your private services, and nothing bills you per run.

Key features:

- Visual flow editor with a live debug sidebar showing every message
- JavaScript **function** nodes, with npm modules importable into them
- Thousands of community nodes for MQTT, Modbus, OPC-UA, databases and cloud APIs
- Built-in HTTP endpoints, so flows can serve webhooks and REST APIs
- Persistent flow, node and global context for state that outlives a message
- Encrypted storage for credentials such as broker passwords and API keys

The Railway architecture is deliberately simple: one `node-red` service built from [gridalpha/node-red-railway](https://github.com/gridalpha/node-red-railway) on the official `nodered/node-red` image, with a single volume at `/data`. There is no worker, queue or database tier to provision or keep in sync.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-red | [gridalpha/node-red-railway](https://github.com/gridalpha/node-red-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for inject and cron nodes |
| `PORT` | 1880 | HTTP listening port |
| `NODE_RED_PASSWORD` | (secret) | Editor login password |
| `NODE_RED_USERNAME` | (secret) | Editor login username |
| `NODE_RED_LOG_LEVEL` | info | Runtime log verbosity |
| `NODE_RED_CREDENTIAL_SECRET` | (secret) | Encrypts node credentials at rest |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/node-red-flows)
