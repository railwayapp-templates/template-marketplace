# Deploy DeepSeek Harness on NixOS | (Just Updated) Agent With All of Nixpkgs on Railway

DeepSeek's coding agent on nix. Password-gated, any package it needs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepseek-harness-on-nixos-or-just-update)

## About

DeepSeek Harness (`dsh`) is DeepSeek's own open-source agent harness — the layer that turns a model
into an agent that can read your files, run shell commands, search the web, and keep working across
a long task. Everything in it is a plugin: models, tools, skills, sessions, sandboxes, storage,
loops, scheduling, and the UI itself.

This is the **nix** flavor. Same harness, same password gate, same persistence as the Ubuntu
template — but the agent's toolbox is the nix package manager instead of apt, so it can pull any of
nixpkgs at an exact pinned version, mid-session, without root.

The hard part of hosting this is not the app, it is the exposure.

DeepSeek Harness has no authentication. Upstream states this plainly — "No TLS, auth, or origin
policy" — and its CLI *refuses* to bind a public address, erroring with "it would expose remote
code execution to the network". That refusal is correct: an agent with a shell tool on an open URL
is a remote-code-execution box on your Railway account, and a persistent volume means anyone who
finds it keeps their foothold across your redeploys.

So this template does not bypass that refusal. `dsh` stays bound to loopback exactly as upstream
intends, and a Caddy reverse proxy owns the public port, enforces HTTP basic auth, and forwards to
loopback — rewriting `Host` and `Origin` so the harness's own anti-DNS-rebinding fence stays
satisfied through the proxy. Unauthenticated requests to the UI, the API and the WebSocket all
return `401`, including ones that forge a loopback `Host` header. The gate cannot be switched off:
leave the password blank and the container generates a strong one on first boot and prints it once
to your deploy log.

The base is the nix package manager on a minimal userland — not a full NixOS with systemd, which in
an unprivileged container buys nothing. What you actually want from nix here is available at
runtime: the agent runs `nix profile add nixpkgs#ripgrep` (or ffmpeg, or postgres, or a specific
Python) and gets a cache-copied, exactly-pinned build in seconds, unprivileged, with no rebuild and
no sandbox flags.

Measured at 135 MiB idle — lighter than the Ubuntu flavor. **Plan floor is 1 GB (Trial or Hobby),
not Free.** Idle fits Free's 0.5 GB easily, but installing packages at runtime spikes to roughly
590 MB during the nixpkgs channel unpack, and Free's cap kills that with exit 137 and no useful
error. Since runtime installs are the whole point of this flavor, 1 GB is the honest floor.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deepseek-harness-nixos | `ghcr.io/bon5co/deepseek-harness-nixos-railway:0.1.0-rc.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DSH_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/dsh`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deepseek-harness-on-nixos-or-just-update)
