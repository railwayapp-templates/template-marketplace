# Deploy Direito & Provento on Railway

Deploy and Host Direito & Provento with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/direito-and-provento)

## About

Direito & Provento é uma plataforma SaaS para advogados previdenciários
que centraliza o atendimento de clientes PCD (Pessoa com Deficiência),
automatiza a geração de petições e gerencia casos, prazos e documentos
em um único painel seguro.

A aplicação é composta por quatro microsserviços Node.js (auth, clients,
petitions, api-gateway) e um frontend React/Vite, todos orquestrados via
Docker Compose. O banco de dados é PostgreSQL com migrações automáticas
executadas na inicialização do auth-service. O deploy no Railway provisiona
cada serviço de forma independente, com variáveis de ambiente isoladas,
domínio HTTPS automático e conexão segura ao banco via variável DATABASE_URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| backend-petitons-service | [RyanEdi/backend-petitons-service](https://github.com/RyanEdi/backend-petitons-service) | Worker |
| backend-auth | [RyanEdi/backend-auth](https://github.com/RyanEdi/backend-auth) | Worker |
| backend-api | [RyanEdi/backend-api](https://github.com/RyanEdi/backend-api) | Worker |
| frontend-sistemajuridico | [RyanEdi/frontend-sistemajuridico](https://github.com/RyanEdi/frontend-sistemajuridico) | Worker |
| backend-clients-service | [RyanEdi/backend-clients-service](https://github.com/RyanEdi/backend-clients-service) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_USER` | backend-petitons-service | (secret) | - |
| `NODE_ENV` | backend-petitons-service | production | - |
| `DB_PASSWORD` | backend-petitons-service | (secret) | - |
| `FRONTEND_URL` | backend-petitons-service | https://direitoeprovento.com.br | - |
| `DB_USER` | backend-auth | (secret) | - |
| `NODE_ENV` | backend-auth | production | - |
| `SMTP_FROM` | backend-auth | SEU_EMAIL_REMETENTE | - |
| `SMTP_HOST` | backend-auth | SEU_SMTP_HOST | - |
| `SMTP_PASS` | backend-auth | SEU_SMTP_PASS | - |
| `SMTP_PORT` | backend-auth | 587 | - |
| `SMTP_USER` | backend-auth | (secret) | - |
| `CPF_SECRET` | backend-auth | (secret) | - |
| `DATA_SECRET` | backend-auth | (secret) | - |
| `DB_PASSWORD` | backend-auth | (secret) | - |
| `EMAIL_SECRET` | backend-auth | (secret) | - |
| `FRONTEND_URL` | backend-auth | https://direitoeprovento.com.br | - |
| `SESSION_SECRET` | backend-auth | (secret) | - |
| `PAYMENT_WEBHOOK_TOKEN` | backend-auth | (secret) | - |
| `NODE_ENV` | backend-api | production | - |
| `FRONTEND_URL` | backend-api | https://direitoeprovento.com.br | - |
| `SESSION_SECRET` | backend-api | (secret) | - |
| `AUTH_SERVICE_PORT` | backend-api | 3334 | - |
| `CLIENTS_SERVICE_PORT` | backend-api | 3335 | - |
| `PETITIONS_SERVICE_PORT` | backend-api | 3336 | - |
| `VITE_API_BASE` | frontend-sistemajuridico | https://direitoeprovento.com.br | - |
| `DB_USER` | backend-clients-service | (secret) | - |
| `NODE_ENV` | backend-clients-service | production | - |
| `DATA_SECRET` | backend-clients-service | (secret) | - |
| `DB_PASSWORD` | backend-clients-service | (secret) | - |
| `FRONTEND_URL` | backend-clients-service | https://direitoeprovento.com.br | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/direito-and-provento)
