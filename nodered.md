# Deploy nodered on Railway

NodeRED with data stored in volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nodered)

## About

Node-RED is a flow-based programming tool for wiring together hardware devices, APIs, and online services. It provides a browser-based editor that makes it easy to wire together flows using a wide range of nodes. Built on Node.js, it's lightweight and can run on low-cost hardware or in the cloud.

Hosting Node-RED requires persistent storage for flows, credentials, and settings since the editor allows users to modify flows at runtime. This template uses a Railway Volume to persist all Node-RED data, ensuring your flows survive container restarts and redeployments. Authentication is configured out of the box with admin credentials, protecting your Node-RED editor from unauthorized access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-nodered | [techmanufaktur-io/railway-nodered](https://github.com/techmanufaktur-io/railway-nodered) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | NodeRED UI password (username is "admin") |

## Configuration

- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/nodered)
