# Deploy Vert on Railway

Vert is a lightweight tool that turns one file format into another.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vert)

## About

Vert is a lightweight and flexible file conversion service that transforms documents, images, audio, and other formats with minimal friction. Drop in a file, choose the target format, and Vert handles the rest quickly and consistently.

Hosting Vert involves running a small server that exposes its conversion capabilities through an API or web interface. When deployed, Vert receives user uploads, processes conversions through its underlying libraries, and returns the transformed output. Hosting typically requires temporary storage, sufficient compute for processing, and basic environment configuration. Railway simplifies these needs by providing automated builds, continuous deployment, and scalable hosting that keeps Vert available with minimal upkeep.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VERT | [VERT-sh/VERT](https://github.com/VERT-sh/VERT) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PUB_ENV` | development |
| `PUB_VERTD_URL` | https://vertd.vert.sh |
| `PUB_STRIPE_KEY` | pk_live_51RDVmAGSxPVad6bQwzVNnbc28nlmzA30krLWk1fefCMpUPiSRPkavMMbGqa8A3lUaOCMlsUEVy2CWDYg0ip3aPpL00ZJlsMkf2 |
| `PUB_DONATION_URL` | https://donations.vert.sh |
| `PUB_PLAUSIBLE_URL` | https://plausible.example.com |
| `PUB_DISABLE_ALL_EXTERNAL_REQUESTS` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Svelte, TypeScript, SCSS, JavaScript, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/template/vert)
