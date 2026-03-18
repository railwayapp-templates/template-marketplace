# Deploy Aptabase on Railway

Open Source, Privacy-First Simple Analytics for Mobile, Desktop, and Web

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/6MbF4W)

## About

<p align="center">
    <a href="https://aptabase.com/">
        <img alt="Aptabase logo" src="https://res.cloudinary.com/h5kvzw/image/upload/v1712942914/Aptabase_Logo_eampt1.svg" style="border-radius: 5px; width: 200px;">
    </a>
</p>

<h3 align="center">Aptabase</h3>

<p align="center">Open Source, Privacy-First and Simple Analytics for Mobile, Desktop and Web Apps</p>

**Notes:**

- Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (5432) the TCP proxy can be again removed at any point to close off external access.

- Communication to Clickhouse is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to generate a domain, the domain can be again removed at any point to close off external access.

### Overview

[Aptabase](https://aptabase.com) is an open-source alternative to Firebase/Google Analytics, specifically built for Mobile, Desktop and Web apps.

**Extensive list of SDK**: No matter what framework or language you use, we have an SDK for you. Swift, React Native, Flutter, Electron, Kotlin, and many others.

**Privacy-First**: We prioritize user privacy and collect minimal usage data without using unique identifiers. Instead, we focus on monitoring sessions, complying fully with GDPR, CCPA, and PECR regulations.

**Simple**: Built-in and user-friendly dashboard for all your essential metrics, enabling you to gain insights effortlessly and grasp the dynamics of your apps.

**Open-Source**: Our source code is 100% open source. There is nothing hidden. All the server code and SDKs are available for you to inspect and contribute to.

<img alt="sample aptabase dashboard screenshot" src="https://raw.githubusercontent.com/aptabase/aptabase-com/main/src/assets/hero.png" style="border-radius: 5px;">

### SDKs

Aptabase provides SDKs for the most popular frameworks and languages to make it easier to integrate them into your app.

- [Swift (Apple)](https://github.com/aptabase/aptabase-swift)
- [Android (Kotlin)](https://github.com/aptabase/aptabase-kotlin)
- [React Native](https://github.com/aptabase/aptabase-react-native)
- [Flutter](https://github.com/aptabase/aptabase_flutter)
- [Tauri](https://github.com/aptabase/tauri-plugin-aptabase)
- [NativeScript](https://github.com/nstudio/nativescript-plugins/tree/main/packages/nativescript-aptabase)
- [.NET MAUI](https://github.com/aptabase/aptabase-maui)
- [Electron](https://github.com/aptabase/aptabase-electron)
- [Web Apps](https://github.com/aptabase/aptabase-js)
- [Unreal Engine](https://github.com/aptabase/aptabase-unreal)
- [Unity Engine](https://github.com/aptabase/aptabase-unity)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:23.8.4.69-alpine` | Database |
| Postgres | `postgres:15-alpine` | Database |
| Aptabase | `ghcr.io/aptabase/aptabase:main` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ClickHouse | 8123 | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `POSTGRES_DB` | Postgres | postgres | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PG_PRIVATE_PORT` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `BASE_URL` | Aptabase | - | The base URL of the application, used for generating links |
| `SMTP_HOST` | Aptabase | - | The host of the SMTP server |
| `SMTP_PORT` | Aptabase | - | **Most likely 465** - The SSL port used for sending emails via SMTP  |
| `AUTH_SECRET` | Aptabase | (secret) | A random secret key used for signing auth tokens |
| `DATABASE_URL` | Aptabase | - | The full connection string to postgres using .NET format |
| `SMTP_PASSWORD` | Aptabase | (secret) | The password for the SMTP server |
| `SMTP_USERNAME` | Aptabase | (secret) | The username for the SMTP server |
| `CLICKHOUSE_URL` | Aptabase | - | The full connection string to ClickHouse using .NET format |
| `SMTP_FROM_ADDRESS` | Aptabase | - | Address to send the email from |

## Configuration

- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh postgres --port=${PG_PRIVATE_PORT}"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 3; exec dotnet Aptabase.dll"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/6MbF4W)
