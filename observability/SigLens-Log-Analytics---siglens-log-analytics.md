# Deploy SigLens Log Analytics on Railway

Query logs and traces with durable storage and private ingestion.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siglens-log-analytics)

## About

Query logs and traces with durable storage and private ingestion.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Query logs and traces with durable storage and private ingestion.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `/siglens/data` |
| `siglens` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| siglens | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `siglens/siglens:1.0.57@sha256:d377e12dbbd4d26d48552b90af2972f1e62513e1fa38cd07477930ae50897bb0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | siglens | 8080 | Port for siglens; follows the upstream deployment configuration. |
| `OWNER_AUTH` | siglens | true | Owner auth for siglens; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | siglens | all | Owner scope for siglens; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | siglens | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | siglens | 5122 | Upstream port for siglens; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | siglens | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `SIGLENS_CONFIG` | app | ingestListenIP: "[::]"
ingestPort: 8081
queryListenIP: "[::]"
queryPort: 5122
dataPath: /siglens/data/
timestampKey: timestamp
pqsEnabled: true
esVersion: "7.9.3"
retentionHours: 168
ssInstanceName: sigsingle
log:
  logPrefix: /siglens/data/logs/
tls:
  enabled: false
queryHostname: ""
queryTimeoutSecs: 300
 | Siglens config for app; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -ec 'mkdir -p /siglens/data/logs; printf "%s" "$SIGLENS_CONFIG" > /tmp/siglens.yaml; exec /siglens/siglens --config /tmp/siglens.yaml'`
- **Volume:** `/siglens/data`

**Category:** Observability · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/siglens-log-analytics)
