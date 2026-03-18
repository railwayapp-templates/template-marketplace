# Deploy X/Twitter Media Tracker on Railway

A small service that verifies specific X/Twitter interactions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twitter-media-tracker)

## About

Hosting this project on Railway requires a Node 18+ runtime, an Apify account with the two required actors added, and a valid Apify token stored as an environment variable. Deploying is straightforward: connect your repository to Railway, set the environment variables, and ensure your Apify account has sufficient credits (Starter plan or higher) because these Apify actors may be blocked for free accounts due to abuse prevention. Railway will handle the server provisioning and scaling; you only need to monitor Apify usage and set appropriate timeouts and caching policies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twitter-media-tracker | [rubrion/twitter-media-tracker](https://github.com/rubrion/twitter-media-tracker) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | TCP port the server listens on (defaults to 3000 if not set). Override this when deploying if your platform assigns a different port. |
| `NODE_ENV` | production | Application environment flag: typically development or production. Controls behavior such as using local example data vs. live Apify calls |
| `APIFY_TOKEN` | (secret) | Your Apify API token used to start and call the required Apify actors. Must belong to an Apify account with sufficient credits (Starter plan or higher) — free accounts are often blocked for these actors. |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/twitter-media-tracker)
