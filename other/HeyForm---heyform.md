# Deploy HeyForm on Railway

Form builder for surveys, quizzes and polls, one question at a time

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/heyform)

## About

HeyForm is an open-source form builder for conversational forms, surveys, quizzes and polls. It asks one question at a time, supports twenty-plus field types from short text and ratings to file uploads, signatures and payments, and adds conditional logic, redirects, themes and custom CSS. Teams reach for it when Typeform's per-response pricing stops adding up, or when submissions hold data that has to stay on their own infrastructure.

Self-host HeyForm on Railway and this template wires the stack together: **heyform** serves the dashboard and the public form renderer on one domain, **MongoDB** stores workspaces, forms and submissions, **Redis** backs the job queues, and **mailpit** captures outgoing mail so verification, password resets and invitations work the moment the deploy finishes. Respondents reach heyform over HTTPS; MongoDB, Redis and Mailpit's SMTP listener stay private.

![Diagram of the HeyForm, Mailpit, MongoDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1789005662/heyform-architecture.png)

HeyForm is built by EarlyBird, Inc. and released under AGPL-3.0. The community edition is the same product as the hosted service, with no response caps, seat limits or withheld features — the difference is that you run it. That matters most when a form collects personal data and "who holds the responses" has a compliance answer.

Key capabilities:

- One-question-at-a-time conversational forms, plus classic multi-question layouts
- Twenty-plus question types, including file upload, signature, payment and opinion scale
- Conditional logic, variables, hidden fields and completion redirects
- Themes, custom fonts, background images and per-form CSS
- Drop-off analytics and CSV export of responses
- Webhooks plus Zapier, Make.com, Slack, Sheets and Airtable integrations
- Optional Google, Apple and OpenID Connect sign-in

The topology mirrors the project's own Compose file. **heyform** is a single Node process serving the dashboard, the form renderer and the GraphQL API, so there is no separate frontend to keep in sync. **MongoDB** is the only database. **Redis** carries the Bull queues that send mail and build reports, and holds rate-limit and verification-code state. **mailpit** is capture-only SMTP with a web inbox; point it at a real relay later, or give heyform your own provider's `SMTP_*` values.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| Redis | `redis:8.2` | Database |
| heyform | `heyform/community-edition:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the server |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot |
| `PORT` | mailpit | 8025 | Web inbox port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Web inbox username and password |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack SMTP bind for private peers |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | heyform | 9157 | Port Railway probes and routes to |
| `REDIS_DB` | heyform | 0 | Cache database; queues use this plus one |
| `MONGO_URI` | heyform | - | Application database |
| `SMTP_FROM` | heyform | - | From address on all mail |
| `SMTP_HOST` | heyform | - | Outgoing mail host |
| `SMTP_PORT` | heyform | 1025 | Outgoing mail port |
| `REDIS_HOST` | heyform | - | Queue and cache host |
| `REDIS_PORT` | heyform | - | Queue and cache port |
| `SESSION_KEY` | heyform | - | Session cookie encryption key, keep stable |
| `SMTP_SECURE` | heyform | false | No implicit TLS on the capture inbox |
| `TRUST_PROXY` | heyform | true | Trust Railway's edge for client IP and scheme |
| `NODE_OPTIONS` | heyform | --max-old-space-size=2048 | Cap the Node heap to the container |
| `REDIS_PASSWORD` | heyform | (secret) | Queue and cache password |
| `APP_LISTEN_PORT` | heyform | 9157 | Port the Node server binds |
| `APP_HOMEPAGE_URL` | heyform | - | Public base URL and cookie domain |
| `APP_LISTEN_HOSTNAME` | heyform | 0.0.0.0 | Listen address inside the container |
| `FORM_ENCRYPTION_KEY` | heyform | - | Form token encryption key, keep stable |
| `APP_DISABLE_REGISTRATION` | heyform | false | Set true to close public sign-up |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/health/ready`
- **Volume:** `/app/packages/server/static/upload`

**Category:** Other

[View on Railway →](https://railway.com/deploy/heyform)
