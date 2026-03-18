# Deploy Saltcorn on Railway

No-code/low-code platform | Alternative to AppSmith, Retool, Budibase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0fAMTr)

## About

# Saltcorn

Saltcorn is an extensible open source no-code database application builder. Use it to build web and mobile database applications with flexible views, datatypes, layouts and actions

# Key Advantages of Saltcorn

1. Drag-and-drop page builder
2.  Manage relational database
3.  Web and mobile apps
4.  PDF generation and emails
5.  Easy-to-use themes
6.  Free to use & Open source
7.  Get started right now
8. Automate manual tasks and workflows

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| saltcorn/saltcorn:latest | `saltcorn/saltcorn:latest` | Web service |
| sailtcorn-railway | [ju-li/sailtcorn-railway](https://github.com/ju-li/sailtcorn-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | saltcorn/saltcorn:latest | 3000 | - |
| `SALTCORN_SESSION_SECRET` | saltcorn/saltcorn:latest | (secret) | - |
| `POSTGRES_DB` | sailtcorn-railway | railway | Default database created when image is started. |
| `DATABASE_URL` | sailtcorn-railway | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | sailtcorn-railway | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | sailtcorn-railway | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | sailtcorn-railway | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `saltcorn serve`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/0fAMTr)
