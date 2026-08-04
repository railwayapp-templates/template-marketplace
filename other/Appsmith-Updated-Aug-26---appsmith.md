# Deploy Appsmith [Updated Aug '26] on Railway

Appsmith [Aug '26] (Build Internal Tools & Admin Panels Fast) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appsmith)

## About

Appsmith is the open-source low-code platform for building internal tools, admin panels, and dashboards. It's the tool teams reach for when they need a real CRUD interface over production data without dedicating a frontend engineer to build and maintain one from scratch.

Internal tools are a strange category of software. They're not customer-facing, so they never get a real product's polish budget, but they touch the most sensitive part of your stack: production databases, admin actions, customer records, refund buttons. That combination, low investment plus high access, is exactly why self-hosting the tool that builds them matters more than it might first seem.

Retool is the most obvious commercial comparison, and it's genuinely good software. But its Business plan runs $50-65 per builder/month, and even paid self-hosted Retool caps out at 25 users below Enterprise. A 10-builder team on Retool Business is $500-650/month before building a single app. Appsmith is open-source under Apache 2.0, no per-builder fee and no user cap.

There's also a data-residency angle easy to underweight until it matters. Every query an internal tool runs against production, and every credential it stores, lives somewhere. With a hosted SaaS tool, that somewhere is a vendor's infrastructure. With self-hosted Appsmith on Railway, it's yours.

One implementation detail worth knowing upfront: this template uses Appsmith's Community Edition image, not the Enterprise Edition some reference templates default to. CE skips the license-key prompt and account-creation nudge that EE shows on first boot, since CE has no licensing model to activate in the first place, it's just free.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| appsmith-railway | [shruti060701/appsmith-railway](https://github.com/shruti060701/appsmith-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | **Critical, do not mark optional.** Railway's default runtime `PORT=8080` collides with this image's backend (hardcoded to 8080), crashing it silently behind a still-working static frontend. Confirmed live via a real `502` on `/api/v1/users/me` before this fix. |
| `APPSMITH_ENCRYPTION_SALT` | - | Salt used alongside the encryption password for datasource credential encryption. Required for the app to boot at all. |
| `APPSMITH_DISABLE_TELEMETRY` | true | Opts out of anonymous usage data sent to Appsmith. |
| `APPSMITH_ENCRYPTION_PASSWORD` | (secret) | Encrypts stored datasource credentials (database passwords, API keys) at rest. Required for the app to boot at all. |

## Configuration

- **Healthcheck:** `/user/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appsmith-stacks`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/appsmith)
