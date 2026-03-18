# Deploy Argilla on Railway

The open-source feedback platform for LLMs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/KNxfha)

## About

## What is Argilla?

Argilla is an open-source platform for data-centric LLM development. Integrates human and model feedback loops for continuous LLM refinement and oversight.

With Argilla's Python SDK and adaptable UI, you can create human and model-in-the-loop workflows for:

* Supervised fine-tuning
* Preference tuning (RLHF, DPO, RLAIF, and more)
* Small, specialized NLP models
* Scalable evaluation.

## What is this template about?

Deploy and start using Argilla on Railway in no time. You can find full documentation and configuration details here: [Docker Quickstart](https://docs.argilla.io/en/latest/getting_started/installation/deployments/docker-quickstart.html.)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| argilla | `argilla/argilla-quickstart:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6900 | - |
| `UVICORN_PORT` | 6900 | - |
| `ADMIN_API_KEY` | (secret) | - |
| `LOAD_DATASETS` | none | - |
| `OWNER_API_KEY` | (secret) | - |
| `ADMIN_PASSWORD` | (secret) | - |
| `ADMIN_USERNAME` | (secret) | - |
| `OWNER_PASSWORD` | (secret) | - |
| `OWNER_USERNAME` | (secret) | The owner username to log in Argilla. |
| `ANNOTATOR_PASSWORD` | (secret) | - |
| `ANNOTATOR_USERNAME` | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/KNxfha)
