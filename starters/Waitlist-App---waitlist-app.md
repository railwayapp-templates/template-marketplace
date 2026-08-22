# Deploy Waitlist App on Railway

One click coming soon page. Collect emails, brand it, export CSV from admin

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waitlist-app)

## About

**Live demo:** [https://waitlist-app.up.railway.app/](https://waitlist-app.up.railway.app/)

This is a single Node app. It serves the signup page on your public URL, stores emails in SQLite on a volume at `/data`, and locks admin behind a password Railway generates for you. Change the brand name, headline, support line, button text, and accent color with variables. No code edits. No Postgres. No Redis. No third party APIs.

After deploy, open the URL and you are live. Admin lives at `/admin`. Export whenever you are ready to send those emails somewhere else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| waitlist-app | [pagetree/waitlist-app](https://github.com/pagetree/waitlist-app) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CTA_TEXT` | Join the list | Submit button label. |
| `DATA_DIR` | /data | SQLite directory. Must match the volume mount path. |
| `HEADLINE` | Something worth waiting for | One short line under the brand. |
| `SITE_NAME` | Waitlist | Brand name shown as the hero on the public page. |
| `ACCENT_COLOR` | - | Accent color for the CTA button (any CSS color). |
| `SUPPORT_TEXT` | Leave your email. Be first when we open the doors. | Supporting sentence under the headline. |
| `ADMIN_PASSWORD` | (secret) | Password for /admin. Generated automatically on deploy. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/waitlist-app)
