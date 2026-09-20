# Deploy PI WEB | (Just Updated) Pi Coding Agent In Your Browser, Password Protected on Railway

Pi Coding Agent web UI: basic-auth enforced, workspaces survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pi-web-or-just-updated-pi-coding-agent-i)

## About

[PI WEB](https://github.com/jmfederico/pi-web) is a web UI for the
[Pi Coding Agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent). It keeps agent
sessions alive in real workspaces — projects, files, interactive terminals, and long-running
sessions — and reaches all of it from a browser tab, including a phone.

This template deploys it as one Railway service, behind a password, with everything it writes on a
volume.

PI WEB is a Node application, and hosting it well takes three things it does not do for you.

**It ships no authentication.** This is not an oversight and upstream is explicit about it in its
own README: *"It is not a sandbox, permission system, or multi-tenant platform. Do not expose it
directly to the public internet without a trusted network, firewall, VPN, SSH tunnel, or
authenticated reverse proxy."* A Railway service has a public URL, and PI WEB's surface includes
interactive terminals and read/write access to the container's filesystem. Deployed bare, it is a
remotely drivable shell for anyone who finds the URL.

So this template does what upstream asks for. The image carries a Caddy reverse proxy that enforces
HTTP basic auth on the UI, on every `/api` route, and on the WebSocket bridge that carries terminals
and sessions. The password is generated for you as a Railway secret at deploy time, and the
container **refuses to start** if it is unset or shorter than 12 characters — there is no window in
which an unprotected instance is reachable. Verified on the live deploy: anonymous requests to `/`,
`/api/projects`, `/api/machines` and the WebSocket upgrade all return `401`; the same requests with
the password return `200` and `101`.

**It needs the agent, and the tools, in the same container.** A PI WEB with no agent installed is a
half-product. The image installs Pi Coding Agent as PI WEB's npm peer (`0.84.2`, satisfying the
`>=0.84.0` requirement) and links its `pi` binary onto the path, alongside git, a compiler
toolchain, Python, ripgrep and jq — the things an agent reaches for in a real repository.

**Its state is all on disk.** Workspaces, cloned repositories, uncommitted edits, session history,
and your Pi provider login are files, not database rows. Without a volume every one of them is
erased by the next redeploy. This template mounts a volume at `/data` and points every writable path
at it: `HOME`, the PI WEB data directory, the Pi agent directory, and the workspace root. Verified
by writing a file into a workspace, redeploying the service, and reading the same bytes back
afterwards.

**Resources.** Measured idle at **208 MB** under a 1 GB cap, so it starts on the Free (0.5 GB) and
Trial (1 GB) plans. Headroom is what you will want in practice: a coding agent running `npm install`
or a compile inside its workspace uses far more than the UI does, so give it a Hobby plan service if
you intend to build anything substantial in it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pi-web | `ghcr.io/bon5co/pi-web-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PI_WEB_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/pi-web-or-just-updated-pi-coding-agent-i)
