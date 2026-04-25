# Deploy Flare (Open-Source Alerting & Incident Management Tool) on Railway

Flare (Monitor Systems & Send Smart Alerts) Self Host [May ’26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flare)

## About

Flare is an open-source feature flag and configuration management tool that helps developers control how and when new features are rolled out to users. It enables teams to deploy code safely, test features gradually, and manage configurations dynamically - all without redeploying the application. Available on GitHub, Flare empowers developers with full control, flexibility, and speed in modern software delivery.

You can self-host Flare on Railway to take full ownership of your feature flagging infrastructure. This means all configurations, rollouts, and user data remain private and under your control, with no third-party interference.

Self-hosting Flare on Railway ensures you have a secure, scalable, and privacy-friendly environment to manage your feature toggles. 
When you deploy Flare on Railway, you gain:

*   Seamless setup within minutes
*   Automatic scaling with growing app traffic
*   Secure data handling
*   Easy environment variable configuration
    

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flare | `flintsh/flare` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_SECRET` | flare | (secret) | Password for the application |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/flare)
