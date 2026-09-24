# Deploy Toxiproxy Network Fault Testing on Railway

Inject latency and failures into private test-service connections.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/toxiproxy-network-fault-testing)

## About

Inject latency and failures into private test-service connections.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Inject latency and failures into private test-service connections.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `toxiproxy` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| toxiproxy | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `ghcr.io/shopify/toxiproxy:2.12.0@sha256:9378ed52a28bc50edc1350f936f518f31fa95f0d15917d6eb40b8e376d1a214e` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | toxiproxy | 8080 | Port for toxiproxy; follows the upstream deployment configuration. |
| `OWNER_AUTH` | toxiproxy | true | Owner auth for toxiproxy; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | toxiproxy | all | Owner scope for toxiproxy; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | toxiproxy | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | toxiproxy | 8474 | Upstream port for toxiproxy; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | toxiproxy | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | app | 8474 | Port for app; follows the upstream deployment configuration. |
| `LOG_LEVEL` | app | info | Log level for app; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/toxiproxy -host=0.0.0.0 -port=8474`
- **Healthcheck:** `/version`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/toxiproxy-network-fault-testing)
