# Deploy PairDrop on Railway

Send files straight between two browsers, like AirDrop for the web

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pairdrop)

## About

PairDrop is an open-source, browser-based file transfer tool inspired by Apple's AirDrop. Open the same page on a laptop and a phone, and the two devices find each other automatically and send photos, documents or text from one browser to the other over a WebRTC data channel. Nothing is uploaded or stored, and neither device needs an app, an account or a cable. It is a maintained fork of Snapdrop that adds device pairing and temporary public rooms, so distant devices can transfer too.

Deploy PairDrop on Railway and you get one service, `pairdrop`, built from the [gridalpha/pairdrop-railway](https://github.com/gridalpha/pairdrop-railway) source repository on top of the official `ghcr.io/schlagmichdoch/pairdrop` image. It serves the web app and runs the WebSocket signaling server that introduces two browsers to each other. Railway terminates HTTPS and passes the WebSocket upgrade through, which is how browsers exchange connection offers; file bytes never touch the service. With no stored state, the template needs no database, volume or object storage.

![Diagram of the PairDrop signaling service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788947455/pairdrop-architecture.png)

Cross-platform file sharing is solved inside one ecosystem and annoying between them. AirDrop stops at Apple devices, Quick Share at Android and Windows, and everything else becomes a cloud upload or a USB cable. PairDrop is the neutral option: a page both devices can open. Teams self-host it to keep internal transfers on their own infrastructure.

Key features:

- Peer-to-peer transfers over encrypted WebRTC data channels, with no app-imposed size limit
- Automatic discovery of every device on the network, with no configuration
- Persistent pairing by six-digit or QR code, surviving a browser restart
- Temporary public rooms for one-off transfers across networks
- Text and clipboard transfers too, with multiple files arriving as a ZIP
- Installable as a progressive web app, with iOS and Android share-menu integration

The architecture is deliberately small. The `pairdrop` service serves the static client and runs a WebSocket signaling server that tells browsers on one public IP address about each other and relays their WebRTC offers. Once they connect it leaves the path entirely, which is why one small container handles a whole team.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pairdrop | [gridalpha/pairdrop-railway](https://github.com/gridalpha/pairdrop-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP and WebSocket listener port |
| `STUN_URLS` | stun:stun.l.google.com:19302 | Comma-separated STUN server URLs |
| `TURN_URLS` | - | Optional comma-separated TURN server URLs |
| `RATE_LIMIT` | 2 | Proxy hop count; also enables request limiter |
| `WS_FALLBACK` | false | Relay transfers through server; leave off |
| `NODE_OPTIONS` | --max-old-space-size=512 | Node heap ceiling for the container |
| `IPV6_LOCALIZE` | 4 | IPv6 hextets grouping peers per network |
| `TURN_USERNAME` | (secret) | Optional username for the TURN servers |
| `TURN_CREDENTIAL` | (secret) | Optional password for the TURN servers |

## Configuration

- **Healthcheck:** `/config`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/pairdrop)
