# Deploy Syncthing on Railway

Deploy Syncthing on Railway — encrypted peer-to-peer file synchronisation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/syncthing-file-sync)

## About

Syncthing is open-source continuous file synchronisation. It keeps folders identical across your laptop, desktop, phone and servers with no cloud account in the middle: every device holds a full copy, changes travel directly between them over mutually authenticated TLS, and nobody else can read the contents. People reach for it when Dropbox's storage tiers stop making sense, or when an Obsidian vault or photo library needs to be the same everywhere. The catch with a peer-to-peer tool is that your devices are rarely awake at once. Self-host Syncthing on Railway and you get the missing piece: an always-on node every other device syncs against, so your laptop and phone stay in step without ever being online together.

This template runs Syncthing from the official `syncthing/syncthing` image on one Railway service with a persistent volume at `/var/syncthing`. That volume holds your files, the file index, and the TLS keypair that *is* this node's identity, so its Device ID survives every redeploy. Two network paths are configured for you: a public HTTPS domain serves the web interface on port 8384 behind a username and password you pick at deploy time, and a Railway TCP proxy exposes the sync protocol on port 22000 so devices connect directly rather than through a public relay. A health check on Syncthing's anonymous `/rest/noauth/health` endpoint tells Railway when the node is ready.

![Diagram of the Syncthing service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787130139/syncthing-architecture.png)

Syncthing is not cloud storage with a sync client bolted on — it is a protocol between equals. Each device is identified by a certificate, and a folder is shared only with devices you authorise on both ends. There is no account and no server that must be trusted. Hosting a node yourself adds the one thing that model lacks: a machine always reachable.

- Direct encrypted transfers using TLS 1.3 and per-device certificates
- File versioning: trash can, simple, staggered, or external
- Send-only, receive-only and send-receive folders, plus ignore patterns
- Untrusted devices, which store a copy they cannot decrypt
- Native clients for Windows, macOS, Linux, BSD and Android
- A full REST API for automation

The Railway architecture stays small: one container, one volume carrying everything durable. The image starts as root only long enough to prepare that volume, then drops to an unprivileged user. No database service is needed — Syncthing keeps its index on the same volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| syncthing | [gridalpha/syncthing-railway](https://github.com/gridalpha/syncthing-railway) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8384 | Web interface listening port |
| `STGUIAPIKEY` | - | REST API key for automation |
| `STNOUPGRADE` | 1 | Image tag controls the version |
| `STNOPORTPROBING` | 1 | Keep the sync port at 22000 |
| `SYNCTHING_GUI_USER` | (secret) | Web interface username |
| `SYNCTHING_GUI_PASSWORD` | (secret) | Web interface password, hashed at boot |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22000
- **Volume:** `/var/syncthing`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/syncthing-file-sync)
