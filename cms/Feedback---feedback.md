# Deploy Feedback on Railway

Fast feedback form and admin panel to approve dynamic reviews

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/feedback)

## About

Feedback Hub is a lightweight web application for collecting, managing, and reviewing user feedback in a centralized interface. It enables teams to gather suggestions, track feature requests, and organize feedback efficiently. The application is well suited for startups, product teams, and developers looking to improve products through structured user input.

![Feedback](https://raw.githubusercontent.com/iqbalexperience/feedback-hub/refs/heads/main/images/1.png)

Hosting Feedback Hub on Railway provides a fully managed environment for running both the application and its database without manual infrastructure management. Railway automatically builds the application from the repository, provisions networking, and generates HTTPS-secured public endpoints. The application uses a PostgreSQL database for persistent data storage, while environment variables are managed securely through Railway's Variables panel. Railway also supports vertical and horizontal scaling as your workload grows, making it suitable for projects ranging from personal applications to production deployments. With integrated monitoring, managed infrastructure, and automatic deployments from GitHub, Railway simplifies operating Feedback Hub in production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| feedback-hub | [iqbalexperience/feedback-hub](https://github.com/iqbalexperience/feedback-hub) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ADMIN_PASSWORD` | feedback-hub | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/feedback)
