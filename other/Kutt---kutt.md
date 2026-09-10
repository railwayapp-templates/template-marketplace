# Deploy Kutt on Railway

URL shortener with custom links, visit stats and an admin panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kutt)

## About

Kutt is a modern, open-source URL shortener that gives a team its own branded short links instead of renting them from bit.ly. Deploy Kutt on Railway for custom short addresses, password-protected and expiring links, per-link visit analytics, an admin panel and a REST API, on a domain you control. Marketing teams track campaigns without handing click data to a third party; engineering teams mint links from CI and support tooling.

Self-host Kutt on Railway with everything wired together. The template runs four services: **kutt**, the Node.js application behind a public HTTPS domain; **Postgres**, holding users, links and visit records; **Redis**, backing the queue that records every redirect, the link cache and the shared rate limiter; and **mailpit**, a private mailbox catching the password-reset and abuse-report messages Kutt sends. Traffic arrives at the kutt service, which looks the address up in Redis or Postgres, answers the browser with a 302 and queues the visit for analytics. Nothing but the app and the mailbox is reachable from the internet.

![Kutt, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788962130/kutt-architecture.png)

Kutt is a Node.js application by The Devs, MIT-licensed and developed in the open at [thedevs-network/kutt](https://github.com/thedevs-network/kutt). It answers a problem every team hits eventually: shortened links are permanent public infrastructure, and a commercial shortener owns both the domain and the click data. Self-hosting moves both back in-house.

Key features:

- Custom short addresses, or generated ones from a confusion-free alphabet
- Password-protected links, expiry dates and per-link descriptions
- Private visit analytics: referrers, browsers, countries, operating systems
- Multiple custom domains, each with its own homepage redirect
- A REST API with per-user API keys, plus OpenID Connect single sign-on
- An admin panel for users, links, domains and abuse reports

The Railway architecture follows Kutt's own production compose file. Postgres holds every durable record. Redis is not decoration: it runs the queue that writes visit records asynchronously, so a redirect returns without waiting on a database write, and it caches lookups so a popular link never touches Postgres. Mailpit fills the gap that makes password reset impossible on a fresh install.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| kutt | [gridalpha/kutt-railway](https://github.com/gridalpha/kutt-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Credentials for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MP_SMTP_AUTH_ACCEPT_ANY` | mailpit | true | Accept any SMTP credentials |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow SMTP auth without TLS |
| `PORT` | kutt | 3000 | HTTP listening port |
| `DB_SSL` | kutt | false | Private network needs no TLS |
| `DB_HOST` | kutt | - | Private Postgres hostname |
| `DB_NAME` | kutt | - | Database name |
| `DB_PORT` | kutt | - | Postgres port |
| `DB_USER` | kutt | (secret) | Database user |
| `DB_CLIENT` | kutt | pg | Knex driver for Postgres |
| `MAIL_FROM` | kutt | kutt@example.com | Sender address on outgoing mail |
| `MAIL_HOST` | kutt | - | Private SMTP hostname |
| `MAIL_PORT` | kutt | 1025 | Mailpit plaintext SMTP port |
| `SITE_NAME` | kutt | Kutt | Name shown across the UI |
| `JWT_SECRET` | kutt | (secret) | Signs session tokens, must stay stable |
| `REDIS_HOST` | kutt | - | Private Redis hostname |
| `REDIS_PORT` | kutt | - | Redis port |
| `ADMIN_EMAIL` | kutt | admin@example.com | Administrator seeded at first boot |
| `DB_PASSWORD` | kutt | (secret) | Database password |
| `DB_POOL_MAX` | kutt | 10 | Maximum pooled connections |
| `LINK_LENGTH` | kutt | 6 | Characters in a generated address |
| `MAIL_SECURE` | kutt | false | Plain SMTP on the private network |
| `TRUST_PROXY` | kutt | true | Read client IP from Railway's edge |
| `MAIL_ENABLED` | kutt | true | Enables reset, signup and reports |
| `REPORT_EMAIL` | kutt | admin@example.com | Receives abuse reports |
| `CONTACT_EMAIL` | kutt | admin@example.com | Shown as the contact address |
| `REDIS_ENABLED` | kutt | true | Turns on queue, cache and rate-limit store |
| `ADMIN_PASSWORD` | kutt | (secret) | Its password, change after first sign-in |
| `DEFAULT_DOMAIN` | kutt | - | Host every short link is built from |
| `REDIS_PASSWORD` | kutt | (secret) | Redis password |
| `ENABLE_RATE_LIMIT` | kutt | true | Throttles login and reset routes |
| `DISALLOW_LOGIN_FORM` | kutt | (secret) | Set true for OIDC-only sign-in |
| `DISALLOW_REGISTRATION` | kutt | true | Closes public signup |
| `DISALLOW_ANONYMOUS_LINKS` | kutt | true | Requires an account to make links |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/kutt)
