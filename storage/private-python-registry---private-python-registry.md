# Deploy private-python-registry on Railway

Private Python package registry with devpi, pip/uv compatibility.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/private-python-registry)

## About

private-python-registry is a ready-to-deploy Railway template that launches your own private Python package index, powered by [devpi](https://devpi.net). It is fully compatible with standard Python tooling — `pip`, `uv`, `twine`, and `devpi-client` — and ships with a built-in web UI, search, and an on-demand PyPI mirror that caches public dependencies into your own persistent storage.

Hosting private-python-registry on Railway is a one-click affair. The template builds a single container running `devpi-server` + `devpi-web`, exposes it on Railway's managed HTTPS domain, and persists every package, user, and login token to a Railway Volume mounted at `/data`. A persistent server secret is generated on first boot so authentication tokens survive redeploys, and initial admin credentials are seeded from a single `DEVPI_ROOT_PASSWORD` environment variable. No external database, no reverse proxy, no moving parts — just a Dockerfile, a volume, and a generated domain. Redeploys and restarts are fully idempotent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| private-python-registry | [hallcyn/private-python-registry](https://github.com/hallcyn/private-python-registry) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 13141 | - |
| `DEVPI_SECRETFILE` | (secret) | A persistent secret to keep tokens valid between redeployments. Must remain on the volume. |
| `DEVPI_ROOT_PASSWORD` | (secret) | The root user's seed is set during devpi-init. This is only used for the first boot; changing it afterward has no effect. You must use `devpi user -m root password=...` to do so. |

## Configuration

- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/private-python-registry)
