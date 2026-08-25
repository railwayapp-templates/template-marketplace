# Deploy Postgres HA Read Replica on Railway

Highly available PostgreSQL with automated failover and a read replica.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-ha-read-replica)

## About

Deploying this template provisions a three-service PostgreSQL high-availability
formation in your Railway project:

| Component | Type | Source / Image | Persistent Volume | Public URL | Description |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **`pgaf-monitor`** | Service | `wotonews/postgres-ha:v0.1.0` | Yes (`/data`) | No | pg_auto_failover monitor — the witness that arbitrates failover. |
| **`pgaf-primary`** | Service | `wotonews/postgres-ha:v0.1.0` | Yes (`/data`) | No | The primary Postgres node — accepts all writes and reads. |
| **`pgaf-replica`** | Service | `wotonews/postgres-ha:v0.1.0` | Yes (`/data`) | No | The standby node — hot streaming replica, promoted on failover. |

All three services run the same image and self-organize: roles are derived
from Railway-injected environment variables (`RAILWAY_SERVICE_NAME` → monitor
vs node, `RAILWAY_PRIVATE_DOMAIN` → node identity). The first Postgres node
to join the formation becomes the primary; the second clones it with
`pg_basebackup` and streams WAL continuously.

- **Automated failover:** the monitor health-checks the primary every second;
  on failure it promotes the standby — no human intervention, no DNS tricks.
- **Automatic rejoin:** when the old primary returns (e.g. after a Railway
  redeploy), it is demoted and re-cloned as a standby. No split-brain, no
  manual `pg_rewind`.
- **Private networking:** nodes talk to each other over
  `.railway.internal` hostnames on Railway's private network. Nothing
  is exposed to the public internet by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgaf-replica | `wotonews/postgres-ha:v0.1.5` | Database |
| pgaf-primary | `wotonews/postgres-ha:v0.1.5` | Database |
| pgaf-monitor | `wotonews/postgres-ha:v0.1.5` | Database |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgres-ha-read-replica)
