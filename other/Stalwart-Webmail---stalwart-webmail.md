# Deploy Stalwart Webmail on Railway

Self-hosted webmail for your Stalwart mail server (JMAP)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-webmail)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-webmail?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=stalwart-webmail)

**The webmail Stalwart is missing.** [Stalwart](https://stalw.art) is a superb
modern mail server, but it ships without a webmail UI. This template fills
that gap: a fast, offline-capable JMAP mail client you point at your own
Stalwart server — one container, two variables, done.

A single SvelteKit (Node) service with a volume at `/app/.data` for sessions,
rate limits and push subscriptions. Set `PUBLIC_JMAP_SERVER_URL` to your
Stalwart server's base URL (e.g. `https://mail.example.com`) — everything
else has working defaults, and `SESSION_SECRET` is auto-generated. Your users
sign in with their mailbox email + password (app passwords and
`password$totp` TOTP suffixes work); credentials are AES-256-GCM-sealed in a
server-side SQLite store, the browser cookie only ever holds an opaque
session id, and all JMAP traffic is proxied same-origin. Mail is cached
client-side in IndexedDB, so the app works offline and installs as a PWA. Set
`PUBLIC_APP_NAME` and the UI, page titles and install manifest follow your
branding. There's a [Stalwart template](https://railway.com/deploy/stalwart)
on Railway too — deploy both for a complete self-hosted mail stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webmail | [nomideusz/zaur](https://github.com/nomideusz/zaur) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | :: | Bind address - leave as :: (dual-stack) |
| `PORT` | 3000 | App port - leave as 3000 |
| `SESSION_SECRET` | (secret) | Auto-generated - seals sign-in credentials in the server-side store |
| `PUBLIC_APP_NAME` | Webmail | App name shown in the UI, page titles and PWA manifest |
| `PUBLIC_JMAP_SERVER_URL` | - | Base URL of your Stalwart (JMAP) server, e.g. https://mail.example.com |
| `STALWART_OAUTH_ENABLED` | - | Set true to sign in via Stalwart OAuth instead of password |
| `STALWART_OAUTH_CLIENT_ID` | - | OAuth client id registered in Stalwart (PKCE S256) |
| `STALWART_OAUTH_ISSUER_URL` | - | Stalwart base URL for OAuth - usually same as PUBLIC_JMAP_SERVER_URL |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.data`

**Category:** Other · **Languages:** TypeScript, Svelte, CSS, JavaScript, HTML, Shell, Python, Dockerfile, EJS, Java

[View on Railway →](https://railway.com/deploy/stalwart-webmail)
