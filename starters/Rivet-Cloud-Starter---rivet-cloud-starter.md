# Deploy Rivet Cloud Starter on Railway

Connect a Rivet application with Rivet Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rivet-cloud-starter)

## About

[Rivet](https://rivet.dev) manages stateful workloads for AI agents, durable compute, or realtime use cases.

**Quickstart**

Read the [Rivet quickstart](https://www.rivet.dev/docs) to learn how to get started building backends with Rivet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Example App | [rivet-dev/template-railway](https://github.com/rivet-dev/template-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RIVET_RUNNER` | rivetkit | Runner name to connect as. (Advanced) |
| `RIVET_ENDPOINT` | - | Rivet endpoint to connect to on the backend. |
| `RIVET_PUBLIC_ENDPOINT` | - | Rivet endpoint to connect to from the frontend. |

## Configuration

- **Healthcheck:** `/api/rivet/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, HTML

[View on Railway →](https://railway.com/template/rivet-cloud-starter)
