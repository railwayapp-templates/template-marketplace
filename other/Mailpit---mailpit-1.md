# Deploy Mailpit on Railway

Lightweight SMTP server & email testing tool with web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mailpit-1)

## About

Mailpit is a lightweight email testing tool for development. It provides an SMTP server that captures outgoing messages and a simple web UI for viewing them. Use it to preview email content without sending anything to real inboxes.

Mailpit runs a small SMTP server and message viewer that fits well into development and staging workflows. Your application sends mail to Mailpit instead of a real provider, and messages appear instantly in the UI. Railway handles the deployment, networking, and storage so you can run Mailpit without maintaining infrastructure. This setup makes it easy to test notifications, templates, and email behavior across your app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mailpit | `axllent/mailpit` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MP_UI_AUTH` | - | Credentials for accessing the Mailpit web UI in username:password format. |
| `MP_DATABASE` | /data/mailpit.db | File path used by Mailpit to store messages. |
| `MP_SMTP_AUTH` | - | SMTP authentication credentials in `username:password` format. Enables SMTP auth when set. |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | true | Allows SMTP auth without TLS. If disabled, SMTP TLS certificates are required. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1025
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mailpit-1)
