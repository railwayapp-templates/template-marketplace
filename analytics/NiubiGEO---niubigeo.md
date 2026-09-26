# Deploy NiubiGEO on Railway

Open-source AI brand visibility (GEO) reports, password-protected

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/niubigeo)

## About

[NiubiGEO](https://github.com/Albert-Weasker/niubigeo) is an open-source (Apache-2.0) tool for GEO, generative engine optimization: it asks AI models about your brand and your competitors and keeps the raw answers and sources as evidence. You pick the models through OpenRouter and pay for the calls with your own key.

Its docs say not to put the workbench on the public internet without separate authentication and TLS, and scheduled measurements need a second process that shares the workbench's data folder. On Railway a volume attaches to one service, so this template runs both processes in one container, behind a login. Railway provides the HTTPS.

The deploy form asks for an OpenRouter API key. When the deploy finishes, open `NIUBIGEO_URL` from the Variables tab and log in as `admin` with `NIUBIGEO_PASSWORD`. Create a project for your domain, pick the models to ask, and run a measurement.

Before publishing I checked that `/health` answers without a password (for Railway's healthcheck) while the workbench and its API return 401 without one. With the password I created a project through the API and loaded OpenRouter's list of 458 models in 0.8 seconds. After a restart the project was still there. I didn't run a paid measurement in the test. The service used 55 MB of RAM at idle.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| niubigeo | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /niubigeo) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of the password-protected workbench |
| `NIUBIGEO_URL` | - | Open this and log in with the username and password above |
| `NIUBIGEO_USER` | (secret) | Login username |
| `NIUBIGEO_PASSWORD` | (secret) | Login password (generated) |
| `NIUBIGEO_SCHEDULER` | true | Run scheduled measurements. They call models and cost API credits; set false to turn them off |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key. NiubiGEO asks the models you pick about your brand (openrouter.ai/keys) |
| `NIUBIGEO_VIDEO_ADVISOR_ENABLED` | true | Show upstream's advisor card in the workbench (false hides it) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics · **Tags:** geo, seo, ai-visibility, brand-monitoring, openrouter · **Languages:** Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/niubigeo)
