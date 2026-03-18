# Deploy Fider on Railway

Open platform to collect and prioritize feedback

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/21E4xW)

## About

<p align="center">
  <img src="https://raw.githubusercontent.com/getfider/fider/main/etc/logo.png" style="height:150px;">
  </p><div align="center">
    <strong>Fider is a feedback portal for feature requests and suggestions.</strong>
  </div>
  <div align="center">Give your customers a voice and let them tell you what they need. Spend less time guessing and more time building the right product.</div>
<p></p>

<img style="border-radius: 5px;" src="https://raw.githubusercontent.com/getfider/fider/main/etc/homepage.png" alt="sample fider dashboard screenshot">

## Highlights

- **Share ideas, vote and discuss:** Give voice to your community, get valuable suggestions and prioritize what they need the most.
- **Keep everyone informed:** Whenever you start, complete or decline a suggestion, Fider will notify everyone that subscribed to that topic.
- **Your Brand:** Use custom CSS feature to style Fider the way you want. Your logo, your colors, your identity.
- **Integrations:** Fider can integrate with any system that supports Webhook, such as Slack and Discord.
- **Markdown:** Style your text with the popular Markdown markup language.
- **Multi-language:** We speak your language! Fider is translated in 10+ languages, such as English, Spanish, German, French and Portuguese!
- **Organize your content:** Tag your content to make it easier to find, group and decide. Tags can be either Public or Private.
- **Open Source:** Fider is 100% Open Source.

## Learn More

- [Fider](https://fider.io/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:12` | Database |
| Fider | `getfider/fider:main` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |
| `BASE_URL` | Fider | - | Public Host Name |
| `JWT_SECRET` | Fider | (secret) | A secret key used to encrypt JWT tokens. |
| `DATABASE_URL` | Fider | - | Private database URL |
| `EMAIL_NOREPLY` | Fider | - | Set this variable to a no-reply address associated to your instance. |
| `EMAIL_SMTP_HOST` | Fider | - | SMTP host |
| `EMAIL_SMTP_PORT` | Fider | - | SMTP port |
| `EMAIL_SMTP_PASSWORD` | Fider | (secret) | SMTP password |
| `EMAIL_SMTP_USERNAME` | Fider | (secret) | SMTP username |
| `EMAIL_SMTP_ENABLE_STARTTLS` | Fider | true | Enable SMTP tls |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "echo 'Waiting for database...'; sleep 5; ./fider migrate && ./fider"`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/21E4xW)
