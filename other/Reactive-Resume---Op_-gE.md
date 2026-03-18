# Deploy Reactive Resume on Railway

A free and open-source resume builder

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Op_-gE)

## About

<p align="center">
    <a href="https://rxresu.me/">
                <img style="height: 200px;" src="https://raw.githubusercontent.com/AmruthPillai/Reactive-Resume/1825fc3283ecde49bebeb461183c388e4c01c2a4/apps/client/public/logo/light.svg" alt="Reactive Resume Logo">
    </a>
</p>

<p align="center">A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.</p>

## Overview

Reactive Resume is a free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume. With zero user tracking or advertising, your privacy is a top priority. The platform is extremely user-friendly and can be self-hosted in less than 30 seconds if you wish to own your data completely.

It's available in multiple languages and comes packed with features such as real-time editing, dozens of templates, drag-and-drop customisation, and integration with OpenAI for enhancing your writing.

You can share a personalised link of your resume to potential employers, track its views or downloads, and customise your page layout by dragging-and-dropping sections. The platform also supports various font options and provides dozens of templates to choose from. And yes, there's even a dark mode for a more comfortable viewing experience.

Start creating your standout resume with Reactive Resume today!

<img style="border-radius: 5px;" src="https://raw.githubusercontent.com/AmruthPillai/Reactive-Resume/1825fc3283ecde49bebeb461183c388e4c01c2a4/apps/client/public/screenshots/builder.jpg" alt="resume builder screenshot">

## Features

- **Free, forever** and open-source
- No telemetry, user tracking or advertising
- You can self-host the application in less then 30 seconds
- **Available in multiple languages** ([help add/improve your language here](https://translate.rxresu.me/))
- Use your email address (or a throw-away address, no problem) to create an account
- You can also sign in with your GitHub or Google account, and even set up two-factor authentication for extra security
- Create as many resumes as you like under a single account, optimising each resume for every job application based on it’s description for a higher ATS score
- **Bring your own OpenAI API key** and unlock features such as improving your writing, fixing spelling and grammar or changing the tone of your text in one-click
- Translate your resume into any language using ChatGPT and import it back for easier editing
- Create single page resumes or a resume that spans multiple pages easily
- Customize the colours and layouts to add a personal touch to your resume.
- Customise your page layout as you like just by dragging-and-dropping sections
- Create custom sections that are specific to your industry if the existing ones don't fit
- Jot down personal notes specific to your resume that's only visible to you
- Lock a resume to prevent making any further edits (useful for master templates)
- **Dozens of templates** to choose from, ranging from professional to modern
- Design your resume using the standardised EuroPass design template
- Supports printing resumes in A4 or Letter page formats
- Design your resume with any font that's available on [Google Fonts](https://fonts.google.com/)
- **Share a personalised link of your resume** to companies or recruiters for them to get the latest updates
- You can track the number of views or downloads your public resume has received
- Built with state-of-the-art (at the moment) and dependable technologies that's battle tested and peer reviewed by the open-source community on GitHub
- **MIT License**, so do what you like with the code as long as you credit the original author
- And yes, there’s a dark mode too 🌓

## Built With

- React (Vite), for the frontend
- NestJS, for the backend
- Postgres (primary database)
- Prisma ORM, which frees you to switch to any other relational database with a few minor changes in the code
- KeyDB (for caching, session storage and resume statistics)
- Minio (for object storage: to store avatars, resume PDFs and previews)
- Browserless (for headless chrome, to print PDFs and generate previews)
- SMTP Server (to send password recovery emails)
- Sentry (for error tracing and performance monitoring)
- GitHub/Google OAuth (for quickly authenticating users)
- LinguiJS and Crowdin (for translation management and localization)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Bucket | `minio/minio:latest` | Database |
| Postgres | `postgres:15` | Database |
| KeyDB | `eqalpha/keydb:latest` | Database |
| Reactive Resume | `amruthpillai/reactive-resume:latest` | Web service |
| Browserless | [railwayapp-templates/browserless](https://github.com/railwayapp-templates/browserless) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Console | 9090 | The port the Console runs on internally |
| `PASSWORD` | Console | (secret) | The password to login to the Console |
| `USERNAME` | Console | (secret) | The username to login to the Console |
| `CONSOLE_MINIO_SERVER` | Console | - | The domain of the MinIO server |
| `PORT` | Bucket | - | The port the Bucket runs on internally |
| `MINIO_ROOT_USER` | Bucket | (secret) | Root MinIO user |
| `MINIO_PUBLIC_HOST` | Bucket | - | Public Bucket host |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | Public Bucket port |
| `MINIO_PRIVATE_HOST` | Bucket | - | Private Bucket host |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Private Bucket port |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | Root MinIO password |
| `MINIO_PUBLIC_ENDPOINT` | Bucket | - | Public Bucket endpoint |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Private Bucket endpoint |
| `POSTGRES_DB` | Postgres | postgres | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PG_PRIVATE_PORT` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `KEYDB_URL` | KeyDB | - | URL to connect to KeyDB Publically |
| `KEYDB_HOST` | KeyDB | - | Railway public TCP domain name |
| `KEYDB_PORT` | KeyDB | - | Port to connect to KeyDB Publically |
| `KEYDB_USER` | KeyDB | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | KeyDB | (secret) | Password to connect to KeyDB |
| `KEYDB_PRIVATE_URL` | KeyDB | - | URL to connect to KeyDB over the private network |
| `KEYDB_PRIVATE_HOST` | KeyDB | - | Railway private domain name |
| `KEYDB_PRIVATE_PORT` | KeyDB | 6379 | Port to connect to KeyDB over the private network |
| `PORT` | Reactive Resume | 3000 | The port that the service runs on internally |
| `NODE_ENV` | Reactive Resume | production | Run in production |
| `SMTP_URL` | Reactive Resume | - | Automatically assembled SMTP URL |
| `MAIL_FROM` | Reactive Resume | - | Mail from name and email |
| `REDIS_URL` | Reactive Resume | - | Private KeyDB URL |
| `SMTP_PORT` | Reactive Resume | - | TLS SMTP port, use `587` for most providers |
| `CHROME_URL` | Reactive Resume | - | Browserless endpoint |
| `PUBLIC_URL` | Reactive Resume | - | Public URL of the service |
| `STORAGE_URL` | Reactive Resume | - | Public URL for the MinIO bucket storage |
| `CHROME_TOKEN` | Reactive Resume | (secret) | Browserless access token |
| `DATABASE_URL` | Reactive Resume | - | Private database URL |
| `STORAGE_PORT` | Reactive Resume | - | Internal port for MinIO |
| `SMTP_HOSTNAME` | Reactive Resume | - | SMTP hostname |
| `SMTP_PASSWORD` | Reactive Resume | (secret) | SMTP password |
| `SMTP_USERNAME` | Reactive Resume | (secret) | SMTP username |
| `STORAGE_BUCKET` | Reactive Resume | uploads | Default bucket name |
| `STORAGE_ENDPOINT` | Reactive Resume | - | Internal MinIO endpoint |
| `DISABLE_EMAIL_AUTH` | Reactive Resume | false | Allow authentication via email |
| `STORAGE_ACCESS_KEY` | Reactive Resume | - | MinIO access key |
| `STORAGE_SECRET_KEY` | Reactive Resume | (secret) | MinIO secret key |
| `ACCESS_TOKEN_SECRET` | Reactive Resume | (secret) | Access token secret |
| `REFRESH_TOKEN_SECRET` | Reactive Resume | (secret) | Refresh token secret |
| `VITE_DISABLE_SIGNUPS` | Reactive Resume | false | Allow public signups |
| `TOKEN` | Browserless | (secret) | <a href="https://www.browserless.io/docs/docker#securing-your-instance">Securing your instance</a> |
| `KEEP_ALIVE` | Browserless | false | <a href="https://www.browserless.io/docs/docker#keeping-chrome-alive">Keeping Chrome Alive</a> |
| `ENABLE_CORS` | Browserless | true | <a href="https://www.browserless.io/docs/docker#enable-cors">Enable CORS</a> |
| `PREBOOT_CHROME` | Browserless | false | <a href="https://www.browserless.io/docs/docker#pre-booting-chrome">Pre-booting Chrome</a> |
| `MAX_QUEUE_LENGTH` | Browserless | 10 | <a href="https://www.browserless.io/docs/docker#max-queue-length">Max Queue Length</a> |
| `PREBOOT_QUANTITY` | Browserless | 0 | <a href="https://www.browserless.io/docs/docker#pre-boot-quantity">Pre-boot quantity</a> |
| `CONNECTION_TIMEOUT` | Browserless | 300000 | 5 Minutes - <a href="https://www.browserless.io/docs/docker#connection-timeout">Connection Timeout</a> |
| `BROWSER_PORT_PRIVATE` | Browserless | 3001 | Private Browserless port |
| `BROWSER_DOMAIN_PRIVATE` | Browserless | - | Private Browserless domain |
| `MAX_CONCURRENT_SESSIONS` | Browserless | 10 | <a href="https://www.browserless.io/docs/docker#max-concurrent-sessions">Max Concurrent Sessions</a> |

## Configuration

- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PRIVATE_PORT}"`
- **Healthcheck:** `/api/health`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/Op_-gE)
