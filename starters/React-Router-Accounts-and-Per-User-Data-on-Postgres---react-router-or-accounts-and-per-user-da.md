# Deploy React Router | Accounts and Per-User Data on Postgres on Railway

React Router 8, Prisma 7. Accounts and per-user data, ready to use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/react-router-or-accounts-and-per-user-da)

## About

# React Router stack

Accounts, sessions and per-user data on Postgres - React Router 8, React 19,
Prisma 7.

## What this fixes

The Remix Indie Stack template builds from a repository last touched in **April
2022**, and its `package.json` says `"remix": "*"` and `"@remix-run/react": "*"`,
with React 17 and Prisma 3.

`"*"` is not a version. It resolves to whatever npm publishes today, against
application code written for Remix 1.x - the install and the code cannot agree,
and **no deployment of it succeeds**: that template reports 0% health.

Remix has since merged into React Router, now at 8. This is the same idea rebuilt
on it: the thing the Indie Stack was actually for - a working account system with
per-user data - on versions that exist.

## What you get

Sign up, log in, write notes, delete them. Your notes; not anyone else's. Nothing
to wire together after deploying.

## Five decisions worth understanding

- **Login takes the same time whether or not the account exists.** A missing user
  is compared against a real hash of a random value, computed once at startup,
  rather than returning early. It has to be a genuine hash - bcrypt rejects a
  malformed one in well under a millisecond, against ~200ms of real work, and
  that gap alone tells an attacker which emails are registered. Measured on a
  deployment, not assumed.
- **Ownership is part of the query.** Deleting a note filters on `userId` as well
  as `id`, so guessing someone else's id changes nothing. A check the caller is
  trusted to have made is not a check.
- **Logging out is a POST.** A GET would let any page on the internet sign your
  users out with an `<img src="/logout">`.
- **Migrations run pre-deploy, not at build.** The build container has no
  database. `prisma generate` does run at build, because generated client code
  has to be in the image - different containers, and files written in the second
  do not survive.
- **The health check asks the database.** A process that is up but cannot reach
  Postgres is not serving anything.

## Configuration

Nothing to fill in. `DATABASE_URL` is wired to Postgres over the private network,
and `SESSION_SECRET` and the database password are generated.

Changing `SESSION_SECRET` signs everyone out. That is the point of it: it is the
lever you pull if you think a session has leaked.

Source: https://github.com/ak40u/react-router-stack-railway-starter

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| app | [ak40u/react-router-stack-railway-starter](https://github.com/ak40u/react-router-stack-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | app | 8080 |
| `SESSION_SECRET` | app | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/deploy/react-router-or-accounts-and-per-user-da)
