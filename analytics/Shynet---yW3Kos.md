# Deploy Shynet on Railway

Modern, privacy-friendly web analytics that works without cookies or JS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yW3Kos)

## About

## Instructions

1. Click the Deploy template button above.
2. Leave the `ADMIN_EMAIL` variable empty. (In order to apply the provision and the migrations of the DB)
3. Wait for the first deployement to succeed.
4. Add to the Shynet service the environment variable `ADMIN_EMAIL` with your email address.
5. A new deployment will be triggered, make sure to check out the "Deploy Logs" and see the password for the admin user in the logs.

[![Video tutorial](https://i3.ytimg.com/vi/q5i-b6VMTDY/maxresdefault.jpg)](https://www.youtube.com/watch?v=q5i-b6VMTDY)


## Overview

Shynet is a privacy-friendly, cookie-free web analytics tool. It's open source and self-hosted, allowing you to retain ownership of your data. Shynet provides valuable visitor information such as page views, sessions, load times, bounce rates, referrers, locations, and device types. It supports multiple users and sites, and offers collaboration features. While ideal for personal projects and small to medium-sized websites, Shynet may not be suitable for ultra-high traffic sites and requires technical expertise to deploy and maintain.

## Highlights

- **Privacy-Friendly**: Shynet is designed to prioritize user privacy and does not require the use of cookies or collect excessive personal data.
- **Self-Hosted**: You have full control over your data as Shynet can be hosted on your own server.
- **Lightweight Tracking**: Shynet's tracking script is lightweight and falls back to a transparent pixel if JavaScript is unavailable.
- **Multiple Users and Sites**: You can track multiple websites and have multiple users on a single Shynet instance.
- **Metrics**: Shynet provides various metrics including hits, sessions, page load time, bounce rate, duration, referrers, locations, operating systems, browsers, geographic location, network, and device type.
- **Flexible Deployment**: Shynet can run on a single machine or across a large Kubernetes cluster, making it scalable for different traffic levels.
- **Collaboration**: Administrators can easily share services with other users, allowing for collaborative data analysis.
- **Account Management**: Shynet includes a comprehensive account management workflow powered by Django Allauth.
- **Do Not Track (DNT) Support**: Shynet allows you to specify whether to collect data from users with DNT enabled.
- **Extensibility**: Shynet is built using Django, making it customizable and extendable.
- **Helpful Interface**: Shynet offers a user-friendly interface for easily accessing and interpreting analytics data.

## Learn More

- [Shynet repo](https://github.com/milesmcc/shynet)
- [Template repo](https://github.com/MatteoGauthier/shynet-railway)
- [@MatteoGauthier_ Twitter](https://twitter.com/MatteoGauthier_)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shynet | [railwayapp-templates/shynet](https://github.com/railwayapp-templates/shynet) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | shynet | 8080 | The port that Shynet should bind to. |
| `TIME_ZONE` | shynet | America/New_York | The timezone of the admin panel. Affects how dates are displayed. IANA's tz value (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |
| `ADMIN_EMAIL` | shynet | - | The email address of the admin user (set it after one deployment succeed) |
| `LOCATION_URL` | shynet | https://www.openstreetmap.org/?mlat=$LATITUDE&mlon=$LONGITUDE | Custom location url to link to in frontend. |
| `ALLOWED_HOSTS` | shynet | - | Set these to your deployment's domain, can be comma separated |
| `BLOCK_ALL_IPS` | shynet | False | Should Shynet block collection of IP addresses globally? |
| `LANGUAGE_CODE` | shynet | en-us | Localization (Django i18n) |
| `SCRIPT_USE_HTTPS` | shynet | True | Set to "False" if you will not be serving content over HTTPS |
| `DJANGO_SECRET_KEY` | shynet | (secret) | General Django settings - to generate run: python3 -c "import secrets; print(secrets.token_urlsafe())" |
| `DASHBOARD_PAGE_SIZE` | shynet | 5 | How many services should be displayed on dashboard page? Set to big number if you don't want pagination at all. |
| `SHOW_SHYNET_VERSION` | shynet | True | - |
| `CSRF_TRUSTED_ORIGINS` | shynet | - | Deployments URL (requires a scheme (e.g., `https://`)) |
| `ONLY_SUPERUSERS_CREATE` | shynet | True | - |
| `SESSION_MEMORY_TIMEOUT` | shynet | 1800 | How much time can elapse between requests from the same user before a new session is created, in seconds? |
| `SHOW_THIRD_PARTY_ICONS` | shynet | True | Should Shynet show third-party icons in the dashboard? |
| `ACCOUNT_SIGNUPS_ENABLED` | shynet | False | Set to True (capitalized) if you want people to be able to sign up for your Shynet instance (not recommended) |
| `AGGRESSIVE_HASH_SALTING` | shynet | True | Should Shynet include the date and site ID when hashing users? This will prevent any possibility of cross-site tracking provided that IP collection is also disabled, and external keys (primary keys) aren't supplied. It will also prevent sessions from spanning one day to another. |
| `ACCOUNT_EMAIL_VERIFICATION` | shynet | none | Should user email addresses be verified? Only set this to `required` if you've setup the email settings and allow public sign-ups; otherwise, it's unnecessary. |
| `SCRIPT_HEARTBEAT_FREQUENCY` | shynet | 5000 | How frequently should the monitoring script "phone home" (in ms)? |
| `USE_RELATIVE_MAX_IN_BAR_VISUALIZATION` | shynet | True | Should background bars be scaled to full width? |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/yW3Kos)
