# Deploy Email on Railway

Deploy a lightweight email service template on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/email)

## About

# Railway Email Service

![Template Header](./template-header.svg)


Deploy a lightweight transactional email API on Railway.

## Features

* JSON API endpoint for registration emails
* Health endpoint at `/healthz`
* Runtime configuration via environment variables
* Railway config as code via `railway.toml`

## Required variables

```bash
PORT=8080
EMAIL_SERVICE_PROVIDER=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_CLIENT_USER=your-user@example.com
EMAIL_CLIENT_PASSWORD=your-app-password
EMAIL_CLIENT_FROM="Your App "
```

## Production recommendations (Railway)

* Keep credentials only in Railway Variables
* Never commit `.env` files with real SMTP credentials
* Use app passwords or provider-specific API keys
* Monitor `/healthz` in Railway healthchecks




---
[![Airbyte](https://img.shields.io/badge/Airbyte-615EFF?style=for-the-badge&amp;logo=airbyte&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airbyte) [![Apache Airflow](https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&amp;logo=apacheairflow&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airflow) [![CodiMD](https://img.shields.io/badge/CodiMD-0F766E?style=for-the-badge&amp;logo=markdown&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-codimd) [![Email Service](https://img.shields.io/badge/Email%20Service-2563EB?style=for-the-badge&amp;logo=maildotru&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-email) [![GitLab CE](https://img.shields.io/badge/GitLab%20CE-FC6D26?style=for-the-badge&amp;logo=gitlab&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-gitlab) [![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&amp;logo=grafana&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-grafana) [![Home Assistant](https://img.shields.io/badge/Home%20Assistant-18BCF2?style=for-the-badge&amp;logo=homeassistant&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-homeassistant) [![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&amp;logo=influxdb&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-influxdb) [![Mosquitto MQTT](https://img.shields.io/badge/Mosquitto%20MQTT-3C5280?style=for-the-badge&amp;logo=eclipsemosquitto&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mqtt) [![Node-RED](https://img.shields.io/badge/Node--RED-8F0000?style=for-the-badge&amp;logo=nodered&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-nodered) [![OpenSearch](https://img.shields.io/badge/OpenSearch-005EB8?style=for-the-badge&amp;logo=opensearch&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-opensearch) [![TYPO3 CMS](https://img.shields.io/badge/TYPO3%20CMS-FF8700?style=for-the-badge&amp;logo=typo3&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-typo3)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railwayapp-email | [vergissberlin/railwayapp-email](https://github.com/vergissberlin/railwayapp-email) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `EMAIL_CLIENT_USER` | (secret) |
| `EMAIL_CLIENT_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML, Handlebars

[View on Railway →](https://railway.com/deploy/email)
