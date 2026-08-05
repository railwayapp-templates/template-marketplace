# Deploy Presentation AI on Railway

AI presentation generator Gamma Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/presentationai)

## About

Presentation AI is an open-source, AI-powered alternative to Gamma for creating professional slides. It features an outline-first workflow, real-time slide generation, customizable built-in themes, rich text editing via Plate Editor, and presentation recording. It is designed for creators, educators, and teams looking to automate slide creation efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| presentation-ai | [bilalnawaz072/presentation-ai](https://github.com/bilalnawaz072/presentation-ai) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `OPENAI_API_KEY` | presentation-ai | (secret) | https://platform.openai.com/api-keys |
| `TAVILY_API_KEY` | presentation-ai | (secret) | https://www.tavily.com/ |
| `NEXTAUTH_SECRET` | presentation-ai | (secret) | - |
| `UPLOADTHING_TOKEN` | presentation-ai | (secret) | https://uploadthing.com/ |
| `TOGETHER_AI_API_KEY` | presentation-ai | (secret) | https://api.together.ai/ |
| `UNSPLASH_ACCESS_KEY` | presentation-ai | - | https://unsplash.com/developers |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/presentationai)
