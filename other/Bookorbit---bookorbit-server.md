# Deploy Bookorbit on Railway

A private library for your ebooks, audiobooks, comics and PDFs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookorbit-server)

## About

BookOrbit is a self-hosted home for your ebooks, audiobooks, comics and PDFs. It scans folders of book files, enriches them with metadata from 14 online providers, and serves the results through a browser reader, an OPDS catalogue and two-way progress sync with Kobo e-readers and KOReader. It suits anyone with a collection spread across EPUB, MOBI, AZW3, PDF, CBZ and M4B files who wants one private place to read from any device. Deploy BookOrbit on Railway and it is live on an HTTPS URL in minutes, with the files on a volume you control.

Self-host BookOrbit here as two services. `bookorbit` runs the official `ghcr.io/bookorbit/bookorbit` image, built from the source repository `gridalpha/bookorbit-railway`, listens on port 3000, and serves the NestJS API and the Vue frontend from one origin — no separate web container, no CORS to configure. A Railway-managed `Postgres` service holds users, libraries, metadata, progress and annotations, on the private network only. One volume at `/data` holds the book files plus covers, the Book Dock and the conversion bucket. Only the app is reachable, over HTTPS at Railway's edge.

![BookOrbit and PostgreSQL services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787144407/bookorbit-architecture.png)

A personal ebook collection ends up scattered: files on a laptop, some sideloaded onto a Kobo, audiobooks elsewhere, no record of where you stopped. BookOrbit unifies that, keeping the collection off a vendor account while still following you between devices.

- Built-in readers for ebooks, PDFs, comics and audiobooks, with searchable highlights
- Two-way progress and highlight sync with Kobo and KOReader, with automatic KEPUB generation
- Metadata from 14 providers — Google Books, Open Library, Goodreads, Amazon, Kobo, Audible, ComicVine and more — with bulk editing and write-back into the files
- OPDS catalogue, Send-to-Kindle, drag-and-drop uploads and a Book Dock for staging files
- Multi-user libraries with OIDC/SSO login, reading stats, and sync out to Hardcover, Readwise and StoryGraph

The Railway architecture is small because the application is. `bookorbit` is one Node process running the API, the SPA, the WebSocket channel and its scheduled jobs together, so there is no worker tier. `Postgres` is the system of record for everything but the book files, and its migrations run on startup. The `/data` volume is the durable half — lose it and you lose the books.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bookorbit | [gridalpha/bookorbit-railway](https://github.com/gridalpha/bookorbit-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bookorbit | 3000 | HTTP server listening port |
| `APP_URL` | bookorbit | - | Public-facing app URL |
| `JWT_SECRET` | bookorbit | (secret) | Signs login tokens |
| `DATABASE_URL` | bookorbit | - | Postgres connection string |
| `SETUP_BOOTSTRAP_TOKEN` | bookorbit | (secret) | One-time first-admin setup token |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bookorbit-server)
