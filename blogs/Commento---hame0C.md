# Deploy Commento++ on Railway

A comment widget that just works

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hame0C)

## About

## Overview

Commento++ is a free, open source, fast, and lightweight comments box that you can embed in your static website instead of Disqus.

## Highlights

- Markdown support
- Import from Disqus
- Voting
- Automated spam detection (Askimet and Perspective integration)
- Moderation tools
- Sticky comments
- Thread locking
- OAuth login (Google, Github, Twitter) and single sign-on
- Hot-reloading of comments
- Email notifications

## Learn More

- [GitHub](https://github.com/souramoo/commentoplusplus)
- [Documentation](https://docs.commento.io/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| commentoplusplus | [souramoo/commentoplusplus](https://github.com/souramoo/commentoplusplus) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | commentoplusplus | 8080 | - |
| `COMMENTO_ORIGIN` | commentoplusplus | - | This should be set to the subdomain or the IP address hosting Commento. All API requests will go to this server. This may include subdirectories if Commento is hosted behind a reverse proxy, for example. Include the protocol in the value to use HTTP/HTTPS. |
| `COMMENTO_POSTGRES` | commentoplusplus | - | A PostgreSQL server URI, including the database name. |
| `COMMENTO_SMTP_HOST` | commentoplusplus | - | SMTP credentials and configuration the server should use to send emails. By default, all settings are empty and email features such as email notification and reset password are turned off. |
| `COMMENTO_SMTP_PORT` | commentoplusplus | - | SMTP credentials and configuration the server should use to send emails. By default, all settings are empty and email features such as email notification and reset password are turned off. |
| `COMMENTO_SMTP_PASSWORD` | commentoplusplus | (secret) | SMTP credentials and configuration the server should use to send emails. By default, all settings are empty and email features such as email notification and reset password are turned off. |
| `COMMENTO_SMTP_USERNAME` | commentoplusplus | (secret) | SMTP credentials and configuration the server should use to send emails. By default, all settings are empty and email features such as email notification and reset password are turned off. |
| `COMMENTO_ENABLE_LOGGING` | commentoplusplus | false | Should we log every page view? This will allow you to see stats but will fill up your free postgres database quite quickly, so defaults to false. Set to true to enable |
| `COMMENTO_ENABLE_WILDCARDS` | commentoplusplus | true | Allows use of wildcards in domain names in the admin dashboard, defaults to true. Set to false to disable (e.g. if you share your commento instance with more than one admin/allow new registrations) |
| `COMMENTO_FORBID_NEW_OWNERS` | commentoplusplus | false | Used to disable new dashboard registrations. Useful if you are the only person using Commento on your server. Does not impact the creation of accounts for your readers. Defaults to false. |
| `COMMENTO_SMTP_FROM_ADDRESS` | commentoplusplus | - | SMTP credentials and configuration the server should use to send emails. By default, all settings are empty and email features such as email notification and reset password are turned off. |
| `COMMENTO_SMTP_SKIP_HOST_VERIFY` | commentoplusplus | false | Allows skipping of host verification for SMTP email sending, defaults to false. Set to true to enable (e.g. for the Cloudron app package) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs · **Tags:** disqus, comments · **Languages:** Go, JavaScript, SCSS, HTML, PLpgSQL, Makefile, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hame0C)
