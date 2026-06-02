# Deploy Kauntah on Railway

Deploy and Host Kauntah with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kauntah)

## About

Kauntah is a lightweight hit counter inspired by shimobayashi/kauntah, rewritten in TypeScript/Node.js. Embed a single `<img>` tag on any page to start counting visits. Counters are automatically separated per domain using the HTTP Referer header.

Hosting Kauntah on Railway involves deploying a Node.js/Express server backed by a SQLite database persisted on a Railway Volume. The server processes incoming image requests, increments per-domain counters, and returns a PNG image composed of nekomimi digit assets. Rate limiting is applied per IP and per owner domain to prevent abuse. After deployment, you will need to manually add a Volume and set the `DATABASE_URL` environment variable to persist counter data across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kauntah | [fjt-dev/Kauntah](https://github.com/fjt-dev/Kauntah) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATABASE_URL` | file:/data/kauntah.db |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/kauntah)
