# Deploy PrivateBin on Railway

Pastebin where text is encrypted in your browser before it is stored

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/privatebin)

## About

Self-host PrivateBin to share text without handing it to anyone, including yourself. PrivateBin is an open-source pastebin in which the browser encrypts a document with 256-bit AES-GCM before anything is sent, and the decryption key lives only in the fragment of the URL you share. A fragment is never transmitted to the server, so the host stores ciphertext it has no way to read. Developers use it for stack traces, config snippets, incident notes and credentials in transit — anywhere a public paste service would be careless and email too permanent.

Deploy PrivateBin on Railway and you get two services. The **privatebin** service runs nginx and PHP-FPM from the official `privatebin/nginx-fpm-alpine` image and is the only one with a public URL. The **Postgres** service holds every document, every comment, the server salt that signs delete tokens, and the rate-limiter state. Because none of that sits on a local disk, the web tier is stateless: redeploys keep existing share links and delete tokens working. Encryption, expiry and rate limiting are configured before you open it.

![Diagram of the PrivateBin and PostgreSQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789227602/privatebin-architecture.webp)

PrivateBin descends from ZeroBin and has been maintained independently since 2016. Its security claim is structural rather than a policy: the server receives a blob it cannot decrypt, so a database dump or a compromised host yields nothing readable.

Key features:

- Client-side AES-256-GCM encryption, with the key carried only in the URL fragment
- Expiry from five minutes to never, plus burn-after-reading
- Optional password on top of the URL key
- Threaded discussions under a document
- Plain text, syntax-highlighted source code, and Markdown rendering
- QR code and email buttons for handing the link to a phone
- A per-client rate limit on document creation

The Railway deployment splits this into the web tier and PostgreSQL. Keeping documents in the database makes the web service disposable, and keeps the rate limiter honest, since its counters are shared rather than per container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| privatebin | [gridalpha/privatebin-railway](https://github.com/gridalpha/privatebin-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | privatebin | 8080 | HTTP listening port |
| `DATABASE_URL` | privatebin | - | Admin connection, provisions the scoped role |
| `PRIVATEBIN_NAME` | privatebin | PrivateBin | Name shown on the page |
| `PRIVATEBIN_QRCODE` | privatebin | true | Offer a QR code for the link |
| `PRIVATEBIN_DB_NAME` | privatebin | privatebin | Database created for documents |
| `PRIVATEBIN_DB_USER` | privatebin | (secret) | Scoped role the app connects as |
| `PRIVATEBIN_SIZELIMIT` | privatebin | 10000000 | Maximum document size in bytes |
| `PRIVATEBIN_DISCUSSION` | privatebin | true | Allow comments on documents |
| `PRIVATEBIN_FILEUPLOAD` | privatebin | false | Allow file attachments |
| `PRIVATEBIN_DB_PASSWORD` | privatebin | (secret) | Password for the scoped role |
| `PRIVATEBIN_TRAFFIC_LIMIT` | privatebin | 10 | Seconds between documents per client |
| `PRIVATEBIN_EXPIRE_DEFAULT` | privatebin | 1week | Default expiry for new documents |
| `PRIVATEBIN_OPENDISCUSSION` | privatebin | false | Pre-select the comments checkbox |
| `PRIVATEBIN_DEFAULTFORMATTER` | privatebin | plaintext | plaintext, syntaxhighlighting or markdown |
| `PRIVATEBIN_BURNAFTERREADINGSELECTED` | privatebin | false | Pre-select burn after reading |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** PHP, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/privatebin)
