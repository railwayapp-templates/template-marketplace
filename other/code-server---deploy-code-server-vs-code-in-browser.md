# Deploy code-server on Railway

VS Code in the browser with a persistent home and password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-code-server-vs-code-in-browser)

## About

This template runs the official codercom/code-server 4.141.0 image on one Railway service: VS Code in the browser, on a volume, behind a generated password. Scripts in .entrypoint.d reinstall toolchains on every boot. It suits one developer, not a team.

This template runs the official codercom/code-server 4.141.0 image as a single service, with the whole home directory on a Railway volume at /home/coder. Your projects, settings, extensions and shell history stay yours and survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | `codercom/code-server:4.141.0@sha256:72ab24b5680ee597dd647b30d82625752f40109b5f61bef90ffbf1ea1f02dbb8` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port code-server listens on; the public domain routes here. |
| `PASSWORD` | (secret) | Login password, generated per deploy. Copy it from this Variables tab to sign in. |
| `ENTRYPOINTD` | /home/coder/.entrypoint.d | Executable scripts in /home/coder/.entrypoint.d run as coder on every boot (e.g. apt installs). |
| `DEFAULT_WORKSPACE` | /home/coder/workspace | Folder the editor opens by default (/home/coder/workspace); keep it under /home/coder, the volume. |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; W="${DEFAULT_WORKSPACE:-/home/coder/workspace}"; if [ "$(stat -c %u /home/coder)" != 1000 ]; then cp -an /etc/skel/. /home/coder/; chown -R 1000:1000 /home/coder; echo "volume: /home/coder handed to coder (uid 1000)"; fi; runuser -u coder -- mkdir -p "$W" "${ENTRYPOINTD:-/home/coder/.entrypoint.d}"; exec runuser -u coder -- /usr/bin/entrypoint.sh --bind-addr 0.0.0.0:8080 --disable-telemetry --enable-remote-storage "$W"'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other

[View on Railway →](https://railway.com/deploy/deploy-code-server-vs-code-in-browser)
