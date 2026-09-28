# Deploy jsreport on Railway

jsreport 4.14: generate PDFs and reports from HTML templates via API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jsreport)

## About

jsreport is a reporting platform that turns HTML, CSS and JavaScript templates into PDFs, Excel files and more through a REST API. You design templates in its browser studio with Handlebars or other engines, then render them from any language by posting JSON data. Chrome does the PDF rendering, so modern CSS works.

This template runs the official `jsreport/jsreport:4.14.2` image, which includes Chromium. Authentication is on: the studio and every API call need the `admin` account and its generated password. Templates, scripts, assets and the config file are stored on a Railway volume and survive redeploys. The start command hands the temp directory to the `jsreport` user before the server drops root privileges. Two worker threads render reports, and each render times out after 60 seconds. Chrome makes the service memory-hungry, so large or parallel PDF jobs may need a bigger plan. User scripts run sandboxed, because `trustUserCode` stays off.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jsreport | `jsreport/jsreport:4.14.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5488 |
| `httpPort` | 5488 |
| `reportTimeout` | 60000 |
| `workers_numberOfWorkers` | 2 |
| `extensions_authentication_enabled` | true |
| `extensions_authentication_admin_password` | (secret) |
| `extensions_authentication_admin_username` | (secret) |
| `extensions_authentication_cookieSession_secret` | (secret) |

## Configuration

- **Start command:** `sh -c 'mkdir -p /tmp/jsreport; chown -R jsreport:jsreport /tmp/jsreport; ls -ld /tmp /tmp/jsreport; exec docker-entrypoint.sh bash run.sh'`
- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/jsreport`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/jsreport)
