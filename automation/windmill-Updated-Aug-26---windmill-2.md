# Deploy windmill [Updated Aug '26] on Railway

Windmill [Aug '26] (Scripts, Workflows & Internal Tools) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-2)

## About

Windmill is the open-source platform that turns scripts into workflows, APIs, and internal tools. Write in Python, TypeScript, Go, Bash, or SQL, chain them into flows with branching and error handling, and get a usable UI generated automatically, no proprietary low-code language, no per-builder bill.

Retool's Business plan runs $50-65 per builder per month, plus extra charges once you exceed the included end users. A team of 5 builders is already looking at $250-325/month before anyone's actually used the internal tools they've built, and that number only grows as the team does. Windmill self-hosted on Railway costs a flat infrastructure fee no matter how many people write scripts, build flows, or use the resulting apps.

The bigger reason teams move to Windmill specifically isn't only the price curve. It's that Windmill is code-first: your automation logic is plain Python or TypeScript, not locked inside a proprietary drag-and-drop builder that's hard to version-control, hard to test, and hard to migrate away from. Scripts live as actual code, reviewable in a normal pull request, runnable outside Windmill if you ever need to.

It's worth being specific about what makes Windmill different from "yet another Airflow alternative" or "yet another Retool alternative." It does both jobs at once: it's a workflow orchestrator (Airflow's territory) and an internal-tool/UI builder (Retool's territory), from the same scripts. Write a Python function once, and it becomes a callable API, a scheduled job, a step in a larger flow, and the backend for an auto-generated form UI, without rewriting it four different ways for four different tools.

This isn't a small or unproven project either. Windmill has crossed 12,000 GitHub stars and describes itself as roughly 13 times faster than Airflow for equivalent workloads, a real, benchmarked claim rather than marketing language. That kind of traction matters for infrastructure specifically: a workflow engine your internal tools depend on is worth trusting to a project with real momentum behind it, not a smaller side project that might stall.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| windmill-railway | [shruti060701/windmill-railway](https://github.com/shruti060701/windmill-railway) | Web service |
| poetic-grace | [shruti060701/windmill-railway](https://github.com/shruti060701/windmill-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup. |
| `DATABASE_URL` | Postgres | - | Standard internal connection string, referenced directly by both `windmill-railway` and `poetic-grace` above. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network. |
| `MODE` | windmill-railway | server | Runs this service as the API server and UI. |
| `PORT` | windmill-railway | 8000 | Port Railway routes external traffic to. Must be an explicit Railway variable, this project has confirmed the hard way on multiple prior templates that a Dockerfile-only default alone doesn't reliably get picked up by Railway's edge routing. |
| `DATABASE_URL` | windmill-railway | - | Connection string for Windmill's own database (scripts, flows, users, execution history). |
| `WINDMILL_PUBLIC_URL` | windmill-railway | - | Public URL of the instance, used for OAuth callbacks and generated links. |
| `MODE` | poetic-grace | worker | Runs this service as a job-executing worker instead of the API server. |
| `DATABASE_URL` | poetic-grace | - | Same database as the server. Workers pull jobs from the same queue stored here. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/version`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/windmill-2)
