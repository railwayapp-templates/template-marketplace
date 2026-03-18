# Deploy Textbelt SMS API on Railway

No-nonsense outbound SMS API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntXGdO)

## About

This is a fork of the original TextBelt project by Ian Webster. I made two changes: 

1. Add basic auth to the server
2. Add support for environment variables for easier deployment
   
You shouldn't have to change anything in the code to get it to work. Just set the environment variables and run the server.

NOTE: You will need an SMTP server to send text messages. This project uses an email-to-text gateway to send text messages. 
I suggest using SMTP2GO: https://www.smtp2go.com/ 

The environment variables are:
- `SMTP_HOST` ex: smtp.gmail.com
- `SMTP_PASSWORD` ex: password123
- `SMTP_USERNAME` ex: admin
- `SMTP_PORT` ex: 587
- `BASIC_AUTH_USERNAME` ex: admin
- `BASIC_AUTH_PASSWORD` ex: password123
- `FROM_NAME` ex: TextBelt
- `FROM_EMAIL` ex: example@example.com

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| textbelt | [timconnorz/textbelt.git](https://github.com/timconnorz/textbelt.git) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `FROM_NAME` | - | For the email-to-sms gateway. Anything works |
| `SMTP_HOST` | - | smtp host  |
| `SMTP_PORT` | - | smtp port |
| `FROM_EMAIL` | - | An email address with a domain that is verified on your SMTP service |
| `SMTP_PASSWORD` | (secret) | smtp password |
| `SMTP_USERNAME` | (secret) | smtp username |
| `BASIC_AUTH_PASSWORD` | (secret) | Decide on a password required to access your endpoints |
| `BASIC_AUTH_USERNAME` | (secret) | Decide on a username to protect your server |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/ntXGdO)
