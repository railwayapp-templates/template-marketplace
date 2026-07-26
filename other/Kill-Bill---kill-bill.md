# Deploy Kill Bill on Railway

Open-source billing and payments infrastructure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kill-bill)

## About

Kill Bill is Open-source billing and payments infrastructure for teams that need control - https://killbill.io/.

KillBill is a Java based billing platform that requires three moving parts: a MariaDB (or MySQL) database pre-seeded with two schemas (killbill and kaui), the KillBill application server (a Jetty-based Java app), and optionally KAUI (the Ruby on Rails admin UI). The app server is heavyweight. It runs Flyway migrations on first boot and loads an OSGi plugin container, so cold start takes 2–4 minutes. It's memory-hungry (1–2 GB minimum for the JVM). You need persistent storage for the database, internal networking between all three services, and a public HTTP endpoint for KAUI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KillBill | `killbill/killbill:0.24.19` | Worker |
| KillBillAdmin | `killbill/kaui:4.0.23` | Web service |
| KillBillDB | `killbill/mariadb:0.24` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `KILLBILL_DAO_URL` | KillBill | jdbc:mysql://KillBillDB:3306/killbill?useUnicode=true&serverTimezone=UTC |
| `KILLBILL_DAO_USER` | KillBill | (secret) |
| `KILLBILL_DAO_PASSWORD` | KillBill | (secret) |
| `KB_org_killbill_billing_osgi_dao_url` | KillBill | jdbc:mysql://KillBillDB:3306/killbill?useUnicode=true&serverTimezone=UTC |
| `KB_org_killbill_billing_osgi_dao_user` | KillBill | (secret) |
| `KB_org_killbill_billing_osgi_dao_password` | KillBill | (secret) |
| `KAUI_KILLBILL_URL` | KillBillAdmin | http://KillBill:8080 |
| `KAUI_CONFIG_DAO_URL` | KillBillAdmin | jdbc:mysql://KillBillDB:3306/kaui?useUnicode=true&serverTimezone=UTC |
| `KAUI_CONFIG_DAO_USER` | KillBillAdmin | (secret) |
| `KAUI_CONFIG_DAO_PASSWORD` | KillBillAdmin | (secret) |
| `MYSQL_ROOT_PASSWORD` | KillBillDB | (secret) |

## Configuration

- **Healthcheck:** `/1.0/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kill-bill)
