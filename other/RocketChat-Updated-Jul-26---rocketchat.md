# Deploy Rocket.Chat [Updated Jul '26] on Railway

Rocket Chat [Jul '26] (Chat Platform, Slack & Teams alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat)

## About

Rocket Chat is a free, open-source communication and collaboration platform available on GitHub, designed as a powerful **Slack alternative** for teams and enterprises. With Rocket.Chat, you gain complete control over your chat, video, and team collaboration experience while keeping your data secure. The Rocket Chat community is large and active, providing continuous updates and support.

You can **self host Rocket Chat using Docker** to have full control over your messaging, video calls, and integrations without relying on third-party providers. With **Rocket Chat Docker deployment**, you ensure your data stays private and configurations are entirely under your control. Hosting Rocket Chat on Railway makes the deploy process extremely simple with containerized services, automated scaling, and secure environments.

Railway allows you to spin up Rocket Chat instantly, without worrying about server setup, dependencies, or operating system administration. Instead of configuring everything manually, you can launch Rocket Chat in just one click with Railway’s managed infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| Rocket.Chat | `rocket.chat:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `GLIBC_TUNABLES` | MongoDB | glibc.pthread.rseq=1 | - |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | Rocket.Chat | 3000 | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/rocketchat)
