# Deploy MongoDB (Latest) on Railway

[Jun'26] Self-host MongoDB Latest Version with persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-latest-version)

## About

MongoDB - Latest Version is a self-hosted MongoDB database template for Railway. It lets you deploy the latest MongoDB image in one click with persistent storage, making it useful for applications that need a flexible NoSQL database for documents, users, logs, sessions, analytics, and backend data.

Hosting MongoDB on Railway allows you to run a self-hosted MongoDB instance without manually provisioning servers, configuring containers, or managing infrastructure from scratch. This template is designed for simple one-click deployment using the latest MongoDB version, with persistent storage enabled so your database files remain available across redeployments. After deployment, MongoDB can be used as the main database for APIs, dashboards, automation tools, internal apps, or development environments.

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

- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb-latest-version)
