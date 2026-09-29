# Deploy prosody-template on Railway

Your own XMPP chat server - federated, standard, one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prosody-template)

## About

Deploy Prosody — the modern XMPP chat server — on Railway with one click. The
template runs the official `prosodyim/prosody:13.0` image in a single service
with a persistent volume for accounts and message archives. Your Railway
domain becomes the XMPP virtual host automatically
(`PROSODY_VIRTUAL_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}`), BOSH and WebSocket
endpoints are exposed through Railway's TLS, and a TCP proxy serves native
XMPP clients on port 5222. A small wrapper entrypoint adapts the
Railway-mounted (root-owned) volume to Prosody's needs, generates the vhost
certificate, and creates the `admin` account exactly once at first boot.

Hosting your own XMPP server gives you a private, standards-based chat
back-end: no vendor lock-in, no per-seat pricing, works with every XMPP
client on every platform. On Railway it runs as a single ~512 MB service
with one volume (roughly $3–5/month). The template configures:

- `PROSODY_VIRTUAL_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}` — your Railway domain is the XMPP host
- `PROSODY_ADMINS=admin@${{RAILWAY_PUBLIC_DOMAIN}}` — admin JID
- `PASSWORD=${{secret(24, ...)}}` — fresh random admin password per deployment (Variables tab)
- `DOMAIN=${{RAILWAY_PUBLIC_DOMAIN}}` — used for the one-time first-boot admin registration
- HTTP domain on port 5280 (websocket `wss://…/xmpp-websocket`, BOSH
  `https://…/http-bind`), TCP proxy on 5222 (native clients, STARTTLS)
- Volume at `/var/lib/prosody` — accounts, roster, MAM archive (30-day
  expiry), and the self-signed vhost certificate

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prosody | [lNamelessl/prosody-railway-template](https://github.com/lNamelessl/prosody-railway-template) | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5222
- **Volume:** `/var/lib/prosody`

**Category:** Starters · **Languages:** Shell, Dockerfile, Lua

[View on Railway →](https://railway.com/deploy/prosody-template)
