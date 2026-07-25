# Deploy Shiny Server on Railway

Host interactive R applications with Shiny Server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shiny-server)

## About

Shiny Server hosts interactive web applications written in R. This template deploys the open-source server on a pinned Rocker image with a working reactive application, Railway-aware port configuration, application logs on stdout, and an HTTP health check.

Hosting Shiny Server turns R analyses, visualizations, and data tools into browser-based applications. Railway builds the included Dockerfile, assigns a public HTTPS domain, monitors the root application, and restarts the service after runtime failures. The repository includes a sample histogram application so every deployment can be validated immediately. Replace the files in `app/` with your own Shiny application and add any required R packages to the Dockerfile.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Shiny Server | [monotykamary/railway-template-shiny-server](https://github.com/monotykamary/railway-template-shiny-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3838 | Port used by Shiny Server and the Railway public domain. |
| `APPLICATION_LOGS_TO_STDOUT` | true | Stream individual Shiny application logs to Railway logs. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** R, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/shiny-server)
