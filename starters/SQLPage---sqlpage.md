# Deploy SQLPage on Railway

Build web apps in SQL: bundled Postgres, pages in the DB, browser editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlpage)

## About

SQLPage turns plain SQL files into web applications: forms, tables, charts, maps and APIs, with no
front-end code. This template deploys SQLPage with its own PostgreSQL database, stores your pages in
that database, and adds a password-protected in-browser editor, so you can build and change an app
without rebuilding an image or redeploying. The admin password is generated for you.
Community-maintained; not affiliated with the SQLPage project; the icon is generic.

SQLPage is a single Rust binary. Here it runs behind a small Caddy front door in one container and
talks to a bundled PostgreSQL 16 over Railway's private network. Pages are rows in the
`sqlpage_files` table, so your app and its data live in one database on one volume. A starter
guestbook shows a form writing to PostgreSQL and reading it back; the editor at `/admin/` lists,
creates, edits and deletes pages, and a saved page is live within a second. Because a SQLPage page
can run any SQL, the editor is always behind the admin login (checked twice), writes must come from
the site itself, and by default the whole site is private until you set `SITE_ACCESS=public`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sqlpage | `ghcr.io/youssefsiam38/sqlpage-railway:1.0.0@sha256:a8c7bf3744495188430ce7953f7f4e32566cc28ea85c9a1ad944ba6e60c8c7a5` | Web service |
| db | `postgres:16.15@sha256:65b16a8b326e0cfbdf33fa7e783f2a0cb352a61448616ccccfd616ef42aa0f65` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sqlpage | 8080 | Port of the public front door (Caddy); the domain targets it. Keep 8080. |
| `SMTP_HOST` | sqlpage | - | Optional. SMTP host for sqlpage.send_mail. |
| `SITE_ACCESS` | sqlpage | private | private: every page needs the login. public: pages are open, only /admin/ needs the login. |
| `DATABASE_URL` | sqlpage | - | The bundled PostgreSQL on Railway's private network. Pages live in its sqlpage_files table. |
| `ADMIN_PASSWORD` | sqlpage | (secret) | Login password, generated. Copy it to sign in. At least 12 characters. |
| `ADMIN_USERNAME` | sqlpage | (secret) | Login user for the site and the /admin/ page editor. |
| `SQLPAGE_ENVIRONMENT` | sqlpage | production | production hides SQL errors from visitors; development shows them (handy while building). |
| `SQLPAGE_SITE_PREFIX` | sqlpage | - | Optional. Serve under a sub-path, e.g. /app/. |
| `SQLPAGE_MAX_UPLOADED_FILE_SIZE` | sqlpage | - | Optional. Maximum form/upload size in bytes (default 5 MiB). |
| `POSTGRES_DB` | db | sqlpage | PostgreSQL database. |
| `POSTGRES_USER` | db | (secret) | PostgreSQL user. |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/sqlpage)
