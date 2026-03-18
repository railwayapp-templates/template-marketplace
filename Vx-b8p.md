# Deploy authentik on Railway

A working template to spin up authentik with minimal resources.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Vx-b8p)

## About

# Bootstrap password

When deploying, you must provide an admin username and password. This is done in plain text in the environment variables. You must change your admin password as soon as you login the first time.


# Patience

It takes up to 5 minutes to deploy this template.


# Configuration

Authentik is very configurable through environment variables, [see the documentation](https://docs.goauthentik.io/docs/installation/configuration).


# Custom styling

This Docker image injects a custom css file. You can configure the brand and secondary colours through the server's environment variables `OVERRIDE_ACCENT_COLOUR` and `OVERRIDE_LINK_COLOUR`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [valkenburg-prevue-ch/authentik-railway](https://github.com/valkenburg-prevue-ch/authentik-railway) (root: /services/postgresql) | Database |
| authentik-worker | [valkenburg-prevue-ch/authentik-railway](https://github.com/valkenburg-prevue-ch/authentik-railway) (root: /services/authentik-worker) | Worker |
| redis | [valkenburg-prevue-ch/authentik-railway](https://github.com/valkenburg-prevue-ch/authentik-railway) (root: /services/redis) | Database |
| authentik-server | [valkenburg-prevue-ch/authentik-railway](https://github.com/valkenburg-prevue-ch/authentik-railway) (root: /services/authentik-server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | authentik | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `AUTHENTIK_REDIS__DB` | authentik-worker | 1 | - |
| `AUTHENTIK_SECRET_KEY` | authentik-worker | (secret) | - |
| `AUTHENTIK_WEB__THREADS` | authentik-worker | 1 | - |
| `AUTHENTIK_WEB__WORKERS` | authentik-worker | 1 | - |
| `AUTHENTIK_BOOTSTRAP_TOKEN` | authentik-worker | (secret) | - |
| `AUTHENTIK_REDIS__PASSWORD` | authentik-worker | (secret) | - |
| `AUTHENTIK_REDIS__USERNAME` | authentik-worker | (secret) | - |
| `AUTHENTIK_POSTGRESQL__USER` | authentik-worker | (secret) | - |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | authentik-worker | (secret) | - |
| `AUTHENTIK_WORKER__CONCURRENCY` | authentik-worker | 1 | - |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik-worker | (secret) | - |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `PORT` | authentik-server | 9000 | - |
| `AUTHENTIK_REDIS__DB` | authentik-server | 1 | - |
| `AUTHENTIK_SECRET_KEY` | authentik-server | (secret) | - |
| `OVERRIDE_LINK_COLOUR` | authentik-server | #5a5cb9 | - |
| `AUTHENTIK_WEB__THREADS` | authentik-server | 2 | - |
| `AUTHENTIK_WEB__WORKERS` | authentik-server | 2 | - |
| `OVERRIDE_ACCENT_COLOUR` | authentik-server | #fd4b2d | - |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | authentik-server | - | Setup the first admin user. |
| `AUTHENTIK_BOOTSTRAP_TOKEN` | authentik-server | (secret) | - |
| `AUTHENTIK_REDIS__PASSWORD` | authentik-server | (secret) | - |
| `AUTHENTIK_REDIS__USERNAME` | authentik-server | (secret) | - |
| `AUTHENTIK_POSTGRESQL__USER` | authentik-server | (secret) | - |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | authentik-server | (secret) | Setup the first admin user. |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik-server | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`
- **Healthcheck:** `/if/user/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/Vx-b8p)
