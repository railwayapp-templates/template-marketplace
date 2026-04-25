# Deploy Rocket.Chat [Updated May '26] on Railway

Rocket Chat [May '26] (Chat Platform, Slack & Teams alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat)

## About

Rocket Chat is a free, open-source communication and collaboration platform available on GitHub, designed as a powerful **Slack alternative** for teams and enterprises. With Rocket.Chat, you gain complete control over your chat, video, and team collaboration experience while keeping your data secure. The Rocket Chat community is large and active, providing continuous updates and support.

You can **self host Rocket Chat using Docker** to have full control over your messaging, video calls, and integrations without relying on third-party providers. With **Rocket Chat Docker deployment**, you ensure your data stays private and configurations are entirely under your control. Hosting Rocket Chat on Railway makes the deploy process extremely simple with containerized services, automated scaling, and secure environments.

Railway allows you to spin up Rocket Chat instantly, without worrying about server setup, dependencies, or operating system administration. Instead of configuring everything manually, you can launch Rocket Chat in just one click with Railway’s managed infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rocket.Chat | `rocket.chat:latest` | Web service |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Rocket.Chat | 3000 |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rocketchat)
