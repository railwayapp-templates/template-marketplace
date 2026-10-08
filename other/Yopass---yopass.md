# Deploy Yopass on Railway

End-to-end encrypted one-time secret links, with a private Valkey store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yopass)

## About

Yopass shares passwords, API keys and small files through end-to-end encrypted, one-time links that expire after an
hour, a day or a week. This template deploys the official Yopass image with a private, persistent Valkey
(Redis-compatible) store: no input needed, the store password is generated and unread secrets survive redeploys.
Community-maintained; not affiliated with the Yopass project, and it does not use the Yopass logo.

Yopass encrypts each secret in the browser with OpenPGP; the decryption key lives only in the link's `#fragment`,
which is never sent to the server, so the server and its store only ever see ciphertext. The template runs two
services: `yopass` (the web app and API, public over HTTPS) and `valkey` (private, password-protected, with a volume
and an append-only file). Every secret is written with a store TTL equal to its expiry, and one-time secrets are
deleted atomically on first read. Yopass has no accounts: anyone with the URL can create secrets, which is how it is
designed. The template caps the store's memory (256 MB, soonest-expiring evicted first), keeps the size limits, and
restricts browser API access to its own origin; `READ_ONLY`, `DISABLE_UPLOAD`, `FORCE_ONETIME_SECRETS` and
`FORCE_EXPIRATION` tighten it further.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yopass | `jhaals/yopass:14.10.0@sha256:6c33d9c813f77bae70787e1bce76710840ff654f454998b01f8dacc0a7988fd3` | Web service |
| valkey | `valkey/valkey:9.1.2-alpine@sha256:48332870af354a799964c0012ae1194a0bf2bf894eb508f945810596dc2d8d11` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | yopass | 1337 | Port Yopass listens on (all interfaces); the public domain and health check target it. Keep it. |
| `REDIS` | yopass | - | Connection URL of the bundled Valkey on Railway's private network. |
| `DATABASE` | yopass | redis | Secret store backend. redis = the bundled Valkey. |
| `READ_ONLY` | yopass | - | Optional. true disables creating secrets (retrieval only). Pair with a private creation instance and PUBLIC_URL. |
| `MAX_LENGTH` | yopass | 10000 | Maximum size of an encrypted text secret, in characters. |
| `PUBLIC_URL` | yopass | - | Optional. Base URL used in generated secret links, e.g. your custom domain. |
| `IMPRINT_URL` | yopass | - | Optional. Link to an imprint/legal notice shown in the footer. |
| `MAX_FILE_SIZE` | yopass | - | Optional. Maximum encrypted file size, e.g. 512KB (default) or 1MB (maximum without a Yopass license). |
| `DEFAULT_EXPIRY` | yopass | 1h | Expiry pre-selected in the web app: 1h, 1d or 1w. |
| `DISABLE_UPLOAD` | yopass | - | Optional. true disables encrypted file sharing (text secrets only). |
| `FORCE_EXPIRATION` | yopass | - | Optional. Force every secret to this expiry: 1h, 1d or 1w. |
| `CORS_ALLOW_ORIGIN` | yopass | - | Only this origin may call the API from a browser. The web app itself is same-origin and unaffected. |
| `PRIVACY_NOTICE_URL` | yopass | - | Optional. Link to a privacy notice shown in the footer. |
| `NO_LANGUAGE_SWITCHER` | yopass | - | Optional. true hides the language switcher. |
| `FORCE_ONETIME_SECRETS` | yopass | (secret) | Optional. true rejects secrets that are not one-time. |
| `REDIS_PASSWORD` | valkey | (secret) | Valkey password, generated. Only Yopass uses it, over the private network. |
| `VALKEY_MAXMEMORY` | valkey | 256mb | Memory cap for stored secrets (e.g. 256mb, 1gb). When full, the secrets closest to expiry are evicted first. |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec docker-entrypoint.sh valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory "${VALKEY_MAXMEMORY:-256mb}" --maxmemory-policy volatile-ttl'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yopass)
