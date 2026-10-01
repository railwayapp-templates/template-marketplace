# Deploy Filebrowser | Official Image, Pinned, No Stock Password on Railway

Official image, pinned. Generated admin password, no admin/admin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filebrowser-or-off-1)

## About

A web file manager on a persistent volume, built from the official Filebrowser image at a pinned version, with a generated admin password. It refuses to start without one.

Open the domain and log in as `admin` with the generated `ADMIN_PASSWORD` from the service variables.

The existing Filebrowser template deploys `ghcr.io/brody192/filebrowser-template:latest`, a third-party wrapper image, unpinned. Two things follow from that.

`:latest` means the version you get is whatever was pushed most recently, so two deploys a month apart are not the same software, and a redeploy can change the application under a running volume. And the wrapper is one person's repository rather than the upstream project, so what actually runs is a step removed from anything the Filebrowser maintainers publish.

That template also leaves `WEB_USERNAME` as a required field with no value, and says nothing about the password, which upstream defaults to `admin`.

This template builds on `filebrowser/filebrowser:v2.63.21`, the official image at a fixed version, with a small entrypoint that handles first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| filebrowser | [ak40u/filebrowser-railway-starter](https://github.com/ak40u/filebrowser-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/filebrowser-or-off-1)
