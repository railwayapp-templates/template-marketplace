# Deploy Plan AI on Railway

Plan AI - Your new meeting AI meeting tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plan-ai)

## About

Plan AI is an open-source meeting intelligence stack that ingests transcripts, enriches them with AI summaries, and synchronizes action items to Kanban-style boards. It’s a full-stack TypeScript project (React + Express + Prisma) with Firebase Auth, PostgreSQL, Qdrant, and OpenAI integrations to keep delivery teams aligned.

Deploying Plan AI involves running the Node.js/Express backend with PostgreSQL and Qdrant services, plus the React frontend. You’ll supply Firebase, OpenAI, and optional Jira credentials via environment variables. Railway can host the backend, databases, and vector store in one workspace while the frontend deploys as a static site. Configure backend/.env and frontend/.env with API keys, point the frontend’s API URL at your Railway backend, run database migrations, and you’re live with Swagger docs, RTK Query endpoints, and automated transcript processing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant/qdrant | `qdrant/qdrant` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| plan-ai-backend | [blueberrybytes/plan-ai](https://github.com/blueberrybytes/plan-ai) (root: /backend) | Web service |
| plan-ai-frontend | [blueberrybytes/plan-ai](https://github.com/blueberrybytes/plan-ai) (root: /frontend) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | qdrant/qdrant | 6333 | - |
| `QDRANT__SERVICE__API_KEY` | qdrant/qdrant | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ENV` | plan-ai-backend | production | - |
| `PORT` | plan-ai-backend | 8080 | - |
| `LOG_LEVEL` | plan-ai-backend | warn | - |
| `QDRANT_URL` | plan-ai-backend | http://qdrant.railway.internal:6333 | - |
| `API_ADMIN_KEY` | plan-ai-backend | 345hgerwgt756dfhgfh4563XCV | - |
| `OPENAI_API_KEY` | plan-ai-backend | (secret) | - |
| `QDRANT_API_KEY` | plan-ai-backend | (secret) | - |
| `QDRANT_CONTEXT_COLLECTION` | plan-ai-backend | context_files | - |
| `PORT` | plan-ai-frontend | 3000 | - |
| `REACT_APP_ENV` | plan-ai-frontend | production | - |
| `REACT_APP_API_BACKEND_URL` | plan-ai-frontend | https://plan-ai-backend-production.up.railway.app | - |
| `REACT_APP_FIREBASE_API_KEY` | plan-ai-frontend | (secret) | - |
| `REACT_APP_ENABLE_REMOTE_LOGS` | plan-ai-frontend | false | - |
| `REACT_APP_GOOGLE_DRIVE_API_KEY` | plan-ai-frontend | (secret) | - |

## Configuration

- **Volume:** `/qdrant/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML, Dockerfile, JavaScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/plan-ai)
