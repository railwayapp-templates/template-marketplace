# Deploy Countly on Railway

Product analytics for mobile, web and desktop apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/countly)

## About

Countly is an open-source product analytics platform for mobile, web and desktop applications. Its SDKs report sessions, screen views, custom events, user profiles and crashes to a server you control, and the dashboard turns those into retention curves, event breakdowns, geo maps and crash groups. Teams pick it over Google Analytics or Mixpanel when raw behavioural data must stay on infrastructure they own — health, finance and public-sector products, or anyone whose GDPR posture rules out a third-party vendor. It also handles push notifications, remote config and in-app feedback, making it an analytics-plus-engagement stack, not a page-view counter.

Self-host Countly on Railway and this template gives you the production topology from upstream's own Docker Compose file, not an all-in-one container. Four services are pre-wired: `countly-api` runs the ingestion and read API your SDKs talk to, `countly-frontend` serves the dashboard, a Caddy router publishes both on one domain, and MongoDB stores every event, aggregate and file. When you deploy Countly on Railway only the router has a public URL — it sends `/i` and `/o` to the API and everything else to the dashboard, exactly as upstream's bundled nginx does, keeping the database and both app containers private.

![Countly router, dashboard, API and MongoDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787778462/countly-architecture.png)

Countly is built around a write endpoint and a read endpoint. SDKs post to `/i` with an application key and a device identifier; the API adds geography, device and browser metadata, writes the raw document, and updates pre-aggregated collections so the dashboard answers date-range questions without scanning raw events. The dashboard queries `/o`. Self-host when you need unsampled data, unlimited retention, or a guarantee that behavioural data stays on your own infrastructure.

Key capabilities in the open-source edition:

- Session, user, retention and loyalty analytics across mobile, web and desktop SDKs
- Custom events with segmentation, plus per-event duration and sum metrics
- Crash reporting with grouping, and error tracking for web applications
- Push notifications, remote config and star-rating feedback widgets
- Views, acquisition, technology and geo breakdowns, custom dashboards and a REST API

**countly-api** is the busy service — SDK traffic, aggregation and scheduled jobs — and where you add CPU first. **countly-frontend** serves the dashboard and holds sessions. **MongoDB** is the only stateful component, holding three databases on a persistent volume. The **countly** router exists because a browser must reach the dashboard and the API on one origin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| countly | [gridalpha/countly-railway](https://github.com/gridalpha/countly-railway) | Web service |
| countly-api | `countly/api:latest` | Worker |
| countly-frontend | `countly/frontend:latest` | Worker |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | countly | 8080 | Caddy HTTP listening port |
| `COUNTLY_API_HOST` | countly | - | API upstream |
| `COUNTLY_FRONTEND_HOST` | countly | - | Dashboard upstream |
| `PORT` | countly-api | 3001 | Port Railway health-checks |
| `NODE_OPTIONS` | countly-api | --max-old-space-size=1024 | Node heap ceiling per process |
| `COUNTLY_PLUGINS` | countly-api | mobile,web,desktop,plugins,density,locale,browser,sources,views,logger,systemlogs,populator,reports,crashes,push,star-rating,slipping-away-users,compare,server-stats,dbviewer,times-of-day,compliance-hub,alerts,onboarding,consolidate,remote-config,hooks,dashboards,sdk,data-manager,guides | Plugins loaded at boot |
| `COUNTLY_CONFIG_HOSTNAME` | countly-api | - | Public hostname for links |
| `COUNTLY_CONFIG__MONGODB` | countly-api | - | MongoDB connection string |
| `COUNTLY_CONFIG_API_API_HOST` | countly-api | :: | Dual-stack bind for private callers |
| `COUNTLY_CONFIG_API_API_PORT` | countly-api | 3001 | API listening port |
| `COUNTLY_CONFIG__FILESTORAGE` | countly-api | gridfs | Store uploaded files in MongoDB |
| `COUNTLY_CONFIG_API_API_WORKERS` | countly-api | 2 | Worker processes, else one per core |
| `PORT` | countly-frontend | 6001 | Port Railway health-checks |
| `NODE_OPTIONS` | countly-frontend | --max-old-space-size=1024 | Node heap ceiling per process |
| `COUNTLY_PLUGINS` | countly-frontend | mobile,web,desktop,plugins,density,locale,browser,sources,views,logger,systemlogs,populator,reports,crashes,push,star-rating,slipping-away-users,compare,server-stats,dbviewer,times-of-day,compliance-hub,alerts,onboarding,consolidate,remote-config,hooks,dashboards,sdk,data-manager,guides | Must match countly-api |
| `COUNTLY_CONFIG_HOSTNAME` | countly-frontend | - | Public hostname for links |
| `COUNTLY_CONFIG__MONGODB` | countly-frontend | - | MongoDB connection string |
| `COUNTLY_CONFIG__FILESTORAGE` | countly-frontend | gridfs | Store uploaded files in MongoDB |
| `COUNTLY_CONFIG_FRONTEND_WEB_HOST` | countly-frontend | :: | Dual-stack bind for the router |
| `COUNTLY_CONFIG_FRONTEND_WEB_PORT` | countly-frontend | 6001 | Dashboard listening port |
| `COUNTLY_CONFIG_FRONTEND_COOKIE_SECURE` | countly-frontend | true | Secure flag on the session cookie |
| `COUNTLY_CONFIG_FRONTEND_WEB_USE_INTERCOM` | countly-frontend | false | No third-party widget in the dashboard |
| `COUNTLY_CONFIG_FRONTEND_WEB_SECURE_COOKIES` | countly-frontend | true | Treat requests as HTTPS |
| `COUNTLY_CONFIG_FRONTEND_WEB_SESSION_SECRET` | countly-frontend | (secret) | Signs the session cookie |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the entrypoint |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user, read by the entrypoint on first boot |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/o/ping`
- **Healthcheck:** `/ping`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/countly)
