# Deploy MongoDB on Railway

Latest Self Hosted Database Service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-latest)

## About

MongoDB Latest is a self-hosted deployment of the official MongoDB Docker image that provides a flexible, scalable NoSQL document database. This Railway template deploys the latest MongoDB version with authentication enabled and persistent storage, making it ideal for powering web applications, APIs, AI agents, analytics platforms, automation tools, and internal services.

Hosting MongoDB Latest on Railway provides a fast and reliable way to deploy a production-ready MongoDB instance without managing servers or manually configuring containers. Railway automatically deploys the latest official MongoDB image, provisions persistent storage, and offers secure networking for both private services and external clients.

The database stores all data on a Railway Volume, ensuring collections, indexes, and documents persist across redeployments and service restarts. Applications running within the same Railway project can securely connect using Railway's private networking, while external tools such as MongoDB Compass, DBeaver, or custom applications can connect through Railway's TCP Proxy. This template is suitable for development, staging, internal applications, and lightweight production deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGOPASSWORD` | (secret) |
| `MONGOPORT_PRIVATE` | 27017 |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) |

## Configuration

- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mongodb-latest)
