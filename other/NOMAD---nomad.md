# Deploy NOMAD on Railway

A self-hosted travel/trip planner with real-time collaboration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nomad)

## About

<p align="center">
  <picture>
    <source srcset="https://raw.githubusercontent.com/mauriceboe/NOMAD/main/client/public/logo-light.svg" media="(prefers-color-scheme: dark)">
    <source srcset="https://raw.githubusercontent.com/mauriceboe/NOMAD/main/client/public/logo-dark.svg" media="(prefers-color-scheme: light)">
    <img height="60" alt="NOMAD" src="https://raw.githubusercontent.com/mauriceboe/NOMAD/main/client/public/logo-light.svg">
  </picture>
  <br>
  <em>Navigation Organizer for Maps, Activities &amp; Destinations</em>
</p>

**NOMAD** (Navigation Organizer for Maps, Activities &amp; Destinations) is a self-hosted, real-time collaborative travel planner featuring interactive maps, drag-and-drop itinerary planning, budget tracking, packing lists, and document management. Built as a Progressive Web App with offline support, it enables groups to plan trips together with live WebSocket synchronization and optional OIDC authentication.

NOMAD deploys as a containerized Node.js 22 application with an integrated SQLite database (better-sqlite3). Hosting requires persistent volume storage for the database (`./data/travel.db`) and user uploads (`./uploads/`). The application exposes port 3000 and utilizes WebSocket connections (`/ws` path) for real-time collaboration features. Configuration is environment-driven, with optional Google Places API integration for enhanced location search with photos and ratings. The first user to register automatically becomes the administrator, controlling global settings, API keys, backup schedules, and user access management. Being self-hosted, NOMAD ensures complete data privacy while supporting enterprise SSO via OIDC providers (Google, Apple, Keycloak, Authentik).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NOMAD | `ghcr.io/monotykamary/nomad` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Application port. |
| `NODE_ENV` | production | Node server environment. |
| `JWT_SECRET` | (secret) | JWT secret for token generation. |
| `UPLOADS_DIR` | /app/data/uploads | Custom uploads directory for images and documents. |
| `ALLOWED_ORIGINS` | - | Restrict CORS to specific origins. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nomad)
