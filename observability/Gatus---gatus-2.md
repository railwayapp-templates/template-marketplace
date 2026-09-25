# Deploy Gatus on Railway

Gatus 5.37 status page and uptime monitoring for HTTP, TCP, DNS and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gatus-2)

## About

Gatus is a developer-oriented health dashboard and status page. It checks HTTP, TCP, ICMP, DNS, TLS certificates and more on a schedule, evaluates conditions such as status codes, response times and JSON body values, and sends alerts to Slack, Discord, PagerDuty, Telegram, email and many other channels.

This template deploys Gatus v5.37.0 from a small public wrapper image that runs the official binary as a non-root user. The whole configuration lives in the `GATUS_CONFIG` variable, so you can edit monitored endpoints and alerts in the Railway dashboard and redeploy. Gatus expands `${VAR}` references inside the config, which keeps webhook URLs and tokens in their own variables. Results are stored in SQLite on a Railway volume, so uptime history survives redeploys. The status page is public by design. Gatus is tiny and fits the Hobby plan. Alerts can go to Slack, Discord, PagerDuty, email and many other providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gatus | [aalfath/gatus-railway-template](https://github.com/aalfath/gatus-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `GATUS_CONFIG` | web:
  address: '[::]'
  port: ${PORT}
storage:
  type: sqlite
  path: /data/data.db
ui:
  title: Status
  header: Status
endpoints:
  - name: Gatus
    group: self
    url: 'http://127.0.0.1:${PORT}/health'
    interval: 1m
    conditions:
      - '[STATUS] == 200'
      - '[BODY].status == UP'
  - name: Example
    group: websites
    url: 'https://example.com'
    interval: 5m
    conditions:
      - '[STATUS] == 200'
      - '[RESPONSE_TIME] < 2000' |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/gatus-2)
