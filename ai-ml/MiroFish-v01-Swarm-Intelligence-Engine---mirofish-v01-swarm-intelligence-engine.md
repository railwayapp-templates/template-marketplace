# Deploy MiroFish v0.1 Swarm Intelligence Engine on Railway

Simulate many AI agents to explore how events and opinions unfold.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mirofish-v01-swarm-intelligence-engine)

## About

MiroFish is an open-source (AGPL-3.0) multi-agent simulation engine: feed it documents and a scenario, and it builds a knowledge graph, turns the people and organisations in it into LLM agents, lets them post and react on simulated social platforms, and writes up what happened. This community template runs it behind a login on one HTTPS URL.

MiroFish has two parts: a Vue web UI and a Python backend that calls your LLM, keeps the knowledge graph and agent memory in Zep Cloud, and starts each simulation as a separate CAMEL-AI OASIS process (Twitter-like and Reddit-like platforms, with a Hugging Face recommender model). Upstream ships a single development container with no authentication. This template builds the UI once and serves it from Caddy, puts HTTP basic auth with a generated password in front of the UI and API, keeps the backend on the private network, pins the MiroFish source to a commit, and stores projects, simulations, reports and the model cache on a volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [baranberkay96/mirofish-railway](https://github.com/baranberkay96/mirofish-railway) (branch: main) (root: /services/web) | Web service |
| MiroFish | [baranberkay96/mirofish-railway](https://github.com/baranberkay96/mirofish-railway) (branch: main) (root: /services/mirofish) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Web | 8080 | Caddy port (public domain target); only /healthz and /health skip the login. |
| `MIROFISH_BACKEND` | Web | - | Private address of the MiroFish backend that /api/* is forwarded to. |
| `BASIC_AUTH_PASSWORD` | Web | (secret) | Login password for the MiroFish UI and API. Generated; read it here. |
| `BASIC_AUTH_USERNAME` | Web | (secret) | Login name for the MiroFish UI and API (letters, digits, . _ @ -). |
| `PORT` | MiroFish | 5001 | Backend (Flask) listen port; Railway health-checks /health on it. |
| `FLASK_HOST` | MiroFish | :: | Listen address. :: serves IPv4 and IPv6; use 0.0.0.0 only if IPv4-only is needed. |
| `SECRET_KEY` | MiroFish | (secret) | Flask secret key (generated; replaces upstream's built-in default). |
| `FLASK_DEBUG` | MiroFish | false | Keep false. true turns on Flask debug mode, never for a public deployment. |
| `LLM_API_KEY` | MiroFish | (secret) | Required. API key of your OpenAI-compatible LLM provider (billed by that provider). |
| `ZEP_API_KEY` | MiroFish | (secret) | Required. Zep Cloud API key (app.getzep.com) for the knowledge graph and agent memory. |
| `LLM_BASE_URL` | MiroFish | https://api.openai.com/v1 | OpenAI-compatible API base URL (OpenAI, DashScope, OpenRouter, vLLM, ...). |
| `LLM_MODEL_NAME` | MiroFish | gpt-4o-mini | Model id used for graph building, agent personas, simulation and reports. |
| `LLM_BOOST_API_KEY` | MiroFish | (secret) | Optional. Second OpenAI-compatible key; parallel runs use it for the Reddit agents. |
| `LLM_BOOST_BASE_URL` | MiroFish | - | Optional. Base URL for LLM_BOOST_API_KEY (set all three LLM_BOOST_* or none). |
| `LLM_BOOST_MODEL_NAME` | MiroFish | - | Optional. Model id for LLM_BOOST_API_KEY. |
| `MIROFISH_CPU_THREADS` | MiroFish | - | Optional. Torch/BLAS threads for simulations; empty = from CPU quota, max 8. |
| `OASIS_DEFAULT_MAX_ROUNDS` | MiroFish | 10 | Default simulation rounds. More rounds = many more LLM calls and cost. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/app/backend/uploads`

**Category:** AI/ML · **Tags:** mirofish, multi-agent, agent-simulation, swarm-intelligence, social-simulation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mirofish-v01-swarm-intelligence-engine)
