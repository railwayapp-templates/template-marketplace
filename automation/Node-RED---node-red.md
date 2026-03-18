# Deploy Node-RED on Railway

Node-RED deployment with 80+ popular contrib nodes pre-installed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red)

## About

Node-RED is a flow-based development tool for visual programming, originally developed by IBM. When deployed on Railway, it provides a persistent, always-on automation platform that can handle complex workflows, integrations, and data processing tasks 24/7.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Node-RED | [AnarchistManifesto/Node-RED](https://github.com/AnarchistManifesto/Node-RED) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 1880 |
| `NODE_RED_PASSWORD` | (secret) |
| `NODE_RED_USERNAME` | (secret) |
| `NODE_RED_CREDENTIAL_SECRET` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/node-red)
