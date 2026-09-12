# Deploy gestion-stock on Railway

Stock, ventas, compras, precios masivos y CSV/Excel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gestion-stock)

## About

Stock, ventas a clientes y compras a proveedores: catálogo con SKU, cuenta corriente, ajustes masivos de precio, historial de pagos e importación/exportación CSV y Excel. Un clic despliega la app y PostgreSQL. Un solo servicio sirve la interfaz y la API.

El stack es un monolito: React + Express en el servicio **stock**, con PostgreSQL para productos, clientes, proveedores, comprobantes y pagos. Railway genera el dominio HTTPS, la password de administración y conecta `DATABASE_URL` al plugin de Postgres.

El arranque corre migraciones y, si la base está vacía, puede cargar datos de ejemplo (`SEED_DEMO=true`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stock | [ProfesIA-IA/gestion-stock](https://github.com/ProfesIA-IA/gestion-stock) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODE_ENV` | stock | production |
| `SEED_DEMO` | stock | true |
| `STORE_NAME` | stock | Mi comercio |
| `UPLOAD_DIR` | stock | /data/uploads |
| `CORS_ORIGIN` | stock | * |
| `STORE_TIMEZONE` | stock | America/Argentina/Buenos_Aires |
| `DEFAULT_ADMIN_USER` | stock | (secret) |
| `DEFAULT_ADMIN_PASSWORD` | stock | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** JavaScript, CSS, TypeScript, HTML, Shell

[View on Railway →](https://railway.com/deploy/gestion-stock)
