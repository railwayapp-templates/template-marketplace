# Deploy Kutt | Open Source Bitly Alternative for URL Shortening on Railway

Self-hosted URL shortener with custom domains and click stats

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kFCDQY)

## About

Kutt is a modern URL shortener: custom domains, custom slugs, expiring links, password-protected links, per-link click statistics and an API — self-hosted, with the click data staying in your database instead of someone else's analytics product.

A single service with SQLite on a persistent volume. Kutt supports Postgres and MySQL for larger installations, but a link shortener's write volume is small and its read path is a primary-key lookup, so a second billed database service buys very little here. The volume is what makes it durable.

The public domain is set as the default link domain automatically, so the links Kutt generates work the moment the deployment is green.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kutt | `kutt/kutt` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JWT_SECRET` | (secret) | This is used to sign authentication tokens |
| `DB_FILENAME` | /var/lib/kutt/data.sqlite | DB filename |
| `DEFAULT_DOMAIN` | - | The domain address that this app runs on |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/kutt`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kFCDQY)
