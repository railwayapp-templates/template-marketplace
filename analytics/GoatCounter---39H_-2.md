# Deploy GoatCounter on Railway

GoatCounter is an open source, privacy-friendly, web analytics platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/39H_-2)

## About

## Overview
GoatCounter is an [open source](https://github.com/arp242/goatcounter) web analytics platform available as a free donation-supported hosted service or self-hosted app. It aims to offer easy to use and meaningful privacy-friendly web analytics as an alternative to Google Analytics or Matomo. More about [why it was made here](https://www.goatcounter.com/why).

## Configuration
There are two environment variables that require manual updates (the default values for the rest are sufficient):

```
SITE_USER_EMAIL=admin@email.com
SITE_USER_PASSWORD=password
```

The site user email and password are both required to setup the goatcounter inital user. The email used need not exist, it will simply be used as the username for the goatcounter user - no activation email will be sent for this user. Additional users can be added in-app after signing in as this initial user.

## Deploy
###  Service
In order to successfully build and deploy the service, the `Build Command` and `Start Command` in the services' `General` settings need to be updated.
The value for the `Build Command` should be set to:

```bash
go build ./cmd/goatcounter
```

The value for the `Start Command` should be set to:

```bash
./goatcounter db create site -vhost ${HOST_DOMAIN} -user.email ${SITE_USER_EMAIL} -user.password ${SITE_USER_PASSWORD} -db ${DATABASE} -createdb &amp;&amp; ./goatcounter serve -db ${DATABASE} -listen 0.0.0.0:${PORT} -tls http
```

**Note**: The `Start Command` above is only valid for the first time the service is deployed - it will create the database entries for the site and initial user.
After the service has successfully deployed for the first time. This `Start Command` will need to be updated to remove the `./goatcounter db create site` command.
So for subsequent deploys to be successful, it should be updated ot the following:

```bash
./goatcounter serve -db ${DATABASE} -listen 0.0.0.0:${PORT} -tls http
```

Failing to do so will result in the following deployment error:

```
goatcounter: there is already a site for the host ""
```

### Website
Sending metrics to your new goatcounter requires adding a `

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| goatcounter | [arp242/goatcounter](https://github.com/arp242/goatcounter) (root: cmd/goatcounter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE` | goatcounter | - | Database connection url, defaults to the railway postgres database |
| `CGO_ENABLED` | goatcounter | 0 | Compiler flag, no need to update this |
| `HOST_DOMAIN` | goatcounter | - | The url for the goatcounter host (a custom domain e.g stats.example.com, or the railway service domain) |
| `SITE_USER_EMAIL` | goatcounter | admin@example.com | Email to be used for the first goatcounter user |
| `SITE_USER_PASSWORD` | goatcounter | (secret) | Password to be used for the first goatcounter user |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./goatcounter db create site -vhost ${HOST_DOMAIN} -user.email ${SITE_USER_EMAIL} -user.password ${SITE_USER_PASSWORD} -db ${DATABASE} -createdb && ./goatcounter serve -db ${DATABASE} -listen 0.0.0.0:${PORT} -tls http`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Go, JavaScript, CSS, HTML, Shell, PLpgSQL

[View on Railway →](https://railway.com/template/39H_-2)
