# Deploy JMAP Webmail on Railway

Self-hosted JMAP webmail for Stalwart, Fastmail, Cyrus or Apache James

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-webmail)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-webmail?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=stalwart-webmail)

**A modern webmail for any JMAP server.** [Stalwart](https://stalw.art) is a
superb mail server that ships without a webmail UI; Fastmail, Cyrus and Apache
James speak JMAP too. This template is a fast, offline-capable JMAP mail client
you point at your server — one container, two variables, done.

A single SvelteKit (Node) service with a volume at `/app/.data` for its SQLite
store: sessions, rate limits, settings and push subscriptions. Set `PUBLIC_JMAP_SERVER_URL` to your
Stalwart server's base URL (e.g. `https://mail.example.com`) — everything
else has working defaults, and `SESSION_SECRET` is auto-generated. Your users
sign in with their mailbox email + password (app passwords and
`password$totp` TOTP suffixes work); credentials are AES-256-GCM-sealed in a
server-side SQLite store, the browser cookie only ever holds an opaque
session id, and all JMAP traffic is proxied same-origin. The client is Zaur Mail 2: mail,
contacts, calendar and server-side filter rules in one app, with drafts and
an outbox that keep working offline, live updates over JMAP push, and phone
and tablet layouts. It installs as a PWA. There's a [Stalwart template](https://railway.com/deploy/stalwart?referralCode=sLjDXb)
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
| `JMAP_AUTH` | - | Sign-in mode: stalwart (default), basic (Cyrus, Apache James) or token (Fastmail API token) |
| `VAPID_SUBJECT` | - | Contact for push services, e.g. mailto:you@example.com |
| `SESSION_SECRET` | (secret) | Auto-generated - seals sign-in credentials in the server-side store |
| `PUBLIC_APP_ICON` | - | App icon: mail (envelope, default) or zaur |
| `PUBLIC_APP_NAME` | - | App name in titles and the installed PWA (default: Webmail) |
| `VAPID_PUBLIC_KEY` | - | Web Push public key (npx web-push generate-vapid-keys) - enables new-mail notifications |
| `PUBLIC_BRAND_NAME` | - | Your brand, e.g. Acme -> "Acme address", "Acme Meet" |
| `VAPID_PRIVATE_KEY` | - | Web Push private key, pairs with VAPID_PUBLIC_KEY |
| `PUBLIC_MAIL_DOMAIN` | - | Your mail domain, used in sign-in hints (default: example.com) |
| `PUBLIC_JMAP_SERVER_URL` | - | JMAP server base URL, e.g. https://mail.example.com (Fastmail: https://api.fastmail.com/jmap/session) |
| `STALWART_OAUTH_ENABLED` | - | Set true to sign in via Stalwart OAuth instead of password |
| `STALWART_OAUTH_CLIENT_ID` | - | OAuth client id registered in Stalwart (PKCE S256) |
| `STALWART_OAUTH_ISSUER_URL` | - | Stalwart base URL for OAuth - usually same as PUBLIC_JMAP_SERVER_URL |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.data`

**Category:** Other · **Languages:** TypeScript, Svelte, JavaScript, CSS, HTML, Python, Shell, Dockerfile, EJS, Java

[View on Railway →](https://railway.com/deploy/stalwart-webmail)
