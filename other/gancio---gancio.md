# Deploy gancio on Railway

A shared agenda for local communities, with federation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gancio)

## About

gancio is a shared agenda for a place. People propose events, a moderator approves them, and the
result is published as a web page, an RSS feed, an iCal subscription, an embeddable widget, and over
ActivityPub so other instances can follow along. It is built for a neighbourhood, a social centre or
a small scene rather than a platform: there are no personal timelines, and the identity of whoever
posted an event is never shown, not even to administrators. This is a community-maintained template;
it is not affiliated with the gancio project.

gancio is refreshingly small to host. One process, one SQLite database, one directory holding the
database, uploaded images and logs. No queue, no cache, no search service. A deployment is a single
service with a single persistent volume, and it idles at under two hundred megabytes of memory.

The part that needs care is the first minute. A fresh instance has no administrator at all, and
account registration is open by default. On a hosting platform the public address is live from the
moment the service starts, which means a stranger can create an account before you have one, and
nobody holds the rights to close the door. This template creates your administrator account and
applies the registration policy using the application's own command line, before the web server is
started. Nothing is listening until the instance belongs to you.

Anonymous event submission stays switched on, because it is the point of the project: anyone can
propose an event without an account, and nothing is published until a moderator confirms it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gancio | `ghcr.io/youssefsiam38/gancio-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used for event times. |
| `PORT` | 8080 | Port the server listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `GANCIO_BASE_URL` | - | Public URL. gancio puts it in every published link and in its federation identity, so it is awkward to change later. |
| `GANCIO_ADMIN_EMAIL` | admin@example.com | E-mail of the administrator created on first start. Change it to your own. |
| `GANCIO_ADMIN_PASSWORD` | (secret) | That account's password. Sign in with it, then change it in the app. |
| `GANCIO_ALLOW_ANON_EVENT` | true | Whether people may propose events without an account. Submissions still wait for moderation. |
| `GANCIO_ALLOW_REGISTRATION` | false | Whether strangers may create accounts. gancio defaults this to true; the template closes it. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gancio)
