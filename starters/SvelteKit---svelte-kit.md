# Deploy SvelteKit on Railway

Svelte with authentication and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/svelte-kit)

## About

[SvelteKit](https://svelte.dev/docs/kit) is a framework for rapidly developing robust, performant web applications using [Svelte](https://svelte.dev/docs/svelte). If you’re coming from React, SvelteKit is similar to Next. If you’re coming from Vue, SvelteKit is similar to Nuxt.

To learn more about the kinds of applications you can build with SvelteKit, see the [documentation regarding project types](https://svelte.dev/docs/kit/project-types).

This SvelteKit template runs on Node.js, demonstrating basic authentication and database querying. It’s configured to use:
- The SvelteKit [Node adapter](https://svelte.dev/docs/kit/adapter-node) which adapts the project to run on Node.js.
- [Better Auth](https://better-auth.com/) to simplify the authentication setup. User registrations and sessions are stored in a Postgres database.
- [Drizzle ORM](https://orm.drizzle.team/) to manage database connections, migrations, and queries.

Additional integrations, such as Tailwind CSS, can be easily added by running the [Svelte CLI](https://svelte.dev/docs/cli/sv-add).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SvelteKit | [sveltejs/kit-template-railway](https://github.com/sveltejs/kit-template-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ORIGIN` | SvelteKit | - | The origin of your app, used for CSRF protection |
| `DATABASE_URL` | SvelteKit | - | The URL of the Postgres service |
| `BETTER_AUTH_SECRET` | SvelteKit | (secret) | Used by Better Auth for authentication |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Tags:** web, frontend, typescript · **Languages:** TypeScript, Svelte, CSS, HTML

[View on Railway →](https://railway.com/deploy/svelte-kit)
