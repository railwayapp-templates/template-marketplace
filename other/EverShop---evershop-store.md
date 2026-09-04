# Deploy EverShop on Railway

Node.js online store with a catalog, cart, checkout and admin panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evershop-store)

## About

EverShop is an open-source e-commerce platform written in TypeScript and React, with a GraphQL API and a modular architecture, built for developers who want to own their storefront rather than rent it. It ships what a real shop needs — a catalog with variants and attributes, categories and collections, a page builder, cart, checkout, coupons, tax and shipping rules, accounts and order management — in a codebase you extend with your own modules and themes. Teams self-host EverShop when a hosted platform's per-order fees or closed data model get in the way, and when they would rather write a Node.js extension than a marketplace plugin.

Deploy EverShop on Railway and the whole stack is wired together on the first click. The template provisions two services: **evershop**, the Node.js application serving the storefront and the `/admin` panel from one public domain, and **Postgres**, Railway's managed PostgreSQL, holding the catalog, orders, customers and login sessions. A volume at `/app/media` keeps uploaded product images, served back under `/assets`. Session keys, the admin and customer JWT secrets, the public URL and the first administrator are generated at deploy time, so there is no config file to edit and no installer wizard — the app migrates its own schema on first boot and serves.

![Diagram of the EverShop and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788455063/evershop-architecture.png)

EverShop is a single Node.js process serving server-rendered React for the storefront, the admin single-page app, a REST admin API and a GraphQL endpoint. It spawns two children: a scheduler for cron work such as sitemap regeneration, and an event subscriber reacting to order and catalog changes. There is no worker service and no message broker — the app and its database are the whole deployment.

Key features:

- Simple and variant products, attributes, attribute groups, categories and collections
- Cart, checkout, coupons, tax classes, shipping zones and packages, order management
- Customer accounts, address book, order history and signed order-tracking links
- Page Builder and CMS pages for the home page, landing pages and a blog
- GraphQL API plus a REST admin API, so a headless front end is supported
- Module and theme system for extending the app in TypeScript without forking

On Railway, **Postgres** holds every persistent record — products, orders, customers and the session table — so signing in survives a redeploy. The **evershop** service keeps only uploaded media on its volume; everything else is disposable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evershop | [gridalpha/evershop-railway](https://github.com/gridalpha/evershop-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | evershop | 3000 | HTTP listen port |
| `DB_HOST` | evershop | - | Postgres private hostname |
| `DB_NAME` | evershop | - | Postgres database name |
| `DB_PORT` | evershop | - | Postgres port |
| `DB_USER` | evershop | (secret) | Postgres role |
| `ADMIN_EMAIL` | evershop | admin@example.com | First administrator login |
| `DB_PASSWORD` | evershop | (secret) | Postgres password |
| `LOGGER_LEVEL` | evershop | info | Show migrations and startup output |
| `COOKIE_SECRET` | evershop | (secret) | Session cookie signing key |
| `ADMIN_FULLNAME` | evershop | Store Admin | First administrator display name |
| `ADMIN_PASSWORD` | evershop | (secret) | First administrator password |
| `JWT_ADMIN_SECRET` | evershop | (secret) | Admin access token signing key |
| `TRUST_PROXY_HOPS` | evershop | 2 | Express proxy hops behind Railway's edge |
| `EVERSHOP_HOME_URL` | evershop | - | Absolute public store URL |
| `JWT_CUSTOMER_SECRET` | evershop | (secret) | Customer access token signing key |
| `JWT_ADMIN_REFRESH_SECRET` | evershop | (secret) | Admin refresh token signing key |
| `JWT_CUSTOMER_REFRESH_SECRET` | evershop | (secret) | Customer refresh token signing key |
| `ORDER_TRACKING_TOKEN_SECRET` | evershop | (secret) | Signs anonymous order-tracking links |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/evershop-store)
