# Deploy NextDNS Agent MCP on Railway

Your NextDNS account inside Claude, ChatGPT and any AI app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextdns-agent-mcp)

## About

NextDNS Agent MCP puts your NextDNS account inside Claude, ChatGPT, Codex, Cursor and any other AI app that speaks MCP. Ask in plain words what got blocked and why, add blocklists, set parental control and recreation time, or back up a profile. Every change can be undone, and deleting asks you twice.

Not made by or affiliated with NextDNS. It uses the public NextDNS API with your own API key.

This template runs the ready-made image from GitHub, so there is nothing to build. You type one passphrase when you deploy. Railway makes the secret key, the public address and a disk at /data for the saved API key, logins, the change log and backups. When it turns green, open https://your-address/settings, sign in with your passphrase and paste your NextDNS API key (bottom of my.nextdns.io/account). Choose what the AI may do with each profile. Then add https://your-address/mcp to your AI app as a connector.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextdns-agent-mcp | `ghcr.io/s17sh70x2jfl031ag/nextdns-agent-mcp:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8766 | The port the server listens on. Leave it as 8766. |
| `LOGIN_PASSPHRASE` | (secret) | Make up a passphrase, 6 or more characters. It locks the settings page (where you paste your NextDNS API key) and the login AI apps use. Save it in your password manager. |
| `NEXTDNS_SECRET_KEY` | (secret) | Made for you. Encrypts the NextDNS API key you paste on the settings page. Never change it. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nextdns-agent-mcp)
