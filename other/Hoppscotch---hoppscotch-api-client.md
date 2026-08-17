# Deploy Hoppscotch on Railway

Postman alternative. Test REST and GraphQL APIs in the browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hoppscotch-api-client)

## About

Hoppscotch is an open-source API development ecosystem — a browser-based client for sending, testing and sharing REST, GraphQL, WebSocket, SSE, Socket.IO and MQTT requests. It is the MIT-licensed Postman alternative teams pick when they want collections, environments, scripting and shared workspaces without per-seat pricing, and self-hosting keeps every endpoint they test in a database they own.

Deploy Hoppscotch on Railway as two services. The `hoppscotch` service runs the official all-in-one image `hoppscotch/hoppscotch:latest`, which puts the API client, admin dashboard, NestJS backend and webapp server behind an internal Caddy proxy: one HTTPS domain serves the app at `/`, the dashboard at `/admin` and the backend at `/backend`. That single origin is what makes sign-in work, since Hoppscotch's session cookies are same-site. Managed **Postgres** sits beside it on the private network, holding users, collections, environments, teams and the encrypted instance configuration. Migrations run before every deploy, and the health check passes only once the backend reaches the database.

![Hoppscotch Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786896736/a64d798a-0547-4cbf-be3b-17feef579872.png)

Every endpoint, header and token a team saves in an API client maps the systems behind it. Self-hosting keeps that map internal, and because Hoppscotch is a web app a URL is the whole onboarding.

- **Six protocols in one client** — REST/HTTP, GraphQL with live schema introspection, WebSocket, Server-Sent Events, Socket.IO and MQTT.
- **Collections, environments and scripting** — nest requests, switch staging and production with variable sets referenced as `&lt;&gt;`, and run pre-request scripts and Chai-style assertions.
- **Import and code generation** — read Postman, Insomnia, OpenAPI and HAR files; turn any request into a snippet for a dozen languages.
- **Teams and admin** — shared workspaces with owner, editor and viewer roles, and a dashboard for users and auth providers.

**Postgres** is the only stateful component, so a database backup is a complete backup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hoppscotch | `hoppscotch/hoppscotch:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hoppscotch | 8080 | Backend HTTP listening port |
| `TRUST_PROXY` | hoppscotch | true | Read client IPs from proxy headers |
| `DATABASE_URL` | hoppscotch | - | Postgres connection string |
| `NODE_OPTIONS` | hoppscotch | --max-old-space-size=2048 | Node heap ceiling for the container |
| `VITE_BASE_URL` | hoppscotch | - | Public app URL |
| `VITE_ADMIN_URL` | hoppscotch | - | Self-hosted admin dashboard URL |
| `VITE_APP_TOS_LINK` | hoppscotch | https://docs.hoppscotch.io/support/terms | Terms of Service link |
| `DATA_ENCRYPTION_KEY` | hoppscotch | - | 32-char key encrypting all stored secrets |
| `VITE_BACKEND_WS_URL` | hoppscotch | - | Backend GraphQL subscriptions endpoint |
| `WHITELISTED_ORIGINS` | hoppscotch | - | Allowed request origins |
| `VITE_BACKEND_API_URL` | hoppscotch | - | Backend REST API endpoint |
| `VITE_BACKEND_GQL_URL` | hoppscotch | - | Backend GraphQL endpoint |
| `VITE_SHORTCODE_BASE_URL` | hoppscotch | - | Base URL for shared request links |
| `ENABLE_SUBPATH_BASED_ACCESS` | hoppscotch | true | Serve app, admin and backend on one domain |
| `VITE_APP_PRIVACY_POLICY_LINK` | hoppscotch | https://docs.hoppscotch.io/support/privacy | Privacy Policy link |
| `WEBAPP_SERVER_SIGNING_SECRET` | hoppscotch | (secret) | Seeds the bundle signing key |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hoppscotch-api-client)
