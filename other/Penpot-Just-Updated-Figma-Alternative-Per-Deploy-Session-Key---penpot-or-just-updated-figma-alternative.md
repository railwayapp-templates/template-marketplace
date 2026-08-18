# Deploy Penpot | (Just Updated) Figma Alternative, Per-Deploy Session Key on Railway

Self-hosted Figma alternative with a fresh session key on every deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-or-just-updated-figma-alternative)

## About

Penpot is the open-source design and prototyping platform — a self-hosted
alternative to Figma. It runs entirely in the browser, uses open web standards
(SVG) as its native format, and lets designers and developers collaborate on the
same files. This template deploys a complete, pinned Penpot **2.17.0** stack:
the frontend, backend, exporter, PostgreSQL and Valkey (Redis), wired together
and ready to sign into.

Penpot is not a single container. A working instance needs the web frontend, the
Clojure backend that holds every design file, a headless exporter for PNG/PDF/SVG
output, a PostgreSQL database and a Redis-compatible cache. This template
provisions all of them and connects them over Railway's private network, so the
only thing exposed to the internet is the frontend.

Two things a stock or copied Penpot deployment gets wrong are fixed here.

**The session-signing key is unique to your deployment.** `PENPOT_SECRET_KEY` is
the master secret from which Penpot derives the keys that sign HTTP sessions and
invitation links — Penpot's own documentation calls it exactly that. Upstream
ships the literal placeholder `change-this-insecure-key`, and the most-deployed
Railway template for Penpot hardcodes a single fixed key into its public
configuration, identical on every deploy anyone makes from it. Because that key is
public and shared, anyone who reads the template can forge a valid session for any
instance built from it. This template generates a fresh 48-character key per deploy
with `${{secret(48)}}`, which Railway resolves once and stores, so your key is both
unpredictable and stable across redeploys (a redeploy does not log everyone out).

**Assets live on a volume, not on ephemeral disk or an extra billed service.**
Penpot's default object-storage backend is the filesystem (`PENPOT_OBJECTS_STORAGE_BACKEND=fs`),
and this template mounts a Railway volume at Penpot's default assets directory
(`/opt/data/assets`) so uploaded images and exported files survive redeploys.
The common alternative — bolting on a separate MinIO service — adds a billed
container, requires the `penpot-assets` bucket to be created before uploads work,
and (as shipped by the leading template) exposes the MinIO console on a public
domain. Dropping it removes all three problems and one service from your bill.

The backend also does **not** expose Penpot's PREPL server. `enable-prepl-server`
opens a remote Clojure REPL on port 6063; the leading template publishes a public
domain pointed straight at it, which is a remote-code-execution surface open to the
internet. This template leaves the PREPL off and keeps the backend, exporter,
database and cache on the private network entirely. Telemetry is off by default,
every image is pinned to 2.17.0 rather than `latest` (Penpot migrates its schema
forward on boot, so an unpinned redeploy is an unrequested upgrade), and there are
zero blank required variables on the deploy form — the database password and the
session key are generated for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| exporter | `penpotapp/exporter:2.17.0` | Worker |
| frontend | `penpotapp/frontend:2.17.0` | Web service |
| postgres | `postgres:16-alpine` | Database |
| backend | `penpotapp/backend:2.17.0` | Database |
| valkey | `valkey/valkey:8.1.3` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PENPOT_SECRET_KEY` | exporter | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PENPOT_SECRET_KEY` | backend | (secret) |
| `PENPOT_DATABASE_PASSWORD` | backend | (secret) |
| `PENPOT_DATABASE_USERNAME` | backend | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/opt/data/assets`
- **Start command:** `/bin/sh -c 'exec valkey-server --save "" --appendonly no --maxmemory 256mb --maxmemory-policy volatile-lfu'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/penpot-or-just-updated-figma-alternative)
