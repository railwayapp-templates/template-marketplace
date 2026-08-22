# Deploy Rocket.Chat | (Just Updated) Slack Alternative Whose Real-Time Chat Actually Works on Railway

Slack alternative with a real replica-set Mongo and no claimable admin

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat-or-just-updated-slack-alterna)

## About

Rocket.Chat is a self-hosted team chat platform — channels, threads, DMs, voice and
video calls, file sharing, bots and a full REST/Realtime API. It is the open-source
alternative to Slack and Microsoft Teams, and this template runs it on the
configuration it actually needs rather than the one that merely boots.

Rocket.Chat is a Meteor application, and Meteor delivers messages in real time by
tailing MongoDB **change streams**. Change streams only exist on a replica set. Point
Rocket.Chat at a standalone `mongod` — which is what a stock `mongo` image gives you —
and the server still starts, still serves the web UI and still answers `/api/info`
with HTTP 200, so every healthcheck passes. Underneath, the database watcher fails on
a loop with `The $changeStream stage is only supported on replica sets` and never
recovers.

This template ships MongoDB as a **single-node replica set with keyfile internal
authentication**, initiated automatically on first boot. The stock MongoDB entrypoint
cannot do this by itself: a replica set member that has not been initiated refuses
writes, so the root user has to be created on a standalone instance first and the
replica set initiated afterwards, against the service's private Railway hostname.
Both images are pinned by digest.

Two services deploy: Rocket.Chat (public) and MongoDB (private, on a volume). Uploads
default to GridFS, so files live in MongoDB and persist on that same volume — nothing
lands on ephemeral container disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rocketchat | `ghcr.io/bon5co/rocketchat-railway@sha256:f57793b8b6e997c6bf67992a3377b3bb01fe046405e7475fd763dd5d6c32626b` | Web service |
| mongodb | `ghcr.io/bon5co/rocketchat-railway-mongo@sha256:4581f4a1568276eb9729b0bbf55ba71072434b2b0825b8603c6d3d3d3214f9f2` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rocketchat-or-just-updated-slack-alterna)
