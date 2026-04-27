# Deploy Gophish on Railway

An open-source phishing simulation toolkit for pentesters & security teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gEmUp6)

## About

Gophish is an open-source phishing simulation framework for pentesters and security teams. It lets you build phishing email templates, define target user groups, launch scheduled campaigns, and track responses in near real-time — helping organisations test and improve their resilience to phishing attacks.

Gophish runs as a single Go binary served via Docker with two interfaces: an admin server for managing campaigns and a phishing server that handles the actual email links and landing pages. This Railway template deploys the official Gophish Docker image with environment variables pre-configured for Railway's networking model. The admin interface is exposed on Railway's public domain; the phishing server runs on a separate internal port. No database or persistent volume is required for basic use — Gophish uses a SQLite database stored inside the container.
 
⚠️ **Gophish should only be used against systems and users you have explicit, written authorisation to test. Unauthorised phishing simulations may be illegal.**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gophish/gophish | `gophish/gophish` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3333 | Admin server port |
| `ADMIN_USE_TLS` | false | Admin server TLS configuration |
| `ADMIN_TRUSTED_ORIGINS` | - | List of trusted origins |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gEmUp6)
