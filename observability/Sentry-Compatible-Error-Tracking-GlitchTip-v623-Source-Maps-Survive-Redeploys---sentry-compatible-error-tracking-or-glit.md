# Deploy Sentry-Compatible Error Tracking | GlitchTip v6.2.3, Source Maps Survive Redeploys on Railway

Sentry-SDK error tracking in 3 services, not 12. Source maps on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sentry-compatible-error-tracking-or-glit)

## About

GlitchTip is free, open-source error tracking that speaks the **Sentry SDK protocol**. Every
official `sentry-sdk` — Python, JavaScript, Go, Ruby, PHP, Java, .NET, React Native — reports to
it by changing the DSN and nothing else. You get issue grouping, stack traces with source maps,
release tracking, alerts to email/webhook/Slack, performance transactions and uptime monitors,
without sending your production errors to a third party.

Self-hosted Sentry is a 12-to-23 container distributed system — Kafka, ClickHouse, Snuba, Relay,
Symbolicator, a task broker and a fleet of consumers — and its own documentation asks for 16 GB
of RAM before it will run. GlitchTip serves the same SDKs from **three services**: the
application, Postgres, and Valkey/Redis. Web server, task worker and scheduler share one
container via GlitchTip's own `all_in_one` mode, so there is no second app service to pay for.

This template runs `ghcr.io/bon5co/glitchtip-railway`, a thin wrapper over the official upstream
image pinned at **6.2.3**. No forks, no patches — only the configuration a Railway deployment
needs, plus three corrections that are wrong by default on this platform:

**Uploaded source maps survive a redeploy — and that matters more than it sounds.** GlitchTip
stores uploads in a Django `FileField`, and `MEDIA_ROOT` defaults to an empty string, which
resolves to the working directory `/code` — the ephemeral container filesystem. On Railway a
redeploy replaces the container, so every source map you uploaded is gone. The trap is what
happens next: `FileBlob` deduplicates on a sha1 checksum kept in **Postgres**, which survives.
Re-uploading the identical file finds the surviving row, applies no defaults, and writes nothing
— measured as `blobs before/after re-upload = 1/1`, returning the same id with the file still
missing. So `sentry-cli` reports a successful upload, the UI keeps listing the artifact, and
your stack traces stay minified until somebody deletes the row by hand. This template puts
`MEDIA_ROOT` on the volume, and repairs the volume's root ownership before the app's privilege
drop so it can actually write there.

**Your instance stays yours.** Upstream defaults `ENABLE_USER_REGISTRATION` to `True`, so a
public GlitchTip URL accepts signups from anyone who finds it. This template turns it off, which
does **not** lock you out: GlitchTip already special-cases the empty instance, so the first
account — yours — is still allowed, and everyone after it is refused. Verified on a live
deployment: first signup `200`, second signup `403`.

**Login works over HTTPS.** Railway terminates TLS at the edge and GlitchTip exposes no
`SECURE_PROXY_SSL_HEADER` setting, so Django can compare a browser's `https` origin against an
`http` view of its own host and reject the POST. The entrypoint derives
`CSRF_TRUSTED_ORIGINS` from the Railway public domain.

The image is pinned rather than tracking `:latest`, because GlitchTip applies Django migrations
on boot that are not designed to roll back. Memory sizing is deliberately left alone — GlitchTip
6 already reads the cgroup for both its malloc arenas and its worker RSS ceiling, so there is
nothing to override.

Data lives on three volumes: the Postgres data directory, Valkey's append-only file, and
`/data` on the application for uploaded artifacts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| glitchtip | `ghcr.io/bon5co/glitchtip-railway:latest` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `SECRET_KEY` | glitchtip | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/_health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/sentry-compatible-error-tracking-or-glit)
