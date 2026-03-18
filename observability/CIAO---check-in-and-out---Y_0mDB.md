# Deploy CIAO - check in and out on Railway

Simple HTTP uptime monitor with email and webhook alerts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Y_0mDB)

## About

CIAO is an open-source HTTP monitoring tool that helps you track the status of websites and APIs. It alerts you via email or webhooks when an endpoint becomes unavailable or changes its status. Ideal for monitoring production, staging, or internal services.

🔗 GitHub: [brotandgames/ciao](https://github.com/brotandgames/ciao)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CIAO | `brotandgames/ciao:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port used by the application |
| `SMTP_SSL` | true | Enable SSL for SMTP connection |
| `SMTP_PORT` | 587 | SMTP server port |
| `TIME_ZONE` | UTC | Timezone for the application |
| `SMTP_DOMAIN` | smtp.yourhost.com | Domain name used in the SMTP HELO command |
| `SMTP_ADDRESS` | smtp.yourhost.com | SMTP server address for sending emails |
| `SMTP_EMAIL_TO` | you@yourhost.com | Recipient email address for test alerts |
| `SMTP_PASSWORD` | (secret) | SMTP login password |
| `SMTP_USERNAME` | (secret) | SMTP login username |
| `SECRET_KEY_BASE` | (secret) | A secret key used by Rails to verify the integrity of signed cookies and sessions. It should be a long, random, and secure string. |
| `SMTP_EMAIL_FROM` | ciao@yourhost.com | Sender email address for SMTP |
| `PROMETHEUS_ENABLED` | false | Enable Prometheus metrics endpoint |
| `BASIC_AUTH_PASSWORD` | (secret) | Password for basic HTTP authentication |
| `BASIC_AUTH_USERNAME` | (secret) | Username for basic HTTP authentication |
| `SMTP_AUTHENTICATION` | plain | SMTP authentication method |
| `SMTP_ENABLE_STARTTLS_AUTO` | true | Whether STARTTLS is automatically enabled for SMTP |
| `CIAO_WEBHOOK_PAYLOAD_SLACK` | {\"text\":\"[ciao] __name__: Status changed from __status_before__ to __status_after__\"} | Payload for Slack webhook |
| `CIAO_WEBHOOK_ENDPOINT_SLACK` | https://hooks.slack.com/services/<_REPLACE_VALUE_>/<_REPLACE_VALUE_>/<_REPLACE_VALUE_> | Webhook endpoint URL for Slack |
| `CIAO_WEBHOOK_PAYLOAD_DISCORD` | {\"content\":\"[ciao] __name__: Status changed from __status_before__ to __status_after__\"} | Payload for Discord webhook |
| `CIAO_WEBHOOK_ENDPOINT_DISCORD` | https://discord.com/api/webhooks/<_REPLACE_VALUE_>/<_REPLACE_VALUE_> | Webhook endpoint URL for Discord |
| `CIAO_WEBHOOK_PAYLOAD_TELEGRAM` | {\"chat_id\":\"@your_channel_or_user\",\"disable_web_page_preview\":true,\"text\":\"[__name__] Status changed from (__status_before__) to (__status_after__)\"} | Payload for Telegram webhook |
| `CIAO_WEBHOOK_ENDPOINT_TELEGRAM` | https://api.telegram.org/bot<_REPLACE_VALUE_>/sendMessage | Webhook endpoint URL for Telegram bot API |
| `PROMETHEUS_BASIC_AUTH_PASSWORD` | (secret) | Basic auth password for Prometheus metrics |
| `PROMETHEUS_BASIC_AUTH_USERNAME` | (secret) | Basic auth username for Prometheus metrics |
| `CIAO_WEBHOOK_PAYLOAD_OFFICE_365` | {\"@context\":\"https://schema.org/extensions\",\"@type\":\"MessageCard\",\"themeColor\":\"0072C6\",\"title\":\"MySystem (__name__) status change\",\"text\":\"Status changed from (__status_before__) to (__status_after__)\",\"potentialAction\":[{\"@type\":\"OpenUri\",\"name\":\"Learn More\",\"targets\":[{\"os\":\"default\",\"uri\":\"__check_url__\"}]}]} | Payload for Microsoft Teams webhook using Office 365 connector |
| `CIAO_WEBHOOK_ENDPOINT_OFFICE_365` | https://outlook.office.com/webhook/<_REPLACE_VALUE_>/IncomingWebhook/<_REPLACE_VALUE_>/<_REPLACE_VALUE_> | Webhook endpoint URL for Microsoft Teams (Office 365 connector) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/ciao/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/Y_0mDB)
