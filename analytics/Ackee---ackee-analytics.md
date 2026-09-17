# Deploy Ackee on Railway

Privacy-friendly website analytics that counts views without cookies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ackee-analytics)

## About

Ackee is a self-hosted, privacy-friendly web analytics server built on Node.js and MongoDB. It counts page views, referrers, browsers, devices, screen sizes and languages for the sites you own — without cookies, without fingerprinting and without a visitor identity that survives the day. Bloggers, indie developers, agencies and docs teams reach for it when Google Analytics is more machine than they need and a consent banner is more friction than a traffic chart is worth.

Deploy Ackee on Railway and it arrives wired together: an **ackee** service running the official `electerious/ackee` image behind a public HTTPS domain, and a private **MongoDB** service holding every record on a persistent volume. Browsers reach the ackee service only — the dashboard, the GraphQL API at `/api` and the `tracker.js` snippet share one origin — while the database stays on Railway's private network. Self-host Ackee this way and the only step left is pasting a script tag onto the site you want to measure.

![Diagram of the Ackee and MongoDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789527051/ackee-architecture.webp)

Ackee solves a narrow problem well: knowing how many people read what you publish, where they came from and what they used, without collecting anything that identifies them. Each record is stored against a hash of the visitor's IP address, user agent and domain id, salted with a value that regenerates daily. Yesterday's hashes cannot be matched to today's, and older records from a visitor lose their identifier as soon as a newer one arrives, so no browsing history can be reconstructed.

Key features:

- No cookies and no persistent visitor identity, which in most jurisdictions removes the need for a tracking consent banner
- Page views with referrers, sources, durations, operating systems, devices, browsers, screen sizes and languages
- Custom events with total or average aggregation, as charts or ranked lists
- A documented GraphQL API — the dashboard is just one client of it
- Permanent API tokens for status bars, CLI reports and scripts
- A tiny tracking script plus wrappers for React, Vue, Nuxt, Svelte, Gatsby, Angular, Django, WordPress and Flutter

The architecture is deliberately small. The **ackee** service is one Node.js process serving the dashboard, the GraphQL API and the tracker script. The **MongoDB** service stores domains, records, events, actions and login tokens on a Railway volume at `/data/db`, so they survive redeploys. Ackee connects to the database before opening its HTTP listener, so a healthy service also proves the database link.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ackee | `electerious/ackee:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ackee | 3000 | HTTP server listening port |
| `ACKEE_MONGODB` | ackee | - | MongoDB connection string, admin auth source |
| `ACKEE_PASSWORD` | ackee | (secret) | Dashboard sign-in password |
| `ACKEE_USERNAME` | ackee | (secret) | Dashboard sign-in username |
| `ACKEE_AUTO_ORIGIN` | ackee | true | Auto CORS headers for hostname-titled domains |
| `ACKEE_ALLOW_ORIGIN` | ackee | - | Explicit CORS origins; needs ACKEE_AUTO_ORIGIN=false |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, set during initialization |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user, created during initialization |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/ackee-analytics)
