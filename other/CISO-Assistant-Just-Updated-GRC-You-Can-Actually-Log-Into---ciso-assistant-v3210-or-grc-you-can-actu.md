# Deploy CISO Assistant | (Just Updated) GRC You Can Actually Log Into on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ciso-assistant-v3210-or-grc-you-can-actu)

## About

CISO Assistant is an open-source GRC platform: risk assessments and a risk
register, compliance audits against 150+ built-in frameworks (ISO 27001, NIS2,
SOC 2, CRA, GDPR, NIST CSF and more), applied controls, evidence, findings,
incidents and third-party assessments.

This template ships CISO Assistant 3.21.0 with the admin account already
created from a generated password, so the deploy is usable the moment it goes
green, and with the database, the attachments and the job queue on a persistent
volume.

Two services: the web app (SvelteKit UI plus an in-container nginx gateway) on a
public domain, and the Django API with its huey worker on private networking.
Upstream's reference deployment is five containers — a separate reverse proxy,
a separate worker, Postgres and Qdrant. The proxy and the worker are folded in
here, the app runs on SQLite (the backend selects it whenever no Postgres is
configured, which is upstream's supported single-instance mode), and Qdrant is
left out because it only backs the optional semantic-search feature. That is
two billed services instead of five for the same product.

Everything durable lives under one volume at `/code/db`: the SQLite database,
the huey queue, the generated Django secret key and every uploaded piece of
evidence.

The admin account is created during boot, before the API accepts its first
request, from the generated `DJANGO_SUPERUSER_PASSWORD`. Log in with that value
from the Variables tab. If you change it and redeploy, the password is reset to
the new value — upstream's own bootstrap only ever runs once and silently fails
afterwards. The backend refuses to start with an empty password rather than
publish an instance nobody can log in to; CISO Assistant has no sign-up page, so
that state has no way out.

Login requests are rate limited to 10 per minute per client address at the
gateway, keyed on the real client behind Railway's proxy. Upstream ships no
login throttle at all.

Both images are pinned to the 3.21.0 release. The backend applies Django
migrations forward on every start and never reverses them, so tracking `latest`
would make each redeploy an unrequested, one-way upgrade.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `ghcr.io/bon5co/ciso-assistant-railway-backend:3.21.0` | Database |
| web | `ghcr.io/bon5co/ciso-assistant-railway-frontend:3.21.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DJANGO_SECRET_KEY` | (secret) |
| `DJANGO_SUPERUSER_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/code/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/ciso-assistant-v3210-or-grc-you-can-actu)
