# Deploy Mumble VoIP Server on Railway

Mumble: Open Source Voice Chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mumble-voip-server)

## About

Mumble is a free, open-source, low-latency, and high-quality voice chat application primarily designed for gamers. Unlike proprietary alternatives, Mumble ensures absolute data privacy, exceptional audio clarity with built-in echo cancellation, and an extremely low memory footprint, making it the premier choice for self-hosted community voice communications.

Hosting your own Mumble server (historically known as Murmur) involves running a lightweight, standalone container instance that processes real-time voice packets and manages server channels. When hosting on Railway, the setup is entirely containerized using the official Mumble Docker image. Security and administration are managed via predefined environment variables, such as setting a robust SuperUser password for complete administrative rights. The infrastructure utilizes a persistent volume to store the SQLite database, ensuring that channel structures, registered user accounts, and Access Control Lists (ACLs) remain intact across restarts and subsequent redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mumble VoIP Server | `mumblevoip/mumble-server` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MUMBLE_CONFIG_USERS` | 100 | maximum number of concurrent users |
| `MUMBLE_CONFIG_USERNAME` | (secret) | allowed username patterns from client |
| `MUMBLE_CONFIG_SENDVERSION` | true | whether the server reports its  version to client, default=true |
| `MUMBLE_CONFIG_WELCOMETEXT` | Hello Mumble from Railway. | welcome message |

## Configuration

- **TCP Proxies:** 64738

**Category:** Other

[View on Railway →](https://railway.com/deploy/mumble-voip-server)
