# Deploy ReMe on Railway

Self-evolving Markdown memory your AI agents share over MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reme)

## About

[ReMe](https://github.com/agentscope-ai/ReMe) is a self-evolving memory workspace for AI agents. It
turns conversations and documents into ordinary Markdown notes with frontmatter and wikilinks, then
retrieves them precisely with BM25, wikilink expansion and optional embeddings — so an agent recalls
the relevant lines rather than loading a whole knowledge base into its context.

This template runs it on Railway with the workspace on a volume and the whole service behind a
generated password, because ReMe has no authentication of its own. One service, one volume, a public
domain.

ReMe is a single Python service. The HTTP API, a streamable-HTTP MCP endpoint at `/mcp` and the ReMe
Studio web UI all share one port, so there is no database, no broker and no second container to wire
up. Agents reach the same workspace over MCP, HTTP or the CLI, which is the point: one memory, many
agents.

Everything durable is Markdown on the volume. You can read it, edit it in Studio, grep it, or pull it
down and keep it — indexes and generated metadata rebuild themselves from the files.

The part this template has to supply is authentication. Upstream is unusually direct about it: the
service binds loopback by default, CORS allows any origin, jobs may write, move or delete files, and
"the service layer has no general-purpose user authentication". Its own guidance for remote use is to
place it behind an authenticated reverse proxy — so that is what runs here, with ReMe left on
`127.0.0.1` where upstream puts it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| reme | [RockinPaul/reme_railway_template](https://github.com/RockinPaul/reme_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port Railway's healthcheck probes and the public domain targets. Leave as is. |
| `LLM_API_KEY` | (secret) | Optional. Enables auto_memory, auto_resource, auto_dream and proactive refresh. Search, read and write work without it. |
| `LLM_BASE_URL` | - | Optional. Any OpenAI-compatible endpoint for the key above. |
| `REME_PASSWORD` | (secret) | The only credential protecting this deployment — ReMe has no authentication of its own. Gates the Studio UI, the HTTP API and the MCP endpoint. Read it from this service's variables after deploying. |
| `REME_USERNAME` | (secret) | Username for the same. It is only an identifier; change it here if you prefer another. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/reme)
