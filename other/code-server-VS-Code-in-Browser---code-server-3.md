# Deploy code-server (VS Code in Browser) on Railway

Run VS Code in your browser with persistent files and generated login.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-3)

## About

A personal VS Code workspace in the browser, using code-server 4.135.0 with Node.js, npm, Python, and a persistent home directory. This is one editor service, not the Coder control plane.

The Dockerfile pins the code-server image by digest and adds development tools. Startup initializes ownership of the mounted home, then runs the editor and integrated terminal as `coder` (UID 1000). Password authentication is explicitly enabled.

### Deploy and sign in

1. Deploy with the `/home/coder` volume attached.
2. Copy the generated `PASSWORD` from the service's Railway Variables tab.
3. Open your public HTTPS domain and sign in on the code-server login page.
4. Open a folder beneath `/home/coder`. Use Terminal → New Terminal to check `id`, `pwd`, `node --version`, and `python --version`.
5. Save an editor file, reload it, and verify it again after a restart before depending on the workspace for important work.

### Authentication and ports

- `PASSWORD` defaults to Railway's `${{secret()}}` generator. Do not use a shared or dummy password.
- Optional `HASHED_PASSWORD` accepts an upstream-supported Argon2 hash and takes precedence over `PASSWORD`; remove the plaintext variable when switching to a hash. Startup rejects empty credentials even if an old config file contains a password.
- `PORT` defaults to `8080` and is passed explicitly to the editor. Keep an explicitly configured domain target port aligned with it.
- Railway terminates HTTPS and forwards HTTP/WebSocket traffic to the container. There is no bundled SSH daemon.
- `/healthz` is an unauthenticated process-heartbeat endpoint, with a 60-second startup healthcheck allowance. It does not prove a successful editor save, authenticated session, or terminal connection.

### Persistence and access boundaries

The `/home/coder` volume stores projects, editor settings, Open VSX extensions, git configuration, and code-server configuration. Existing root-owned files are migrated without following symlinks; existing user-owned content is preserved. Keep Python virtual environments and other user-installed dependencies under the mounted home. Add system packages in the Dockerfile rather than relying on ephemeral container changes.

The upstream image includes passwordless sudo: an authenticated terminal user can become root. Running the editor as coder is not a privilege boundary. Use one workspace service for trusted users only. Integrated-terminal access includes workspace files and the application's environment; this is not isolation between untrusted developers. Back up the home volume separately and test recovery before upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [leoisadev1/railway-template-code-server](https://github.com/leoisadev1/railway-template-code-server) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/code-server-3)
