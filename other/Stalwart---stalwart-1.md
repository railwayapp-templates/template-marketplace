# Deploy Stalwart on Railway

Mailbox server: JMAP, IMAP, CalDAV, CardDAV, and a web admin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/stalwart-1?utm_medium=integration&utm_source=button&utm_campaign=stalwart-1)

[Stalwart](https://stalw.art/) is an all-in-one mail and collaboration server written in Rust — SMTP, IMAP, POP3, JMAP, CalDAV, CardDAV, and a full web admin in a single binary, with built-in spam filtering, DKIM/SPF/DMARC/ARC, and encryption at rest.

**Read this before deploying: on Railway this is a mailbox server, not an MX.** Inbound mail from the internet cannot reach it — Railway's TCP proxy answers on a port it assigns you, and an MX record cannot carry a port, so other mail servers have no way to connect. Outbound SMTP is blocked entirely below the Pro plan. What works well here is JMAP and the web admin over your Railway domain, IMAP and submission for your own clients through TCP proxies, and CalDAV/CardDAV. For a public mail domain that receives on port 25, run Stalwart somewhere you control the ports.

Stalwart keeps its entire state in two places: `/etc/stalwart` holds the pointer to the store, and `/var/lib/stalwart` holds the RocksDB store itself — accounts, mailboxes, and every setting made in the web UI. Railway attaches one volume per service, so this template relocates both onto a single volume at `/data` before the server starts. Without that, a redeploy would drop the server back into first-run bootstrap mode with the previous mailboxes gone. The web admin is served over plain HTTP on port 8080 both during setup and after, which is exactly what Railway's edge wants to talk to; TLS is terminated at Railway's proxy on your public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stalwart | [nomideusz/stalwart-railway](https://github.com/nomideusz/stalwart-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Web admin port Railway routes to. Don't change. |
| `STALWART_PUBLIC_URL` | - | Public base URL, wired to your Railway domain. Don't change. |
| `STALWART_RECOVERY_ADMIN` | - | Administrator login for the setup wizard, as user:password. Auto-generated. |

## Configuration

- **Healthcheck:** `/healthz/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/stalwart-1)
