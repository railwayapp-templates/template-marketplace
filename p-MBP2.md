# Deploy Checkmate on Railway

An open-source uptime & infrastructure monitoring tool. Alternative to Kuma

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/p-MBP2)

## About

![](https://checkmate.so/checkmate-logo-dark-bg.png)

<p align="center"><strong>An open source uptime and infrastructure monitoring application</strong></p>

![](https://checkmate.so/uptimemonitoring.jpg)

Checkmate is an open-source, self-hosted tool designed to track and monitor server hardware, uptime, response times, and incidents in real-time with beautiful visualizations.

- You'll have to restart (Not Redeploy) the frontend container as it will crash because it starts faster than the server container. 
- You'll have to point the created domain to port 80 in the frontend container as it doesn’t works automatically and as by now it’s not configurable in the template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| client | `ghcr.io/bluewave-labs/checkmate-client:v3.5.1` | Web service |
| MongoDB | `ghcr.io/bluewave-labs/checkmate-mongo:latest` | Database |
| server | `ghcr.io/bluewave-labs/checkmate-backend:v3.5.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DUMMY` | client | - | Dummy to wait for server |
| `UPTIME_APP_CLIENT_HOST` | client | - | is used for building some links that point to the client |
| `UPTIME_APP_API_BASE_URL` | client | - | points the client to the server |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | server | 5000 | Port |
| `JWT_SECRET` | server | (secret) | Super secret |
| `CLIENT_HOST` | server | - | The origin that the API server will approve requests from |
| `DB_CONNECTION_STRING` | server | - | Mongo URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Observability

[View on Railway →](https://railway.com/template/p-MBP2)
