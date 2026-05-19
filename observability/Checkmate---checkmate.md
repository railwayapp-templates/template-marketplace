# Deploy Checkmate on Railway

An open-source uptime & infrastructure monitoring tool. Alternative to Kuma

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkmate)

## About

Uptime, pagespeed, hardware, and incident alerts in one self-hosted dashboard. No per-monitor pricing. No data leaving your infrastructure.

Checkmate is an open-source, self-hosted monitoring platform for uptime checks, infrastructure metrics, PageSpeed monitoring, Docker health checks, incident management, and public status pages. Deploying Checkmate on Railway gives you a managed environment for running the application without maintaining your own servers or Kubernetes cluster. A typical deployment includes the Checkmate web application and a MongoDB database, with optional Capture agents installed on external servers to collect hardware metrics like CPU, memory, disk, and network usage. Railway simplifies deployment, scaling, networking, and environment management so you can get a production-ready monitoring stack running in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Checkmate | `ghcr.io/bluewave-labs/checkmate-backend-mono:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | Checkmate | (secret) | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/checkmate)
