# Deploy Wallos Subscription Manager on Railway

Self-hosted subscription tracker with secure first run and persistent data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallos-subscription-manager)

## About

Wallos is an open-source, self-hosted subscription and recurring-expense tracker: see every subscription with its
logo, next payment date and cost, totals in your main currency, monthly budget, statistics and a calendar, and get
payment reminders by email, Telegram, Discord, ntfy, Gotify, Pushover or webhook. This template deploys it ready for
the internet: your admin account is created from the email you enter and a generated password before the app is
reachable, registration stays closed, and both the database and uploaded logos are kept on a volume. It is a
community-maintained template and is not affiliated with the Wallos project.

Wallos is a single PHP application with an embedded SQLite database, served by nginx and php-fpm, with a cron
daemon for daily jobs (rolling payment dates forward, exchange rates, notifications). Everything runs in one
container with one Railway volume at `/data`.

A stock Wallos on a public URL shows a "create the first account" page to whoever visits first, and that account
becomes the admin. Wallos also writes to two separate directories (database and uploaded logos), while Railway
gives a service one volume, so a naive deploy loses either the logos or the data on redeploy. This template creates
your admin account over loopback before the web server starts, then leaves Wallos's own registration switch off,
and links both data directories onto the single volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wallos | `ghcr.io/youssefsiam38/wallos-railway:1.0.1@sha256:7fde5d33cd2bf0a90ce0393fa7fde85b70a114b24f9579d061c337fd84244352` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone for Wallos's daily jobs (payment dates, notifications), e.g. Europe/Berlin. |
| `PORT` | 80 | Port Railway routes to and health-checks (Wallos's nginx listens on 80). Keep it. |
| `ADMIN_EMAIL` | - | Your email. The admin account is created with it on the first start (used for notifications and password resets). |
| `OIDC_ISSUER` | - | Optional. OIDC issuer URL. |
| `OIDC_ENABLED` | - | Optional. true enables OIDC single sign-on (set the other OIDC_* variables, see the Wallos README). |
| `ADMIN_CURRENCY` | USD | Main currency of the admin account, a code such as USD, EUR, GBP. Only used on the first start. |
| `ADMIN_LANGUAGE` | en | Language of the admin account, a Wallos language code such as en, de, fr, es, pt. Only used on the first start. |
| `ADMIN_PASSWORD` | (secret) | The admin's initial password, generated. Copy it to sign in; change it in Wallos (Profile) later. |
| `ADMIN_USERNAME` | (secret) | Login name of the admin account (letters, digits, . _ -). Only used on the first start. |
| `OIDC_CLIENT_ID` | - | Optional. OIDC client id. |
| `SSRF_ALLOWLIST` | - | Optional. Comma-separated private hosts Wallos may call (webhooks, OIDC); overrides the Admin setting. |
| `OIDC_REDIRECT_URL` | - | Optional. https://<your domain>/index.php |
| `OIDC_CLIENT_SECRET` | (secret) | Optional. OIDC client secret. |
| `OIDC_PROVIDER_NAME` | - | Optional. Name shown on the OIDC login button. |
| `OIDC_AUTO_CREATE_USER` | (secret) | Optional. true lets anyone who can sign in at your OIDC provider get a Wallos account. |

## Configuration

- **Healthcheck:** `/healthz/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wallos-subscription-manager)
