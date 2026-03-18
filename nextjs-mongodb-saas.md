# Deploy Next.js MongoDB SaaS on Railway

Deploy and Host Next.js MongoDB SaaS with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nextjs-mongodb-saas)

## About

The **Next.js SaaS Starterkit (MongoDB)** is an ultra-fast, one-click deployment template designed for developers to launch a full-scale SaaS in seconds. Powered by **Next.js 15**, **Better Auth**, **Prisma**, and **Stripe**, it replaces complex configuration with a pre-configured document-based architecture. It’s the perfect "business-in-a-box" for those who want MongoDB’s flexibility with professional-grade SaaS features.

Hosting this kit on Railway is a true **one-click experience**. The template automatically orchestrates the provisioning of a **MongoDB** instance alongside your Next.js application. Because the database schema and Prisma client are already pre-configured for MongoDB, Railway handles the heavy lifting—from building the Nixpacks container to injecting the necessary environment variables for **Stripe** and **Better Auth**. The deployment pipeline is optimized to initialize your collections and indexes immediately, ensuring that your authentication and billing systems are live and functional the moment the build finishes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Init Single Replica | [iqbalexperience/mongo-replica-set](https://github.com/iqbalexperience/mongo-replica-set) (root: /initServiceSingle) | Worker |
| nextjs-mongodb-starter | [iqbalexperience/nextjs-mongodb-starter](https://github.com/iqbalexperience/nextjs-mongodb-starter) | Web service |
| Mongo Single Replica | [iqbalexperience/mongo-replica-set](https://github.com/iqbalexperience/mongo-replica-set) (root: /nodes) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGO_PORT` | Init Single Replica | 27017 |
| `MONGOPASSWORD` | Init Single Replica | (secret) |
| `MONGOUSERNAME` | Init Single Replica | (secret) |
| `GOOGLE_CLIENT_ID` | nextjs-mongodb-starter | your-google-client-id |
| `SENDGRID_API_KEY` | nextjs-mongodb-starter | (secret) |
| `STRIPE_SECRET_KEY` | nextjs-mongodb-starter | (secret) |
| `BETTER_AUTH_SECRET` | nextjs-mongodb-starter | (secret) |
| `SENDGRID_FROM_EMAIL` | nextjs-mongodb-starter | Your App <noreply@example.com> |
| `GOOGLE_CLIENT_SECRET` | nextjs-mongodb-starter | (secret) |
| `STRIPE_WEBHOOK_SECRET` | nextjs-mongodb-starter | (secret) |
| `STRIPE_PLUS_PRICE_ID_YEARLY` | nextjs-mongodb-starter | price_... |
| `STRIPE_PLUS_PRICE_ID_MONTHLY` | nextjs-mongodb-starter | price_... |
| `EMAIL_VERIFICATION_CALLBACK_URL` | nextjs-mongodb-starter | / |
| `STRIPE_ENTERPRISE_PRICE_ID_YEARLY` | nextjs-mongodb-starter | price_... |
| `STRIPE_ENTERPRISE_PRICE_ID_MONTHLY` | nextjs-mongodb-starter | price_... |
| `KEYFILE` | Mongo Single Replica | APYTJ3L1X7DAFI716X+4/42SWRY14TOB |
| `MONGOPASSWORD` | Mongo Single Replica | (secret) |
| `REPLICA_SET_NAME` | Mongo Single Replica | rs0 |
| `MONGO_INITDB_ROOT_PASSWORD` | Mongo Single Replica | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | Mongo Single Replica | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Starters · **Languages:** Shell, Dockerfile, TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/nextjs-mongodb-saas)
