# Deploy OpenPencil on Railway

Private AI vector design workspace with password protection and storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpencil)

## About

OpenPencil is an open-source AI-assisted vector design tool. This template gives you a private browser workspace for editing designs and working with supported API-key AI agents. It packages the Rust web host from **OpenPencil v0.8.4, an upstream prerelease**.

The template deploys two services: a password-protected public gateway and a private OpenPencil application with a persistent volume. No database or GPU is required. Railway generates the access password and wires the private upstream address and public origin.

Open the **gateway** domain and sign in as **admin** using its **ACCESS_PASSWORD** variable. Basic editing works without an AI key. Connect your own supported provider in the editor when you want AI generation.

This is one shared workspace for an individual or mutually trusted group. Anyone with the password can access the same document. It is not a multi-tenant SaaS with isolated user accounts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openpencil | [RockinPaul/openpencil-railway-template](https://github.com/RockinPaul/openpencil-railway-template) | Database |
| gateway | [RockinPaul/openpencil-railway-template](https://github.com/RockinPaul/openpencil-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | openpencil | 3100 | Private OpenPencil HTTP and healthcheck port. The gateway references this value automatically. |
| `OPENPENCIL_WEB_ALLOWED_ORIGINS` | openpencil | - | Preserve upstream origin checks using the gateway's exact public origin. Do not set a wildcard. |
| `OPENPENCIL_WEB_AI_ENDPOINT_ALLOWLIST` | openpencil | - | Optional exact URL origins for a deliberately trusted private AI endpoint. Leave empty for normal public providers; no inference server is bundled. |
| `PORT` | gateway | 8080 | Gateway HTTP and healthcheck port. Leave at 8080 unless changing the service's target port too. |
| `ACCESS_PASSWORD` | gateway | (secret) | Generated private workspace password. Sign in as admin and copy this password from service Variables. Keep it private. |
| `OPENPENCIL_UPSTREAM` | gateway | - | Private OpenPencil service address. Automatically wired; do not replace with a public endpoint. |
| `OPENPENCIL_PUBLIC_ORIGIN` | gateway | - | Exact public HTTPS origin, without a trailing slash. Change this when using a custom domain; other browser origins are rejected. |

## Configuration

- **Healthcheck:** `/`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openpencil)
