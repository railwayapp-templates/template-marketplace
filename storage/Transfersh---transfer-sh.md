# Deploy Transfer.sh on Railway

Upload a file with curl and get a shareable link that expires

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/transfer-sh)

## About

transfer.sh is a small Go server that turns file sharing into a single shell command. You pipe or upload a file with `curl`, and it answers with a random-token URL anyone can download from — no account, no client, no dashboard in the way. Developers use it to hand a colleague a log file, move a database dump between machines, or ship a build artifact out of CI. There is a drag-and-drop web page too, but the command line is the point.

Deploy transfer.sh here and you get two services: **caddy**, which holds the public URL and proxies every request onward, and **transfer-sh**, which stores uploads on a 5 GB Railway volume and sweeps them on a schedule. Uploads require HTTP basic auth so strangers cannot fill your disk; downloads stay open, because the unguessable token in the URL is what you share. Self-host transfer.sh this way and the whole thing is one binary, one volume and no database.

![Caddy gateway routing to the transfer.sh service and its volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788808406/transfer-sh-architecture.png)

transfer.sh solves a narrow problem well: getting a file from one place to another without inviting anyone to sign up. Teams self-host it when files should not sit on a third-party service, when the sender is a script rather than a person, or when a link needs to expire on its own. With no user model, there is nothing to administer.

Features that matter in practice:

- Upload with `curl`, `wget` or the browser; download with anything
- `Max-Days` and `Max-Downloads` headers set an expiry or a download budget per file
- Deletion tokens returned on upload, so a share can be revoked
- Server-side encryption via an `X-Encrypt-Password` header, plus documented `gpg` and `openssl` patterns
- Bundle downloads — several uploads at once as a `.zip` or `.tar.gz`
- Rendered previews for images, video, audio, markdown and text

The Railway architecture is deliberately thin. **transfer-sh** is a static Go binary writing to `/data` on its volume, with a background sweep that deletes anything older than `PURGE_DAYS`. **caddy** is a stock `caddy:2-alpine` proxy owning the public domain. Beyond routing it normalises the client IP header before the app sees it and blocks the two virus-scanning endpoints (`PUT /{file}/scan`, `PUT /{file}/virustotal`), which upstream leaves outside the basic-auth check and which do nothing unless ClamAV or a VirusTotal key is connected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | `caddy:2-alpine` | Web service |
| transfer-sh | `dutchcoders/transfer.sh:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | caddy | 8080 | Public listener, health check /healthz |
| `CADDY_CONFIG` | caddy | - | Gateway routes, health check and client-IP rewrite |
| `PORT` | transfer-sh | 8080 | Port Railway health-checks |
| `BASEDIR` | transfer-sh | /data | Volume path holding uploads |
| `PROVIDER` | transfer-sh | local | Storage backend on the volume |
| `PURGE_DAYS` | transfer-sh | 14 | Age at which files are deleted |
| `PRIVATE_HOST` | transfer-sh | transfer-sh.railway.internal:8080 | Private address the gateway proxies to |
| `HTTP_AUTH_PASS` | transfer-sh | - | Password required for uploads |
| `HTTP_AUTH_USER` | transfer-sh | (secret) | Username required for uploads |
| `PURGE_INTERVAL` | transfer-sh | 1 | Hours between purge sweeps |
| `MAX_UPLOAD_SIZE` | transfer-sh | 1048576 | Max upload in KB (1 GiB) |
| `RANDOM_TOKEN_LENGTH` | transfer-sh | (secret) | Characters in each download token |

## Configuration

- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/transfer-sh)
