# Deploy OpenStock on Railway

Open-source stock tracker with watchlists, alerts and AI market summaries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openstock-1)

## About

OpenStock is a free, open-source alternative to paid stock platforms. Track real-time prices, build watchlists, set price alerts and get AI-generated market news summaries, all without subscriptions.

This template deploys the OpenStock Next.js app from its Dockerfile together with a MongoDB database. The auth secret, public URL and database connection are configured automatically. You only need to provide your Finnhub, Gemini and Inngest API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenStock | [cosmind-rusu/OpenStock](https://github.com/cosmind-rusu/OpenStock) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenStock | 3000 | Port the Next.js server listens on. Must match the HTTP proxy port. |
| `MONGODB_URI` | OpenStock | - | MongoDB connection string. Uses the public URL because the build needs database access. |
| `GEMINI_API_KEY` | OpenStock | (secret) | Google Gemini API key for AI market summaries. Get one at aistudio.google.com |
| `BETTER_AUTH_URL` | OpenStock | - | Public URL of the app used by Better Auth. Set automatically from the Railway domain. |
| `BETTER_AUTH_SECRET` | OpenStock | (secret) | Secret used to sign auth sessions. Generated automatically. |
| `INNGEST_SIGNING_KEY` | OpenStock | - | Inngest signing key for scheduled jobs (alerts, summaries). Get it at app.inngest.com |
| `NEXT_PUBLIC_FINNHUB_API_KEY` | OpenStock | (secret) | Finnhub API key for market data (free tier at finnhub.io). Used at build time. |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB via the TCP proxy. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Healthcheck:** `/sign-in`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/openstock-1)
