# Deploy Termix on Railway

Deploy and Host Termix with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/termix)

## About

Termix is an open-source, forever-free, self-hosted all-in-one server management platform. It provides a web-based solution for managing your servers and infrastructure through a single, intuitive interface. Termix offers SSH terminal access, SSH tunneling capabilities, and remote file management, with many more tools to come.

Supported Devices:

- Website (any modern browser like Google, Safari, and Firefox)
- Windows (app)
- Linux (app)
- iOS (app)
- Android (app)
- iPadOS and macOS are in progress

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Termix | `ghcr.io/lukegus/termix:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The web UI port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/termix)
