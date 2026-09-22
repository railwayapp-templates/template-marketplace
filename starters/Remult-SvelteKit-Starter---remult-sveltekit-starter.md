# Deploy Remult SvelteKit Starter on Railway

Adding FULL to your full-stack. ORM, auth, mail, live query, admin, ...

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/remult-sveltekit-starter)

## About

Remult & SvelteKit makes your data model the app. Write one entity class and you get a typed REST API, validation on both sides, live queries that keep every tab in sync, and an admin UI - with auth, i18n and a landing page already standing. No API layer to write, no client SDK to regenerate. Ship features, not plumbing.

It deploys like any Node app, with one twist worth knowing: the schema builds itself on boot from your entity classes, so there is no migration step in the pipeline and no database access at build time. Railway attaches Postgres and the app picks it up. A single long-lived process holds the live-query stream open, which is why the bundled server compresses everything except that one endpoint. Set a session secret, deploy, and sign in with your email - the first account created owns the app, so there is no seed data to clean up and no admin flag to flip.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remult-sveltekit-template-railway | [jycouet/remult-sveltekit-template-railway](https://github.com/jycouet/remult-sveltekit-template-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_SECRET` | remult-sveltekit-template-railway | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `node scripts/prod-server.js`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Svelte, TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/remult-sveltekit-starter)
