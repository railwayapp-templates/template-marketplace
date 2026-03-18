# Deploy Virtual VSCode | Code Server [Updated Mar ’26] on Railway

Code Server [Mar ’26] Host Latest Version of Code Server on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/virtual-vscode)

## About

[What is virtual-vscode? Your description in roughly ~50 words.]
**virtual-vscode** is an open-source project that allows you to run a VS Code environment entirely in your browser, powered by a back-end container. This is not an official Microsoft product. It provides remote code editing, terminal access, and VS Code extensions—all accessible via a browser interface[https://github.com/coder/deploy-code-server](https://github.com/coder/deploy-code-server).

Hosting **virtual-vscode** involves running the project in a cloud container, which exposes a web-accessible VS Code environment. Deployment requires resource allocation for CPU/RAM, HTTPS access, and environment variable configuration for secure authentication (e.g., password, port). Railway makes this process straightforward by automating infrastructure setup, deployment from the GitHub repo, and networking. You set up persistent storage for your files and install any necessary runtime tools/extensions. Access is managed through secure URLs and can include integration with version control and workspace folders.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deploy-code-server | [Shinyduo/virtual-vscode](https://github.com/Shinyduo/virtual-vscode) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIT_REPO` | - | This is the GITHUB Repo, that you need to work on Virtual VS Code |
| `PASSWORD` | (secret) | Password to enter your VS Code |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/virtual-vscode)
