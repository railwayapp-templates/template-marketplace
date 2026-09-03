# Deploy Apache Answer on Railway

Question-and-answer site for building a community knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-answer-1)

## About

Apache Answer is an open-source question-and-answer platform from the Apache Software Foundation, written in Go with a React front end. It gives a community the Stack Overflow shape — questions, answers, accepted solutions, votes, tags, reputation and badges — plus the moderation queue and permission levels that keep a growing site readable. Teams run it as a public support forum, an internal knowledge base, or an open-source project's home.

Self-host Apache Answer on Railway and the template wires up the three pieces a real community needs. The **answer** service runs the application with a volume at `/data` for configuration, language bundles and uploads. A managed **Postgres** service stores every question, answer, vote and account. A **Mailpit** service provides SMTP privately plus a web inbox for the mail Apache Answer sends: activation links, password resets and reply notifications. The site then installs itself on first boot — no setup wizard, no manual database step, and no unconfigured mail server swallowing your first sign-ups.

![Diagram of the Apache Answer, Mailpit and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788361738/apache-answer-architecture.png)

Apache Answer is a single Go binary serving both the API and the compiled front end, which makes it unusually simple to host for a product this broad. It keeps relational data in PostgreSQL, MySQL or SQLite and uploads on disk. Self-hosting makes sense when the content is the point: a knowledge base indexed under your own domain, or one whose answers never leave your network.

Key features:

- Questions, answers, comments, accepted answers, and up and down votes
- Tags with descriptions and following, plus full-text search across posts
- Reputation, ranks, badges and privilege levels that unlock moderation abilities
- A review queue for flagged content, suspensions and per-role permissions
- Thirty-plus translations, plugins for social login and spam review, and a REST API

The services divide cleanly. **answer** is the only one facing the internet; its volume at `/data` holds the configuration file, language bundles, cache snapshot and every upload. **Postgres** is private, and **Mailpit** takes SMTP on port 1025 there while serving its inbox on a separate password-protected URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| answer | [gridalpha/apache-answer-railway](https://github.com/gridalpha/apache-answer-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `TZ` | mailpit | UTC | Container timezone |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Web inbox basic auth credentials |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listen address, private network |
| `TZ` | answer | UTC | Container timezone |
| `PORT` | answer | 8080 | HTTP port; also sets the listen address |
| `DB_HOST` | answer | - | Database host and port |
| `DB_NAME` | answer | - | Database name |
| `DB_TYPE` | answer | postgres | Database driver |
| `LANGUAGE` | answer | en_US | Interface language code |
| `SITE_URL` | answer | - | Public base URL |
| `LOG_LEVEL` | answer | INFO | Application log verbosity |
| `SITE_NAME` | answer | Apache Answer | Community name in header and mail |
| `SMTP_HOST` | answer | - | SMTP server hostname |
| `SMTP_PORT` | answer | 1025 | SMTP server port |
| `ADMIN_NAME` | answer | admin | First administrator display name |
| `ADMIN_EMAIL` | answer | admin@example.com | First administrator login address |
| `DB_PASSWORD` | answer | (secret) | Database password |
| `DB_USERNAME` | answer | (secret) | Database user |
| `AUTO_INSTALL` | answer | true | Run the headless installer on first boot |
| `CONTACT_EMAIL` | answer | admin@example.com | Published contact address |
| `ADMIN_PASSWORD` | answer | (secret) | First administrator password |
| `SMTP_FROM_NAME` | answer | Apache Answer | Sender display name |
| `SMTP_FROM_EMAIL` | answer | answer@example.com | Envelope sender address |
| `EXTERNAL_CONTENT_DISPLAY` | answer | always_display | Embedded media display policy |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/healthz`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-answer-1)
