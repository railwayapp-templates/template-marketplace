# Deploy curatedotfun on Railway

Autonomous community curation and content creation bot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/RiUi5U)

## About

<div align="center">

<img src="https://www.curate.fun/meta.png" alt="curate.fun banner" width="100%">

<h1 style="font-size: 2.5rem; font-weight: bold;">curate.fun</h1>

  <p>
    <strong>curate news on socials &amp; build community-owned autonomous brands</strong>
  </p>

  <p>
    <a href="https://docs.curate.fun"><strong>📚 Documentation</strong></a> •
    <a href="https://github.com/potlock/curatedotfun"><strong>💻 GitHub</strong></a> •
    <a href="https://x.com/curatedotfun"><strong>🐦 Twitter</strong></a> •
    <a href="https://t.me/+UM70lvMnofk3YTVh"><strong>💬 Telegram</strong></a>
  </p>

</div>

Choose your path to get started with curate.fun ⚡

### For Curators

If you want to submit and curate content:

1. 🎯 Head to the [User Guide](https://docs.curate.fun/docs/user-guides/curation)
2. 🔗 Learn how to submit content and moderate feeds
3. 🌟 Apply to become a curator for specific feeds

### For Developers

If you want to build and customize feeds:

1. 📖 Start with the [Configuration Guide](https://docs.curate.fun/docs/developers/configuration)
2. 🚀 Learn about [Deployment](https://docs.curate.fun/docs/developers/deployment)
3. 🔌 Explore [Plugin Development](https://docs.curate.fun/docs/developers/plugins)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| curatedotfun | [PotLock/curatedotfun](https://github.com/PotLock/curatedotfun) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URL` | curatedotfun | - | Connection to Postgres DB |
| `TWITTER_EMAIL` | curatedotfun | - | Email for bot's Twitter login |
| `ALLOWED_ORIGINS` | curatedotfun | - | Comma separated list of allowed origins |
| `TWITTER_PASSWORD` | curatedotfun | (secret) | Password for bot's Twitter login |
| `TWITTER_USERNAME` | curatedotfun | (secret) | Username for bot's Twitter login |
| `OPENROUTER_API_KEY` | curatedotfun | (secret) | Used by ai-transform plugin |
| `TELEGRAM_BOT_TOKEN` | curatedotfun | (secret) | Used by telegram distributor plugin |
| `TWITTER_2FA_SECRET` | curatedotfun | (secret) | 2FA Secret for bot's Twitter login |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, JavaScript, Shell, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/template/RiUi5U)
