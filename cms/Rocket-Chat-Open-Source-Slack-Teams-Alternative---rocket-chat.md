# Deploy Rocket Chat | Open Source Slack, Teams Alternative on Railway

Self Host Rocket.Chat. Real-time team comm, messaging, video calls & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocket-chat)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocket-chat?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy Rocket.Chat on Railway to get a production-ready, self-hosted team communication platform with real-time messaging, video conferencing, and omnichannel customer engagement. Self-host Rocket.Chat with full control over your data, compliance, and security — no vendor lock-in.

This Railway template deploys two services: **Rocket.Chat** (the application server running on Node.js/Meteor) and **MongoDB** (with replica set enabled for real-time change streams). Everything is pre-configured with private networking between services, persistent storage for MongoDB, and a public domain for your Rocket.Chat instance.

![Rocket.Chat Architecture Railway](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776595509/Rocket_chat_railway_architecture_lhqjsm.png)

Rocket.Chat is an open-source communications platform built on Node.js and Meteor, designed for mission-critical operations. It provides a Slack-like experience with full data sovereignty — you own your infrastructure, your messages, and your encryption keys.

- **Real-time messaging** with channels, threads, discussions, and direct messages
- **Video and voice calls** built-in (no plugins required)
- **Omnichannel support** — manage WhatsApp, Instagram, SMS, and email from one inbox
- **End-to-end encryption** for sensitive conversations
- **LDAP/SAML/OAuth** for enterprise single sign-on
- **Federation** to connect with other Rocket.Chat instances or Matrix networks
- **REST and Realtime APIs** for custom integrations and bots
- **DoD IL4/IL5 certified** for government and defense deployments

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rocket.Chat | `rocket.chat:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Rocket.Chat | 3000 | HTTP server listening port |
| `ROOT_URL` | Rocket.Chat | - | Public-facing app URL |
| `MONGO_URL` | Rocket.Chat | - | MongoDB connection string |
| `NODE_OPTIONS` | Rocket.Chat | --max-old-space-size=1024 | V8 heap memory limit |
| `DEPLOY_METHOD` | Rocket.Chat | docker | Deployment method identifier |
| `MONGOHOST` | MongoDB | - | MongoDB internal hostname |
| `MONGOPORT` | MongoDB | 27017 | MongoDB service port |
| `MONGOUSER` | MongoDB | - | MongoDB username reference |
| `MONGO_URL` | MongoDB | - | Internal MongoDB connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB password reference |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public MongoDB connection URL |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password credential |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Default MongoDB root username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/rocket-chat)
