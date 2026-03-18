# Deploy KBZ on Railway

Remember, Grasshopper, coding is as much about problem-solving as 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tUSiyV)

## About

Remember, Grasshopper, coding is as much about problem-solving as it is about writing code. Think of these errors as puzzles waiting to be solved, and with each puzzle, you become a more adept coder. Let's tackle this one together! Remember, Grasshopper, coding is as much about problem-solving as it is about writing code. Think of these errors as puzzles waiting to be solved, and with each puzzle, you become a more adept coder. Let's tackle this one together!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| postgresml-test | [lliWcWill/postgresml-test](https://github.com/lliWcWill/postgresml-test) (root: pgml-apps/pgml-chat) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PYTHON_VERSION` | postgresml-test | 3.10 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pgml-chat --collection_name blessedasf --stage chat --chat_interface discord`

**Category:** Other · **Languages:** Rust, JavaScript, SCSS, HTML, Python, TypeScript, CSS, PLpgSQL, Shell, Smarty, Dockerfile, Ruby

[View on Railway →](https://railway.com/template/tUSiyV)
