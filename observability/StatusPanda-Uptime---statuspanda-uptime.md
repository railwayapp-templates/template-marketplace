# Deploy StatusPanda Uptime on Railway

Live status page. Get shouted at when a site breaks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/statuspanda-uptime)

## About

StatusPanda Uptime is a self hosted monitor with a public status page and a private admin den. Deploy it on Railway and leave the defaults. It watches HTTP URLs, records incidents, and can shout into Discord or Slack when a site falls over. An example check is already running on first boot so the page is never empty.

StatusPanda Uptime runs as one Node service. Checks, the public page, and SQLite all live together. Railway gives you the public domain, a generated admin password, and a volume at `/data` so history survives redeploys. There is no separate database to provision and no secret for you to invent. Open the URL, copy `ADMIN_PASSWORD` from the service variables, and add your real sites. Optional webhooks wait in Settings until you want alerts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| StatusPanda | [pagetree/railway-status-panda](https://github.com/pagetree/railway-status-panda) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_NAME` | statuspanda | Public name on the status page. Leave StatusPanda unless you want your own brand. |
| `ADMIN_USER` | (secret) | Admin login username. Leave admin unless you want a different name. |
| `ADMIN_PASSWORD` | (secret) | Leave this. Railway fills a random password. After deploy, copy it from the service Variables tab to log in. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/statuspanda-uptime)
