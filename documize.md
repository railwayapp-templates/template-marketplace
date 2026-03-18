# Deploy Documize [Updated Mar ’26] on Railway

Documize [Mar ’26] (Create, Organize & Share Docs Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/documize)

## About

Documize is a powerful open-source documentation and knowledge management platform that helps teams create, organize, and share internal or external documentation seamlessly. Available on GitHub, it combines the simplicity of a wiki with the structure of a documentation tool, making it ideal for businesses, developers, and organizations looking to build collaborative documentation systems while maintaining full control of their data.

Self-hosting Documize gives you total control over your documentation data, storage, and configuration. Unlike third-party documentation services, hosting on your own infrastructure ensures that your internal documentation remains private, secure, and customizable to fit your needs.

Railway makes the process of deploying and managing Documize incredibly straightforward. With its one-click deploy feature, you can set up a full Documize instance complete with its database and backend in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| documize-railway | [Shinyduo/documize-railway](https://github.com/Shinyduo/documize-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | documize-railway | 5001 |
| `DOCUMIZEPORT` | documize-railway | 5001 |
| `DOCUMIZESALT` | documize-railway | yourrandomsecretstring |
| `DOCUMIZEDBTYPE` | documize-railway | postgresql |
| `DOCUMIZELOCATION` | documize-railway | selfhost |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Go, Handlebars, SCSS, HTML, CSS, Shell, Dockerfile, Batchfile

[View on Railway →](https://railway.com/template/documize)
