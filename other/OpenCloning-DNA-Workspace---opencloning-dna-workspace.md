# Deploy OpenCloning DNA Workspace on Railway

Plan and document molecular cloning in a private web workspace.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencloning-dna-workspace)

## About

Plan and document molecular cloning in a private web workspace.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Plan and document molecular cloning in a private web workspace.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `None` |
| `opencloning` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `manulera/opencloning:prod@sha256:06dd815594beddeafb95bdc6dcffad0db3f8ff57730c423bec0f9c78b1d50f5b` | Worker |
| opencloning | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TMPDIR` | core | /tmp | Tmpdir for core; follows the upstream deployment configuration. |
| `ALLOWED_ORIGINS` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `ENABLE_ASSEMBLER` | core | false | Enable assembler for core; follows the upstream deployment configuration. |
| `GUNICORN_TIMEOUT` | core | 60 | Gunicorn timeout for core; follows the upstream deployment configuration. |
| `GUNICORN_WORKERS` | core | 2 | Gunicorn workers for core; follows the upstream deployment configuration. |
| `ENABLE_PLANNOTATE` | core | false | Enable plannotate for core; follows the upstream deployment configuration. |
| `PORT` | opencloning | 8080 | Port for opencloning; follows the upstream deployment configuration. |
| `OWNER_AUTH` | opencloning | true | Owner auth for opencloning; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | opencloning | all | Owner scope for opencloning; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | opencloning | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | opencloning | 8000 | Upstream port for opencloning; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | opencloning | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/opencloning-dna-workspace)
