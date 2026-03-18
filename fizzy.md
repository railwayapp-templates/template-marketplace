# Deploy Fizzy + SQLite on Railway

Kanban as it should be. Not as it has been.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fizzy)

## About

The Kanban tracking tool for issues and ideas by 37signals.

Fizzy is a self-hosted Rails application that uses SQLite for data storage and Solid Queue for background job processing. Deploying on Railway requires
  configuring persistent storage for SQLite databases, setting up SMTP for passwordless authentication via magic links, and configuring environment variables
  for security. The application runs in a container with background job processing handled by Solid Queue inside the Puma web server. Once configured,
  Fizzy provides a collaborative kanban board system for teams to track cards, manage workflow columns, and organize work with automatic card postponement
  based on inactivity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fizzy | [basecamp/fizzy](https://github.com/basecamp/fizzy) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
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

[View on Railway →](https://railway.com/template/fizzy)
