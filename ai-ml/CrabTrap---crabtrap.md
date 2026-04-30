# Deploy CrabTrap on Railway

Secure agents in production

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crabtrap)

## About

[CrabTrap](http://brex.com/crabtrap) is an LLM-as-a-judge forward proxy built by Brex to secure AI agents in production. It intercepts every outbound request your agents make, evaluates them against deterministic rules and a natural-language LLM policy, and either forwards or blocks them.

Check [**Implementation Details**](#implementation-details) on how to deploy this template.

Hosting CrabTrap requires running a persistent Go-based proxy service alongside a PostgreSQL database. The proxy listens on two ports: the forward proxy itself (default `8080`) and an admin API with an embedded React web UI (default `8081`). On startup, CrabTrap reads a YAML configuration file that wires it to a PostgreSQL instance (via `DATABASE_URL`), configures your TLS certificate authority, sets your LLM judge provider and model (check the [docs](https://github.com/brexhq/CrabTrap) for more configs). 

Agents in your stack simply need their `HTTP_PROXY` and `HTTPS_PROXY` environment variables pointed at the CrabTrap service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CrabTrap | `quay.io/brexhq/crabtrap:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | CrabTrap | 8081 | Web UI Port |
| `GATEWAY_CONFIG` | CrabTrap | approval:
  mode: llm

llm_judge:
  enabled: true
  provider: openai
  eval_model: gpt-4o-mini

database:
  url: ${DATABASE_URL} | Gateway config, you can use OpenAI or Bedrock, see docs for more info. |
| `OPENAI_API_KEY` | CrabTrap | (secret) | OpenAI Key, if bedrock is used use AWS credentials instead, see docs. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `sh -c 'mkdir -p /app/config && echo "$GATEWAY_CONFIG" > /app/config/gateway.yaml && exec ./gateway'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/certs`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/crabtrap)
