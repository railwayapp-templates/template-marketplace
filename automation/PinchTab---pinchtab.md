# Deploy PinchTab on Railway

Browser control for AI agents with a fast HTTP API, ready in seconds.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pinchtab)

## About

Pinchtab is a high-performance browser automation bridge built for AI agents. It exposes browser control through a fast HTTP API, supports multiple isolated browser instances, and includes a real-time dashboard for inspecting and managing automation sessions.

This template deploys Pinchtab with persistent storage and token-based authentication, giving AI agents a reusable browser runtime that can navigate websites, extract page structure, interact with elements, and run parallel browser workflows.

Pinchtab acts as a browser control layer between AI agents and Chromium.

Instead of embedding browser automation logic directly into every agent, applications can communicate with Pinchtab through its HTTP API. Agents can open pages, inspect interactive elements, click, fill forms, extract text, capture screenshots, and manage multiple browser instances.

Pinchtab also provides persistent profiles and configuration under `/data`, allowing browser-related state to survive service restarts and redeployments. The official Docker deployment uses the same persistent data path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pinchtab | `pinchtab/pinchtab:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9867 | Railway public service port for Pinchtab |
| `PINCHTAB_TOKEN` | (secret) | Authentication token used to protect the Pinchtab API |

## Configuration

- **Start command:** `/bin/sh -c 'pinchtab config set server.trustProxyHeaders true && pinchtab config set server.cookieSecure true && exec pinchtab server'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/pinchtab)
