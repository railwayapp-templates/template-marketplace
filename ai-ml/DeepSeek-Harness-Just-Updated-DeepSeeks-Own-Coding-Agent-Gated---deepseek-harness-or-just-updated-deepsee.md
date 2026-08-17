# Deploy DeepSeek Harness | (Just Updated) DeepSeek's Own Coding Agent, Gated on Railway

DeepSeek's own coding agent, always on and behind a password.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepseek-harness-or-just-updated-deepsee)

## About

DeepSeek Harness (`dsh`) is DeepSeek's own open-source agent harness — the layer that turns a model
into an agent that can read your files, run shell commands, search the web, and keep working across
a long task. Everything in it is a plugin: models, tools, skills, sessions, sandboxes, storage,
loops, scheduling, and the UI itself.

Upstream ships it as `npx @deepseek-ai/dsh web`, which serves the Web UI on `127.0.0.1:3080` — your
laptop, while your laptop is awake. This template runs that same Web UI on Railway, always on,
reachable from any browser, **behind a password**.

The hard part of hosting this is not the app, it is the exposure.

DeepSeek Harness has no authentication. Upstream states this plainly — "No TLS, auth, or origin
policy" — and its CLI *refuses* to bind a public address, erroring with "it would expose remote
code execution to the network". That refusal is correct: an agent with a shell tool on an open URL
is a remote-code-execution box on your Railway account, and a persistent volume means anyone who
finds it keeps their foothold across your redeploys.

So this template does not bypass that refusal. `dsh` stays bound to loopback exactly as upstream
intends, and a Caddy reverse proxy owns the public port, enforces HTTP basic auth, and forwards to
loopback — rewriting `Host` and `Origin` so the harness's own anti-DNS-rebinding fence stays
satisfied through the proxy. The agent is never reachable from outside; the only public surface is
the authenticated proxy.

The gate cannot be switched off. Leave the password blank and the container generates a strong one
on first boot, stores it on the volume, and prints it once to your deploy log.

Also handled for you: the container listens on Railway's injected `PORT`; the healthcheck path is
answered by the proxy, since Railway's health prober cannot present credentials; the agent and the
proxy supervise each other, so if the agent dies the container exits and Railway restarts it rather
than serving a green healthcheck over a dead agent; and `node-pty` gets a real toolchain, without
which the image does not even build.

Runs on Ubuntu 24.04 with Node 24 and a full apt userland, so the agent can `apt-get install` what
it needs mid-session. There is a companion template, **DeepSeek Harness on NixOS**, that swaps the
base for the nix package manager — same gate, same persistence, reproducible pinned packages from
nixpkgs instead of apt.

Measured at 164 MiB idle under a 1 GB cap, so it fits Railway's Trial and Hobby plans comfortably.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deepseek-harness | `ghcr.io/bon5co/deepseek-harness-railway:0.1.0-rc.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DSH_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/dsh`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deepseek-harness-or-just-updated-deepsee)
