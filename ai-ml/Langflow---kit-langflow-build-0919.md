# Deploy Langflow on Railway

Langflow: visual builder for AI agents and RAG flows, with Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-langflow-build-0919)

## About

Langflow is the open-source visual builder for AI agents and RAG pipelines: drag components onto a canvas, wire models, prompts, tools, vector stores and memory together, test in a built-in chat, then call the result as an API or MCP server. This template deploys the official Langflow image pinned by digest with a Postgres 17 database, a persistent volume for uploaded files and the encryption key, every secret generated for you, and a deployment healthcheck. **There is nothing to fill in.** After the deploy, open the public URL and log in as `admin` with the password in the `Langflow` service's Variables tab (`LANGFLOW_SUPERUSER_PASSWORD`).

**Plan requirements.** Measured on this exact image: Langflow idles around **1.25 GB** (measured after five idle minutes on two fresh deploys) and needs about 1.6 GB peak while it loads its component catalogue; Postgres adds about 60 MB. It is killed on a 1 GB limit (verified) and runs comfortably at 2 GB. **Hobby plan or higher (8 GB limit) is required**; it will not start on Free or Trial. Upstream's own Railway guide states the same 2 GB minimum.

Langflow runs as one Python service that serves the editor, the API and flow execution. Flows, users, API keys and global variables live in Postgres; the volume at `/app/langflow` holds the encryption key that protects stored credentials, uploaded files and profile pictures. Schema migrations run automatically on start, including on upgrades. Login is required (`LANGFLOW_AUTO_LOGIN=false`) because the service is reachable on a public domain; the first account is the generated superuser, and new sign-ups stay inactive until an admin activates them. The container runs as root on Railway so it can write to the root-owned volume mount - the same approach Railway's own database templates take.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | `langflowai/langflow:1.12.2@sha256:79c02794adebe82d756b7152ce4feebe4a5426e1faf3fe5b5d0dd08f304510c4` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17@sha256:f79fd6806f02297f206ce01258f287e4f93faea2a6a2aaaffc24fe684417f0fb` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Langflow | 7860 | Same as LANGFLOW_PORT, for Railway's port detection. |
| `DO_NOT_TRACK` | Langflow | true | Disables Langflow's anonymous usage telemetry. |
| `LANGFLOW_HOST` | Langflow | 0.0.0.0 | Bind address. Must be 0.0.0.0 for Railway's edge to reach the container. |
| `LANGFLOW_PORT` | Langflow | 7860 | Port Langflow listens on. Railway's domain and healthcheck target this port. |
| `OPENAI_API_KEY` | Langflow | (secret) | Optional - OpenAI key made available to components. You can also add provider keys later as global variables inside Langflow. |
| `ANTHROPIC_API_KEY` | Langflow | (secret) | Optional - Anthropic key made available to components. |
| `LANGFLOW_SUPERUSER` | Langflow | admin | Username of the first (admin) account, created on first boot. |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) | Require a login instead of opening the editor to anyone with the URL. Keep false on a public domain. |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow | Where Langflow keeps its secret key, uploaded files and profile pictures. Mounted on the volume. |
| `LANGFLOW_DATABASE_URL` | Langflow | - | Postgres connection string. Wired to the Postgres service in this template over the private network. |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | Langflow | false | New sign-ups must be activated by the admin before they can log in. |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) | Password of the admin account. Generated for you - copy it from this Variables tab after deploying, then change it in the UI if you like. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private-network connection string other services use. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated once at deploy time. |

## Configuration

- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kit-langflow-build-0919)
