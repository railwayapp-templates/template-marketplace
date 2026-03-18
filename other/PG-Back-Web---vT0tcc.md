# Deploy PG Back Web on Railway

Effortless PostgreSQL backups with a user-friendly web interface!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vT0tcc)

## About

[PG Back Web](https://github.com/eduardolat/pgbackweb) isn't just another backup tool. It's your trusted ally in ensuring the security and availability of your PostgreSQL data:

- 🎯 **Designed for everyone**: From individual developers to teams.
- ⏱️ **Save time**: Automate your backups and forget about manual tasks.
- ⚡ **Plug and play**: Don't waste time with complex configurations.

## Features
- 📦 **Intuitive web interface**: Manage your backups with ease, no database expertise required.
- 📅 **Scheduled backups**: Set it and forget it. PG Back Web takes care of the rest.
- 📈 **Backup monitoring**: Visualize the status of your backups with execution logs.
- 📤 **Instant download &amp; restore**: Restore and download your backups when you need them, directly from the web interface.
- 🖥 **Multi-version support**: Compatible with PostgreSQL 13, 14, 15, and 16.
- 📁 **Local &amp; S3 storage**: Store backups locally or add as many S3 buckets as you want for greater flexibility.
- ❤️‍🩹 **Health checks**: Automatically check the health of your databases and destinations.
- 🔔 **Webhooks**: Get notified when a backup finishes, failed, health check fails, or other events.
- 🔒 **Security first**: PGP encryption to protect your sensitive information.
- 🛡️ **Open-source trust**: Open-source code under MIT license, backed by the robust pg_dump tool.
- 🌚 **Dark mode**: Because we all love dark mode.

## Screenshot

<img src="https://raw.githubusercontent.com/eduardolat/pgbackweb/main/screenshot.png">

## Join the Community
Got ideas to improve [PG Back Web](https://github.com/eduardolat/pgbackweb)? Contribute to the project! Every suggestion and pull request is welcome.

---

💖 **Love PG Back Web?** Give us a ⭐ on GitHub and share the project with your colleagues. Together, we can make PostgreSQL backups more accessible to everyone!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| PG Back Web | `eduardolat/pgbackweb:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | PG Back Web | 8085 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/backups`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vT0tcc)
