# Deploy Remix Railroad Blues Stack on Railway

Remix + Postgres optimized for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/plonEj)

## About

# Remix Railroad Blues Stack

![The Railroad Blues Stack](https://repository-images.githubusercontent.com/768360461/7aaa3e77-1473-4f67-a0c2-e8f012f70ecf)

This is a fork of the [Remix Blues Stack](https://github.com/remix-run/blues-stack) adapted for deploying to Railway

Learn more about [Remix Stacks](https://remix.run/stacks).

## What's in the template?

- Remix Notes Application
- Postgres database
- Email/Password Authentication with [cookie-based sessions](https://remix.run/utils/sessions#md-createcookiesessionstorage)
- Database ORM with Prisma
- Styling with Tailwind
- End-to-end testing with Cypress
- Local third party request mocking with MSW
- Unit testing with Vitest
- Code formatting with Prettier
- Linting with ESLint
- Static Types with TypeScript

## Local Development

- Start the Postgres Database in Docker:

  ```sh
  npm run docker
  ```

  _ **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding._

- Initial setup:  
  _only run this the first time_

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out `app/models/user.server.ts`
- user sessions, and verifying them `app/session.server.ts`
- creating, and deleting notes `app/models/note.server.ts`

Check out the [stack on GitHub](https://github.com/shamsup/railroad-blues-stack) for more details.

## Cost Estimate
For an experiment with no traffic, this should cost about $2/mo to keep deployed without App Sleeping enabled

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Remix | [shamsup/railroad-blues-stack-railway-template](https://github.com/shamsup/railroad-blues-stack-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URL` | Remix | - | The public internet address of the database used for deploying Prisma migrations |
| `SESSION_SECRET` | Remix | (secret) | A secure random string used to sign session cookies |
| `DATABASE_PRIVATE_URL` | Remix | - | The private network address of the database available at runtime |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript, Dockerfile, Shell, CSS

[View on Railway →](https://railway.com/template/plonEj)
