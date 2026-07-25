# Deploy Label Studio — Open Source Data Labeling [Postgres] on Railway

Self-host Label Studio — label images, text, audio, video

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/label-studio-data-labeling-postgres)

## About

Label Studio is the leading open-source data labeling platform — a self-hosted alternative to Scale AI and Labelbox for annotating images, text, audio, video, and time-series data. Build training datasets for computer vision, NLP, speech, and LLM fine-tuning, all on infrastructure you own with no per-annotation fees. This template deploys Label Studio with a managed PostgreSQL database and the Railway-specific configuration that trips most self-hosted deployments already handled.

---

Label Studio is a Django application, and two things about hosting it on Railway cause most failed deployments — both handled here.

**It does not use `DATABASE_URL`.** Label Studio connects to PostgreSQL through six separate variables — `DJANGO_DB`, `POSTGRE_NAME`, `POSTGRE_USER`, `POSTGRE_PASSWORD`, `POSTGRE_HOST`, `POSTGRE_PORT` — not a single connection string. Templates built around `DATABASE_URL` silently fall back to SQLite, which loses data on redeploy. This template maps Railway's Postgres reference variables to the correct `POSTGRE_*` names.

**Do not use the `--init -db postgresql` start command.** Label Studio's own docs suggest it, but on a fresh remote database it throws a Django migration error (`NodeNotFoundError`). The fix is to run the bare `label-studio` command and let the entrypoint's migration script apply the schema on first boot. This template uses the correct startup, so migrations run cleanly.

The third requirement is CSRF. As a Django app behind Railway's proxy, Label Studio needs `LABEL_STUDIO_HOST` and `CSRF_TRUSTED_ORIGINS` set to your Railway domain, or login and form submissions fail with a CSRF error even though the page loads.

First boot runs migrations and can briefly spike RAM. Budget more than the 512 MB Starter tier if you'll import large image or audio datasets.

Typical cost: **~$5–10/month** on Railway for Label Studio and Postgres. Scale AI and Labelbox charge per labeled item or per seat; the Community Edition is Apache-2.0 with neither.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Label-Studio | `heartexlabs/label-studio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DJANGO_DB` | Label-Studio | default | - |
| `SECRET_KEY` | Label-Studio | (secret) | - |
| `POSTGRE_USER` | Label-Studio | (secret) | - |
| `POSTGRE_PASSWORD` | Label-Studio | (secret) | - |
| `SSRF_PROTECTION_ENABLED` | Label-Studio | true | - |
| `LABEL_STUDIO_BASE_DATA_DIR` | Label-Studio | /label-studio/data | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/label-studio/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/label-studio-data-labeling-postgres)
