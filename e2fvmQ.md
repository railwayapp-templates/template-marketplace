# Deploy Bottle on Railway

Bottle is a fast simple and lightweight WSGI micro web-framework for Python

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/e2fvmQ)

## About

Bottle is a fast, simple and lightweight WSGI micro web-framework for Python. Perfect for building small web applications, REST APIs, and prototypes with minimal overhead and zero dependencies beyond the Python standard library.

Hosting Bottle applications requires a WSGI server for production deployments. This template provides a pre-configured setup with Gunicorn as the WSGI server, automatic port binding, health check endpoints, and environment variable configuration. Railway handles the infrastructure automatically - no server management, manual scaling, or complex deployment pipelines needed. Just push your code and Railway builds, deploys, and scales your Bottle app instantly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| python-bottle | [shinypebble/railway-python-bottle-quickstart](https://github.com/shinypebble/railway-python-bottle-quickstart) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOG_LEVEL` | info |

## Configuration

- **Start command:** `gunicorn main:app --bind [::]:$PORT --log-level ${LOG_LEVEL:-info}`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/e2fvmQ)
