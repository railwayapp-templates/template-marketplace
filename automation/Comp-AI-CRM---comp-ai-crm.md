# Deploy Comp AI CRM on Railway

AI sales CRM whose research agent fills in contacts, deals and pipeline

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/comp-ai-crm)

## About

Comp AI CRM is an open source CRM built the other way round from the usual: the
agent is not a feature bolted onto a form, the CRM is where the agent keeps its
notes. It runs on its own deployment, on its own schedule, against its own work
queue. It decides which contact to look at next, spends a research budget, books
its own follow-ups, and stops when the budget runs out. Close the browser and it
keeps going.

The rule it never breaks is that nothing about a person is guessed. No tool
accepts a confidence score, because a model asked to grade its own certainty
will, and it will be wrong in the direction that makes it look useful. Tools
report what they observed, a ledger prices the evidence, strong evidence writes
to the record and weak evidence becomes a suggestion a human settles. A
confidently wrong fact about a customer is worse than a blank field, because
nobody can tell it is wrong.

This deploys five pieces: the Next.js front end, a NestJS API that handles auth
and mailbox sync, the research agent as its own long-running deployment, a
scheduled job that syncs mailboxes every fifteen minutes, and Postgres.

Only the front end gets a public address. That is not a hardening choice, it is
the only arrangement in which signing in works. The front end already forwards
every API and agent request through itself, and the sign-in client talks to
whatever origin the browser is on, so one public address keeps the session cookie
first-party. Giving the API its own address would put the cookie on a hostname
the front end can never read, and Railway's generated subdomains cannot share a
cookie between them.

Sign-in is Google or Microsoft, and that is not configurable. There is no email
and password mode. You bring your own OAuth client and add the redirect address
after the deploy, because it contains the address Railway just gave you. Budget
two minutes for it. A single variable, an email domain or address, decides who is
allowed in at all.

The agent needs a Vercel AI Gateway key to think with, and nothing else. Every
outside data source it can use is optional and it is designed to run with none of
them: with no keys it reads your own threads, meetings and email signature
blocks, which is free and is the strongest evidence there is.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agent | `ghcr.io/hmseeb/comp-ai-crm-railway:1.13.0-r1` | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| api | `ghcr.io/hmseeb/comp-ai-crm-railway:1.13.0-r1` | Worker |
| app | `ghcr.io/hmseeb/comp-ai-crm-railway:1.13.0-r1` | Web service |
| cron | `ghcr.io/hmseeb/comp-ai-crm-railway:1.13.0-r1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AGENT_PORT` | agent | 2000 | - |
| `AI_GATEWAY_API_KEY` | agent | (secret) | Vercel AI Gateway key, which is what the research agent thinks with. Optional: without it the CRM works fully and the agent does nothing. |
| `BETTER_AUTH_SECRET` | agent | (secret) | - |
| `AGENT_BRIDGE_SECRET` | agent | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | agent | (secret) | - |
| `POSTGRES_DB` | postgres | railway | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `PORT` | api | 3001 | - |
| `CRON_SECRET` | api | (secret) | - |
| `ALLOWED_SIGN_IN` | api | - | Who is allowed to sign in, and the only thing deciding it. An email domain (acme.com), a single address (you@gmail.com), or a comma-separated mix. Subdomains count. Leave it empty and nobody can sign in, including you. |
| `GOOGLE_CLIENT_ID` | api | - | Google OAuth client ID. Optional here because the redirect address only exists once this is deployed: afterwards, add https://<your app address>/api/auth/callback/google to the client in the Google Cloud console and put the pair on the api service. There is no email and password sign-in, so without Google or Microsoft nobody can get in. |
| `BETTER_AUTH_SECRET` | api | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | api | (secret) | Google OAuth client secret. Set it together with the client ID; half a pair is refused on purpose, because it renders a button that fails at Google. |
| `PORT` | app | 3000 | - |
| `BETTER_AUTH_SECRET` | app | (secret) | - |
| `AGENT_BRIDGE_SECRET` | app | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | app | (secret) | - |
| `CRON_SECRET` | cron | (secret) | - |

## Configuration

- **Start command:** `/usr/local/bin/entrypoint.sh agent`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/local/bin/entrypoint.sh api`
- **Healthcheck:** `/health`
- **Start command:** `/usr/local/bin/entrypoint.sh app`
- **Healthcheck:** `/api/auth/ok`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/local/bin/entrypoint.sh cron`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/comp-ai-crm)
