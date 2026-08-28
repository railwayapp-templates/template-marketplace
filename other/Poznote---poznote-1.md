# Deploy Poznote on Railway

Powerful note-taking without the hassle.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/poznote-1)

## About

Poznote is a powerful note-taking and documentation platform focused on simplicity. Create rich HTML or Markdown notes with checklists, Excalidraw diagrams, Mermaid charts, KaTeX formulas, and file attachments. Organize your knowledge with workspaces, folders, tags, and full-text search.

Hosting Poznote on Railway allows you to deploy a production-ready Poznote instance without managing a server yourself. Railway runs the official Poznote Docker image and provides persistent storage for your notes, attachments, and SQLite database. The application can be accessed from any device through a web browser, while your data remains under your control.

The Railway template is configured with a persistent volume mounted at `/var/www/html/data`, ensuring that your data survives redeployments and application updates. Once deployed, Railway provides a public domain for accessing your Poznote instance.

Poznote is lightweight and does not require an external database. It uses SQLite and stores notes and attachments directly in the persistent data directory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timothepoznanski/poznote:latest | `ghcr.io/timothepoznanski/poznote:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POZNOTE_OIDC_CLIENT_ID` | - | Optional OpenID Connect client ID used when configuring OIDC/SSO authentication with an external identity provider such as Keycloak, Auth0, Azure AD, or Google. Leave empty if OIDC authentication is not being used. |
| `POZNOTE_OIDC_CLIENT_SECRET` | (secret) | Optional OpenID Connect client secret associated with the OIDC client ID. |
| `POZNOTE_OIDC_DISABLE_NORMAL_LOGIN` | (secret) | Controls whether the normal username/password login form is disabled when OIDC is configured. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/poznote-1)
