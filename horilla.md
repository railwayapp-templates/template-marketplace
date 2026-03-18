# Deploy Horilla on Railway

Open-source HRMS (Horilla) for managing employees, payroll, and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/horilla)

## About

Hosting Horilla on Railway allows you to deploy and manage the application seamlessly in the cloud. This template includes a Dockerized setup and environment-based configuration, so you can connect to a PostgreSQL database, manage environment variables, and run the app with minimal effort. Deployment is simple: configure your `DATABASE_URL`, secret key, and other environment values, and Railway will handle the hosting. With built-in scalability, Railway ensures that your Horilla instance can grow alongsi...

⚠️ **Default Login Credentials**  
When you first log in, use the following credentials:  
- **Username:** `admin`  
- **Password:** `admin`  

It is strongly recommended to change these credentials immediately after your first login for security reasons.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Horilla | [sukrutnrvd/horilla_template](https://github.com/sukrutnrvd/horilla_template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | Horilla | True | Should be True in development, and strictly set to False in production |
| `TIME_ZONE` | Horilla | UTC | The default time zone for the application |
| `SECRET_KEY` | Horilla | (secret) | A secret key used by Django for cryptographic signing; must be strong and unique in production |
| `DATABASE_URL` | Horilla | - | The database connection string for the application |
| `ALLOWED_HOSTS` | Horilla | * | A list of domain names or IP addresses allowed to serve the Django application. It is not recommended to use "*" for production |
| `PYTHONUNBUFFERED` | Horilla | 1 | Ensures Python outputs are sent directly to the terminal without buffering |
| `CSRF_TRUSTED_ORIGINS` | Horilla | - | A list of trusted origins for CSRF protection (e.g., https://example.com) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/horilla)
