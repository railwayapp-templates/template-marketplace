# Deploy Fizzy on Railway

Deploy and Host Fizzy with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fizzy-2)

## About

Fizzy is a modern, open-source kanban board application built by 37signals (creators of Basecamp and HEY). Designed for tracking bugs, issues, ideas, and small projects, Fizzy offers a fast, vibrant, and bloat-free alternative to tools like Trello and Jira. It's self-hostable and emphasizes simplicity with features like auto-close for old cards, webhooks, and public boards.

Fizzy is built on Ruby on Rails with Hotwire (Turbo + Stimulus) for reactive server-rendered HTML, requiring minimal JavaScript overhead. Self-hosting Fizzy involves running the Rails application alongside PostgreSQL for persistent data storage and optionally Redis for caching and sessions. The application provides a Docker-based deployment workflow with a multi-stage Dockerfile, making containerized deployments straightforward. Configuration is managed through environment variables including database credentials, Redis URLs, and Rails secret keys. The lightweight architecture (~100MB Docker image) means Fizzy runs efficiently on modest hardware, making it ideal for individuals and small teams who want full control over their kanban data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fizzy | [basecamp/fizzy](https://github.com/basecamp/fizzy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Thruster port |
| `APP_HOST` | - | Your application domain |
| `S3_BUCKET` | - | S3 bucket name |
| `S3_REGION` | - | S3 region |
| `SMTP_PORT` | 587 | SMTP server port. Defaults to 587 |
| `S3_ENDPOINT` | - | S3 endpoint |
| `SMTP_DOMAIN` | - | Your verified domain for sending emails |
| `SMTP_ADDRESS` | - | Hostname of your SMTP server (e.g., smtp.mailgun.org, smtp.sendgrid.net) |
| `SMTP_PASSWORD` | (secret) | Password or API key for SMTP authentication |
| `SMTP_USERNAME` | (secret) | Username for SMTP authentication |
| `CSP_CONNECT_SRC` | storage.railway.app | CSP config to allow connections to Railway storage |
| `SECRET_KEY_BASE` | (secret) | 128-character hex string used to encrypt sessions and secure cookies |
| `S3_ACCESS_KEY_ID` | - | S3 access key ID |
| `VAPID_PUBLIC_KEY` | - | Public key for browser push notifications |
| `VAPID_PRIVATE_KEY` | - | Private key for browser push notifications |
| `MAILER_FROM_ADDRESS` | - | Email address shown as sender in outgoing emails |
| `S3_FORCE_PATH_STYLE` | true | This is required for Railway buckets |
| `SMTP_AUTHENTICATION` | plain | SMTP Authentication |
| `SOLID_QUEUE_IN_PUMA` | true | Set to true to run background job processing inside the web server. Required for sending emails and scheduled tasks |
| `S3_SECRET_ACCESS_KEY` | (secret) | S3 secret |
| `ACTIVE_STORAGE_SERVICE` | s3 | Select S3 as storage service |
| `SMTP_ENABLE_STARTTLS_AUTO` | true | Check if the server supports starttls |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other · **Languages:** Ruby, HTML, CSS, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/fizzy-2)
