# Deploy FormBee Email Only on Railway

Open-Source Form backend for sending form data to email easily

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NR9kSH)

## About

Easily self-host FormBee's open-source form backend. This template allows you to easily send form data submitted on your websites to your email. Visit the [FormBee Website](https://formbee.dev) to learn more about FormBee. [Official FormBee Docs](https://docs.formbee.dev) for more info about using the service. [FormBee GitHub](https://github.com/FormBee/FormBee) to check out the source code, and contribute if you'd like to!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| oia123/formbee-email-only | `oia123/formbee-email-only` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `ORIGIN` | - | The domain/origin of the website that will communicating with your API. Type "*" to allow all. |
| `EMAIL_TO` | - | The email you will receive form submissions on. |
| `SMTP_PORT` | - | Add your SMTP providers port here. It defaults to 465 if you leave this blank. |
| `EMAIL_USER` | (secret) | The username/email that will send you form submission data. Example: example@email.com |
| `EMAIL_PASSWORD` | (secret) | The password to the email |
| `EMAIL_PROVIDER` | - | The SMTP email provider. example: smtp.gmail.com |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/NR9kSH)
