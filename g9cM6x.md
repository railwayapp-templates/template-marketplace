# Deploy Astuto on Railway

A free, open source, self-hosted customer feedback tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/g9cM6x)

## About

<p align="center">
    <a href="https://astuto.io/">
        <img style="background: #F9F9F9; padding: 30px; border-radius: 5px; width: 500px;" src="https://github.com/astuto/astuto/raw/main/images/logo-and-name.png" alt="astuto logo">
    </a>
</p>

<h3 align="center">A free, open source, self-hosted customer feedback tool</h3><br>

## What is Astuto?

Astuto is an open source customer feedback tool. It helps you collect, manage and prioritize feedback from your customers, so you can build a better product.

### Understand your customers and build a better product

Astuto helps you collect and organize feedback from your users, so you can focus on building what matters.

<a href="https://feedback.astuto.io/">
  <img src="https://astuto.io/assets/hero-image-57722a8e.png">
</a>

## How it works

### 1. Collect

Gather ideas and suggestions from your customers.

<img src="https://astuto.io/assets/feedback-cycle-1-943575f3.png" style="width: 600px; border-radius: 5px;">

### 2. Analyze

Organize and analyze feedback to decide what to build next.

<img src="https://astuto.io/assets/feedback-cycle-2-d549d5a9.png" style="width: 600px; border-radius: 5px;">

### 3. Share

Keep customers in the loop and let them know what you're working on.

<img src="https://astuto.io/assets/feedback-cycle-3-79abecd9.png" style="width: 600px; border-radius: 5px;">

# Features

- **Feedback:** Collect feedback. Organize feedback with custom boards and statuses.

- **Roadmap:** Show your customers what you're working on.

- **Simple Sign In:** Sign in with email or any custom OAuth provider (Google, Facebook, etc).

- **Brand:** Represent your brand with complete customization of style and appearance.

- **Languages:** English, Spanish, French, German, Italian, Chinese and [more](https://crowdin.com/project/astuto).

- **Notify:** Notify interested customers via email on updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:14.5` | Database |
| Astuto | `riggraz/astuto:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | postgres | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PG_PRIVATE_PORT` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | Astuto | 3000 | The port that Astuto runs on internally |
| `BASE_URL` | Astuto | - | The public service or customer domain |
| `NODE_ENV` | Astuto | - | Set environment to production |
| `RAILS_ENV` | Astuto | - | Set environment to production |
| `ENVIRONMENT` | Astuto | production | Set environment to production |
| `POSTGRES_HOST` | Astuto | - | Postgres private hostname |
| `POSTGRES_PORT` | Astuto | - | Postgres private port |
| `POSTGRES_USER` | Astuto | (secret) | Postgres username |
| `EMAIL_MAIL_FROM` | Astuto | - | Email from address |
| `EMAIL_SMTP_HOST` | Astuto | - | SMTP host |
| `EMAIL_SMTP_PASS` | Astuto | - | SMTP password |
| `EMAIL_SMTP_PORT` | Astuto | - | SMTP port |
| `EMAIL_SMTP_USER` | Astuto | (secret) | SMTP username |
| `SECRET_KEY_BASE` | Astuto | (secret) | Secret key |
| `POSTGRES_PASSWORD` | Astuto | (secret) | Postgres password |
| `RAILS_LOG_TO_STDOUT` | Astuto | 1 | Enable logging to stdout |
| `EMAIL_DELIVERY_METHOD` | Astuto | smtp | enable SMTP email |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/users/sign_in`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/astuto/storage`

**Category:** Other

[View on Railway →](https://railway.com/template/g9cM6x)
