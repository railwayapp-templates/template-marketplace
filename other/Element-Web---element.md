# Deploy Element Web on Railway

Web client for Matrix, an encrypted and federated chat network

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/element)

## About

Element is the official web client for [Matrix](https://matrix.org), the open protocol behind decentralised, end-to-end encrypted messaging. It gives a team what they expect from Slack or Discord — rooms, threads, reactions, file sharing, search, voice and video calls — while accounts, history and encryption keys stay on a homeserver you choose. Institutions, universities and open-source communities run it because Matrix federates: people on different homeservers share a room the way people on different mail servers share a thread. Deploy Element on Railway and the client is yours to brand and point wherever you like.

Self-host Element on Railway and the client is a single service, **element-web**, built from [gridalpha/element-railway](https://github.com/gridalpha/element-railway) on the official `ghcr.io/element-hq/element-web` image: nginx serving the bundle on port 8080 behind Railway's TLS edge, with the security headers upstream's own README asks hosts to send. No database, volume or worker is needed — session, room list and crypto store live in the browser's IndexedDB, everything else on the homeserver. With zero configuration it signs in against matrix.org; `MATRIX_HOMESERVER_URL` repoints it at any homeserver, including one in the same Railway project.

![Diagram of the Element Web service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788876115/element-architecture.png)

Element (formerly Riot) is released under AGPL-3.0 or GPL-3.0. Teams self-host it to control who can read their conversations, to satisfy a policy that rules out hosted chat vendors, or to put the client on their own domain.

- **End-to-end encryption by default in private rooms**, with device verification, cross-signing and encrypted key backup in the browser.
- **Federation** — rooms span homeservers, so partners join without an account on yours.
- **A full team-chat feature set** from the homeserver: spaces, threads, reactions, formatted messages, uploads, search.
- **Calls** — one-to-one voice and video, plus group conferences through Jitsi (`ELEMENT_JITSI_DOMAIN`) or Element Call (`ELEMENT_CALL_URL`).

The service does two jobs: it serves the compiled client, and at container start it renders the `config.json` Element reads in the browser from the variables you set — so one image can front matrix.org, your own homeserver or a customer's without a rebuild. `ELEMENT_CONFIG_EXTRA_JSON` deep-merges a JSON object over that config, covering any option in `docs/config.md`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| element-web | [gridalpha/element-railway](https://github.com/gridalpha/element-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes and probes |
| `ELEMENT_BRAND` | - | UI app name; blank keeps Element |
| `ELEMENT_WEB_PORT` | 8080 | Port nginx binds in the container |
| `MATRIX_SERVER_NAME` | - | Server name; blank derives it from the URL |
| `MATRIX_HOMESERVER_URL` | - | Homeserver base URL; blank uses matrix.org |
| `ELEMENT_DISABLE_CUSTOM_URLS` | - | true removes the homeserver picker |

## Configuration

- **Healthcheck:** `/version`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/element)
