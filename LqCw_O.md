# Deploy ExpressJS Prisma on Railway

An example ExpressJS application using Prisma

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/LqCw_O)

## About

Prisma is a Next-generation Node.js and TypeScript ORM. Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety, and auto-completion.

Hosting Express.js with Prisma means running a Node.js application that combines web server functionality with modern database access through an ORM layer. The application handles HTTP requests through Express.js while Prisma manages database connections, schema migrations, and type-safe query operations. Production deployment requires coordinating database schema management, handling Prisma migrations, managing environment variables for database connections, and ensuring type safety across the application stack. Railway streamlines this deployment by providing integrated PostgreSQL database hosting, managing environment variables for database connectivity, handling Prisma migration execution, and coordinating the Express.js server with automatic database connection configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| expressjs-prisma | [railwayapp-templates/expressjs-prisma](https://github.com/railwayapp-templates/expressjs-prisma) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | - | Railway Private Domain |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** webserver, typescript · **Languages:** TypeScript, Procfile

[View on Railway →](https://railway.com/template/LqCw_O)
