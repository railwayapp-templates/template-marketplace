# Deploy OpenBB on Railway

Financial data platform for analysts, quants and AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbb)

## About

OpenBB is an open-source investment research platform that provides access to a vast array of financial data from multiple providers. By utilizing a unified API, it simplifies quantitative analysis, algorithmic trading, and financial modeling for both individual investors and enterprise teams.

Hosting OpenBB via this template spins up the OpenBB Platform API, providing a stateless REST interface to query financial data. Deploying it on Railway requires minimal configuration: simply deploy the Docker container and configure your data provider API keys as environment variables. 

The API is powered by FastAPI, meaning you immediately get interactive API documentation (Swagger UI) at the `/docs` endpoint. This allows you to easily explore available routes, test queries, and integrate robust financial data into your custom applications or trading algorithms without managing complex local infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenBB | [darseen/openbb-template](https://github.com/darseen/openbb-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6900 | The default port of OpenBB |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/openbb)
