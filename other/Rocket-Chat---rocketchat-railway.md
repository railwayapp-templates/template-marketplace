# Deploy Rocket Chat on Railway

Team chat with file sharing, video conferencing, and collaboration tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat-railway)

## About

Rocket.Chat is an open-source team communication platform — channels, threads, direct messages, file sharing, voice and video calls, and a full admin console — used by companies, universities and government agencies that want their conversations on infrastructure they control. It is the best-known open-source alternative to Slack and Microsoft Teams, and because it runs on your own database, every message and attachment stays in your own account.

Deploy Rocket.Chat on Railway and this template brings up three services. The Rocket.Chat monolith serves the web app and REST API on a public HTTPS domain. MongoDB runs as a single-node replica set on a persistent volume — Rocket.Chat reads change streams to push new messages to connected clients, and change streams only exist on a replica set, so a standalone database will not work. NATS carries the internal message bus so the workspace can later run more than one instance. Only the app is reachable from the internet; MongoDB and NATS stay on Railway's private network.

![Rocket.Chat Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786822598/49d84221-8402-4f09-99e8-c27b1b256c55.png)

Rocket.Chat is a Meteor and Node.js application backed entirely by MongoDB. Teams self-host it when chat history is sensitive or regulated — healthcare, finance, defence, education — or when they do not want per-seat pricing on a tool everyone uses all day. It is MIT-licensed and the data lives in a database you can query and back up yourself, so migrating away later is a `mongodump`.

Key features:

- Public and private channels, discussions, threads and direct messages
- Drag-and-drop file sharing with full-text message search
- Video and voice conferencing through Jitsi or BigBlueButton
- REST API, real-time API, webhooks, and a Deno-based Apps engine
- LDAP, SAML and OAuth authentication, plus two-factor authentication
- Native mobile and desktop clients that point at your own server URL

**Rocket.Chat** is the only service with a public domain; it serves traffic on port 3000 and is health-checked at `/api/info`. **MongoDB** stores messages, users, settings and uploaded files — attachments go to GridFS, which is why the app needs no volume of its own. **NATS** is the Moleculer transporter that lets you raise the replica count later without instances reaching each other directly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rocketchat | `rocketchat/rocket.chat:8.7.0` | Web service |
| nats | `nats:2.11-alpine` | Database |
| mongodb | [gridalpha/rocketchat-railway](https://github.com/gridalpha/rocketchat-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rocketchat | 3000 | HTTP port the app binds |
| `ROOT_URL` | rocketchat | - | Public workspace URL |
| `MONGO_URL` | rocketchat | - | MongoDB replica set connection |
| `ADMIN_NAME` | rocketchat | Workspace Admin | First administrator display name |
| `ADMIN_PASS` | rocketchat | - | First administrator password |
| `ADMIN_EMAIL` | rocketchat | admin@yourcompany.dev | First administrator email address |
| `TRANSPORTER` | rocketchat | - | Internal service bus address |
| `NODE_OPTIONS` | rocketchat | --max-old-space-size=4096 | Node heap ceiling |
| `DEPLOY_METHOD` | rocketchat | docker | Reported deployment method |
| `ADMIN_USERNAME` | rocketchat | (secret) | First administrator username |
| `DEPLOY_PLATFORM` | rocketchat | railway | Reported hosting platform |
| `HTTP_FORWARDED_COUNT` | rocketchat | 2 | Proxy hops in X-Forwarded-For |
| `PORT` | nats | 8222 | Monitoring port used for health checks |
| `MONGODB_DATABASE` | mongodb | rocketchat | Application database name |
| `MONGODB_PORT_NUMBER` | mongodb | 27017 | MongoDB listening port |
| `MONGODB_APP_PASSWORD` | mongodb | (secret) | Rocket.Chat database user password |
| `MONGODB_APP_USERNAME` | mongodb | (secret) | Application database user |
| `MONGODB_ROOT_PASSWORD` | mongodb | (secret) | MongoDB root user password |
| `MONGODB_REPLICA_SET_NAME` | mongodb | rs0 | Replica set name |

## Configuration

- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh --http_port 8222`
- **Healthcheck:** `/healthz`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rocketchat-railway)
