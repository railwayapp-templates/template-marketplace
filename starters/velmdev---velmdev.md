# Deploy velm.dev on Railway

A web platform where you can compose tables, columns, and business logic.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/velmdev)

## About

**A low-code application platform for building structured tools — from household management to enterprise operations.✱

Most tools for managing structured work are either too expensive, too rigid, or too generic to be genuinely useful. The ones that do everything cost a fortune and take months to configure. The ones you can afford don't do quite enough.

Velm is a different approach.

You define your application in YAML — its data model, its screens, its automations, its logic. Velm materialises it. You get a working, structured application without the boilerplate, the framework sprawl, or the enterprise licence bill.

The goal is to give developers — and eventually everyone — a way to build the kind of internal tools that currently require either significant budget or a dedicated engineering team.

**Stack:** Go · HTMX · PostgreSQL · Goja (JS scripting)  
**Model:** Open core · AGPL-3.0-only + commercial licensing · Managed hosting coming

[![Licence: AGPL v3](https://img.shields.io/badge/Licence-AGPL%20v3-blue.svg)](LICENSE)
[![Status: Alpha](https://img.shields.io/badge/Status-Alpha-orange.svg)]()
[![Docker](https://img.shields.io/badge/Docker-andywithcamera%2Fvelm-blue.svg)](https://hub.docker.com/r/andywithcamera/velm)

&gt; Velm is being built in the open from an early stage. The runtime is functional but not yet stable. The YAML schema **will** change before 1.0.

&gt; Early adopters who like getting in before the paint dries — welcome. If you need something production-ready today — check back in a few weeks.


Velm is publicly released under the [GNU Affero General Public Licence v3.0](LICENSE), with the repository notice clarified in [COPYRIGHT.md](COPYRIGHT.md) as `AGPL-3.0-only`.

Plain terms: use it, modify it, and self-host it freely. If you run a modified version as a network service, you must publish your modifications under the same licence. This protects the community that builds on it.

Velm is also intended to be dual-licensed. Commercial terms may be available separately from the copyright holder; see [COMMERCIAL-LICENSING.md](COMMERCIAL-LICENSING.md).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| velm | [ANDYwithCAMERA/velm](https://github.com/ANDYwithCAMERA/velm) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | velm | - | The USL of the DB |
| `SESSION_KEY_FILE` | velm | - | Customer supplied session key |
| `POSTGRES_DB` | Postgres | - | POSTGRES_DB |
| `DATABASE_URL` | Postgres | - | DATABASE_URL |
| `POSTGRES_USER` | Postgres | (secret) | POSTGRES_USER |
| `POSTGRES_PASSWORD` | Postgres | (secret) | POSTGRES_PASSWORD |
| `DATABASE_PUBLIC_URL` | Postgres | - | DATABASE_PUBLIC_URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Go, HTML, CSS, PLpgSQL, JavaScript, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/velmdev)
