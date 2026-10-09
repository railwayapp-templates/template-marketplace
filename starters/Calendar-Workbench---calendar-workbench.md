# Deploy Calendar Workbench on Railway

Printable calendars, ISO weeks, Julian dates, and a tiny calendar API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calendar-workbench)

## About

Calendar Workbench is an open-source tool for print-ready Gregorian calendars, ISO week checks, Julian/Gregorian conversion, and a small JSON API with OpenAPI documentation.

Deploy the public GitHub repository as one Railway service. Railway builds the included Dockerfile and starts the Node.js server on the platform-provided PORT. The app needs no database, account setup, or environment secrets. The template configures the HTTP proxy for port 8080 and checks /health before a deployment completes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calendar-workbench | [mateopedersen/calendar-workbench](https://github.com/mateopedersen/calendar-workbench) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/calendar-workbench)
