# Deploy Verdaccio on Railway

A private npm registry that also caches packages from npmjs.com

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/verdaccio)

## About

Verdaccio is a lightweight Node.js private npm registry. Teams self-host Verdaccio so internal packages live somewhere they control rather than on the public npm registry, and so every `npm install` of a public dependency is served from a local cache instead of the internet. It speaks the ordinary npm protocol, so `npm`, `yarn`, `pnpm` and `bun` work against it with nothing but a registry URL, and anything it does not hold locally it fetches from npmjs.com once and serves from then on.

Deploy Verdaccio here and you get one service with a persistent volume, a public HTTPS URL and authentication already on. Package reads require a login, self-registration is disabled so a public URL never becomes an open registry, and the first account is created from the username and password you set at deploy time. Tarballs, the cached mirror, the user database and the signing key all live on the volume, so redeploys keep every package intact.

![Diagram of the single Verdaccio registry service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788296261/verdaccio-architecture.png)

Verdaccio solves two problems that arrive together. The first is privacy: a shared UI kit, API client or config schema should not go to a public registry, and npm offers no free way to keep one private. The second is availability: a build installing hundreds of transitive dependencies is hostage to a third-party registry, where one removed or rate-limited package breaks what worked yesterday. A local registry fixes both.

Key features:

- Private publishing with per-package rules for read, publish and unpublish
- Uplink proxying and on-disk caching of npmjs.com or any npm-compatible registry
- Scoped packages, so `@yourcompany/*` resolves privately while everything else proxies
- A searchable web UI with readmes, dependencies, version history and uplink sources
- Pluggable auth — htpasswd built in, with LDAP, GitHub and OIDC plugins available
- `npm audit` support, plus filters that block versions by age or by name
- Works unchanged with npm, yarn, pnpm and bun

The Railway architecture is deliberately simple. One container runs the registry; one volume at `/data` holds the package tree, the user database and the signing key. There is no separate database, queue or object storage — Verdaccio's storage layer owns all of it and is built around a single writer. The template also sets the proxy trust list, so rate limiting and the access log see real client addresses.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| verdaccio | [gridalpha/verdaccio-railway](https://github.com/gridalpha/verdaccio-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4873 | HTTP port Railway probes |
| `NODE_OPTIONS` | --max-old-space-size=2048 | Node heap ceiling in megabytes |
| `VERDACCIO_PORT` | 4873 | Port the registry binds |
| `VERDACCIO_ADDRESS` | 0.0.0.0 | Listen address inside the container |
| `VERDACCIO_DATA_DIR` | /data | Volume mount holding storage and users |
| `VERDACCIO_PROTOCOL` | http | Railway's edge terminates TLS |
| `VERDACCIO_MAX_USERS` | -1 | Self-registration limit; -1 blocks signup |
| `VERDACCIO_ADMIN_USER` | (secret) | Registry account created at start-up |
| `VERDACCIO_PUBLIC_URL` | - | Base URL for tarball links |
| `VERDACCIO_UPLINK_URL` | https://registry.npmjs.org/ | Upstream registry proxied and cached |
| `VERDACCIO_PRIVATE_SCOPE` | - | Optional scope never proxied upstream |
| `VERDACCIO_ADMIN_PASSWORD` | (secret) | Password for that account |
| `VERDACCIO_PACKAGE_ACCESS` | $authenticated | Who may read packages |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/verdaccio)
