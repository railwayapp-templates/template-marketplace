# Deploy Cal.com on Railway

Deploy and Host Cal.com with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/calcom)

## About

Cal.com (formerly Calendso) is the open-source Calendly successor. Scheduling infrastructure for absolutely everyone. You are in charge of your own data, workflow, and appearance.

Calendly and other scheduling tools are awesome. They made our lives massively easier. We're using them for business meetings, seminars, yoga classes, and even calls with our families. However, most tools are very limited in terms of control and customization. That's where Cal.com comes in. Self-hosted or hosted by us. White-label by design. API-driven and ready to be deployed on your own domain. Full control of your events and data.

Cal.com runs as a Next.js application with a database backend, requiring calendar integration management, email notification systems, and webhook handling for appointment workflows. You'll need to manage OAuth credentials for calendar providers, configure SMTP settings for notifications, and handle timezone calculations across users.

![Cal.com Logo](https://user-images.githubusercontent.com/8019099/210054112-5955e812-a76e-4160-9ddd-58f2c72f1cce.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Cal.com Web App | `calcom/cal.com:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Cal.com Web App | 3000 | - |
| `NEXTAUTH_SECRET` | Cal.com Web App | (secret) | - |
| `MAX_OLD_SPACE_SIZE` | Cal.com Web App | 4096 | - |
| `ORGANIZATIONS_ENABLED` | Cal.com Web App | true | - |
| `GOOGLE_API_CREDENTIALS` | Cal.com Web App | (secret) | JSON formatted credentials. See https://github.com/calcom/cal.com#obtaining-the-google-api-credentials. When not using Google OAuth, these credentials can be set later via https://{yourcalcomurl}/settings/admin/apps/calendar. |
| `CALCOM_TELEMETRY_DISABLED` | Cal.com Web App | false | - |
| `NEXT_PUBLIC_LICENSE_CONSENT` | Cal.com Web App | agree | - |
| `NEXT_PUBLIC_SINGLE_ORG_SLUG` | Cal.com Web App | false | Set to true if you plan to only have 1 organization. |
| `NEXT_PUBLIC_WEBSITE_TERMS_URL` | Cal.com Web App | - | This is the location of your terms. Use your main domain if you do not have a dedicated terms URL yet. |
| `NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL` | Cal.com Web App | - | This is the location of your privacy policy. Use your main domain URL if you do not have a privacy policy URL yet. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/calcom)
