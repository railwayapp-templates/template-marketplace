# Deploy Flask on Railway

Flask Starter – Lightweight Python boilerplate for web apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flask-1)

## About

![Preview](https://raw.githubusercontent.com/asepscareer/flask/master/preview.png)

Hosting Flask on Railway allows developers to deploy applications with ease, eliminating the need for manual server configuration. Railway integrates seamlessly with GitHub, enabling continuous deployment every time you push updates. You can set environment variables directly from the dashboard, manage connected databases, and scale your application vertically or horizontally with just a few clicks. This makes Railway an excellent choice for hosting Flask apps, whether you’re building a prototype, an MVP, or running a production-ready web service. The deployment process is fast, reliable, and optimized for developer productivity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flask-app | [codestorm-official/flask](https://github.com/codestorm-official/flask) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |

## Configuration

- **Start command:** `gunicorn --bind 0.0.0.0:$PORT app:app`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** CSS, HTML, Python

[View on Railway →](https://railway.com/template/flask-1)
