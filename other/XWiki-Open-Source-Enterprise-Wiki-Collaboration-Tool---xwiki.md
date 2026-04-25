# Deploy XWiki (Open-Source Enterprise Wiki & Collaboration Tool) on Railway

XWiki [May ’26] (Manage Knowledge & Teams Effectively) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xwiki)

## About

XWiki is a powerful, open-source enterprise wiki and knowledge management platform available on GitHub. It allows teams and organizations to create, organize, and share information collaboratively in a structured, extensible, and secure way. XWiki provides an alternative to proprietary wiki systems and knowledge bases, offering complete data ownership, customizable features, and a robust plugin ecosystem.

You can self host XWiki on Railway to maintain full control over your organization’s internal documentation, data, and collaboration workflows. Hosting XWiki on Railway ensures you get a managed, scalable environment without dealing with manual server setup or maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| xwiki | `xwiki:lts-postgres-tomcat` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_USER` | xwiki | (secret) |
| `DB_DATABASE` | xwiki | railway |
| `DB_PASSWORD` | xwiki | (secret) |
| `XWIKI_DB_USER` | xwiki | (secret) |
| `XWIKI_DB_PASSWORD` | xwiki | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/local/xwiki/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/xwiki)
