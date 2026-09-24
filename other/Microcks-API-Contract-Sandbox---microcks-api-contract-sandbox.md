# Deploy Microcks API Contract Sandbox on Railway

Import API contracts, explore mock endpoints and run conformance tests.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/microcks-api-contract-sandbox)

## About

Import API contracts, explore mock endpoints and run conformance tests.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Import API contracts, explore mock endpoints and run conformance tests.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `microcks` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `quay.io/microcks/microcks-uber:1.15.0-native@sha256:b36c02f9e52bd6dfad939bbbd75dfd3f27c3196a046caa34fabd82e76924f670` | Worker |
| microcks | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for microcks; follows the upstream deployment configuration. |
| `OWNER_AUTH` | true | Owner auth for microcks; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | all | Owner scope for microcks; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | 8080 | Upstream port for microcks; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/microcks-api-contract-sandbox)
