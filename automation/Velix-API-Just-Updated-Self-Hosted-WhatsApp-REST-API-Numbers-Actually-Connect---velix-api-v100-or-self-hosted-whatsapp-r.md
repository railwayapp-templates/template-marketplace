# Deploy Velix API | (Just Updated) Self-Hosted WhatsApp REST API, Numbers Actually Connect on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/velix-api-v100-or-self-hosted-whatsapp-r)

## About

Velix API is a self-hosted WhatsApp REST API written in Go: connect several WhatsApp numbers
to one deployment, send and receive messages over a plain REST interface, get webhooks for
everything that happens, and drive it from n8n, a chatbot, or your own backend — without
Meta's Cloud API per-message pricing.

This template deploys it with Postgres, Redis and a volume already wired, **and with the
three Railway-specific defects that make the other listings in this category unusable already
fixed**. Every claim below was reproduced against the upstream image before this template was
published.

**The volume has to be repaired or you can never connect a number.** Railway mounts volumes
owned by uid 0; the Velix image runs as uid 65532 and ships distroless, so it has no shell and
no start command can fix it from the outside. Deployed that way the service looks perfect — it
logs `WhatsApp engine started`, it answers the healthcheck, the dashboard is green — and then
the first real call fails:

```
POST /v1/instances    -&gt;  500 INTERNAL_ERROR
error: "register in engine: create store dir: mkdir /data/instances: permission denied"
```

Not one WhatsApp number can be paired, and the volume stays empty. This template's image
repairs the mount's ownership before the app starts and drops back to uid 65532 immediately
after, which it prints to the deploy log so you can read it back:

```
[railway-entrypoint] volume /data owned by uid 0, repairing to 65532
[railway-entrypoint] volume ready owner=65532:65532 store=/data/instances
POST /v1/instances    -&gt;  201 {"status":"disconnected"}
```

Verified on this exact template: instances created, sessions written under `/data/instances`,
and both still there after a redeploy.

**Signup is closed, and your admin account already exists.** `POST /v1/auth/register` is open
to the entire internet in Velix 1.0.0 — it creates a workspace and hands the caller
`role: admin`. There is no environment variable that turns it off; the
`REGISTRATION_ENABLED` setting you may see on other deploy forms appears nowhere in the
binary. Anyone who finds your URL can run their own WhatsApp instances on your container, on
your volume, on your bill.

Here the gateway in front of the app answers `/v1/auth/register` with 403, and your own
workspace is created on first boot from `VELIX_ADMIN_PASSWORD` — a Railway `secret`, visible
in the variables panel, applied at creation and never regenerated afterwards. Log in with
`admin@velix.local` and that password. If you want public signup back, set
`VELIX_PUBLIC_REGISTRATION=true` on the service.

**Brute force on the login endpoint is throttled.** Upstream applies no rate limit at all —
80 consecutive wrong-password requests to `/v1/auth/login` return 80 × 401 with no backoff.
The gateway limits login and register to 10 requests/minute per client, keyed on the real
client address from `X-Forwarded-For`, because on Railway every request arrives from the edge
network and a limiter keyed on the socket peer would put the whole internet in one bucket.
Railway replaces any inbound `X-Forwarded-For`, so the key cannot be forged.

**What runs.** Three services: the Velix app (public, with a volume for session stores and
media), Postgres (instances, messages, workspaces, API keys), and Redis — required, not
optional; the app exits with `REDIS_URL is required` without it. The app waits for both to
accept connections before starting, so the first deploy does not lose a restart cycle racing
its own database.

**Cost.** A single compiled Go binary plus a small gateway, so the app service is light next
to browser-based WhatsApp gateways that drive a headless Chromium per number. Railway bills
by usage; Velix, Postgres and Redis are all free and open source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| velix | `ghcr.io/bon5co/velix-railway:latest` | Web service |
| redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `JWT_SECRET` | velix | (secret) |
| `VELIX_ADMIN_PASSWORD` | velix | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/velix-api-v100-or-self-hosted-whatsapp-r)
