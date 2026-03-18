# Deploy Komodo on Railway

Build and deploy software across many servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/komodo)

## About

Komodo is a cutting-edge platform designed to streamline the development and deployment of applications. With its user-friendly interface and powerful features, Komodo enables developers to focus on building innovative solutions without worrying about the underlying infrastructure.

Hosting Komodo involves setting up the necessary infrastructure to support its various components, including servers and databases. By leveraging cloud services like Railway, anyone can easily deploy and manage their Komodo instance, ensuring high availability and scalability. The process typically includes configuring the environment, deploying the application, and setting up any required integrations with your servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Komodo | `ghcr.io/moghtech/komodo-core` | Web service |
| MongoDB | `mongo:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Komodo | 9120 | - |
| `KOMODO_PASSKEY` | Komodo | - | Passkey for remote server verification. |
| `KOMODO_LOCAL_AUTH` | Komodo | true | - |
| `KOMODO_WEBHOOK_SECRET` | Komodo | (secret) | Default webhook secret to use. |
| `KOMODO_INIT_ADMIN_PASSWORD` | Komodo | (secret) | Password for the default admin user. |
| `KOMODO_INIT_ADMIN_USERNAME` | Komodo | (secret) | Username for the default admin user. |
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
- **Volume:** `/backups`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Automation

[View on Railway →](https://railway.com/template/komodo)
