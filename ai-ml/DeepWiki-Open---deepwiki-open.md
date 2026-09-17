# Deploy DeepWiki-Open on Railway

AI-generated interactive wikis for any Git repo, behind a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepwiki-open)

## About

DeepWiki-Open turns any GitHub, GitLab or Bitbucket repository into an interactive wiki: an architecture
overview, per-component pages, Mermaid diagrams, a code-grounded guided "codemap" tour, and a chat you can ask
about the code. This is a community-maintained template; it is not affiliated with the DeepWiki-Open project.

DeepWiki-Open is a Next.js web UI plus a FastAPI backend that clones a repository, embeds it, and generates
documentation with your chosen LLM. Upstream runs the UI and API as two separate open ports, with the browser
opening WebSockets straight to the API port — a setup that does not work behind a single public domain and
leaves an autonomous, repository-cloning, LLM-spending service reachable by anyone who finds the URL.

This template runs it as one Railway service behind a password. A Caddy front-door adds HTTP basic
authentication over the UI, the API and the WebSockets, and routes the browser's API and WebSocket calls to the
backend on the same domain — the browser code is patched to reach the API through the page's own host, so no
build-time domain is baked in. Bring your own LLM key; everything else works out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/youssefsiam38/deepwiki-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OLLAMA_HOST` | - | A reachable Ollama server, if you configure Ollama models. |
| `GOOGLE_API_KEY` | (secret) | Google Gemini API key (generator, and an alternative embedder). |
| `OPENAI_API_KEY` | (secret) | OpenAI API key. Required for the default embedder, and usable as a generator. |
| `OWNER_PASSWORD` | (secret) | The password for the whole app (HTTP basic auth), generated. Copy it from here. |
| `OWNER_USERNAME` | (secret) | The basic-auth username you sign in with. |
| `OPENAI_BASE_URL` | - | An OpenAI-compatible endpoint instead of api.openai.com. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key (many models via one key). |
| `DEEPWIKI_EMBEDDER_TYPE` | - | openai (default), google or ollama to change the embedder (needs the matching key/host). |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.adalflow`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deepwiki-open)
