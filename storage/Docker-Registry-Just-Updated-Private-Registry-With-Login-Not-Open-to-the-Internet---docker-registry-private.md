# Deploy Docker Registry | (Just Updated) Private Registry With Login, Not Open to the Internet on Railway

Private Docker registry with login. Images survive redeploys, deletes work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docker-registry-private)

## About

Docker Registry is the CNCF [distribution](https://github.com/distribution/distribution)
project — the reference implementation of the OCI registry API, and the same
software Docker Hub was built on. It stores and serves container images over
`docker push` and `docker pull`, with no account, no rate limit and no pull
quota, on storage you own.

This listing runs `registry:3.0.0` pinned by digest, behind **basic
authentication that is configured for you on first boot**.

A registry is a stateful HTTP service: layers land on disk as they are pushed,
and the whole point of it is that they are still there tomorrow. Two things
therefore decide whether a hosted registry is usable, and both are easy to get
wrong.

The first is storage. Without a persistent volume the filesystem driver writes
into the container, so every redeploy silently discards every image that was
ever pushed. Here the volume is mounted at `/var/lib/registry`, and the
container refuses to start if that path is not writable — a registry that
answers its healthcheck while dropping every push is the failure that is
hardest to notice from outside.

The second is authentication. Distribution reads its entire configuration from
environment variables **except** credentials: `REGISTRY_AUTH_HTPASSWD_PATH` is a
file path, and only bcrypt hashes are accepted in it. So a registry deployed
from environment variables alone is anonymous, and on a public domain that means
anyone who finds the URL can push, pull and overwrite every tag. This image
builds that htpasswd file from `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` at
boot, so the deploy is closed from its first second.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| registry | `ghcr.io/bon5co/docker-registry-railway@sha256:40ef4b519a8cbbc88e096a7423c141681edba46306cf6deb1a0e642640972710` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REGISTRY_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/registry`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/docker-registry-private)
