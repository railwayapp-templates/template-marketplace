# Deploy Todoist Sync on Railway

Integration between Google Calendar and Todoist.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/AP1rpk)

## About

An integration between Todoist and Google Calendar retrieves events for the next 7 days from Google Calendar and creates a synchronized copy on Todoist.

It is possible to synchronize multiple Google accounts with Todoist, and for each of them, the title, description, date, duration, and meeting links of the events are synchronized. Additionally, the email associated with the Google account is added as a label on the Todoist task.

Context: I primarily use Todoist to manage my daily tasks, but I'm required to use Google Calendar for work meetings. Having to use a second tool alongside Todoist isn't practical, and Todoist's default integration doesn't provide all the necessary information from Google Calendar: the meeting link and event description. That's why I created this integration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Todoist Sync | [Bluzzi/Todoist-GoogleCalendar](https://github.com/Bluzzi/Todoist-GoogleCalendar) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `CRON` | Todoist Sync | - | The CRON string, defaut to * * * * * (every minute) |
| `TODOIST_TOKEN` | Todoist Sync | (secret) | Your Todoist API token |
| `GOOGLE_CLIENT_ID` | Todoist Sync | - | Google OAuth 2.0 Client ID  |
| `GOOGLE_CLIENT_SECRET` | Todoist Sync | (secret) | Google OAuth 2.0 Client secret |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/AP1rpk)
