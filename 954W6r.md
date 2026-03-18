# Deploy apache-superset-v2 on Railway

Latest apache superset...

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/954W6r)

## About

Apache Superset has Docker images for deployment but the setting of the admin user requires executing code in the container. That is not possible to set up in a Railway template. This modification supports the creation of the admin user through setting of environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apache-superset-railway | [oc8/apache-superset-railway](https://github.com/oc8/apache-superset-railway) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8088 |
| `SECRET_KEY` | (secret) |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

**Category:** Observability · **Languages:** Dockerfile, Shell, Python

[View on Railway →](https://railway.com/template/954W6r)
