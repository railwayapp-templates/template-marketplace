# Deploy OpenEMR on Railway

Electronic medical records and practice management — self-hosted EHR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openemr)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/openemr?utm_medium=integration&utm_source=button&utm_campaign=openemr)

[OpenEMR](https://www.open-emr.org/) is the most widely used open-source electronic medical records and practice management system: patient charts, scheduling, e-prescribing, billing, lab integrations, telehealth, and a patient portal — ONC-certified and translated into 30+ languages. A self-hosted alternative to per-provider-per-month EHR subscriptions.

This template runs OpenEMR (7.0.4) next to a MySQL 8 service. First boot is fully automatic: OpenEMR creates its database and application user via the generated root credentials, then sets up the admin account from the `OE_USER` / `OE_PASS` template variables — no installer wizard. Patient documents, site configuration, and uploads persist on a volume at `/var/www/localhost/htdocs/openemr/sites`; everything else lives in MySQL (volume-backed as well). Railway terminates TLS at the edge, so the app serves plain HTTP internally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openemr | [nomideusz/openemr-railway](https://github.com/nomideusz/openemr-railway) (root: /) | Web service |
| mysql | [nomideusz/openemr-railway](https://github.com/nomideusz/openemr-railway) (root: /mysql) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OE_PASS` | openemr | - | Auto-generated OpenEMR admin password - change it after first login |
| `OE_USER` | openemr | (secret) | OpenEMR admin username, created on first boot |
| `MYSQL_HOST` | openemr | - | Wired to the bundled MySQL - leave as is |
| `MYSQL_PASS` | openemr | - | Auto-generated application database password |
| `MYSQL_USER` | openemr | (secret) | Application database user, created on first boot |
| `MYSQL_ROOT_PASS` | openemr | - | Root credentials for first-boot database creation - leave as is |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Auto-generated MySQL root password |

## Configuration

- **Healthcheck:** `/interface/login/login.php?site=default`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/localhost/htdocs/openemr/sites`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openemr)
