# Deploy payme-merchant-api on Railway

A merchant API server for Payme

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/iOjVDR)

## About

This project is a simple API server that allows merchants to accept payments from customers using the Payme payment gateway. It provides two endpoints: one for the Payme merchant callback and another for the payment request and generating the payment URL. payme develop

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meticulous-empathy | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| payme_api_server | [bobir01/payme_api_server](https://github.com/bobir01/payme_api_server) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | meticulous-empathy | railway | Default database created when image is started. |
| `DATABASE_URL` | meticulous-empathy | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | meticulous-empathy | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | meticulous-empathy | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | meticulous-empathy | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_URL` | payme_api_server | - | postgres url |
| `PAYME_ID` | payme_api_server | must be added | - |
| `PAYME_KEY` | payme_api_server | must be added | - |
| `PAYME_URL` | payme_api_server | https://checkout.paycom.uz | - |
| `PAYME_ACCOUNT` | payme_api_server | order_id | docker settings |
| `PAYME_TEST_KEY` | payme_api_server | must be added | - |
| `PAYME_TEST_URL` | payme_api_server | https://test.paycom.uz | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/template/iOjVDR)
