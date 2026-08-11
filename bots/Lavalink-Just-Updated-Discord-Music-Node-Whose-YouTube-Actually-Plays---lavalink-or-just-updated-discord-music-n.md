# Deploy Lavalink | (Just Updated) Discord Music Node Whose YouTube Actually Plays on Railway

Discord audio node with a working YouTube source and a real password.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lavalink-or-just-updated-discord-music-n)

## About

Lavalink is a standalone audio-sending node for Discord bots: your bot asks it to load and
play a track, and it does all the fetching, decoding and opus encoding, so the bot process
never blocks on audio. This template runs Lavalink 4.2.2 as a single service with a
working YouTube source, a password that is generated for you, and a heap sized to whatever
plan you deploy it on.

Lavalink is a JVM service that holds a WebSocket connection to your bot and a UDP voice
connection to Discord for every playing guild, so it wants steady CPU and RAM rather than
disk. It keeps no state on disk — sessions and players live in memory — which is why this
template ships no volume and no database.

Three things usually go wrong when it is hosted from a generic template, and this one fixes
all three before you see it:

- **The password.** Lavalink accepts an empty `lavalink.server.password`, and an empty
  password is not "auth off" in a way you would notice: a request with no `Authorization`
  header gets `401`, but a request whose `Authorization` header is empty gets `200` — the
  node is open, and anybody who finds the URL can stream audio on your bill. Here the
  password is generated at deploy time, and the container refuses to start if it is blank.
- **YouTube.** The built-in YouTube source is deprecated and the plugin has to be current;
  on the version most templates pin, every YouTube lookup returns
  `"Something went wrong while looking up the track."` This image bakes youtube-plugin
  1.18.2 in, with an explicit client list, and no jar is downloaded at boot.
- **Memory.** A hardcoded `-Xmx768m` applies whether you run 1 GB or 32 GB. The entrypoint
  reads the container's cgroup limit and gives the JVM 70% of it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lavalink | `ghcr.io/bon5co/lavalink-railway:4.2.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LAVALINK_SERVER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/lavalink-or-just-updated-discord-music-n)
