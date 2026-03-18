# Deploy litemetrics on Railway

Open-source, self-hosted analytics SDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/litemetrics)

## About

Litemetrics is an open-source, self-hosted web analytics platform. It provides a lightweight
  browser tracker (~3.5KB), a real-time dashboard, and a multi-tenant query API. Privacy-friendly,
  cookie-free, and powered by ClickHouse for fast analytical queries.

  ## About Hosting Litemetrics

  Deploying Litemetrics requires two services: a ClickHouse database for storing analytics events
  and the Litemetrics server that handles event collection, query APIs, and serves the built-in
  dashboard UI. The Railway template provisions both services automatically with internal
  networking pre-configured. You only need to set an `ADMIN_SECRET` environment variable to secure
  site management. Once deployed, you get a single URL that serves the dashboard, the tracker
  script, and all API endpoints. Add a one-line script tag to any website to start collecting
  pageviews, custom events, and user sessions.

  ## Common Use Cases

  - **Website analytics without third-party services** — Track pageviews, referrers, devices,
  countries, and custom events while keeping all data on your own infrastructure
  - **Multi-tenant SaaS analytics** — Embed per-customer analytics dashboards using the client SDK
  and query API, each site isolated by site ID
  - **Product event tracking** — Collect custom events, identify users, and analyze retention and
  engagement with the built-in React, React Native, and Node.js SDKs

  ## Dependencies for Litemetrics Hosting

  - **ClickHouse** — Columnar database used for storing and querying analytics events
  - **Litemetrics Server** — Node.js application built from Dockerfile (serves dashboard, API, and
  tracker script)

  ### Deployment Dependencies

  - [ClickHouse](https://clickhouse.com/) — Default analytics database
  - [Litemetrics GitHub Repository](https://github.com/AurimarL/litemetrics) — Source code and
  documentation
  - [Litemetrics npm packages](https://www.npmjs.com/package/@litemetrics/tracker) — Browser
  tracker and SDK packages

  ## Why Deploy Litemetrics on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your
  infrastructure so you don't have to deal with configuration, while allowing you to vertically and
   horizontally scale it.

  By deploying Litemetrics on Railway, you are one step closer to supporting a complete full-stack
  application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litemetrics | [metehankurucu/litemetrics](https://github.com/metehankurucu/litemetrics) | Web service |
| clickhouse-server | `clickhouse/clickhouse-server:24-alpine` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3002 | - |
| `GEOIP` | true | - |
| `DB_ADAPTER` | clickhouse | - |
| `TRUST_PROXY` | true | - |
| `ADMIN_SECRET` | (secret) | Define your secret key |
| `CLICKHOUSE_URL` | http://clickhouse-server.railway.internal:8123 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8123

**Category:** Analytics

[View on Railway →](https://railway.com/template/litemetrics)
