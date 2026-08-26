# Deploy Mailpit on Railway

Catches the email your app sends and shows it in a web inbox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mailpit)

## About

Mailpit is an SMTP server that catches email instead of delivering it. Point any application at it — a Laravel app sending password resets, a Rails mailer, a Node service firing order confirmations — and every message lands in a fast web inbox rather than a real person's mailbox. Developers and QA teams use it to see exactly what their software sends: rendered HTML, plain text, raw MIME source, headers, attachments and links. It is a dependency-free Go binary and the maintained successor to MailHog, which it replaces port-for-port and API-for-API.

Self-host Mailpit on Railway and you get one service on the official `axllent/mailpit` image, already wired up. The web interface and REST API are published on a Railway domain behind HTTP basic authentication, so the inbox is not open to the internet. The SMTP listener stays on the private network at `mailpit.railway.internal:1025`, reachable only by other services in your project and only with a username and password. Captured mail goes to SQLite on a volume at `/data`, so the inbox survives redeploys.

![Diagram of the Mailpit service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787637825/mailpit-architecture.png)

Sending real email from staging is risky: test messages reach real inboxes, deliverability suffers, and reviewing what an app produced means logging into someone's mail account. Mailpit stands in as the mail server instead — everything your app sends is intercepted, stored and browsable, without a message leaving your infrastructure.

Key features:

- Web inbox with real-time updates, full-text search and tagging
- Rendered HTML, plain-text, header, raw source and attachment views per message
- **HTML Check** — scores markup and CSS against a client-support database, naming what degrades on Outlook, Gmail or iOS
- **Link Check** — follows every URL in a message and reports broken ones
- A REST API for automated tests, plus a send API for injecting messages
- POP3 access, and optional relaying to an upstream mail server

The architecture is deliberately simple. Mailpit is one Go binary with an embedded SQLite store, so there is no separate database, cache or worker — the single service holds the SMTP listener, the HTTP interface and storage. The only supporting resource is the volume at `/data`, holding `mailpit.db`. SQLite is single-writer, so this service runs at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8025 | Web interface and REST API port |
| `MP_UI_AUTH` | - | Basic auth for inbox, API, metrics |
| `MP_DATABASE` | /data/mailpit.db | SQLite message store on the volume |
| `MP_SMTP_AUTH` | - | Credentials every SMTP sender must present |
| `MP_MAX_MESSAGES` | 5000 | Messages retained before pruning oldest |
| `MP_ENABLE_PROMETHEUS` | true | Serve /metrics behind basic auth |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | true | Allow SMTP auth on the unencrypted private listener |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mailpit)
