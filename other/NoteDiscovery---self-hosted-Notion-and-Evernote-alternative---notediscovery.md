# Deploy NoteDiscovery - self-hosted Notion and Evernote alternative on Railway

Self-hosted Markdown notes with search, backlinks, graph view and auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notediscovery)

## About

This template runs the official `ghcr.io/gamosoft/notediscovery:latest` container as a single Python web service on port `8000`. Railway supplies the public HTTPS domain and manages the container lifecycle.

Your notes are stored as plain Markdown and related files under `/app/data`. The template automatically mounts a Railway volume at that path so notes survive application redeploys and restarts. Keep an independent backup of important notes.

NoteDiscovery's built-in authentication is optional and designed for a single user. If the service is publicly reachable, enable authentication and replace the upstream default password. It is not a multi-user identity system and does not provide roles or SSO.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gamosoft/notediscovery:latest | `ghcr.io/gamosoft/notediscovery:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/notediscovery)
