# Deploy N8N Main + Task Runner on Railway

Deploy n8n with Task Runners - easily add Python/JavaScript dependencies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-code-runner)

## About

n8n is a powerful workflow automation platform that lets you connect apps and automate tasks. This template deploys n8n with **Task Runners** - a game-changing feature that allows you to easily add custom Python and JavaScript dependencies to your Code nodes. Unlike traditional n8n deployments that require rebuilding entire Docker containers to add packages, Task Runners let you simply update environment variables and redeploy in seconds.

This template provides a complete n8n deployment with three services: PostgreSQL database, n8n main application, and Task Runners service. The Task Runners service executes Python and JavaScript code with your custom dependencies. Adding new packages is simple - just update Railway environment variables and trigger a redeploy. No Docker knowledge required. The multi-stage build system optimizes deployment speed, with lightweight packages deploying in approximately 2 minutes and scientific packages in approximately 5-10 minutes. Configuration is managed entirely through Railway's dashboard, making dependency management transparent and version-controlled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `ghcr.io/n8n-io/n8n:latest` | Web service |
| n8n-runner | [nick0lay/n8n](https://github.com/nick0lay/n8n) (root: railway-deployment/runner) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_LOG_LEVEL` | n8n | info | - |
| `GENERIC_TIMEZONE` | n8n | - | The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set GENERIC_TIMEZONE to the appropriate value. |
| `N8N_RUNNERS_MODE` | n8n | external | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_RUNNERS_ENABLED` | n8n | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n | (secret) | - |
| `N8N_RUNNERS_BROKER_PORT` | n8n | 5679 | - |
| `N8N_NATIVE_PYTHON_RUNNER` | n8n | true | - |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n | :: | - |
| `JS_PACKAGES` | n8n-runner | moment@2.30.1,axios@^1.7.0,lodash@^4.17.21 | - |
| `N8N_VERSION` | n8n-runner | latest | - |
| `PY_PACKAGES` | n8n-runner | requests==2.31.0,python-dateutil==2.8.2 | - |
| `JS_ALLOW_LIST` | n8n-runner | moment,axios,lodash | - |
| `PY_ALLOW_LIST` | n8n-runner | * | - |
| `PY_STDLIB_ALLOW` | n8n-runner | * | - |
| `GENERIC_TIMEZONE` | n8n-runner | - | The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set GENERIC_TIMEZONE to the appropriate value. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-runner | (secret) | - |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n-runner | 300 | - |
| `N8N_RUNNERS_MAX_CONCURRENCY` | n8n-runner | 5 | - |
| `NODE_FUNCTION_ALLOW_BUILTIN` | n8n-runner | * | - |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | n8n-runner | info | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** TypeScript, Vue, SCSS, JavaScript, Python, Handlebars, Dockerfile, Shell, HCL, HTML, Just, Rich Text Format, CSS, Batchfile

[View on Railway →](https://railway.com/deploy/n8n-with-code-runner)
