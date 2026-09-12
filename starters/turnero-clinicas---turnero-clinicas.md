# Deploy turnero-clinicas on Railway

Agenda de turnos para clínicas, con calendario e historia clínica

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/turnero-clinicas)

## About

Agenda de turnos para clínicas y consultorios: calendario tipo Google Calendar, fichas de pacientes, historia clínica y páginas públicas para reservar con un profesional o un servicio. Un clic despliega la app y PostgreSQL. Un solo servicio sirve la interfaz y la API.

El stack es un monolito: React + Express en el servicio **turnero**, con PostgreSQL para turnos, pacientes y notas clínicas. Railway genera el dominio HTTPS, la password de administración y conecta `DATABASE_URL` al plugin de Postgres.

Los adjuntos de historia clínica viven en un volumen montado en `/data` (`UPLOAD_DIR=/data/uploads`) para que no se pierdan entre redeploys. El arranque corre migraciones y, si la base está vacía, puede cargar datos de ejemplo (`SEED_DEMO=true`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| turnero | [ProfesIA-IA/turnero-clinicas](https://github.com/ProfesIA-IA/turnero-clinicas) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NODE_ENV` | turnero | production |
| `SEED_DEMO` | turnero | true |
| `UPLOAD_DIR` | turnero | /data/uploads |
| `CLINIC_NAME` | turnero | Mi clínica |
| `CORS_ORIGIN` | turnero | * |
| `CLINIC_TIMEZONE` | turnero | America/Argentina/Buenos_Aires |
| `DEFAULT_ADMIN_USER` | turnero | (secret) |
| `DEFAULT_ADMIN_PASSWORD` | turnero | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** JavaScript, CSS, TypeScript, HTML, Shell

[View on Railway →](https://railway.com/deploy/turnero-clinicas)
