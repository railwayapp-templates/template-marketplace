# Deploy Firefox | (Just Updated) Remote Browser, Real Login & Profile Survives Redeploys on Railway

Remote Firefox desktop with real login; profile survives every redeploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firefox-or-just-updated-remote-browser-r)

## About

A full **Firefox** desktop in your browser, one click, no local install. It is the
[jlesage/firefox](https://github.com/jlesage/docker-firefox) web desktop wrapped so
it fits Railway: real login gates the whole session, the browser profile lives on a
Railway volume — so your bookmarks, saved logins, cookies, history and extensions
survive a redeploy instead of vanishing with the container — and the service honours
the port Railway assigns, so its healthcheck actually passes.

The service runs a single container: a pinned Firefox web desktop served over noVNC.
Every request is gated by real HTTP-layer authentication, not just a raw VNC
password, and both the web login and the VNC channel get a random password per
deploy — the container refuses to start without one, so the desktop is never exposed
with empty or shared credentials. The profile directory is mounted on a volume at the
path Firefox actually uses, and CJK fonts are enabled so Japanese, Chinese and Korean
pages render instead of showing empty boxes. TLS is terminated at Railway's edge, so
the container speaks plain HTTP behind it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Firefox | `ghcr.io/bon5co/firefox-railway:151.0.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VNC_PASSWORD` | (secret) |
| `WEB_AUTHENTICATION_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/firefox-or-just-updated-remote-browser-r)
