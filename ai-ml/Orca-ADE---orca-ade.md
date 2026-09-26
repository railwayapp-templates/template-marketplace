# Deploy Orca ADE on Railway

Orca ADE server: Claude Code, Codex, Pi in parallel worktrees, any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orca-ade)

## About

Orca is an open-source agent development environment (ADE) from Stably. It runs Claude Code, Codex, Pi and other CLI coding agents in parallel, each in its own git worktree, with terminals, diff review and source control in one app. This template runs Orca on Railway, so your agents keep working while every device is off, and you use it from any browser or from the Orca desktop and mobile apps.

Orca runs headless on Railway with your projects, worktrees and agent logins on a persistent volume. A password-protected control panel, which opens when you visit the service's URL, gives you the sign-in link, a QR code for the Orca apps, and the list of signed-in devices.

Need your phone to reach Orca on a computer you own as well? Use the sibling template, Orca ADE (w/ Relay), which adds your own Orca relay.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| orca | `ghcr.io/hmseeb/orca-railway:1.4.210` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the control panel and Orca listen on. Matches the domain's target port. |
| `GH_TOKEN` | (secret) | Optional. GitHub token so gh and git push work right away. Leave empty to run gh auth login in an Orca terminal instead. |
| `GIT_USER_NAME` | - | Optional. Name on commits made on this server, e.g. Ada Lovelace. |
| `ORCA_PASSWORD` | (secret) | Choose a password. After deploying, open this service's URL: it takes you to your control panel (sign-in link, QR code, devices). Sign in there with this password. |
| `GIT_USER_EMAIL` | - | Optional. Email on commits made on this server. |
| `ORCA_PAIRING_ADDRESS` | - | Optional. Only for a custom domain: set it to https://your.domain so pairing links point there. |

## Configuration

- **Healthcheck:** `/control/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/orca-ade)
