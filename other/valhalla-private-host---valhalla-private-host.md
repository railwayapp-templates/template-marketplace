# Deploy valhalla-private-host on Railway

Valhalla private-room mailbox host: source build, /data volume, TCP proxy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valhalla-private-host)

## About

A participant-controlled Valhalla private-room mailbox: a Rust source build of
`vhalla private-host` from
[hraness/valhalla](https://github.com/hraness/valhalla) listening on loopback
behind a small TCP bridge, with host state persisted on a `/data` volume.

**In development.** Do not host sensitive data yet.

The host is a mailbox for a Valhalla private room: it stores opaque ciphertext
under per-credential quotas and serves it to room members over pinned TLS 1.3.
The participants control the host; Railway is only the infrastructure provider
they chose. The application listener stays on loopback inside the container
and only a small `socat` bridge on port 19473 is exposed through Railway's TCP
proxy. Host state (CA, member tokens, mailbox) lives on the attached `/data`
volume and survives redeploys.

The template configures everything the service needs:

- `vhalla` built from the repository with the `experimental-private` feature set
- A persistent `/data` volume holding the host home
- A public TCP proxy onto the service's application port (19473)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valhalla-private-host | [hraness/valhalla](https://github.com/hraness/valhalla) | Database |

## Configuration

- **TCP Proxies:** 19473
- **Volume:** `/data`

**Category:** Other · **Languages:** Rust, JavaScript, Python, TypeScript, TLA, HTML, CSS, Lean, Shell, C, Dockerfile

[View on Railway →](https://railway.com/deploy/valhalla-private-host)
