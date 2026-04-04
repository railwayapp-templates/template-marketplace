# Deploy Sshwifty on Railway

An open-source web-based SSH and Telnet client.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sshwifty)

## About

Sshwifty is an open-source web-based SSH and Telnet client. It runs in the browser with no desktop app or local SSH client required — connect to any SSH or Telnet server directly from a browser tab, from any device.

Sshwifty is a single Go binary served via Docker that acts as a proxy between the browser client and remote SSH/Telnet targets. This Railway template deploys the official Docker image and (optionally) configures it via environment variables — no config file or persistent volume required. The web interface can be protected by a shared key set at deploy time, if desired. Railway handles HTTPS, so Sshwifty's built-in TLS is not needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sshwifty | `niruix/sshwifty:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SSHWIFTY_LISTENPORT` | 8080 | Sshwifty port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/sshwifty`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/sshwifty)
