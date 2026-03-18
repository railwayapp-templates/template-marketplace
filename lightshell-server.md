# Deploy lightshell-server on Railway

Release server for LightShell app auto-updates and signed binaries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lightshell-server)

## About

lightshell-server is a lightweight Hono-based TypeScript server for hosting signed LightShell desktop app releases. It
   generates update manifests, verifies Ed25519 signatures, stores binaries, and provides a dashboard with download     
  analytics.                                                                                                            
                                                                                                                        
  ## About Hosting lightshell-server

  Hosting lightshell-server gives your LightShell desktop apps a dedicated update endpoint. When you build and sign a
  new release, you upload it to the server via CLI or curl. The server computes SHA256 hashes, stores the binary, and
  generates an update manifest. Your app's built-in updater checks this endpoint periodically, downloads verified
  updates, and applies them. The included web dashboard shows version history, per-platform download counts, and storage
   health — no authentication required for read-only access. The server supports local filesystem, S3, and Cloudflare R2
   storage backends.

  ## Common Use Cases

  - Hosting auto-update infrastructure for LightShell desktop apps across macOS and Linux
  - Providing a central release dashboard with download analytics and version history
  - Serving signed, SHA256-verified update manifests to the LightShell updater API

  ## Dependencies for lightshell-server Hosting

  - Bun runtime (auto-detected by Railway)
  - Persistent volume at `/data` for local storage backend (recommended to add after deploy)

  ### Deployment Dependencies

  - [LightShell Documentation — Release Server](https://lightshell.dev/docs/guides/auto-updates/release-server/)
  - [LightShell Documentation — Signing Keys](https://lightshell.dev/docs/guides/auto-updates/signing-keys/)
  - [lightshell-server GitHub Repository](https://github.com/lightshell-dev/lightshell-server)

  ## Why Deploy lightshell-server on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't
   have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying lightshell-server on Railway, you are one step closer to supporting a complete full-stack application
  with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lightshell-server | [lightshell-dev/lightshell-server](https://github.com/lightshell-dev/lightshell-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `PUBLIC_KEY` | - | Ed25519 public key for verifying release signatures. Generate one:   https://lightshell.dev/docs/guides/auto-updates/signing-keys/ |
| `STORAGE_PATH` | /data/releases | - |
| `STORAGE_BACKEND` | local | - |
| `LIGHTSHELL_API_KEY` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Svelte, CSS, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/lightshell-server)
