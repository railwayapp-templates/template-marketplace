# Deploy librenms-template on Railway

LibreNMS network monitoring — SNMP auto-discovery, alerts, graphs. 1-click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librenms-template-2)

## About

Deploy LibreNMS to Railway in one click. The template provisions and wires all three services, runs schema migrations on first boot, and hands you the install wizard to create your admin account — from zero to monitoring in minutes.

Hosting LibreNMS on Railway gives you a fully managed network monitoring station: three services are provisioned — `librenms` (web UI on port 8000 + SNMP poller + dispatcher, persistent `/data` volume), `mariadb` (10.11, LibreNMS requires MariaDB ≥ 10.5, utf8mb4, persistent volume), and `redis` (sessions/cache). Unlike a manual deploy, the template wires the database credentials by reference (generated fresh per deployment, never hardcoded), enables the LibreNMS dispatcher inside the main container (Railway's one-volume-per-service rule forbids the upstream sidecar), and pre-seeds `icmp_check=false` because Railway containers cannot use ICMP (no `CAP_NET_RAW`). Scale by deploying additional instances of this template — each is an independent poller with its own storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| librenms | [lNamelessl/librenms-railway-template](https://github.com/lNamelessl/librenms-railway-template) (root: librenms) | Web service |
| mariadb | `mariadb:10.11` | Database |
| redis | `redis:7.2-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | librenms | (secret) |
| `MYSQL_USER` | mariadb | (secret) |
| `MYSQL_PASSWORD` | mariadb | (secret) |
| `MYSQL_ROOT_PASSWORD` | mariadb | (secret) |
| `MYSQL_RANDOM_ROOT_PASSWORD` | mariadb | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mariadbd --innodb-file-per-table=1 --lower-case-table-names=0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **Volume:** `/var/lib/mysql`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/librenms-template-2)
