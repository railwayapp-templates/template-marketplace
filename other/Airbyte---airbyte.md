# Deploy Airbyte on Railway

Airbyte production setup is multi-service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airbyte)

## About

![Airbyte Icon](./railwayapp-airbyte.svg)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ILtPlT?referralCode=2_sIT9&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic)

Airbyte is an open-source data integration platform. It syncs data from APIs, databases, files, and SaaS apps into warehouses, lakes, and other destinations using configurable connectors and schedules—so teams can centralize analytics-ready data without hand-building a new pipeline for every source.

Hosting Airbyte is a multi-service job: you run a control plane (API server and usually a web UI), workers that execute syncs, PostgreSQL for metadata and state, and Temporal for reliable workflow orchestration. On Railway you typically model each part as its own service, connect them over private networking, set secrets and environment variables, and add volumes where you need persistence for logs or connector state. This repository is a **server-only** template—a minimal base image plus Railway deploy settings—so you still add PostgreSQL, Temporal, Airbyte Worker, and Airbyte Webapp (or equivalents) to match [Airbyte’s architecture](https://docs.airbyte.com/). Tune health checks, retries, and worker capacity for production traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railwayapp-airbyte | [vergissberlin/railwayapp-airbyte](https://github.com/vergissberlin/railwayapp-airbyte) | Worker |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/airbyte)
