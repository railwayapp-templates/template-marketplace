# Deploy Open Notebook | Open Source NotebookLM Alternative on Railway

Self-hosted NotebookLM alternative - chat with docs, notes, podcasts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook-notebooklm)

## About

Open Notebook is an open-source, privacy-first alternative to Google's NotebookLM.
Bring your own AI provider keys, upload sources, chat with your documents, generate notes
and podcasts, and keep every notebook on infrastructure you control.

This template runs Open Notebook as two services: the **application** — a single container
that runs the FastAPI backend, the background task worker and the Next.js web UI together —
and a dedicated **SurrealDB** database that stores your notebooks, sources, notes and
embeddings on a persistent Railway volume. The web UI proxies API calls to the backend
internally, so one public domain serves the whole app; there is no separate reverse proxy
to configure.

Two things this template gets right that a bare deploy does not:

- **Both secrets are set.** `OPEN_NOTEBOOK_ENCRYPTION_KEY` encrypts the AI provider keys you
  save in the database, and `OPEN_NOTEBOOK_PASSWORD` turns on password authentication so your
  notebooks — and the API keys the app drives — are not exposed to anyone who finds the URL.
- **Every image is pinned.** The app is pinned to `lfnovo/open_notebook:1.14.0` and the
  database to `surrealdb/surrealdb:v2.6.5` — the SurrealDB major (v2) that Open Notebook is
  built and tested against. No floating tags means a redeploy never silently swaps the engine
  or the database version under your data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurrealDB | `surrealdb/surrealdb:v2.6.5` | Database |
| Open Notebook | `lfnovo/open_notebook:1.14.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SURREAL_LOG` | SurrealDB | info | SurrealDB log level (error, warn, info, debug, trace). |
| `SURREAL_BIND` | SurrealDB | [::]:8000 | Address SurrealDB listens on; [::] is dual-stack for Railway’s private IPv6 network. |
| `SURREAL_PASS` | SurrealDB | - | SurrealDB root password (auto-generated). |
| `SURREAL_PATH` | SurrealDB | - | Storage engine and path on the persistent volume. |
| `SURREAL_USER` | SurrealDB | (secret) | SurrealDB root username (auto-generated). |
| `SURREAL_CAPS_ALLOW_ALL` | SurrealDB | true | Allow all SurrealDB capabilities — Open Notebook needs functions/scripting. |
| `API_URL` | Open Notebook | - | Public URL of this app, used for callbacks/webhooks. |
| `SURREAL_URL` | Open Notebook | - | SurrealDB RPC endpoint on the private network. |
| `SURREAL_USER` | Open Notebook | (secret) | SurrealDB username (from the SurrealDB service). |
| `SURREAL_DATABASE` | Open Notebook | open_notebook | SurrealDB database name Open Notebook uses. |
| `SURREAL_PASSWORD` | Open Notebook | (secret) | SurrealDB password (from the SurrealDB service). |
| `SURREAL_NAMESPACE` | Open Notebook | open_notebook | SurrealDB namespace Open Notebook uses. |
| `OPEN_NOTEBOOK_PASSWORD` | Open Notebook | (secret) | Access password. Copy this value from here and enter it at first login. |
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | Open Notebook | - | Encrypts the AI provider API keys you save in the database. Required. |

## Configuration

- **Start command:** `/surreal start --deny-guests --no-banner`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-notebook-notebooklm)
