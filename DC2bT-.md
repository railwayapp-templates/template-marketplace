# Deploy FlowiseAI 🇧🇷 on Railway

Template simples Flowise AI. Defina usuário, senha e faça o deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/DC2bT-)

## About

![FlowiseAI](https://github.com/FlowiseAI/Flowise/raw/main/images/flowise.png?raw=true)

🚀 **Template Flowise AI** - **Deploy em Minutos**

Este template do **Flowise AI** foi projetado para você iniciar rapidamente. O **Flowise** é uma plataforma **no-code** com uma interface intuitiva de **arrastar e soltar** para criar fluxos de trabalho personalizados com **Modelos de Linguagem de Grande Escala (LLMs)**.

🔑 **Configuração Simples**: A única coisa que você precisa fazer é definir o **usuário** e a **senha** para autenticação no arquivo `.env`. 

⚡ **Passos**:
1. **Configure** o usuário e senha.
2. **Faça o deploy**.
3. Comece a criar seus fluxos de trabalho personalizados! 💡

Sem complicações, sem configurações avançadas. Comece agora e aproveite o poder do **Flowise** para automatizar seus processos em poucos minutos! ⏳✨

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flowise AI | `flowiseai/flowise:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APIKEY_PATH` | Flowise AI | /opt/flowise/.flowise | Location where API keys are saved |
| `DATABASE_HOST` | Flowise AI | - | Host URL or IP address |
| `DATABASE_NAME` | Flowise AI | - | Database name |
| `DATABASE_PORT` | Flowise AI | - | Database port |
| `DATABASE_TYPE` | Flowise AI | postgres | Type of database to store the flowise data |
| `DATABASE_USER` | Flowise AI | (secret) | Database username |
| `FLOWISE_PASSWORD` | Flowise AI | (secret) | Password to login |
| `FLOWISE_USERNAME` | Flowise AI | (secret) | Username to login |
| `DATABASE_PASSWORD` | Flowise AI | (secret) | Database password |
| `POSTGRES_DB` | Postgres | flowise | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `${{RAILWAY_PUBLIC_DOMAIN}}`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/flowise/.flowise`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/DC2bT-)
