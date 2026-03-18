# Deploy unchained on Railway

Unchained Engine is an API-first E-Commerce Framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/unchained)

## About

Unchained Engine is a Headless Node.js E-Commerce Framework with a native GraphQL API. Check https://docs.unchained.shop for more information.

With this Template you can initate a Full-Stack Web Shop:
- Backend: Node.js ESM
- Frontend: Next.js App
- Database: MongoDB

From there we expect you to eject the frontend and backend repositories and customize business logic and user experience to your needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:7` | Database |
| unchained | [unchainedshop/unchained-app](https://github.com/unchainedshop/unchained-app) | Web service |
| storefront | [unchainedshop/unchained-storefront](https://github.com/unchainedshop/unchained-storefront) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | unchained | 4010 | Port for the internal service |
| `MAIL_URL` | unchained | - | SMTP Connection URL (check https://nodemailer.com/smtp) |
| `ROOT_URL` | unchained | - | Public URL of the Backend |
| `MONGO_URL` | unchained | - | Mongo Connection String |
| `EMAIL_FROM` | unchained | - | E-Mail Sender, for ex.: Unchained <noreply@unchained.local> |
| `OPENAI_API_KEY` | unchained | (secret) | Set it to enable Copilot in Unchained Admin UI |
| `EMAIL_WEBSITE_URL` | unchained | - | Public URL of the Frontend |
| `EMAIL_WEBSITE_NAME` | unchained | Unchained | Project Name in E-Mail Templates |
| `UNCHAINED_COOKIE_DOMAIN` | unchained | - | Cookie Domain |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Healthcheck:** `/.well-known/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/template/unchained)
