# Deploy PowerSync Starter (Postgres) on Railway

PowerSync Open Edition Starter with Postgres. Build synced apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/powersync-starter-postgres)

## About

This template provides a quick and reliable way to deploy a complete PowerSync stack, including backend, database, PowerSync service, and PowerSync diagnostics app.

Hosting PowerSync on Railway sets up a full sync engine environment for local-first and offline-first apps. This template creates all essential services:

- A **Node.js** backend for authentication and API endpoints
- **Postgres databases** for source data and bucket storage
- The **PowerSync service** to maintain sync between your database and your clients
- The **Sync Diagnostics Client** for monitoring sync events
- An **Execute Scripts** service that creates the *lists* and *todos* tables and configures the powersync publication

Railway automatically connects these services and manages environment variables, reducing setup complexity while letting you focus on building and testing your application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| service | `journeyapps/powersync-service` | Web service |
| bucket | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| backend | [powersync-ja/powersync-nodejs-backend-todolist-demo](https://github.com/powersync-ja/powersync-nodejs-backend-todolist-demo) | Web service |
| sync-diagnostics-client | `journeyapps/powersync-diagnostics-app` | Web service |
| scripts | `ghcr.io/railwayapp/function-bun:1.3.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Required password for database |
| `DATABASE_PUBLIC_URL` | postgres | - | URL to connect to Postgres database from the public internet |
| `PORT` | service | 80 | Healthcheck Endpoints |
| `POWERSYNC_CONFIG_B64` | service | cmVwbGljYXRpb246CiAgY29ubmVjdGlvbnM6CiAgICAtIHR5cGU6IHBvc3RncmVzcWwKICAgICAgdXJpOiAhZW52IFBTX1BPU1RHUkVTX1NPVVJDRV9VUkwKICAgICAgc3NsbW9kZTogZGlzYWJsZQoKc3RvcmFnZToKICB0eXBlOiBwb3N0Z3Jlc3FsCiAgdXJpOiAhZW52IFBTX1BPU1RHUkVTX0JVQ0tFVF9VUkwKICBzc2xtb2RlOiBkaXNhYmxlCgpwb3J0OiA4MAoKc3luY19jb25maWc6CiAgY29udGVudDogfAogICAgY29uZmlnOgogICAgICBlZGl0aW9uOiAzCiAgICBzdHJlYW1zOgogICAgICBnbG9iYWw6CiAgICAgICAgYXV0b19zdWJzY3JpYmU6IHRydWUKICAgICAgICBxdWVyaWVzOgogICAgICAgICAgLSBTRUxFQ1QgKiBGUk9NIGxpc3RzCiAgICAgICAgICAtIFNFTEVDVCAqIEZST00gdG9kb3MKCmNsaWVudF9hdXRoOgogIGp3a3NfdXJpOiAhZW52IFBTX0FVVEhfSldLUwogIGF1ZGllbmNlOgogICAgLSAhZW52IFBTX0FVVEhfQVVE | See https://docs.powersync.com/integration-guides/railway-+-powersync |
| `POSTGRES_DB` | bucket | railway | Default database created when image is started. |
| `DATABASE_URL` | bucket | - | URL to connect to Postgres database |
| `POSTGRES_USER` | bucket | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | bucket | (secret) | Required password for database |
| `DATABASE_PUBLIC_URL` | bucket | - | Typically not needed for bucket storage |
| `PORT` | backend | 8080 | Backend port |
| `JWT_ISSUER` | backend | powersync-dev | Either 'mongodb', 'mysql' or 'postgres'. This defaults to Postgres |
| `DATABASE_URI` | backend | - | Source database URI |
| `DATABASE_TYPE` | backend | postgres | Source database name |
| `POWERSYNC_URL` | backend | - | PowerSync service public URL |
| `POWERSYNC_PUBLIC_KEY` | backend | - | Optional: Public encryption key (verifier) |
| `POWERSYNC_PRIVATE_KEY` | backend | - | Optional: Private encryption key (signer) |
| `PORT` | sync-diagnostics-client | 80 | Healthcheck endpoints |

## Configuration

- **Start command:** `wrapper.sh postgres --port=5432 -c wal_level=logical`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/probes/liveness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/powersync`
- **Healthcheck:** `/`
- **Start command:** `./run.sh aW1wb3J0IHBnIGZyb20gInBnIjsKY29uc3QgeyBDbGllbnQgfSA9IHBnOwoKY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCh7CiAgaG9zdDogcHJvY2Vzcy5lbnYuUEdIT1NULAogIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlBHUE9SVCB8fCAiNTQzMiIpLAogIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5QR0RBVEFCQVNFLAogIHVzZXI6IHByb2Nlc3MuZW52LlBHVVNFUiwKICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuUEdQQVNTV09SRCwKfSk7Cgphd2FpdCBjbGllbnQuY29ubmVjdCgpOwoKdHJ5IHsKICAvLyBDcmVhdGUgbGlzdHMgdGFibGUKICBhd2FpdCBjbGllbnQucXVlcnkoCiAgICAiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVibGljLmxpc3RzIChpZCB1dWlkIE5PVCBOVUxMIERFRkFVTFQgZ2VuX3JhbmRvbV91dWlkKCksIGNyZWF0ZWRfYXQgdGltZXN0YW1wIHdpdGggdGltZSB6b25lIE5PVCBOVUxMIERFRkFVTFQgbm93KCksIG5hbWUgdGV4dCBOT1QgTlVMTCwgb3duZXJfaWQgdXVpZCBOT1QgTlVMTCwgQ09OU1RSQUlOVCBsaXN0c19wa2V5IFBSSU1BUlkgS0VZIChpZCkpOyIKICApOwoKICBjb25zb2xlLmxvZygiQ3JlYXRlZCBsaXN0cyB0YWJsZSIpOwoKICAvLyBDcmVhdGUgdG9kb3MgdGFibGUKICBhd2FpdCBjbGllbnQucXVlcnkoCiAgICAiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVibGljLnRvZG9zIChpZCB1dWlkIE5PVCBOVUxMIERFRkFVTFQgZ2VuX3JhbmRvbV91dWlkKCksIGNyZWF0ZWRfYXQgdGltZXN0YW1wIHdpdGggdGltZSB6b25lIE5PVCBOVUxMIERFRkFVTFQgbm93KCksIGNvbXBsZXRlZF9hdCB0aW1lc3RhbXAgd2l0aCB0aW1lIHpvbmUsIGRlc2NyaXB0aW9uIHRleHQgTk9UIE5VTEwsIGNvbXBsZXRlZCBib29sZWFuIE5PVCBOVUxMIERFRkFVTFQgRkFMU0UsIGNyZWF0ZWRfYnkgdXVpZCwgY29tcGxldGVkX2J5IHV1aWQsIGxpc3RfaWQgdXVpZCBOT1QgTlVMTCwgcGhvdG9faWQgdXVpZCwgQ09OU1RSQUlOVCB0b2Rvc19wa2V5IFBSSU1BUlkgS0VZIChpZCkpOyIKICApOwoKICBjb25zb2xlLmxvZygiQ3JlYXRlZCB0b2RvcyB0YWJsZSIpOwoKICAvLyBDcmVhdGUgcHVibGljYXRpb24KICBhd2FpdCBjbGllbnQucXVlcnkoIkNSRUFURSBQVUJMSUNBVElPTiBwb3dlcnN5bmMgRk9SIFRBQkxFIGxpc3RzLCB0b2RvczsiKTsKCiAgY29uc29sZS5sb2coIkNyZWF0ZWQgcHVibGljYXRpb24iKTsKfSBjYXRjaCAoZXJyb3IpIHsKICBjb25zb2xlLmVycm9yKCJEYXRhYmFzZSBlcnJvcjoiLCBlcnJvcik7CiAgdGhyb3cgZXJyb3I7Cn0gZmluYWxseSB7CiAgYXdhaXQgY2xpZW50LmVuZCgpOwp9Cg==`

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/powersync-starter-postgres)
