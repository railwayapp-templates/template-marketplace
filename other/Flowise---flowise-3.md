# Deploy Flowise on Railway

Deploy Flowise LLM workflows on Railway with the official Docker image.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-3)

## About

# Flowise for railway.app

![Template Header](./template-header.svg)

Flowise is an open-source, low-code platform for building customized LLM workflows and AI agents through a drag-and-drop visual builder. It supports a wide range of language models, vector stores, and tools out of the box. This template deploys the official `flowiseai/flowise` Docker image on Railway, ready to use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mANNzY?referralCode=2_sIT9&utm_medium=integration&utm_source=template&utm_campaign=generic)

## 🏗️ Architecture

```mermaid
flowchart LR
    Client(["🌐 Client"]) -->|HTTPS| Domain["Railway Public Domain"]
    Domain -->|"$PORT"| App["Container\nflowiseai/flowise:latest"]
    App --> Volume[("Volume\n/root/.flowise")]
```

## Environment

The published template attaches `/root/.flowise`, generates an HTTP domain and administrator credentials, and generates `FLOWISE_SECRETKEY_OVERWRITE` to keep credential encryption stable across redeploys. `/api/v1/ping` is the unauthenticated deployment healthcheck; it does not bypass authentication for the application API.

See [Flowise environment variables](https://docs.flowiseai.com/configuration/environment-variables). `railway.toml` declares `requiredMountPath = "/root/.flowise"` (default location for flows, credentials, chat history, and blob storage) — attach a Railway volume to that path before production traffic.

### Authentication

Flowise supports built-in Basic Auth for the UI and API via the `FLOWISE_USERNAME` and `FLOWISE_PASSWORD` environment variables. They are optional, but strongly recommended for any deployment reachable from the public internet — without them, anyone with the URL can access your flows, credentials, and chat history. See `.env.example` and set both as generated secrets in the Railway dashboard.

## Local

```bash
docker build -t railwayapp-flowise .
docker run --rm -p 8080:8080 -e PORT=8080 railwayapp-flowise
```

<!-- footer -->
---

[![Airbyte](https://img.shields.io/badge/Airbyte-615EFF?style=for-the-badge&logo=airbyte&logoColor=white)](https://github.com/vergissberlin/railwayapp-airbyte) [![Apache Airflow](https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&logo=apacheairflow&logoColor=white)](https://github.com/vergissberlin/railwayapp-airflow) [![CloudBeaver](https://img.shields.io/badge/CloudBeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white)](https://github.com/vergissberlin/railwayapp-cloudbeaver-ce) [![CodiMD](https://img.shields.io/badge/CodiMD-0F766E?style=for-the-badge&logo=markdown&logoColor=white)](https://github.com/vergissberlin/railwayapp-codimd) [![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://github.com/vergissberlin/railwayapp-django) [![Email Service](https://img.shields.io/badge/Email%20Service-2563EB?style=for-the-badge&logo=maildotru&logoColor=white)](https://github.com/vergissberlin/railwayapp-email) [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://github.com/vergissberlin/railwayapp-fastapi) [![Flask](https://img.shields.io/badge/Flask-3fad48?style=for-the-badge&logo=flask&logoColor=white)](https://github.com/vergissberlin/railwayapp-flask) [![Flowise](https://img.shields.io/badge/Flowise-4F46E5?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://github.com/vergissberlin/railwayapp-flowise) [![GitLab CE](https://img.shields.io/badge/GitLab%20CE-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)](https://github.com/vergissberlin/railwayapp-gitlab) [![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)](https://github.com/vergissberlin/railwayapp-grafana) [![Home Assistant](https://img.shields.io/badge/Home%20Assistant-18BCF2?style=for-the-badge&logo=homeassistant&logoColor=white)](https://github.com/vergissberlin/railwayapp-homeassistant) [![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&logo=influxdb&logoColor=white)](https://github.com/vergissberlin/railwayapp-influxdb) [![MJML](https://img.shields.io/badge/MJML-F45E43?style=for-the-badge&logo=mjml&logoColor=white)](https://github.com/vergissberlin/railwayapp-mjml) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://github.com/vergissberlin/railwayapp-mongodb) [![Mosquitto MQTT](https://img.shields.io/badge/Mosquitto%20MQTT-3C5280?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)](https://github.com/vergissberlin/railwayapp-mqtt) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://github.com/vergissberlin/railwayapp-mysql) [![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://github.com/vergissberlin/railwayapp-n8n) [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://github.com/vergissberlin/railwayapp-nodejs) [![Node-RED](https://img.shields.io/badge/Node-RED-8F0000?style=for-the-badge&logo=nodered&logoColor=white)](https://github.com/vergissberlin/railwayapp-nodered) [![OpenSearch](https://img.shields.io/badge/OpenSearch-005EB8?style=for-the-badge&logo=opensearch&logoColor=white)](https://github.com/vergissberlin/railwayapp-opensearch) [![Open WebUI](https://img.shields.io/badge/Open%20WebUI-D68E42?style=for-the-badge&logo=ollama&logoColor=white)](https://github.com/vergissberlin/railwayapp-openwebui) [![Operately](https://img.shields.io/badge/Operately-3185FF?style=for-the-badge&logo=operately&logoColor=white)](https://github.com/vergissberlin/railwayapp-operately) [![Outerbase Studio](https://img.shields.io/badge/Outerbase%20Studio-000000?style=for-the-badge&logo=outerbase&logoColor=white)](https://github.com/vergissberlin/railwayapp-outerbase-studio) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://github.com/vergissberlin/railwayapp-postgresql) [![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://github.com/vergissberlin/railwayapp-redis) [![TYPO3 CMS](https://img.shields.io/badge/TYPO3%20CMS-FF8700?style=for-the-badge&logo=typo3&logoColor=white)](https://github.com/vergissberlin/railwayapp-typo3)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flowise | [vergissberlin/railwayapp-flowise](https://github.com/vergissberlin/railwayapp-flowise) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `FLOWISE_PASSWORD` | (secret) | Administrator password. |
| `FLOWISE_USERNAME` | (secret) | Administrator username. |
| `FLOWISE_SECRETKEY_OVERWRITE` | (secret) | Stable encryption key for persisted credentials. |

## Configuration

- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/flowise-3)
