# Deploy Kroki on Railway

Kroki 0.32 diagrams-as-a-service API with Mermaid companion service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kroki)

## About

Kroki turns textual diagram descriptions into images through one HTTP API. It supports PlantUML, GraphViz, Mermaid, C4, D2, BlockDiag, Ditaa, Nomnoml, Structurizr, WaveDrom and many more formats, returning SVG, PNG or PDF, which makes it easy to render diagrams in docs, wikis, chat bots and CI pipelines.

This template deploys Kroki v0.32.1 with the Mermaid companion service, which Kroki calls over Railway's private network. The Kroki service has a public domain; the Mermaid renderer stays private. Kroki keeps no state and has no secrets, so like the public kroki.io service it is open to anyone who knows the URL, which is fine for rendering but worth keeping in mind for heavy traffic. The default safe mode blocks file includes and network access from diagram sources. Memory use is moderate; the Hobby plan is enough for normal use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kroki | `yuzutech/kroki:0.32.1` | Web service |
| mermaid | `yuzutech/kroki-mermaid:0.32.1` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | kroki | 8000 |
| `KROKI_MERMAID_PORT` | kroki | 8002 |
| `PORT` | mermaid | 8002 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kroki)
