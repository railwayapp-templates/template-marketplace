# Deploy FlowiseAI [Updated Mar ’26] (Visual LLM Workflow Builder) on Railway

Flowise [Mar ’26], Visual LLM Flow Builder (OpenPipe Alternative), Selfhost

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise)

## About

Flowise AI is an open-source visual LLM flow builder, available on GitHub as "flowiseai/Flowise," enabling customizable AI workflows with ease.

Self hosting Flowise empowers you to run the platform entirely on your own infrastructure, meaning all your data and configurations stay fully under your control, no third-party servers involved. With the option for flowise self hosting, you can deploy effortlessly on modern cloud platforms; for example, hosting Flowise AI on Railway provides a seamless, scalable way to manage your visual AI workflows while guaranteeing privacy and security.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| flowise | `flowiseai/flowise` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `HOST` | flowise | 0.0.0.0 | - |
| `PORT` | flowise | 3000 | - |
| `DATABASE_TYPE` | flowise | postgres | - |
| `DATABASE_USER` | flowise | (secret) | - |
| `FLOWISE_PASSWORD` | flowise | (secret) | Password for first time Account Creation |
| `FLOWISE_USERNAME` | flowise | (secret) | Username for first time Account Creation |
| `DATABASE_PASSWORD` | flowise | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise)
