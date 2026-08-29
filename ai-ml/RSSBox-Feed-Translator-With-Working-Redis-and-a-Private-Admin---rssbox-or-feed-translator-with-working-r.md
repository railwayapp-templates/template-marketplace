# Deploy RSSBox | Feed Translator With Working Redis and a Private Admin on Railway

RSSBox on Railway: translated feeds, a Redis that pulls, private admin

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rssbox-or-feed-translator-with-working-r)

## About

RSSBox, formerly RSS Translator, takes any RSS or JSON feed and gives you back a
better one: translated titles or content, AI summaries, full-text fetching,
keyword and AI filtering, and several feeds merged into one. You subscribe to the
result in the reader you already use.

RSSBox is a Django application with a background cron worker, a SQLite database
and Redis as its cache. Hosting it means keeping three things right: the database
and the translation cache have to live on a volume or every redeploy throws away
your feeds and re-pays for every translation; Redis has to actually start,
because the app blocks on it at boot; and the instance has to know its own public
URL, since that URL is baked into every feed link it hands to subscribers. It
also ships a default administrator account, which on a public domain is an open
door unless the password is replaced.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSSBox | [ak40u/rssbox-railway-starter](https://github.com/ak40u/rssbox-railway-starter) | Web service |
| Redis | `redis:8.6.5-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | RSSBox | 8000 |
| `LOG_LEVEL` | RSSBox | INFO |
| `TIME_ZONE` | RSSBox | UTC |
| `SECRET_KEY` | RSSBox | (secret) |
| `ADMIN_PASSWORD` | RSSBox | (secret) |
| `DEFAULT_TARGET_LANGUAGE` | RSSBox | English |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rssbox-or-feed-translator-with-working-r)
