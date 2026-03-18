# Deploy Reposilite on Railway

Lightweight and easy-to-use repository manager for Maven-based artifacts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reposilite)

## About

Hosting reposilite means running the server, exposing it over HTTP, and attaching persistent storage for your artifacts. Since it runs on Java, you can deploy it easily using Docker.

In practice, you’ll need:

* A Java runtime (or Docker)
* A persistent volume for repository data
* A public URL or port configuration
* Optional authentication setup

On Railway, you can deploy the official Docker image, mount a volume for `/data`, and set environment variables. Railway handles networking, scaling, and infrastructure so you can focus on publishing and managing artifacts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Reposilite | `dzikoysk/reposilite` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TEMP_NAME` | admin | This will be the name used to sign in for the first time. |
| `TEMP_SECRET` | (secret) | This will be the secret used to sign in. Make sure it is safe! |

## Configuration

- **Start command:** `/bin/sh -c "java -jar reposilite.jar --token ${TEMP_NAME}:${TEMP_SECRET} --port ${PORT}"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/reposilite)
