# Deploy Flask | Python Starter with Gunicorn, Pinned Runtime & Health Check on Railway

Flask starter that deploys clean: gunicorn, pinned Python, health check.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flask-or-python-starter-with-gunicorn-pi)

## About

Flask is a lightweight WSGI web framework for Python — small enough to read in an afternoon, flexible enough to grow into a real application. This template gives you a working Flask app served by gunicorn, with the runtime pinned so the deployment that works today still works next month.

Deploying Flask means more than pushing `app.py`. You need a production WSGI server instead of the development one, a bind address the platform can actually reach, a pinned Python version so a builder upgrade cannot change your runtime underneath you, and a health check so a broken release is caught before it takes traffic. This template ships all four, wired up and verified on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flask-railway-starter | [ak40u/flask-railway-starter](https://github.com/ak40u/flask-railway-starter) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, Python

[View on Railway →](https://railway.com/deploy/flask-or-python-starter-with-gunicorn-pi)
