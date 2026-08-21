# Deploy Presenton on Railway

Turns a prompt or document into an editable PowerPoint presentation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/presenton-ai-slides)

## About

Presenton is an open-source AI presentation generator that turns a prompt or an uploaded document into a slide deck you can edit in the browser and export as an editable PowerPoint or PDF file. It is the self-hosted answer to Gamma and Beautiful.ai: the same "describe it and get slides" workflow, except the decks stay on infrastructure you control and you bring your own model provider. Teams use it for pitch decks, business reviews and training material; developers drive it from their own apps and AI agents through its REST API and MCP server.

Self-host Presenton on Railway and this template gives you the whole product on the first deploy. Two services are provisioned: the application container — nginx in front of the Next.js editor, the FastAPI backend and the MCP endpoint — and managed PostgreSQL holding presentations, templates, accounts and API keys. A volume at `/app_data` keeps uploads, exports, images and fonts, so decks survive redeploys. Only the app has a public URL; the database stays private.

![Diagram of the Presenton and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787194658/presenton-architecture.png)

Presentation AI is usually a subscription with your content on someone else's servers. Self-hosting puts the whole loop — prompt, outline, layout, render, export — inside your own perimeter, which matters when decks carry revenue numbers or unreleased plans. It also removes per-seat pricing: the only variable cost is model tokens.

Key capabilities:

- Generate decks from a prompt or an uploaded PDF, DOCX or PPTX
- Eight built-in designs, plus custom templates from your own `.pptx`
- Truly editable PPTX export, not flat images, plus PDF
- Bring your own key across a dozen providers, or run a local model
- Charts, tables, icons and images with drag-and-drop editing
- Multi-user workspaces with an admin panel
- REST API and a built-in MCP server for agents

The container runs three processes behind nginx: the Next.js editor, the FastAPI backend that talks to your model provider, and the MCP server. PostgreSQL is the system of record for presentations, templates and accounts, which is what makes redeploys safe. The volume carries everything that is a file rather than a row, served behind an authentication check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| presenton | [gridalpha/presenton-railway](https://github.com/gridalpha/presenton-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LLM` | presenton | ollama | Text provider selector |
| `PORT` | presenton | 80 | Port nginx listens on |
| `OLLAMA_URL` | presenton | http://localhost:11434 | Local model endpoint |
| `DATABASE_URL` | presenton | - | PostgreSQL connection string |
| `OLLAMA_MODEL` | presenton | llama3.2:3b | Local model pulled on first use |
| `START_OLLAMA` | presenton | true | Install and run a local model daemon |
| `AUTH_PASSWORD` | presenton | (secret) | Primary administrator password |
| `AUTH_USERNAME` | presenton | (secret) | Primary administrator username |
| `OLLAMA_MODELS` | presenton | /app_data/ollama | Model directory on the volume |
| `DISABLE_ANONYMOUS_TRACKING` | presenton | true | Opt out of anonymous usage stats |
| `MIGRATE_DATABASE_ON_STARTUP` | presenton | true | Run migrations at boot |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app_data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/presenton-ai-slides)
