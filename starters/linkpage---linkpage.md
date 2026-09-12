# Deploy linkpage on Railway

FOSS self-hosted link-in-bio page — Linktree alternative with analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkpage)

## About

[LinkPage](https://github.com/rhnvrm/linkpage) is a FOSS self-hosted link-in-bio page — a lightweight alternative to Linktree and Campsite.bio. It offers an editorial design, click analytics, OpenGraph metadata fetching, and a Basic Auth admin panel, backed by SQLite.

**One-click deploy:** https://railway.com/deploy/linkpage

This template runs the public Docker image `rhnvrm/linkpage:v0.5.0` with a persistent volume at `/data` for the SQLite database. On start, Railway writes `config.toml` from environment variables (admin credentials, page title/intro, optional social links) and launches the server on port 8000. Generate a public domain, open the home page, then manage links at `/admin` with your admin username and password. Schema migrates automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linkpage | `rhnvrm/linkpage:v0.5.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LINKPAGE_ADMIN_PASSWORD` | (secret) |
| `LINKPAGE_ADMIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data && cat > /data/config.toml <<EOF
http_address="0.0.0.0:8000"
read_timeout="10s"
write_timeout="10s"
dbfile="/data/app.db"
page_logo_url="/static/app/img/logos/logo-icon-only.png"
page_title="${PAGE_TITLE}"
page_intro="${PAGE_INTRO}"
static_files="static/custom"

[auth]
username="${LINKPAGE_ADMIN_USERNAME}"
password="${LINKPAGE_ADMIN_PASSWORD}"

[social]
github = "${SOCIAL_GITHUB}"
twitter = "${SOCIAL_TWITTER}"
linkedin = "${SOCIAL_LINKEDIN}"
instagram = "${SOCIAL_INSTAGRAM}"
youtube = "${SOCIAL_YOUTUBE}"
facebook = "${SOCIAL_FACEBOOK}"
EOF
exec ./linkpage --config /data/config.toml' `
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/linkpage)
