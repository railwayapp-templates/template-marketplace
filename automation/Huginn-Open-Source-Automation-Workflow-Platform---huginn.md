# Deploy Huginn (Open-Source Automation & Workflow Platform) on Railway

Huginn [Mar’26] (Workflows, Automation | IFTTT/Zapier Alternative) Selfhost

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/huginn)

## About

Huginn is a free, open-source automation platform available on [GitHub](https://github.com/huginn/huginn). Think of it like your own personal IFTTT or Zapier, but fully self-hosted and infinitely customizable. With Huginn, you can build powerful workflows that monitor events, scrape data, trigger actions, and connect apps without relying on third-party services. The Huginn app gives you total control of your automation system, making it a go-to tool for privacy-conscious individuals, developers, and businesses who want to automate tasks without giving up their data.

---

You can self host Huginn to keep all your automations, workflows, and event data under your full control. No external company can snoop on your integrations or restrict what you can automate. Hosting Huginn docker containers on Railway makes this process incredibly simple: you get a managed cloud environment that takes care of scaling, monitoring, and updates, so you can focus on building workflows rather than worrying about server maintenance.

With Railway, deploying Huginn docker compose setups becomes a one-click process. You can run your Huginn automation app within minutes, with minimal setup, while keeping costs affordable and predictable.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| huginn-single-process | `ghcr.io/huginn/huginn-single-process` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | huginn-single-process | 3000 |
| `TIMEZONE` | huginn-single-process | Asia/Kolkata |
| `RAILS_ENV` | huginn-single-process | production |
| `APP_SECRET_TOKEN` | huginn-single-process | (secret) |
| `DATABASE_ADAPTER` | huginn-single-process | postgresql |
| `DATABASE_ENCODING` | huginn-single-process | UTF8 |
| `DO_NOT_CREATE_DATABASE` | huginn-single-process | true |
| `HUGINN_DATABASE_ADAPTER` | huginn-single-process | postgresql |
| `HUGINN_DATABASE_PASSWORD` | huginn-single-process | (secret) |
| `HUGINN_DATABASE_USERNAME` | huginn-single-process | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/users/sign_in`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/huginn)
