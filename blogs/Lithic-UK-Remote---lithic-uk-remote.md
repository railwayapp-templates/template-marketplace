# Deploy Lithic-UK-Remote on Railway

Template for cloud-hosting Lithic PK on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lithic-uk-remote)

## About

Lithic-UK-Remote is a lightweight, self-hosted WebDAV server designed specifically for Lithic: Unitary Knowledge. By serving TiddlyWiki strictly over WebDAV without node.js, it mirrors the local-first experience while enabling secure, remote synchronization across all your devices.

Deploying Lithic-UK-Remote means bringing your local-first digital brain to the cloud without sacrificing data sovereignty. Instead of running a complex application server, this template spins up a lean, dedicated WebDAV container. It handles the secure transmission of your static HTML notebook files, providing a reliable sync target for TiddlyWiki. 

Hosting this architecture on Railway removes the tedious sysadmin overhead. The deployment automatically provisions the environment, mounts a persistent volume for your `/data` directory so your notes survive restarts, and configures graceful serverless idling to spin down the container and save resources when you aren't actively syncing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lithic-UK | [Xyvir/Lithic-UK](https://github.com/Xyvir/Lithic-UK) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LITHIC_USER` | (secret) | Choose a username for WebDAV access.  |
| `LITHIC_PASSWORD` | (secret) | BasicAuth Password |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** HTML, JavaScript, Shell, Dockerfile, Rust

[View on Railway →](https://railway.com/deploy/lithic-uk-remote)
