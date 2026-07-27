# Deploy Next + Prisma + tRPC | Typed Full-Stack on Current Versions on Railway

Next 16, Prisma 7, tRPC 11. Migrations run before the new version.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/next-prisma-trpc-or-typed-full-stack-on-)

## About

# Next + Prisma + tRPC

A typed full-stack app on Next 16, React 19, Prisma 7 and tRPC 11, with Postgres.

## What this fixes

The existing Next Prisma tRPC template deploys a repository last touched in
May 2023 - Next 13, Prisma 4.7, tRPC 10, React 18. **No deployment of it
succeeds**: the template reports 0% health. Three years of unattended dependency
drift will do that, and the stack has moved twice since: Prisma 7 changed where
the connection string lives, and tRPC 11 changed where the transformer is
configured.

## What you get

A working app, not a skeleton. Open the domain, write a post, and it goes through
a typed tRPC call to Prisma to Postgres and comes back from the database.

- **Migrations run pre-deploy, not at build.** The build container has no
  database. `prisma migrate deploy` runs in the pre-deploy step, before the new
  version takes traffic. Putting it in the build is the single most common way
  this stack fails on a platform.
- **`prisma generate` does run at build**, because generated client code has to
  be in the image. Build and pre-deploy are different containers, and files
  written in the second one do not survive.
- **The health check asks the database.** A process that is up but cannot reach
  Postgres is not serving anything; reporting it healthy only delays finding out.
- **The Node version is declared.** Without it the builder picks its own default -
  Node 18 at the time of writing - and the install fails outright, because
  Prisma 7 requires 20.19 or newer.
- **The lockfile is committed and audits clean.** Railway refuses to build when
  the lockfile carries a HIGH advisory, and three transitive dependencies here
  ship one; the `overrides` block pins the patched versions.

## Prisma 7, if you last used 6

`url` is gone from the `datasource` block. The CLI reads it from
`prisma.config.ts`; the application passes its own connection to `PrismaClient`
through a driver adapter, `@prisma/adapter-pg` here. The upside on a platform is
real: the schema no longer needs a reachable database at build time.

## TypeScript 7

Next's built-in type checking uses a compiler API that TypeScript 7 does not
expose, so `experimental.useTypeScriptCli` is on and Next runs `tsc` instead.
That is what keeps this on the current TypeScript rather than pinning back to 6.

## Configuration

Nothing to fill in. `DATABASE_URL` is wired to the Postgres service over the
private network, and the database password is generated.

Source: https://github.com/ak40u/next-prisma-trpc-railway-starter

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [ak40u/next-prisma-trpc-railway-starter](https://github.com/ak40u/next-prisma-trpc-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 8080 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/deploy/next-prisma-trpc-or-typed-full-stack-on-)
