# Deploy Joplin Server on Railway

Joplin Server — self-hosted sync backend for the Joplin note-taking apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/joplin-server-railway)

## About

Joplin Server is the official sync backend for [Joplin](https://joplinapp.org), the open-source note-taking app used to keep thousands of Markdown notes, web clippings and attachments in step across desktop, mobile and terminal. Joplin can sync through Dropbox, OneDrive or any WebDAV share, but only Joplin Server adds multi-user accounts, notebook sharing, published note links and an admin panel. Self-host Joplin Server and your notes stop passing through a third-party drive — they live in infrastructure you control, still end-to-end encrypted before they leave your device.

Deploy Joplin Server on Railway and you get the production shape rather than one container with a file on disk. Three pieces are wired together: the application, serving the sync API, sharing links and admin UI on a public HTTPS domain; a PostgreSQL database on the private network holding accounts, sessions and the change log clients read to work out what altered since they last connected; and an object storage bucket holding every note and attachment body. Keeping content out of the database lets a vault of images and PDFs grow without the database becoming the limit.

![Diagram of the Joplin Server and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788218486/joplin-server-architecture.png)

Joplin Server is a Node.js application speaking Joplin's sync protocol over HTTP. It is not a note editor: you keep the Joplin apps, and the server is where they meet. Teams reach for it when a shared drive stops being enough — several people need their own accounts, a notebook has to be shared rather than copied, or a note needs a revocable public link.

- Multi-user accounts with per-account storage and item-size limits
- Notebook sharing between users, and revocable published note links
- End-to-end encryption performed by the client, so the server stores ciphertext
- TOTP multi-factor authentication, with secrets encrypted at rest
- LDAP and SAML sign-in, plus an admin panel for users, items and scheduled tasks

The database and the bucket do different jobs and neither is optional. PostgreSQL stores users, sessions, share records and the ordered change log that makes incremental sync possible — a client asks "what changed after this cursor?" and the answer comes from there. The bucket stores note and attachment bodies keyed by item id, so storage grows independently of the database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| joplin-server | [gridalpha/joplin-server-railway](https://github.com/gridalpha/joplin-server-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | joplin-server | 8081 | Port Railway health-checks |
| `APP_PORT` | joplin-server | 22300 | Port the application listens on |
| `DB_CLIENT` | joplin-server | pg | Use PostgreSQL, not SQLite |
| `MFA_ENABLED` | joplin-server | 1 | Allow TOTP multi-factor authentication |
| `APP_BASE_URL` | joplin-server | - | Public URL clients sync against |
| `POSTGRES_HOST` | joplin-server | - | Private database hostname |
| `POSTGRES_PORT` | joplin-server | - | Database port |
| `POSTGRES_USER` | joplin-server | (secret) | Database user |
| `COOKIES_SECURE` | joplin-server | true | Mark the session cookie Secure |
| `SIGNUP_ENABLED` | joplin-server | false | Admins create accounts, not the public |
| `STORAGE_DRIVER` | joplin-server | - | Note content goes to object storage |
| `POSTGRES_DATABASE` | joplin-server | - | Database name |
| `POSTGRES_PASSWORD` | joplin-server | (secret) | Database password |
| `MFA_ENCRYPTION_KEY` | joplin-server | - | Encrypts stored TOTP secrets |
| `DEFAULT_ADMIN_PASSWORD` | joplin-server | (secret) | Password for admin@localhost |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/joplin-server-railway)
