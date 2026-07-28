# Deploy Vane on Railway

Self-hosted AI answering engine with web search and source citations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vane)

## About

Vane is a privacy-focused, self-hosted AI answering engine that combines web search with local or cloud language models. It turns questions into clear conversational answers, highlights supporting sources with citations, supports multiple search modes and providers, and keeps research history and application data under your control.

Hosting Vane on Railway uses a single Docker service exposed through a generated domain targeting port 3000. Its bundled search stack and application run together, so no database, cache, or companion service is required. A Railway volume mounted at `/home/perplexica/data` preserves primary application state across deployments. Railway allows one volume per service, so the Umbrel upload mount at `/home/perplexica/uploads` cannot also be retained; uploaded files stored there are ephemeral and may be lost during redeploys or restarts. The Umbrel package requires no environment variables. After deployment, open Vane's web UI to configure model providers, search providers, API keys, and preferred models.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `itzcrazykns1337/vane:v1.12.2@sha256:61f2bbf3386ff3df08911fb3de0e1893b04702a4d49ef13fbadbda937b47ab7c` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/perplexica/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vane)
