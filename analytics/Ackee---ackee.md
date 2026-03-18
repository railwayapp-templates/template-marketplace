# Deploy Ackee on Railway

Self-hosted, analytics tool for those who care about privacy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ackee)

## About

Ackee is a self-hosted, Node.js based analytics tool for those who care about privacy. Ackee runs on your own server, analyzes the traffic of your websites and provides useful statistics in a minimal interface.

Hosting Ackee involves deploying a lightweight Node.js application with a MongoDB database. Ackee is 100% open-source and runs entirely on your own server, giving you complete control over your analytics data. The system uses modern technologies with a clean architecture that's simple to deploy and maintain. Unlike traditional analytics platforms, Ackee requires no cookies and keeps all tracked data anonymized to protect user privacy.

![Ackee Dashboard Interface](https://s.electerious.com/images/ackee/readme.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:latest` | Database |
| Ackee | `electerious/ackee:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Public host |
| `MONGOPORT` | MongoDB | - | Public port |
| `MONGOUSER` | MongoDB | - | Mongodb user |
| `MONGO_URL` | MongoDB | - | Public URL |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password |
| `MONGOHOST_PRIVATE` | MongoDB | - | Private host |
| `MONGOPORT_PRIVATE` | MongoDB | 27017 | Private port |
| `MONGO_PRIVATE_URL` | MongoDB | - | Private URL |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `WAIT_HOSTS` | Ackee | - | Wait for MongoDB |
| `ACKEE_MONGODB` | Ackee | - | Mongo private URI |
| `ACKEE_TRACKER` | Ackee | - | Custom name for the tracking script of Ackee to avoid getting blocked by browser extensions |
| `ACKEE_PASSWORD` | Ackee | (secret) | The password to log in to your Ackee instance. |
| `ACKEE_USERNAME` | Ackee | (secret) | The username to log in to your Ackee instance. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Healthcheck:** `/.well-known/apollo/server-health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/ackee)
