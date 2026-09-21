# Deploy Canvas Viewer MCP Server on Railway

Give your AI agent read-only access to your Canvas account

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/canvas-viewer-mcp-server)

## About

Canvas Viewer is a read-only bridge between a Canvas LMS account and Claude.
It exposes coursework, grades, files, discussions, announcements and modules
as tools Claude can call, so a student can ask what is actually due instead of
clicking through every course and pasting the answer into a chat window.

This template runs one small container and nothing else. State is a single
SQLite file on a persistent volume, so there is no database to provision or
back up. The container fronts its tools with an OAuth 2.1 server that Claude
registers itself against, which is what lets claude.ai add it as a custom
connector; the volume holds that authorization, so redeploys do not send you
back to the login page.

Railway supplies the public hostname and the server reads it at startup, so
there is no URL to type before one exists. You provide a Canvas host, an
access token and a password — your instance, your token, your login.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lennyitb/canvas-viewer-mcp:latest | `ghcr.io/lennyitb/canvas-viewer-mcp:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CANVAS_TOKEN` | (secret) | Your Canvas access token. In Canvas go to Account → Settings, scroll to Approved Integrations, click "+ New Access Token", leave the expiry blank, and copy the token it shows you — it is shown only once. This grants full access to your Canvas account, so treat it like a password. |
| `AUTH_PASSWORD` | (secret) | A password you choose, at least 12 characters. Claude will ask for it once, when you connect. It is the only thing standing between this server's public address and your Canvas account, so don't reuse one. |
| `CANVAS_BASE_URL` | - | Your school's Canvas address. Open Canvas in another tab and copy what's in the address bar — anything after the site name is trimmed off automatically. Example: https://yourschool.instructure.com |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/canvas-viewer-mcp-server)
