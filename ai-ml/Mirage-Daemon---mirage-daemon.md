# Deploy Mirage Daemon on Railway

Mirage daemon — a versioned virtual filesystem and shell for AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mirage-daemon)

## About

[Mirage](https://github.com/strukto-ai/mirage) is a virtual terminal for AI agents: a bash-like
shell over a virtual filesystem that mounts object storage, databases, message platforms and
documents as directories, with git-style versioning of every workspace. This template runs the
Mirage daemon (0.0.6) as a token-protected service, so agents anywhere — your laptop, a CI job,
another Railway service — share one always-on workspace host.

The daemon is a Python HTTP service, and upstream documents running it as a shared daemon with
an operator-issued bearer token. This template does exactly that and fixes the three things a
platform container needs on top: a dual-stack listener (the daemon's own server can only bind
one address family, and Railway's private network is IPv6-only), a Host allowlist built from your
Railway domains (the daemon rejects unknown hosts before it even checks the token), and a very
long idle grace (the daemon shuts itself down after its last workspace is removed, and that cannot
be turned off — only postponed). Workspace state, version history and snapshots live on a
volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mirage | [RockinPaul/mirage_railway_template](https://github.com/RockinPaul/mirage_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MIRAGE_AUTH_TOKEN` | (secret) | Bearer token every client presents (MIRAGE_TOKEN on the CLI). Generated for this deployment; read it from the service variables. Nothing to fill in. |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mirage-daemon)
