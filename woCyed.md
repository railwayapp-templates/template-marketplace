# Deploy smee.io on Railway

Webhook payload delivery service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/woCyed)

## About

## Usage

Smee is a webhook payload delivery service - it receives webhook payloads, and sends them to listening clients. You can generate a new channel by visiting deployed url, and get a unique URL to send payloads to.

> **Heads up**! Smee.io is intended for use in development, not for production. It's a way to inspect payloads through a UI and receive them on a local machine, not as a proxy for production applications.

## How it works

Smee works with two components: the public self-hosted website and the [`smee-client`](https://github.com/probot/smee-client). They talk to each other via [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), a type of connection that allows for messages to be sent from a source to any clients listening.

This means that channels are just an abstraction - all Smee does is get a payload and sends it to any _actively connected clients_.

## Deploying your own Smee.io

Smee.io is a simple Node.js application. You can deploy it with this template!

Don't forget to point `smee-client` to your instance of `smee.io`:

```shell
smee --url https://your-smee.up.railway.app/channel
```

## FAQ

**How long do channels live for?**

Channels are always active - once a client is connected, Smee will send any payloads it gets at `/:channel` to those clients.

**Should I use this in production?**

No! Smee is not designed for production use - it is a development and testing tool. Note that channels are _not authenticated_, so if someone has your channel ID they can see the payloads being sent, so it is _not_ secure for production use.

**Are payloads ever stored?**

Webhook payloads are never stored on the server, or in any database; the Smee.io server is simply a pass-through. However, we do store payloads in `localStorage` in your browser, so that revisiting `https://smee.io/:channel` will persist the payloads you saw there last.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| smee | `ghcr.io/probot/smee.io` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/woCyed)
