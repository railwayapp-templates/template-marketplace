# Deploy SvelteKit on Railway

An example SvelteKit application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/svelte-kit)

## About

## SvelteKit Starter

A Railway Template that deploys SvelteKit. It provides a starting point for building web applications using the SvelteKit framework. This deploys a simple "Hello World" web-app using the attached GitHub repo.

This provides a pre-configured setup for deploying your web application on Railway with one (or two) clicks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sveltekit | [sveltejs/sv-addon-railway](https://github.com/sveltejs/sv-addon-railway) (branch: fix-template) (root: /template-postgres) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BETTER_AUTH_SECRET` | Sveltekit | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Tags:** web, frontend, typescript · **Languages:** TypeScript, Svelte, Shell, HTML

[View on Railway →](https://railway.com/deploy/svelte-kit)
