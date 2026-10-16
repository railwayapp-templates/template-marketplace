# Deploy Selfhost Remote Mail MCP on Railway

Your own email inside Claude, ChatGPT and other AI apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selfhost-remote-mail-mcp)

## About

Selfhost Remote Mail MCP puts your own email inside Claude, ChatGPT, Codex and other AI apps. Your AI can search, read, sort and draft replies in Gmail, iCloud, Fastmail or any IMAP mailbox. It asks before it sends anything, and your password stays on your server.

This template runs the ready-made image from GitHub, so there is nothing to build. You type one passphrase when you deploy. Railway makes the secret key, the public address and a disk at /data for logins and settings. When it turns green, open https://your-address/settings, type your passphrase and add your mailbox. Then add https://your-address/mcp to your AI app as a connector. Updates come from official releases only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mail-mcp | `ghcr.io/s17sh70x2jfl031ag/selfhost-remote-mail-mcp:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8765 | The port the server listens on. Leave it as 8765. |
| `MAIL_SECRET_KEY` | (secret) | Made for you. Encrypts the mailboxes you add on the settings page. Never change it. |
| `LOGIN_PASSPHRASE` | (secret) | Make up a passphrase, 12 or more characters. It locks your settings page, where you add your mailboxes. Save it in your password manager. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/selfhost-remote-mail-mcp)
