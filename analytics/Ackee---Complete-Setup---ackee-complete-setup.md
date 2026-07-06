# Deploy Ackee - Complete Setup on Railway

[Jul'26] Self-hosted analytics tool with MongoDB and Mongo Express.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ackee-complete-setup)

## About

Ackee - Complete Setup is a self-hosted analytics stack for tracking website traffic without relying on third-party analytics platforms. It includes Ackee for privacy-friendly website analytics, MongoDB for persistent analytics storage, and Mongo Express for simple database inspection and administration.

This template deploys a complete Ackee analytics environment with MongoDB and Mongo Express. Ackee handles the web dashboard and tracking script, MongoDB stores analytics data persistently using Railway volume storage, and Mongo Express provides a lightweight web interface for inspecting the MongoDB database when needed.

After deployment, you can log in to Ackee, create a domain, copy the tracking script, and add it to your website. Once installed, Ackee starts collecting page views, referrers, device information, browser information, operating system data, language, screen size, and custom events depending on your tracking setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:latest` | Database |
| Ackee | `electerious/ackee:latest` | Web service |
| mongo-express | `mongo-express` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGOPORT_PRIVATE` | MongoDB | 27017 |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `PORT` | Ackee | 8080 |
| `ACKEE_PASSWORD` | Ackee | (secret) |
| `ACKEE_USERNAME` | Ackee | (secret) |
| `PORT` | mongo-express | 8081 |
| `MONGOPASSWORD` | mongo-express | (secret) |
| `ME_CONFIG_BASICAUTH_PASSWORD` | mongo-express | (secret) |
| `ME_CONFIG_BASICAUTH_USERNAME` | mongo-express | (secret) |

## Configuration

- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/ackee-complete-setup)
