# Deploy Blazor + Authentication + Postgres on Railway

Blazor Server with ASP.NET Identity auth and PostgreSQL - production ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/blazor-authentication-postgres)

## About

A production-ready Blazor Server template with complete ASP.NET Identity authentication system and PostgreSQL database. Build secure web applications with user registration, login, password management, and role-based access control. Zero configuration required - deploy and immediately start building authenticated features.

This template deploys a complete authentication-ready Blazor Server application with ASP.NET Identity and PostgreSQL. Railway handles the Docker build process that compiles your .NET 9 application, provisions a PostgreSQL database, and runs Entity Framework Core migrations automatically to create all necessary Identity tables (users, roles, claims, tokens). The authentication system includes secure password hashing with bcrypt, cookie-based session management, anti-forgery protection, and built-in account management pages. Health checks are pre-configured at `/health` for Railway monitoring. Public networking is enabled with automatic SSL certificates. After deployment, users can immediately register accounts, login, manage profiles, and access protected pages. The entire authentication stack deploys in under 3 minutes with zero manual configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blazor-auth-starter | [TrailBlazors/blazor-auth-starter](https://github.com/TrailBlazors/blazor-auth-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_PUBLIC_URL` | blazor-auth-starter | - | PostgreSQL database connection |
| `ASPNETCORE_ENVIRONMENT` | blazor-auth-starter | Production | ASP.NET environment setting |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, C#, CSS, Dockerfile

[View on Railway →](https://railway.com/template/blazor-authentication-postgres)
