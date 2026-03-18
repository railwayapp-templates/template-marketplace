# Deploy TaskFlow API on Railway

Production-ready Task Management REST API with ASP.NET Core 9 + PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/taskflow-api)

## About

TaskFlow API is a production-ready RESTful task management API built with ASP.NET Core 9 and PostgreSQL. It provides full CRUD
  operations with filtering, sorting, search, pagination, and FluentValidation. Deploy in one click and start managing tasks
  immediately with interactive Swagger documentation.

  ## About Hosting TaskFlow API

  This template deploys an ASP.NET Core 9 Web API backed by a PostgreSQL database on Railway. The database is provisioned
  automatically and migrations run on first startup, so there is no manual setup required. The API includes Swagger UI for
  interactive documentation, health check endpoints for monitoring, FluentValidation for input validation, and CORS enabled for
  frontend integration. Railway handles TLS termination, automatic restarts on failure, and the Dockerfile-based build ensures
  consistent deployments every time.

  ## Common Use Cases

  - Backend API for task management or to-do applications
  - Starter template for building .NET REST APIs on Railway
  - Backend service for mobile or single-page apps that need task tracking

  ## Dependencies for TaskFlow API Hosting

  - PostgreSQL (provisioned automatically by this template)
  - .NET 9.0 runtime (included in the Docker image)

  ### Deployment Dependencies

  - [ASP.NET Core 9](https://learn.microsoft.com/en-us/aspnet/core/)
  - [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
  - [Npgsql PostgreSQL Driver](https://www.npgsql.org/)
  - [FluentValidation](https://docs.fluentvalidation.net/)
  - [Swashbuckle/Swagger](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)

  ## Why Deploy TaskFlow API on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal
   with configuration, while allowing you to vertically and horizontally scale it.

  By deploying TaskFlow API on Railway, you are one step closer to supporting a complete full-stack application with minimal burden.
  Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| task-management-api | [TrailBlazors/task-management-api](https://github.com/TrailBlazors/task-management-api) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | taskmanagementdb |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** C#, Dockerfile

[View on Railway →](https://railway.com/template/taskflow-api)
