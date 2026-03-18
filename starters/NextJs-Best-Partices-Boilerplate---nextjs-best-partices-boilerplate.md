# Deploy NextJs Best Partices Boilerplate on Railway

Prod ready Next.js clean architecture, TypeScript, zero-config Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-best-partices-boilerplate)

## About

A production-ready Next.js template with clean architecture patterns, full TypeScript support, and zero-configuration Railway deployment. Built with Screaming Architecture to organize code by business capability rather than framework conventions, this template provides a proven foundation for scalable applications without the bloat of feature-heavy starters.

Deploying this template on Railway requires zero configuration. The template includes pre-configured health checks, environment validation, graceful shutdown handling, and production logging. Railway automatically detects the Next.js application, builds it using the standalone output mode, and deploys with proper health monitoring. The architecture separates business logic (features), shared rules (core), and external integrations (infrastructure) from the Next.js routing layer, making it easy to scale and maintain. Environment variables are validated at startup using Zod schemas, ensuring configuration errors are caught before deployment rather than in production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextjs_best_practices | [contourkde/nextjs_best_practices](https://github.com/contourkde/nextjs_best_practices) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | NODE_ENV=production |
| `NEXT_PUBLIC_APP_NAME` | Next.js Best Practices | NEXT_PUBLIC_APP_NAME: Next.js Railway Template |
| `NEXT_PUBLIC_APP_VERSION` | 1.0.0 | NEXT_PUBLIC_APP_VERSION: 1.0.0 |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/nextjs-best-partices-boilerplate)
