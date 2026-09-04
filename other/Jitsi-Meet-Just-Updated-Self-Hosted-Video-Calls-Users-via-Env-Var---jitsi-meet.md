# Deploy Jitsi Meet | (Just Updated) Self-Hosted Video Calls, Users via Env Var on Railway

Self-hosted video calls. Add users by setting one env var, no admin login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jitsi-meet)

## About

Jitsi Meet is a free, open-source video conferencing platform — no per-seat licence,
no call-time limit, no account required for guests. This template deploys the full
stack (web, Prosody XMPP, Jicofo, JVB) with authentication switched on, so only
users you register can start a meeting.

Jitsi Meet normally needs four coordinated services talking to each other over
internal XMPP: a web frontend, an XMPP server (Prosody), a conference focus
component (Jicofo), and a media relay (JVB). This template wires all four
together on Railway's private network and gives you one public URL for the web
frontend.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jvb | `jitsi/jvb:stable-11031` | Database |
| prosody | `jitsi/prosody:stable-11031` | Database |
| web | `jitsi/web:stable-11031` | Web service |
| jicofo | `jitsi/jicofo:stable-11031` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JVB_AUTH_USER` | jvb | (secret) |
| `JVB_AUTH_PASSWORD` | jvb | (secret) |
| `JVB_AUTH_USER` | prosody | (secret) |
| `JICOFO_AUTH_USER` | prosody | (secret) |
| `JVB_AUTH_PASSWORD` | prosody | (secret) |
| `JICOFO_AUTH_PASSWORD` | prosody | (secret) |
| `JICOFO_COMPONENT_SECRET` | prosody | (secret) |
| `JVB_AUTH_USER` | web | (secret) |
| `JICOFO_AUTH_USER` | web | (secret) |
| `JVB_AUTH_PASSWORD` | web | (secret) |
| `JICOFO_AUTH_PASSWORD` | web | (secret) |
| `JICOFO_AUTH_USER` | jicofo | (secret) |
| `JICOFO_AUTH_PASSWORD` | jicofo | (secret) |
| `JICOFO_COMPONENT_SECRET` | jicofo | (secret) |

## Configuration

- **Volume:** `/config`
- **Start command:** `/bin/sh -c '(i=0; while [ ! -f /config/prosody.cfg.lua ] && [ $i -lt 60 ]; do i=$((i+1)); sleep 2; done; sleep 5; echo "$PROSODY_USERS" | tr "," "\n" | while IFS=: read -r u p; do [ -n "$u" ] || continue; prosodyctl --config /config/prosody.cfg.lua deluser "$u@$XMPP_DOMAIN" >/dev/null 2>&1; prosodyctl --config /config/prosody.cfg.lua register "$u" "$XMPP_DOMAIN" "$p" && echo "[users] registered $u" || echo "[users] FAILED $u"; done) & exec /init'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/jitsi-meet)
