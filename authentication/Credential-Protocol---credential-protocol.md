# Deploy Credential Protocol on Railway

Self-hosted signed membership cards for creators.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/credential-protocol)

## About

Credential Protocol gives creators signed membership cards on a server they own. Members sign up on your website, receive a cryptographically signed card and a personal access link, and the content you gate behind it opens for them. No platform in the middle and no platform cut: your members, your keys, your money.

Credential Protocol is a small Python web app (Flask, served by gunicorn). Each deployment is a private copy with its own admin dashboard, its own signing key, its own member list and its own storage. You log in with a password you choose, fill in your brand and tiers, and paste two lines of HTML on your website to show the sign-up widget. Members-only content, uploaded files, per-tier card designs, member limits, renewals, reminders, backup and restore are all built in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cred | [shiver444/cred](https://github.com/shiver444/cred) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | Where the app stores your members and keys on the attached storage Volume. Leave it as /data. |
| `ADMIN_SECRET` | (secret) | Your admin password for the dashboard. Choose a long one. |
| `SESSION_SECRET_KEY` | (secret) | Secret used to keep you signed in to the dashboard. Generated automatically, leave it as it is. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication · **Languages:** Python, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/credential-protocol)
