# Deploy SaaS Starter with React, Hono and Better Auth on Railway

Get accounts and organisations with Turborepo, Drizzle and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saas-starter-with-react-hono-and-better-)

## About

Start with a React SPA on Vite, a separate Hono API and Better Auth accounts and organisations. This open source TypeScript starter includes Drizzle on Postgres and shared Zod contracts in a Turborepo monorepo. I start my SaaS products from it. Read [the starter write-up](https://withseismic.com/library/starter?utm_source=railway) or [get the source on GitHub](https://github.com/dougwithseismic/react-saas-starter).

Deploy with no input: the template creates `Postgres`, `server` and `web` on one private network, generating the database password and `BETTER_AUTH_SECRET`. Caddy serves the SPA from `web`, the only public domain, and proxies requests to the private Hono API. Auth cookies stay first-party on one HTTPS origin, with no CORS setup. Before every deploy, `server` runs database migrations; `/health/ready` checks database connectivity. Sign-up, sign-in, sessions and organisations work immediately. Add the Loops variables for verification, password reset and invitation emails; these cannot be delivered until configured. Add PostHog variables on `server` and `web` for analytics. Redeploy `web` after changing its compiled-in analytics variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [dougwithseismic/react-saas-starter](https://github.com/dougwithseismic/react-saas-starter) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| server | [dougwithseismic/react-saas-starter](https://github.com/dougwithseismic/react-saas-starter) (root: /) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 8080 | Caddy HTTP port; Railway terminates TLS, so leave unchanged. |
| `API_UPSTREAM` | web | - | References the private API host and port for Caddy proxying; no change needed. |
| `TRUSTED_PROXIES` | web | 0.0.0.0/0 ::/0 | Lets Caddy use Railway's X-Real-IP for client addresses on edge and private-network traffic. |
| `POSTGRES_DB` | Postgres | railway | Names the database created on first start; leave unchanged. |
| `DATABASE_URL` | Postgres | - | Builds the private connection string from the database variables; no change needed. |
| `POSTGRES_USER` | Postgres | (secret) | Sets the database user; leave unchanged. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password generated as 32 random letters for each deploy; no change needed. |
| `PORT` | server | 4301 | API port on the private network; leave unchanged. |
| `NODE_ENV` | server | production | Enables secure cookies in production; leave unchanged. |
| `LOG_LEVEL` | server | info | Sets the Pino log level; defaults to info. |
| `APP_ORIGIN` | server | - | References web's public HTTPS origin for API access; update for a custom domain. |
| `DATABASE_URL` | server | - | References the private Postgres connection string; no change needed. |
| `BETTER_AUTH_URL` | server | - | References web's public origin for auth links and callbacks; update for a custom domain. |
| `TRUSTED_PROXY_IPS` | server | 10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,100.64.0.0/10,fc00::/7 | Limits trusted X-Forwarded-For senders to private network ranges; leave unchanged. |
| `BETTER_AUTH_SECRET` | server | (secret) | Signs sessions; a 64-character secret is generated for each deploy, so no change is needed. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`

**Category:** Starters · **Languages:** TypeScript, CSS, Dockerfile, PLpgSQL, HTML

[View on Railway →](https://railway.com/deploy/saas-starter-with-react-hono-and-better-)
