# Deploy Django on Railway

Deploy Django on Railway with Gunicorn and SQLite quick-start defaults.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django)

## About

# Django for railway.app

![Template Header](./template-header.svg)

Minimal Django project with Gunicorn for Railway (SQLite by default).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template)

## Environment

| Variable            | Description                       |
|---------------------|-----------------------------------|
| `DJANGO_SECRET_KEY` | Set a strong secret in production |
| `PORT`              | Set by Railway                    |

For production databases, configure `DATABASE_URL` or Django `DATABASES` via env (not included in this minimal template).

## Local

```bash
docker build -t railwayapp-django .
docker run --rm -p 8000:8000 -e PORT=8000 railwayapp-django
```




---
[![Airbyte](https://img.shields.io/badge/Airbyte-615EFF?style=for-the-badge&amp;logo=airbyte&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airbyte) [![Apache Airflow](https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&amp;logo=apacheairflow&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airflow) [![CodiMD](https://img.shields.io/badge/CodiMD-0F766E?style=for-the-badge&amp;logo=markdown&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-codimd) [![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&amp;logo=django&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-django) [![Email Service](https://img.shields.io/badge/Email%20Service-2563EB?style=for-the-badge&amp;logo=maildotru&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-email) [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&amp;logo=fastapi&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-fastapi) [![Flask](https://img.shields.io/badge/Flask-3fad48?style=for-the-badge&amp;logo=flask&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-flask) [![Flowise](https://img.shields.io/badge/Flowise-4F46E5?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-flowise) [![GitLab CE](https://img.shields.io/badge/GitLab%20CE-FC6D26?style=for-the-badge&amp;logo=gitlab&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-gitlab) [![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&amp;logo=grafana&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-grafana) [![Home Assistant](https://img.shields.io/badge/Home%20Assistant-18BCF2?style=for-the-badge&amp;logo=homeassistant&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-homeassistant) [![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&amp;logo=influxdb&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-influxdb) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mongodb) [![Mosquitto MQTT](https://img.shields.io/badge/Mosquitto%20MQTT-3C5280?style=for-the-badge&amp;logo=eclipsemosquitto&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mqtt) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&amp;logo=mysql&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mysql) [![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&amp;logo=n8n&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-n8n) [![Node-RED](https://img.shields.io/badge/Node-RED-8F0000?style=for-the-badge&amp;logo=nodered&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-nodered) [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-nodejs) [![OpenSearch](https://img.shields.io/badge/OpenSearch-005EB8?style=for-the-badge&amp;logo=opensearch&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-opensearch) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-postgresql) [![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&amp;logo=redis&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-redis) [![TYPO3 CMS](https://img.shields.io/badge/TYPO3%20CMS-FF8700?style=for-the-badge&amp;logo=typo3&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-typo3)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railwayapp-django | [vergissberlin/railwayapp-django](https://github.com/vergissberlin/railwayapp-django) | Worker |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/django)
