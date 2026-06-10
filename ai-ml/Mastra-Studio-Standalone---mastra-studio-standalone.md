# Deploy Mastra Studio Standalone on Railway

Standalone Mastra Studio UI - connect to any running Mastra server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-studio-standalone)

## About

[Mastra Studio](https://mastra.ai/docs/studio/overview) is the interactive UI for the [Mastra](https://mastra.ai) AI agent framework: build, test, and manage agents, workflows, and tools in the browser. This template hosts Studio as a standalone static app via the `mastra studio` command, so you can point it at any Mastra server you already run — on Railway, your own infra, or elsewhere.

Studio is a React SPA that connects to a running Mastra server. This template serves the built Studio assets with the official `mastra studio` static server and pre-wires the connection through the `MASTRA_SERVER_URL` variable — set it to your server's URL and Studio connects on load; leave it empty and Studio shows a connect form where you can enter any Mastra instance URL. The container binds Railway's injected `PORT` automatically. Deploy it once and use the same hosted UI against dev, staging, and production Mastra servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Studio | [Sjotie/mastra-studio-railway](https://github.com/Sjotie/mastra-studio-railway) (root: studio-standalone) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MASTRA_SERVER_URL` | - | Full URL of the Mastra server to connect to (e.g. https://my-mastra.up.railway.app). Leave empty to pick a server in Studio's connect form on first load. |
| `MASTRA_SERVER_API_PREFIX` | /api | API route prefix of the Mastra server. Leave at /api unless your server uses a custom prefix. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mastra-studio-standalone)
