# Deploy Docker Registry | Private, Password Required, Images on a Volume on Railway

Private Docker registry on Railway — password required, images on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docker-registry-or-private-password-requ)

## About

A private Docker registry: the CNCF `registry` (distribution 3.1) behind a password, with images on a volume. It refuses to start without credentials, so it is never an open file host on a public domain.

Nothing to fill in. The template generates the password; find it in the Registry service's variables.

One service, built from [ak40u/docker-registry-railway-starter](https://github.com/ak40u/docker-registry-railway-starter):

- **Registry**: the Docker Registry HTTP API, behind HTTP basic authentication, with image layers on a volume (public)

```bash
docker login  -u admin
docker tag myapp /myapp:1.0
docker push /myapp:1.0
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Registry | [ak40u/docker-registry-railway-starter](https://github.com/ak40u/docker-registry-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `AUTH_PASSWORD` | (secret) |
| `AUTH_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/registry`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/docker-registry-or-private-password-requ)
