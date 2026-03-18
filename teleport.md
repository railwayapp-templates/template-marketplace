# Deploy Teleport on Railway

The easiest and most secure way to access and protect infrastructure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/teleport)

## About

Teleport is an open-source platform that provides secure access to various infrastructure resources. It enables organizations to manage access to SSH, Kubernetes, databases, and other services through a unified interface. By deploying Teleport on Railway, you can streamline your infrastructure management and enhance security.

Hosting Teleport involves deploying the application on a server, configuring the necessary authentication and access controls, and ensuring secure connectivity to your infrastructure. With Railway, you can easily deploy Teleport without worrying about the underlying infrastructure, allowing you to focus on managing access to your resources.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Proxy | [6ixfalls/railway-teleport](https://github.com/6ixfalls/railway-teleport) | Worker |
| HAProxy | [6ixfalls/railway-teleport](https://github.com/6ixfalls/railway-teleport) (root: /haproxy) | Web service |
| Bootstrap | [6ixfalls/railway-teleport](https://github.com/6ixfalls/railway-teleport) (root: /bootstrap) | Worker |
| Postgres | `ghcr.io/6ixfalls/teleport-postgres:16` | Database |
| Auth | [6ixfalls/railway-teleport](https://github.com/6ixfalls/railway-teleport) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_SERVER` | Proxy | - | Auth server private networking URL |
| `PROXY_TOKEN` | Proxy | (secret) | Token to join the cluster |
| `SERVICE_TYPE` | Proxy | proxy | Service to deploy |
| `PROXY_HOST` | HAProxy | - | Proxy private networking URL |
| `PROXY_PORT` | HAProxy | 3080 | Proxy application port |
| `README` | Bootstrap | - | To register for your Teleport instance, use the URL provided in the deployment logs for the Bootstrap service. You will be asked to setup a password and MFA. Delete this bootstrap service once you register with your Teleport cluster. You may also edit the username of the user to create here under the predefined variables section as ADMIN_USER, the default is "railway". Type "okay" as the value to continue. |
| `ADMIN_USER` | Bootstrap | (secret) | User to create |
| `PROXY_TOKEN` | Bootstrap | (secret) | Proxy token to join the cluster |
| `CLUSTER_NAME` | Bootstrap | - | Cluster name |
| `DATABASE_URL` | Bootstrap | - | Database URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PROXY_TOKEN` | Auth | (secret) | Token to join proxy services |
| `CLUSTER_NAME` | Auth | - | Cluster name |
| `DATABASE_URL` | Auth | - | Database URL |
| `SERVICE_TYPE` | Auth | auth | Service to deploy |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `wrapper.sh postgres --port=5432 -c wal_level=logical -c shared_preload_libraries='wal2json'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/teleport)
