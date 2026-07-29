# Deploy Code Server on Railway

Run VS Code in your browser, anywhere. It's Official code-server by Coder.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-official)

## About

**Code Server Official** is the official open-source project by Coder that runs Visual Studio Code in the browser. Deploy a full-featured IDE on any machine and access it from anywhere — no local install required. Edit code, use the terminal, install extensions, and develop remotely with the same VS Code experience you already know.

![Code Server](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/codercom/code-server)

This template deploys the official `codercom/code-server` image on Railway with password authentication. Before deploying, you set your own password in the template form. A persistent volume is mounted at `/home/coder` so your projects, settings, and extensions survive restarts. After deploy, open the public URL, enter the password you chose, and start coding immediately in a full VS Code environment running in the cloud. Ideal for remote development, demos, teaching, or when you need a consistent IDE without managing a local setup.

**Login**
- Password: the one you set before clicking Deploy
- No username required — password only

![VS Code Server](https://imgur.com/dThqAYW.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | `codercom/code-server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/code-server-official)
