# Deploy Tvmarks on Railway

Tvmarks is a tv tracking site that you own yourself 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NOV4_h)

## About

Tvmarks is a tv tracking site that you own yourself and can connect the Fediverse, interacting with other Tvmarks sites as well as Mastodon/FireFish/any text-based ActivityPub platform.

The site allows the owner to add shows and track which episodes you have watched, but only if a valid login is provided. Check the setup below to understand how to do that!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tvmarks | [stefanhayden/tvmarks](https://github.com/stefanhayden/tvmarks) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AVATAR` | - | fediverse user image |
| `DATA_DIR` | /data | location of your personal data |
| `USERNAME` | (secret) | fediverse username. (ex @USERNAME@PUBLIC_BASE_URL) |
| `ADMIN_KEY` | - | the password you'll enter when the browser prompts you |
| `DESCRIPTION` | An ActivityPub tv tracking and sharing site built with Tvmarks | fediverse user description |
| `DISPLAY_NAME` | - | is your app's fediverse display name. |
| `SESSION_SECRET` | (secret) | is a random string used when hashing your session for use in a secure cookie. |
| `PUBLIC_BASE_URL` | - | hostname of your instance |
| `TIMEZONE_OFFSET` | -5 | your UTC timezone offset. ex: -7 or +3 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, Handlebars, CSS

[View on Railway →](https://railway.com/template/NOV4_h)
