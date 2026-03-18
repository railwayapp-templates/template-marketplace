# Deploy Maildev on Railway

Ephemeral SMTP server for development purposes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/maildev)

## About

Maildev is a simple email testing tool for developers. It allows you to easily capture and view emails sent from your applications during development, without the need for a real SMTP server. With Maildev, you can inspect email content, headers, and attachments in a user-friendly web interface.

Hosting Maildev involves deploying the application on a server, configuring the SMTP settings, and ensuring secure access for your development teams. With Railway, you can easily deploy Maildev without worrying about the underlying infrastructure, allowing you to focus on testing your email functionality.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Maildev | `maildev/maildev` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1234 | The Web UI access port. |
| `SMTP_HOST` | - | The host to send mail to. |
| `SMTP_PORT` | - | The port to send mail to. |
| `MAILDEV_WEB_PASS` | - | The password to login to the Web UI with. |
| `MAILDEV_WEB_PORT` | - | The Web UI access port. |
| `MAILDEV_WEB_USER` | (secret) | The user to login to the Web UI with. |
| `MAILDEV_SMTP_PORT` | 25 | The port to receive mail on. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/template/maildev)
