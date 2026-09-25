# Deploy Glance on Railway

Glance 0.8 self-hosted dashboard for feeds, releases and service status.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glance-1)

## About

Glance is a fast, lightweight self-hosted dashboard that puts your feeds in one place. Widgets show RSS feeds, Hacker News, Lobsters, Reddit, GitHub releases, YouTube uploads, weather, markets, calendars, Docker containers and service status, all configured in a single YAML file and rendered as a quick, minimal page.

This template deploys Glance v0.8.6 from the official image with a developer-focused starter dashboard: GitHub releases, Hacker News and Lobsters, engineering blogs and a status monitor. The whole configuration lives in the `GLANCE_CONFIG` variable, so you edit pages and widgets in the Railway dashboard and redeploy. Glance's built-in login protects the dashboard with a generated password, and sessions stay valid across redeploys. Glance is stateless and very light, so it needs no volume and fits the Hobby plan. Change the starter widgets to follow the repositories, feeds and services your team cares about.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| glance | `glanceapp/glance:v0.8.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `GLANCE_CONFIG` | server:
  port: ${PORT}
auth:
  secret-key: ${GLANCE_SECRET_KEY}
  users:
    ${GLANCE_ADMIN_USERNAME}:
      password: ${GLANCE_ADMIN_PASSWORD}
pages:
  - name: Home
    columns:
      - size: small
        widgets:
          - type: calendar
            first-day-of-week: monday
          - type: releases
            cache: 6h
            repositories:
              - railwayapp/cli
              - glanceapp/glance
              - nodejs/node
              - golang/go
              - python/cpython
      - size: full
        widgets:
          - type: group
            widgets:
              - type: hacker-news
              - type: lobsters
          - type: rss
            title: Engineering blogs
            limit: 10
            collapse-after: 5
            cache: 3h
            feeds:
              - url: https://blog.railway.com/rss.xml
                title: Railway
              - url: https://github.blog/feed/
                title: GitHub
              - url: https://blog.cloudflare.com/rss/
                title: Cloudflare
      - size: small
        widgets:
          - type: monitor
            cache: 1m
            title: Services
            sites:
              - title: Railway status
                url: https://status.railway.com
              - title: GitHub
                url: https://github.com |
| `GLANCE_SECRET_KEY` | (secret) |
| `GLANCE_ADMIN_PASSWORD` | (secret) |
| `GLANCE_ADMIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$GLANCE_CONFIG" > /tmp/glance.yml && exec /app/glance --config /tmp/glance.yml'`
- **Healthcheck:** `/api/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/glance-1)
