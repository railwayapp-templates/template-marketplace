# Deploy Open Notebook on Railway

Open Notebook 1.14: self-hosted NotebookLM alternative with SurrealDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook-2)

## About

Open Notebook is an open-source, privacy-focused alternative to Google NotebookLM. You collect sources such as PDFs, web pages, videos and notes into notebooks, then chat with them, search them and generate summaries, insights and podcast-style audio, using whichever AI providers and models you choose to connect.

This template runs the official `lfnovo/open_notebook:1.14.0` image with SurrealDB as its database. The app is password-protected with a generated password, and API keys you add in Settings are encrypted with a generated key. Only the web UI is public; it proxies the API internally, and SurrealDB stays on the private network with its own generated password. Uploads and the database live on Railway volumes, so notebooks survive redeploys. You bring an API key for OpenAI, Anthropic, Google, Groq, OpenRouter or another provider, or point it at your own Ollama. The app needs about 1 GB of memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| surrealdb | `surrealdb/surrealdb:v2.7.0` | Database |
| notebook | `lfnovo/open_notebook:1.14.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SURREAL_LOG` | surrealdb | info |
| `SURREAL_BIND` | surrealdb | [::]:8000 |
| `SURREAL_PATH` | surrealdb | rocksdb:/mydata/mydatabase.db |
| `SURREAL_USER` | surrealdb | (secret) |
| `PORT` | notebook | 8502 |
| `SURREAL_USER` | notebook | (secret) |
| `SURREAL_DATABASE` | notebook | open_notebook |
| `SURREAL_PASSWORD` | notebook | (secret) |
| `SURREAL_NAMESPACE` | notebook | open_notebook |
| `OPEN_NOTEBOOK_PASSWORD` | notebook | (secret) |

## Configuration

- **Start command:** `/surreal start`
- **Volume:** `/mydata`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-notebook-2)
