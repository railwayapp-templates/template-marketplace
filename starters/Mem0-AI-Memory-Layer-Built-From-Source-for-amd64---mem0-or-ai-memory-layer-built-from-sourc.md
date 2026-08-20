# Deploy Mem0 | AI Memory Layer, Built From Source for amd64 on Railway

AI memory layer, built from source since the image has no amd64 build

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-or-ai-memory-layer-built-from-sourc)

## About

Mem0 is an open-source memory layer for AI agents - it stores and recalls
facts across conversations so an LLM application does not start from zero
every session. This template builds the server from source
(`mem0ai/mem0`, `/server`) instead of using the catalog's published image,
because that image has no `amd64` build at all.

`mem0/mem0-api-server:latest` on Docker Hub ships only an `arm64` manifest
plus an attestation layer - no `amd64`. Railway builds and runs containers
on `amd64`, so a straight `docker pull` of that image fails outright; a live
test deploy of it on Railway confirmed this, failing with an empty build log
in the exact pattern of a platform mismatch. The fix is to have Railway
build the image itself from the same Dockerfile the maintainers publish
(`server/Dockerfile`), which runs on Railway's own `amd64` build
infrastructure instead of pulling a pre-built image.

Getting a clean build to actually boot took three more fixes beyond the
platform switch:

- **Migrations never ran.** The stock `Dockerfile`'s `CMD` is just
  `uvicorn main:app --reload` - no `alembic upgrade head`. Without it,
  Postgres never gets its tables. This template's start command runs
  migrations before starting the server.
- **The app's own database doesn't exist.** `server/db.py` connects to
  `APP_DB_NAME` (`mem0_app`), a *separate* database from `POSTGRES_DB`.
  Upstream creates it via `init-db.sh`, mounted into Postgres's
  `docker-entrypoint-initdb.d` on first container init - a mechanism that
  isn't available on a stock `pgvector/pgvector:pg17` image. The start
  command creates `mem0_app` itself (via `psycopg`, autocommit) before
  migrations run.
- **`psycopg` has no working backend.** `requirements.txt` pins bare
  `psycopg>=3.2.8` - no `[binary]` extra - and the `Dockerfile` never
  installs system `libpq`. The result: `ImportError: no pq wrapper
  available`, reproduced on a live deploy. This isn't a bug in this
  template's config; it's the same import `db.py` itself makes, so the
  *official* Dockerfile hits it too. The start command installs
  `psycopg[binary]` (version-matched to what's already installed) before
  anything touches Postgres.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg17` | Database |
| mem0-src | [ak40u/mem0](https://github.com/ak40u/mem0) (root: /server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | postgres | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |
| `PORT` | mem0-src | 8000 | - |
| `JWT_SECRET` | mem0-src | (secret) | - |
| `APP_DB_NAME` | mem0-src | mem0_app | - |
| `ADMIN_API_KEY` | mem0-src | (secret) | - |
| `AUTH_DISABLED` | mem0-src | false | - |
| `POSTGRES_PORT` | mem0-src | 5432 | - |
| `POSTGRES_USER` | mem0-src | (secret) | - |
| `MEM0_TELEMETRY` | mem0-src | false | - |
| `OPENAI_API_KEY` | mem0-src | (secret) | Required, not optional. Mem0 builds its default embedder client at import time (server/main.py), before any request arrives, so an empty key crashes the container on boot rather than failing on first use. Get one at platform.openai.com/api-keys. |
| `HISTORY_DB_PATH` | mem0-src | /app/history/history.db | - |
| `PYTHONUNBUFFERED` | mem0-src | 1 | - |
| `POSTGRES_PASSWORD` | mem0-src | (secret) | - |
| `MEM0_DEFAULT_LLM_MODEL` | mem0-src | gpt-5-mini | - |
| `PYTHONDONTWRITEBYTECODE` | mem0-src | 1 | - |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | mem0-src | text-embedding-3-small | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `python3 -c "import base64;exec(base64.b64decode('CmltcG9ydCBzdWJwcm9jZXNzLCBzeXMsIG9zLCBpbXBvcnRsaWIubWV0YWRhdGEgYXMgbQp2ID0gbS52ZXJzaW9uKCJwc3ljb3BnIikKc3VicHJvY2Vzcy5ydW4oW3N5cy5leGVjdXRhYmxlLCAiLW0iLCAicGlwIiwgImluc3RhbGwiLCAiLS1uby1jYWNoZS1kaXIiLCAiLS1xdWlldCIsICJwc3ljb3BnW2JpbmFyeV09PSIgKyB2XSwgY2hlY2s9VHJ1ZSkKaW1wb3J0IHBzeWNvcGcKaCA9IG9zLmVudmlyb25bIlBPU1RHUkVTX0hPU1QiXQpwID0gb3MuZW52aXJvblsiUE9TVEdSRVNfUE9SVCJdCnUgPSBvcy5lbnZpcm9uWyJQT1NUR1JFU19VU0VSIl0KcHcgPSBvcy5lbnZpcm9uWyJQT1NUR1JFU19QQVNTV09SRCJdCmRiID0gb3MuZW52aXJvblsiUE9TVEdSRVNfREIiXQphcHAgPSBvcy5lbnZpcm9uWyJBUFBfREJfTkFNRSJdCmNvbm4gPSBwc3ljb3BnLmNvbm5lY3QoInBvc3RncmVzcWw6Ly8iICsgdSArICI6IiArIHB3ICsgIkAiICsgaCArICI6IiArIHAgKyAiLyIgKyBkYiwgYXV0b2NvbW1pdD1UcnVlKQpjdXIgPSBjb25uLmN1cnNvcigpCmN1ci5leGVjdXRlKCJTRUxFQ1QgMSBGUk9NIHBnX2RhdGFiYXNlIFdIRVJFIGRhdG5hbWUgPSAlcyIsIChhcHAsKSkKaWYgY3VyLmZldGNob25lKCkgaXMgTm9uZToKICAgIGN1ci5leGVjdXRlKCdDUkVBVEUgREFUQUJBU0UgIicgKyBhcHAgKyAnIicpCmNvbm4uY2xvc2UoKQpzdWJwcm9jZXNzLnJ1bihbImFsZW1iaWMiLCAidXBncmFkZSIsICJoZWFkIl0sIGNoZWNrPVRydWUpCm9zLmV4ZWN2cCgidXZpY29ybiIsIFsidXZpY29ybiIsICJtYWluOmFwcCIsICItLWhvc3QiLCAiMC4wLjAuMCIsICItLXBvcnQiLCAiODAwMCJdKQo=').decode())"`
- **Healthcheck:** `/docs`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/history`

**Category:** Starters · **Languages:** Python, TypeScript, Shell, JavaScript, CSS, Makefile, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/mem0-or-ai-memory-layer-built-from-sourc)
