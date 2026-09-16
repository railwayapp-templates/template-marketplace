# Deploy The Lounge on Railway

Web IRC client that stays connected for you on every device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/thelounge)

## About

The Lounge is a self-hosted web IRC client that stays connected to your networks whether or not a browser is open. Deploy The Lounge on Railway and you get the always-on behaviour people used to run a separate bouncer for, wrapped in a modern web interface: open the URL on a laptop or a phone and you resume the same session, with the same channels, nick and scrollback. It is the maintained successor to Shout, it is MIT licensed, and it is what most open-source communities reach for when they want IRC to behave like a normal chat app.

This template runs one Railway service, `thelounge`, built from the [gridalpha/thelounge-railway](https://github.com/gridalpha/thelounge-railway) repository on top of the official `thelounge/thelounge` image. Browser traffic reaches it over HTTPS on a Railway domain, the service opens outbound TLS connections to whichever IRC networks you add, and all state — accounts, channel history in SQLite, uploads and preview thumbnails — lives on one volume at `/var/opt/thelounge`. Self-host The Lounge here and the whole deployment is a container plus a disk.

![Diagram of The Lounge service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789376683/thelounge-architecture.webp)

IRC has no concept of a message you missed: close your client and the conversation carries on without you, which is why its regular users have always run something that stays connected for them. The Lounge is that something and the client at once — a Node.js server holding the IRC sockets, recording history, and serving a web UI to every device you sign in from.

Key features:

- Always-on connections, so you never miss channel activity while your laptop is shut
- One account across devices — desktop, tablet and phone share one live session
- Searchable SQLite history with a retention policy you control
- Multi-user, so a small team can share one instance with separate accounts
- File uploads, link previews, push notifications, themes, SASL and client certificates

One process holds both the IRC connections and the client state, so the deployment is deliberately a single service with everything durable on its volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| thelounge | [gridalpha/thelounge-railway](https://github.com/gridalpha/thelounge-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9000 | HTTP listen port and health-check target |
| `THELOUNGE_USER` | (secret) | Account created on first boot |
| `THELOUNGE_DEBUG` | false | IRC protocol trace in the deploy log |
| `THELOUNGE_THEME` | default | Built-in theme name |
| `THELOUNGE_PUBLIC` | false | true removes accounts entirely |
| `THELOUNGE_PASSWORD` | (secret) | Password for that account |
| `THELOUNGE_PREFETCH` | false | Fetch link previews for pasted URLs |
| `THELOUNGE_FILE_UPLOAD` | true | Allow signed-in users to upload files |
| `THELOUNGE_MAX_HISTORY` | 10000 | In-memory lines kept per channel |
| `THELOUNGE_NETWORK_TLS` | true | Pre-filled TLS setting |
| `THELOUNGE_LOCK_NETWORK` | false | Restrict users to the network below |
| `THELOUNGE_NETWORK_HOST` | irc.oftc.net | Pre-filled IRC server host |
| `THELOUNGE_NETWORK_JOIN` | - | Channels joined on connect |
| `THELOUNGE_NETWORK_NAME` | OFTC | Pre-filled network name |
| `THELOUNGE_NETWORK_NICK` | thelounge%% | Pre-filled nick, % becomes a digit |
| `THELOUNGE_NETWORK_PORT` | 6697 | Pre-filled IRC server port |
| `THELOUNGE_STORAGE_POLICY` | true | Periodic cleanup of stored history |
| `THELOUNGE_LOG_MAX_AGE_DAYS` | 30 | How long history is kept |
| `THELOUNGE_MAX_FILE_SIZE_KB` | 10240 | Upload size cap |
| `THELOUNGE_NETWORK_USERNAME` | (secret) | Pre-filled IRC username |
| `THELOUNGE_PREFETCH_STORAGE` | true | Serve preview thumbnails from this origin |
| `THELOUNGE_LOG_DELETION_POLICY` | statusOnly | statusOnly or everything |
| `THELOUNGE_NETWORK_SASL_ACCOUNT` | - | SASL account, required by Libera.Chat |
| `THELOUNGE_NETWORK_SASL_PASSWORD` | (secret) | SASL password |
| `THELOUNGE_PREFETCH_MAX_IMAGE_SIZE_KB` | 2048 | Preview image size cap |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/thelounge`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/thelounge)
