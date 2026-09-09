# Deploy Discord Music Bot | (Just Updated) Lavalink Included, Health-Checked on Railway

Lavalink audio server bundled and wired up, health-checked, plays at once

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-music-bot-or-just-updated-lavali)

## About

LavaMusic is an open-source Discord music bot: slash commands and a message prefix, queues,
filters, playlists, autoplay, per-guild settings and 24/7 playback. It does not decode audio
itself — like every serious Discord music bot it talks to **Lavalink**, a standalone audio
server that resolves tracks and streams them into a voice channel.

This template deploys both halves, already wired to each other. The only things you supply are
your own Discord bot token and application ID.

The thing that makes this class of bot awkward to host is that it is two programs, not one.

Every other Discord music listing in this category deploys the bot alone and then asks the
deployer for `LAVALINK_HOST` and `LAVALINK_PASSWORD` as blank, required deploy-form fields. There
is no audio server anywhere in those templates, so the deploy succeeds, the bot logs in, the
slash commands register — and every play command fails, because there is nothing to connect to.
The deployer has to go and find a public Lavalink node, or host a second one somewhere else,
before the thing they just deployed can play a single track. Nothing in the deploy surfaces that:
no listing in this category publishes a healthcheck at all, so Railway reports SUCCESS either
way.

This template ships the audio server as a service in the same project:

- **Lavalink 4.2.2** with the `youtube-source` plugin **baked into the image**, rather than
  downloaded from `maven.lavalink.dev` on every boot. A plugin fetch at start-up is a network
  dependency on someone else's Maven repository, and a coordinate that 404s is a hard boot
  failure.
- The bot's `LAVALINK_URL` and `LAVALINK_AUTH` are filled in from the Lavalink service's own
  private domain and generated password. There is no audio configuration in the deploy form.
- The Lavalink password is `${{secret(32)}}` — different on every deploy — and the server refuses
  to boot without one.

**It is also health-checked, which stock Lavalink cannot be.** Every Lavalink HTTP route requires
the `Authorization` header, so there is no endpoint a Railway healthcheck can call: an
unauthenticated probe gets 401 and the deploy fails. This image puts a small nginx gateway in
front of it that serves one unauthenticated route, `/healthz`, by making an *authenticated* call
to Lavalink's own `/version`. A 200 there means the engine answered, not merely that a container
is running. Everything else stays behind the password.

Two other things this template gets right that are easy to get wrong on Railway:

- **Railway's private network is IPv6-only.** A gateway listening on IPv4 only is unreachable
  from a sibling service over `RAILWAY_PRIVATE_DOMAIN`, so the gateway binds both.
- **Railway mounts volumes owned by root**, and the bot image runs as an unprivileged user. The
  entrypoint repairs the mount, seeds the SQLite database from the image on first boot, and
  leaves it alone afterwards — verified across a real redeploy, where the second boot neither
  re-seeded nor re-repaired anything.

The default search engine is **SoundCloud**, not YouTube. Unauthenticated YouTube playback from
a datacentre IP is not dependable, and a bot whose default source fails intermittently is worse
than one that is honest about it. Set `SEARCH_ENGINE` to `YouTube`, `Spotify`, `Deezer` or
`Apple` if you have that working from your own deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lavalink | `ghcr.io/bon5co/discord-music-railway-lavalink:4.2.2` | Web service |
| bot | `ghcr.io/bon5co/discord-music-railway-bot:4.6.7` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LAVALINK_SERVER_PASSWORD` | lavalink | (secret) |
| `TOKEN` | bot | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/discord-music-bot-or-just-updated-lavali)
