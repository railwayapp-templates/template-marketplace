# Deploy Paperclip on Railway

Host Paperclip with authenticated access and persistent agent state.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-3)

## About

Paperclip is an open-source control plane for organizing teams of AI agents
around goals, roles, tasks, approvals, budgets, and persistent operational
context. This template runs Paperclip's official immutable image as one
authenticated Railway service, with durable application state stored on a
required Railway volume.

Hosting Paperclip involves serving its web application, running its embedded
PostgreSQL database, preserving its local secrets key and agent workspaces,
and connecting selected agent runtimes. This template uses one service and one
volume mounted at `/paperclip`, exposes port 3100 over Railway HTTPS, and
checks `/api/health`. The official image includes Claude Code, Codex, OpenCode,
and Gemini CLIs. Provider credentials remain optional deployer inputs, while
gateway and HTTP adapters connect to separately operated endpoints. One
replica is required because the embedded database and mounted volume are
single-writer state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperclip | `ghcr.io/paperclipai/paperclip@sha256:17e54b1fd1ffcc3a575cf6c23cd6c364f89cf67614481a4176749d1c6a293507` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Listen on the container network interface. |
| `PORT` | 3100 | Internal HTTP port used by Paperclip and Railway public networking. |
| `USER_GID` | 1001 | Force a safe group remap so the upstream entrypoint takes ownership of Railway's root-owned volume before starting as non-root. |
| `USER_UID` | 1000 | Preserve the upstream image owner's UID so embedded PostgreSQL can prepare its native runtime under /app. |
| `XAI_API_KEY` | (secret) | Optional xAI credential for a configured provider-specific CLI path. |
| `GEMINI_API_KEY` | (secret) | Optional restricted Gemini API credential for the experimental Gemini local adapter. |
| `GOOGLE_API_KEY` | (secret) | Optional Google credential accepted by the Gemini CLI as an alternative to GEMINI_API_KEY; do not require both. |
| `OPENAI_API_KEY` | (secret) | Optional credential for the bundled Codex local adapter. |
| `PAPERCLIP_HOME` | /paperclip | Persistent Paperclip home directory; must match the volume mount. |
| `ANTHROPIC_API_KEY` | (secret) | Optional credential for the bundled Claude Code local adapter. |
| `BETTER_AUTH_SECRET` | (secret) | Template-generated 256-bit hexadecimal session-signing secret; the pinned release also uses it for local-agent JWTs. |
| `OPENROUTER_API_KEY` | (secret) | Optional OpenRouter credential for a configured provider-specific CLI or plugin path. |
| `PAPERCLIP_PUBLIC_URL` | - | Canonical public HTTPS URL used by authentication and callbacks. |
| `PAPERCLIP_DEPLOYMENT_MODE` | authenticated | Require users to authenticate; local_trusted is unsafe for a public Railway domain. |
| `PAPERCLIP_TELEMETRY_DISABLED` | 1 | Disable anonymous usage telemetry by default; remove only when the deployer deliberately opts in. |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | public | Apply Paperclip's stricter policy for an internet-facing deployment. |
| `PAPERCLIP_AUTH_DISABLE_SIGN_UP` | false | Keep sign-up enabled for initial ownership setup; change to true immediately after onboarding. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/paperclip-3)
