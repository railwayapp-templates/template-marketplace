# Deploy OpenVSCode Server on Railway

OpenVSCode Server 1.105: VS Code in the browser, token-protected.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openvscode-server)

## About

OpenVSCode Server is Gitpod's build of upstream VS Code that runs on a server and opens in any browser. It gives you the regular VS Code editor, terminal, Git integration and Open VSX extensions, without the modifications code-server makes, so behaviour and settings match the desktop editor closely.

This template runs the official `gitpod/openvscode-server:1.105.1` image as one service. A generated connection token protects the editor: requests without it get 403, and `OPENVSCODE_URL` holds a ready-made link that includes the token. The workspace folder `/home/workspace` is a Railway volume, so files, extensions and settings survive redeploys. The container runs as root so the editor can write to the root-owned volume and install packages in the terminal. It fits the Hobby plan; language servers and builds need more memory. Treat the token like a password, because anyone holding it gets a full terminal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openvscode | `gitpod/openvscode-server:1.105.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `OPENVSCODE_TOKEN` | (secret) |

## Configuration

- **Start command:** `sh -c 'exec ${OPENVSCODE_SERVER_ROOT}/bin/openvscode-server --host :: --port 3000 --connection-token "$OPENVSCODE_TOKEN" --default-folder /home/workspace'`
- **Healthcheck:** `/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/workspace`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openvscode-server)
