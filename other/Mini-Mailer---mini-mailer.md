# Deploy Mini Mailer on Railway

Local SMTP to HTTP Proxy for Mailgun, Postmark, and MailerSend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mini-mailer)

## About

Mini Mailer is a simple SMTP server that forwards mail over HTTP to Mailgun, Postmark, or MailerSend. For use as an SMTP gateway to allow applications that use SMTP to send emails via an HTTP endpoint when outbound SMTP is restricted.

Mini Mailer does not currently support attachments and is designed to run on an internal network only (e.g. `mini-mailer.railway.internal`), as it does not use TLS.

Mini Mailer is a simple serverless application that creates an SMTP server on ports 25, 2525, and 587, and a HTTP server on port 80 used for health checks. The SMTP server listens for incoming SMTP connections and forwards the email to the HTTP endpoint.

Mini Mailer requires no configuration or dependencies and will automatically detect the email service provider based on the API token used.

To send emails, configure your application to send email with:
- Host: your Mini Mailer host (e.g. `mini-mailer.railway.internal`).
- Port: `25`, `2525`, or `587`.
- Username: For Mailgun, this is the domain name (e.g. `mg.yourdomain.com`). For Postmark and MailerSend, this is any username.
- Password: Your email service provider's API key or token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mini Mailer | [NuovarDev/MiniMailer](https://github.com/NuovarDev/MiniMailer) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Healthcheck:** `/health`

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/mini-mailer)
