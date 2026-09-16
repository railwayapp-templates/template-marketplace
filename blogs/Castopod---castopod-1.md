# Deploy Castopod on Railway

Self-hosted podcast hosting with Fediverse support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/castopod-1)

## About

- **Castopod service** — web front-end on port 8080, health at `/health`. The s6 `bootstrap` one-shot runs `php spark castopod:database-update` (migrations) and `php spark cache:clear` before `frankenphp` starts. `/app/public/media` must be writable by the pod — running as root (uid 0) with the root-owned volume is the pattern that works on Railway.
- **MariaDB service** — `:3306`, `CP_DATABASE_USERNAME`/`CP_DATABASE_PASSWORD` credentials are injected by the template (wired to the MariaDB service's `MYSQL_USER`/`MYSQL_PASSWORD`). The `mariadb` image's own entrypoint handles volume-owning (no wrapper needed).

**Volume sizing:** For a personal show, a 20 GB Railway volume is plenty. For a multi-year archive, size to your expected audio size (roughly 45 MB/min for a 64 kbps stereo mp3, so a 1-hour episode is about 90 MB).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:12.1` | Database |
| castopod | `castopod/castopod:1.15.5` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | mariadb | (secret) | Application DB user |
| `MYSQL_DATABASE` | mariadb | castopod | Database name for Castopod |
| `MYSQL_PASSWORD` | mariadb | (secret) | App DB user password — auto-generated. Castopod's CP_DATABASE_PASSWORD references this. |
| `MYSQL_ROOT_PASSWORD` | mariadb | (secret) | MySQL root password — auto-generated, separate from the app password. |
| `CP_BASEURL` | castopod | - | REQUIRED — the public URL of this service, ending with a trailing slash. Auto-filled from this service's public domain; override to use your own custom domain. The bootstrap fails without it. |
| `CP_EMAIL_FROM` | castopod | - | Optional — the From address for outgoing mail (e.g. noreply@your-podcast-domain.com). |
| `CP_ENABLE_2FA` | castopod | false | Enable TOTP two-factor authentication for logins. Leave false to skip 2FA. |
| `CP_DATABASE_NAME` | castopod | - | Automatically wired from the MariaDB companion service. |
| `CP_MEDIA_BASEURL` | castopod | - | Optional — a separate public domain for media delivery (e.g. an S3-backed domain or CDN). Leave empty to use CP_BASEURL (default — media served from the same domain as the app). |
| `CP_ANALYTICS_SALT` | castopod | - | REQUIRED — a random 64-character string used for analytics hashing. This placeholder auto-generates one for you. Do not reuse an existing salt. |
| `CP_EMAIL_SMTP_HOST` | castopod | - | Optional — SMTP host for outgoing mail. Leave empty if you don't need email (login, forgot-password). |
| `CP_DATABASE_HOSTNAME` | castopod | - | Automatically wired from the MariaDB companion service (private domain). If you see a literal service name here, check the companion mapping. |
| `CP_DATABASE_PASSWORD` | castopod | (secret) | Automatically wired from the MariaDB companion service. |
| `CP_DATABASE_USERNAME` | castopod | (secret) | Automatically wired from the MariaDB companion service. |
| `CP_EMAIL_SMTP_PASSWORD` | castopod | (secret) | Optional — SMTP password. |
| `CP_EMAIL_SMTP_USERNAME` | castopod | (secret) | Optional — SMTP username. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/media`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/castopod-1)
