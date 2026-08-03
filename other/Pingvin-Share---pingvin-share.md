# Deploy Pingvin Share on Railway

Self-hosted file sharing and link sharing for teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pingvin-share)

## About

**Status: DRAFT (manual publish).** The [unpublished template draft](https://railway.com/workspace/templates/e683b805-8546-493a-afff-3c793f4010c0) is ready for editor reconciliation. No marketplace deployment link exists until publication is approved and completed.

Pingvin Share is a self-hosted file-sharing platform and a lightweight alternative to WeTransfer. It lets people upload files, create share links with expiration dates, password protection, visitor limits, recipient email, reverse shares, and optional OIDC or LDAP authentication. Data remains on infrastructure controlled by the deployer.

Hosting Pingvin Share on Railway requires one public service running the immutable v1.13.0 container image, a target port of `3000`, and persistent storage for the SQLite database and uploaded images. This draft also uses a safe `PORT=3000` Railway setting and a start-command override that keeps the frontend on `3333` and backend on `8080`. Railway currently permits only one volume per service, so the draft captures the backend volume but cannot yet represent the requested second image volume. Resolve that storage constraint before manual publication. No database, queue, external API, or credential is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pingvin Share | `stonith404/pingvin-share:v1.13.0@sha256:6bf2bcd3043ee68cb61264f0857511ccf7f212fdb984382b7f2d491635184ad6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Start command:** `env PORT=3333 BACKEND_PORT=8080 sh ./scripts/docker/entrypoint.sh`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/app/backend/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pingvin-share)
