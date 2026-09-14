# Deploy A Dark Room on Railway

Minimalist text adventure that grows from one button in a dark room

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adarkroom)

## About

A Dark Room is a minimalist text adventure by Michael Townsend that opens with a single button in an unlit room and unfolds into resource gathering, village building, trading and a long journey outward. It became a cult hit after its 2013 browser release and now ships on Steam and Switch, but the original browser version stays open source under MPL-2.0 at [doublespeakgames/adarkroom](https://github.com/doublespeakgames/adarkroom). Self-host A Dark Room when you want a permanent, ad-free copy for a community, a classroom or an intranet.

Deploy A Dark Room on Railway and you get one public web service named `adarkroom`, built from the [gridalpha/adarkroom-railway](https://github.com/gridalpha/adarkroom-railway) source repository. The build fetches the upstream game, removes the analytics tag and CDN script that ship in the public copy, points the in-game share buttons at your own domain, pre-compresses the text assets and serves everything from nginx behind Railway's TLS edge. There is no database, no queue and no volume: the game keeps every save in the player's own browser storage.

![Single adarkroom web service in the Railway project](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789231065/adarkroom-architecture.webp)

A Dark Room belongs to the incremental genre that Candy Box started and Universal Paperclips popularised: almost nothing is on screen at first, and the interface itself is what grows. It is worth hosting rather than linking because it is a finished game distributed as plain HTML, JavaScript and CSS, with no backend and no service that can be discontinued out from under you.

Key features:

- A several-hour game spanning a room, a village, a wasteland map and a final journey
- Twenty-five community translations, selectable at runtime with no rebuild
- Eighty-six original music and effect tracks, loaded on demand as FLAC
- Saves in browser storage, with export and import through the footer menu
- Mobile and desktop layouts, including swipe navigation between locations
- No accounts and no server-side state, so nothing to back up or migrate

Because the game is fully client-side, the Railway architecture is deliberately a single tier. The `adarkroom` service runs nginx with the built game as its document root and answers Railway's health check from a route that reads the game's own `index.html` off disk, so a deployment only passes if the game is really there to serve.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| adarkroom | [gridalpha/adarkroom-railway](https://github.com/gridalpha/adarkroom-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port nginx listens on |
| `ADR_REF` | main | Upstream git ref to build |
| `NGINX_ENVSUBST_FILTER` | ^PORT$ | Limit config substitution to PORT |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | 1 | Size workers from cgroup quota |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/adarkroom)
