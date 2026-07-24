# Deploy grafana on Railway

Self-hosted Grafana dashboards with persistent storage and healthchecks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-3)

## About

[Railway](https://railway.app) provides managed infrastructure with automatic HTTPS, persistent volumes, private networking, and simple one-click deploys. The platform handles TLS termination, service scaling, and deployment rollbacks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | [INAPP-Mobile/grafana](https://github.com/INAPP-Mobile/grafana) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Railway HTTP port (must match GF_SERVER_HTTP_PORT) |
| `GF_LOG_MODE` | console | Log to console (Railway captures stdout) |
| `GF_PATHS_DATA` | /var/lib/grafana | Persistent data directory (must match volume mount path) |
| `GF_PATHS_LOGS` | /var/log/grafana | Grafana log directory |
| `GF_PATHS_PLUGINS` | /var/lib/grafana/plugins | Plugins install directory (must be on persistent volume) |
| `GF_SERVER_ROOT_URL` | - | Public-facing URL — uses Railway domain. Required for correct redirects. |
| `GF_SERVER_HTTP_ADDR` | 0.0.0.0 | Bind address (0.0.0.0 for all interfaces) |
| `GF_SERVER_HTTP_PORT` | 3000 | HTTP listen port (must match PORT and EXPOSE in Dockerfile) |
| `GF_PATHS_PROVISIONING` | /etc/grafana/provisioning | Provisioning configs directory |
| `GF_SECURITY_ADMIN_USER` | (secret) | Grafana admin username |
| `GF_SECURITY_SECRET_KEY` | (secret) | Session encryption key — auto-generated. Changing it invalidates all sessions. |
| `GF_USERS_ALLOW_SIGN_UP` | false | Disable public user registration |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) | Grafana admin password — auto-generated. Save it after deploy. |
| `GF_SECURITY_ALLOW_EMBEDDING` | false | Allow Grafana dashboards to be embedded in iframes |
| `GF_ANALYTICS_REPORTING_ENABLED` | false | Disable telemetry reporting |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-3)
