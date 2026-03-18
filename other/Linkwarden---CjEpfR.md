# Deploy Linkwarden on Railway

Open-source collaborative bookmark manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/CjEpfR)

## About

<p align="center">
    <a href="https://linkwarden.app/">
        <img alt="linkwarden logo" src="https://github.com/linkwarden/linkwarden/blob/79a7605ed9803ea33476819df3a3645959d03fc3/public/linkwarden_dark.png?raw=true" style="width: 500px;">
    </a>
</p>

<h3 align="center">Open-source collaborative bookmark manager</h3>

<p align="center">Self-hosted collaborative bookmark manager to collect, organize, and preserve webpages and articles</p>

**Notes:**

- Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (5432) the TCP proxy can be again removed at any point to close off external access. **A redeploy is needed after adding the TCP proxy.**

The objective is to organize useful webpages and articles you find across the web in one place, and since useful webpages can go away (see the inevitability of Link Rot), Linkwarden also saves a copy of each webpage as a Screenshot and PDF, ensuring accessibility even if the original content is no longer available.

Additionally, Linkwarden is designed with collaboration in mind, sharing links with the public and/or allowing multiple users to work together seamlessly.

<img src="https://github.com/linkwarden/linkwarden/raw/main/assets/dashboard.png">

## Features

- 📸 Auto capture a screenshot, PDF, and readable view of each webpage.
- 🏛️ Send your webpage to Wayback Machine ([archive.org](https://archive.org)) for a snapshot. (Optional)
- 📂 Organize links by collection, sub-collection, name, description and multiple tags.
- 👥 Collaborate on gathering links in a collection.
- 🎛️ Customize the permissions of each member.
- 🌐 Share your collected links and preserved formats with the world.
- 📌 Pin your favorite links to dashboard.
- 🔍 Full text search, filter and sort for easy retrieval.
- 📱 Responsive design and supports most modern browsers.
- 🌓 Dark/Light mode support.
- 🧩 Browser extension, managed by the community. [Star it here!](https://github.com/linkwarden/browser-extension)
- ⬇️ Import and export your bookmarks.
- 🔐 SSO integration. (Enterprise and Self-hosted users only)
- 📦 Installable Progressive Web App (PWA).
- 🍎 iOS Shortcut to save links to Linkwarden.
- 🔑 API keys.
- ✅ Bulk actions.
- ✨ And so many more features!

## Docs

For information on how to get started or to set up your own instance, please visit the [documentation](https://docs.linkwarden.app).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16` | Database |
| Linkwarden | `ghcr.io/linkwarden/linkwarden:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | postgres | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PG_PRIVATE_PORT` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `DATABASE_URL` | Linkwarden | - | Private database URL |
| `NEXTAUTH_URL` | Linkwarden | - | Nextauth URL |
| `NEXTAUTH_SECRET` | Linkwarden | (secret) | Next secret |
| `NEXT_PUBLIC_DISABLE_REGISTRATION` | Linkwarden | 0 | Enable public registrations, set to `1` to disable |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/auth/session`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/CjEpfR)
