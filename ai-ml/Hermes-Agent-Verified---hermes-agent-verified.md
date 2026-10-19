# Deploy Hermes Agent (Verified) on Railway

[Premium Template] Easy Way To Create Advanced AI Agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-verified)

## About

Hermes Agent is the self-improving AI agent by Nous Research. It creates skills from experience, persists memory across sessions, runs autonomous workflows, and connects to Telegram, Discord, Slack, and more. This template deploys a production-ready instance on Railway with a local terminal backend, persistent volume, Basic Auth, and Remote Gateway support.

Railway runs the Hermes Agent web dashboard on a public HTTPS domain with durable storage and a managed restart policy. This template uses the official nousresearch/hermes-agent:latest Docker image and mounts a Railway volume at /opt/data, which is the official HERMES_HOME path, so sessions, memory, skills, configuration, and workspace survive redeploys. The gateway starts under s6-overlay and binds to Railway's injected port. The terminal backend is set to local so commands run inside the container without Docker-in-Docker. Basic Auth protects the dashboard. The API server is disabled by default to reduce the attack surface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Internal port the Hermes dashboard binds to. Railway injects the public HTTPS port automatically. Do not change unless you know what you are doing. |
| `HERMES_HOME` | /opt/data | Path where Hermes stores sessions, memory, skills, config, and workspace. Must match the volume mount path /opt/data. |
| `TERMINAL_ENV` | local | Terminal backend environment. Set to local so commands run in the container and avoid Docker daemon errors on Railway. |
| `XDG_DATA_HOME` | /opt/data/data | Directory for user-specific data files. Set to /opt/data/data so Hermes state database, skills, and other application data persist across redeploys on the Railway volume. |
| `API_SERVER_KEY` | {{secret(64, "abcdef0123456789")}} | Bearer token for authenticating API server requests. Auto-generated if left as a template secret. |
| `XDG_CACHE_HOME` | /opt/data/cache | Directory for user-specific non-essential data caches. Set to /opt/data/cache so Chromium, browser tools, and other XDG-compliant programs write caches to the persistent volume instead of the ephemeral container filesystem. |
| `API_SERVER_HOST` | 0.0.0.0 | Host interface the API server binds to. 0.0.0.0 means all interfaces. Internal only, not exposed publicly. |
| `API_SERVER_PORT` | 8080 | Internal port for the API server. Default 8080. Not exposed publicly. |
| `XDG_CONFIG_HOME` | /opt/data/config | Directory for user-specific configuration files. Set to /opt/data/config so Hermes and tool configuration files persist across redeploys on the Railway volume. |
| `HERMES_DASHBOARD` | 1 | Enable the web dashboard. Set to 1. Required for browser access and Remote Gateway connections. |
| `HERMES_LOG_LEVEL` | info | Log verbosity: debug, info, warn, or error. Use info for production. |
| `HERMES_MAX_STEPS` | 25 | Maximum agent steps per turn before auto-stopping. 25 balances thoroughness with cost. |
| `HERMES_TUI_THEME` | dark | Terminal UI theme. Use dark or light. Affects the web TUI at /tui. |
| `TERMINAL_BACKEND` | local | Terminal execution backend. Use local on Railway. Other values: docker, ssh, modal, daytona. |
| `API_SERVER_ENABLED` | false | Enable the internal API server. Set to false to reduce attack surface. Dashboard and Remote Gateway work without it. |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 | Host interface the dashboard binds to. 0.0.0.0 means all interfaces. Railway proxies HTTPS to this port. |
| `HERMES_DASHBOARD_PORT` | 9119 | Internal dashboard port. Default 9119. Railway maps public HTTPS 443 to this port. |
| `HERMES_TOOL_LOOP_GUARD` | true | Prevent infinite tool-call loops. true stops the agent if it exceeds the step limit without progress. |
| `HERMES_TERMINAL_BACKEND` | local | Legacy alias for TERMINAL_BACKEND. Set to local for Railway compatibility. |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | Dashboard login username. Example: admin |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Dashboard login password. Use a unique password with at least 16 characters. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | 32+ byte secret for signing dashboard session cookies. Generate with openssl rand -hex 32. Keep it stable across redeploys. |

## Configuration

- **Start command:** `/init /opt/hermes/docker/main-wrapper.sh gateway run`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-verified)
