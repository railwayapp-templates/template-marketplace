# Deploy Orca ADE (w/ Relay) on Railway

Orca agent server + your own relay: Claude Code, Codex, Pi from any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orca-ade-w-relay)

## About

Orca is an open-source agent development environment (ADE) from Stably. It runs Claude Code, Codex, Pi and other CLI coding agents in parallel, each in its own git worktree, with terminals, diff review and source control in one app. This template gives you two things: an Orca server on Railway that you can use from any device, and your own Orca relay, so your phone can also reach Orca running on computers you own, from anywhere.

The template deploys two services that share one password.

**orca: your Orca server.** Orca runs headless on Railway with your projects, worktrees and agents on a persistent volume, so work continues while every device is off. Open it from any browser, or from the Orca desktop and mobile apps. A password-protected control page at `/control` gives you the sign-in link, a QR code, and the list of signed-in devices.

**relay: your own Orca relay.** When Orca runs on a laptop or desktop at home, your phone normally cannot reach it from outside that network. Orca solves this with a relay that both sides connect out to. This service runs Orca's open-source relay together with a small single-user sign-in, so you use your relay instead of Orca Cloud. The admin page at `/admin` lists connected computers, disconnects them, and gives you the setup commands.

The Railway server does not use the relay. It already has a public address, so every device reaches it directly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| relay | `ghcr.io/hmseeb/orca-railway-relay:1.4.210` | Web service |
| orca | `ghcr.io/hmseeb/orca-railway:1.4.210` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | relay | 8080 | Port the relay, sign-in and admin page listen on. Matches the domain's target port. |
| `ORCA_URL` | relay | - | Link from the relay admin to the Orca control page. |
| `ORCA_PASSWORD` | relay | (secret) | Choose a password. After deploying, open the orca service's URL: it takes you to your control panel (sign-in link, QR code, devices). Sign in there with this password. It also protects the relay admin page. |
| `PORT` | orca | 8080 | Port the control page and Orca proxy listen on. Matches the domain's target port. |
| `GH_TOKEN` | orca | (secret) | Optional. GitHub token so gh and git push work right away. Leave empty to run gh auth login in an Orca terminal instead. |
| `RELAY_URL` | orca | - | Link from the control page to the relay admin. |
| `GIT_USER_NAME` | orca | - | Optional. Name on commits made on this server, e.g. Ada Lovelace. |
| `ORCA_PASSWORD` | orca | (secret) | Shared with the relay service. Change it there. |
| `GIT_USER_EMAIL` | orca | - | Optional. Email on commits made on this server. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/control/health`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/orca-ade-w-relay)
