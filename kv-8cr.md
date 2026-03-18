# Deploy MatureStack on Railway

Template for the MatureStack Boilerplate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kv-8cr)

## About

MatureStack Boilerplate - A powerful, modular boilerplate designed for tech startups and micro SaaS. Featuring a NestJS backend with MongoDB and a Next.js frontend, it’s built for scalability, speed, and seamless API communication.

Find us on: https://www.maturestack.com

MatureStack is a paid boilerplate, you will only get access to the linked private repositories after purchasing access via the website.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:7` | Database |
| website-frontend | [MatureStack/maturestack-frontend](https://github.com/MatureStack/maturestack-frontend) | Web service |
| website-backend | [MatureStack/maturestack-backend](https://github.com/MatureStack/maturestack-backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | MongoDB Host |
| `MONGOPORT` | MongoDB | - | MongoDB Port |
| `MONGOUSER` | MongoDB | - | MongoDB User |
| `MONGO_URL` | MongoDB | - | MongoDB URL |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB Password |
| `MONGO_PUBLIC_URL` | MongoDB | - | MongoDB Public URL |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | MongoDB Root Password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB Root Username |
| `NEXT_PUBLIC_API_URL` | website-frontend | - | Public URL of the Backend API including /api/ |
| `NEXT_PUBLIC_APP_URL` | website-frontend | - | Public URL of this frontend Next.js application |
| `NEXT_PUBLIC_POSTHOG_KEY` | website-frontend | - | PostHog Analytics Key |
| `NEXT_PUBLIC_POSTHOG_HOST` | website-frontend | - | PostHog Analytics Host |
| `URL` | website-backend | - | URL of the Backend API |
| `PORT` | website-backend | - | Port of the Backend API |
| `JWT_SECRET` | website-backend | (secret) | Secret for JWT |
| `RESEND_KEY` | website-backend | - | Resend API Key |
| `DATABASE_URL` | website-backend | - | MongoDB Connection URL |
| `GOOGLE_CLIENT_ID` | website-backend | - | Google OAuth Client ID |
| `GOOGLE_CALLBACK_URL` | website-backend | - | Google OAuth Callback URL |
| `GOOGLE_CLIENT_SECRET` | website-backend | (secret) | Google OAuth Client Secret Key |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/kv-8cr)
