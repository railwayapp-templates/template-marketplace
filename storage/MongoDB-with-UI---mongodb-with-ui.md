# Deploy MongoDB with UI on Railway

MongoDB with visual database management, ready to deploy in 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-with-ui)

## About

MongoDB with UI combines a persistent MongoDB database with Mongo Express, a lightweight web-based administration interface. The template gives you both direct database access and a visual browser for inspecting collections, documents, indexes, and database structure from your browser.

![MOngoDB Template](https://imgur.com/9aRTVUo.png)

This template deploys two connected services:

* **MongoDB** — the persistent document database
* **Mongo Express** — the browser-based MongoDB management interface

Mongo Express connects to MongoDB through Railway's private network, keeping internal database traffic inside the project.

MongoDB also uses Railway TCP Networking so external clients such as MongoDB Compass, local applications, development tools, or remote servers can connect when needed.

A persistent volume mounted to MongoDB keeps your database files available across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mongo Express | `mongo-express:latest` | Database |
| MongoDB | `mongo:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mongo Express | 8081 | Railway public service port for Mongo Express |
| `MONGOHOST` | Mongo Express | - | MongoDB host reference from the MongoDB service |
| `MONGOPORT` | Mongo Express | - | MongoDB port reference from the MongoDB service |
| `MONGOUSER` | Mongo Express | - | MongoDB username used by Mongo Express |
| `MONGO_URL` | Mongo Express | - | MongoDB connection URI from the MongoDB service |
| `MONGOPASSWORD` | Mongo Express | (secret) | MongoDB password used by Mongo Express |
| `ME_CONFIG_MONGODB_URL` | Mongo Express | - | MongoDB connection URI used internally by Mongo Express |
| `ME_CONFIG_BASICAUTH_PASSWORD` | Mongo Express | (secret) | Required: password for accessing the Mongo Express web UI |
| `ME_CONFIG_BASICAUTH_USERNAME` | Mongo Express | (secret) | Required: username for accessing the Mongo Express web UI |
| `MONGOHOST` | MongoDB | - | Public MongoDB hostname provided by Railway TCP Proxy |
| `MONGOPORT` | MongoDB | - | Public MongoDB port provided by Railway TCP Proxy |
| `MONGOUSER` | MongoDB | - | MongoDB root username |
| `MONGO_URL` | MongoDB | - | Public MongoDB connection URI |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB root password |
| `MONGOHOST_PRIVATE` | MongoDB | - | MongoDB private hostname within the Railway project |
| `MONGOPORT_PRIVATE` | MongoDB | 27017 | MongoDB default private service port |
| `MONGO_PRIVATE_URL` | MongoDB | - | Private MongoDB connection URI for internal Railway services |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Auto-generated MongoDB root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB root username created during initialization |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb-with-ui)
