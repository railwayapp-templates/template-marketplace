# Deploy evolution-api on Railway

Deploy and Host evolution-api with Railway 123

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-5)

## About

Evolution API is an open-source WhatsApp integration layer that allows applications to send and receive messages programmatically via WhatsApp. It enables automated message delivery through a simple REST API, ideal for distributing marketing performance reports to clients automatically.

Hosting Evolution API on Railway provides a persistent, always-on environment to maintain active WhatsApp connections. The deployment involves running the Evolution API container alongside Redis for session management and PostgreSQL for data persistence. Once live, the API exposes a REST endpoint that Make.com calls automatically whenever Reportei generates a new report — delivering Google Ads, Meta Ads and GA4 performance summaries directly to client WhatsApp numbers or groups, with zero manual intervention.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evolution-api | [EvolutionAPI/evolution-api](https://github.com/EvolutionAPI/evolution-api) | Worker |

**Category:** Other · **Languages:** TypeScript, Shell, JavaScript, Dockerfile, PLpgSQL

[View on Railway →](https://railway.com/deploy/evolution-api-5)
