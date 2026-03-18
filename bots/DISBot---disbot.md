# Deploy DISBot on Railway

DISBot is a self-hosted Bot that automates Patreon content distribution.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/disbot)

## About

DISBot is an open-source, self-hosted Discord bot that automates content distribution from Patreon to Discord. It utilizes a smart "Waterfall Release" and "Hybrid Broadcast" system to seamlessly route tiered Patreon posts, member updates, and serialized content directly to designated Discord channels without spamming users or requiring manual intervention.

Deploying DISBot requires a platform capable of running Node.js (v20+) and receiving external HTTPS webhooks directly from Patreon. Hosting on Railway is the recommended solution because it provides dedicated IPs, preventing the severe Discord API rate-limiting and Cloudflare blocks (Error 1015) common on shared-IP platforms like Render's free tier. When you connect your repository, Railway automatically detects the project's `railway.json` file to instantly handle build and start commands. Furthermore, Railway dynamically assigns ports and provisions a free SSL domain out-of-the-box, ensuring Patreon's webhooks can securely reach your bot's early port-binding Express server 24/7.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [IqbalZarar-Khan/DISBot](https://github.com/IqbalZarar-Khan/DISBot) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DISCORD_TOKEN` | (secret) |
| `WEBHOOK_SECRET` | (secret) |
| `PATREON_ACCESS_TOKEN` | (secret) |
| `PATREON_CLIENT_SECRET` | (secret) |
| `PATREON_REFRESH_TOKEN` | (secret) |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, JavaScript, Shell, Dockerfile, PLpgSQL, Procfile

[View on Railway →](https://railway.com/deploy/disbot)
