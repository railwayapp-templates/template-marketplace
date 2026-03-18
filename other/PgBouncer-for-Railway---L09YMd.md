# Deploy PgBouncer for Railway on Railway

A minimal PgBouncer image for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/L09YMd)

## About

Use this template to deploy a PgBouncer instance on Railway. To get started, deploy the template and input your Postgres database details when prompted. Once deployed, you can access your database though PgBouncer using your default credentials and the host and port provided under Your_PgBouncer_Service -> Settings 
 -> Networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgBouncer | [jheaberlin/Railway-PgBouncer](https://github.com/jheaberlin/Railway-PgBouncer) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_HOST` | - | Your Postgres database host |
| `DB_NAME` | - | Your Postgres database name |
| `DB_PORT` | - | Your Postgres database port |
| `DB_USER` | (secret) | Your Postgres database username |
| `AUTH_TYPE` | plain | Authentication type for PgBouncer. Defaults to plain |
| `DB_PASSWORD` | (secret) | Your Postgres database password |

## Configuration

- **TCP Proxies:** 6432

**Category:** Other · **Languages:** Shell, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/L09YMd)
