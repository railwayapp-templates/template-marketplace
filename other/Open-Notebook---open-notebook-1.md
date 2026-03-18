# Deploy Open Notebook on Railway

Open source, privacy‑focused alternative to Google Notebook LM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook-1)

## About

Open Notebook is an open source, privacy-first alternative to Google Notebook LM. It lets you upload documents, websites, and notes, then chat with them using AI while keeping full control of your data. This template makes it easy to run Open Notebook on your own infrastructure with minimal setup.

Hosting Open Notebook on Railway provides everything needed to run the application in a self-hosted environment. The template deploys the Open Notebook application alongside a SurrealDB database used to store notebooks, sources, and metadata. Railway automatically connects the services using environment variables and exposes the application through a public domain. You only need to provide an API key for a supported AI provider to start using Open Notebook. Railway handles networking, service orchestration, and scaling so you can focus on researching, writing, and learning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenNotebook | `lfnovo/open_notebook:v1-latest` | Web service |
| SurrealDB | `surrealdb/surrealdb:v2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | OpenNotebook | - | Public URL for the Open Notebook API. |
| `HOSTNAME` | OpenNotebook | 0.0.0.0 | Address the backend listens on (keep 0.0.0.0). |
| `SURREAL_USER` | OpenNotebook | (secret) | Username Open Notebook uses to log into SurrealDB. |
| `OPENAI_API_KEY` | OpenNotebook | (secret) | API key for your OpenAI. |
| `SURREAL_DATABASE` | OpenNotebook | open_notebook | Database name used inside the SurrealDB namespace. |
| `SURREAL_PASSWORD` | OpenNotebook | (secret) | Password for the SurrealDB user. |
| `SURREAL_NAMESPACE` | OpenNotebook | open_notebook | SurrealDB namespace where this app stores data. |
| `OPEN_NOTEBOOK_PASSWORD` | OpenNotebook | (secret) | Connection URL for the SurrealDB service. |
| `SURREAL_URL` | SurrealDB | - | URL clients use to connect to SurrealDB. |
| `SURREAL_BIND` | SurrealDB | [::]:8000 | Host and port SurrealDB listens on. |
| `SURREAL_PASS` | SurrealDB | - | Password for the configured SurrealDB user. |
| `SURREAL_PATH` | SurrealDB | - | Filesystem path where SurrealDB stores its data. |
| `SURREAL_USER` | SurrealDB | (secret) | Username for the configured SurrealDB user. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `./surreal start`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/open-notebook-1)
