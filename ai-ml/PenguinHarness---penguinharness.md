# Deploy PenguinHarness on Railway

Multi-agent platform where agents build, evaluate and optimize agent apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penguinharness)

## About

[PenguinHarness](https://github.com/Prism-Shadow/penguin-harness) is an open-source multi-agent
platform for building agent applications: you describe what you want in a sentence, and its agents
scaffold, write, evaluate and optimize the app, with every model request visible in a Trace view.
It is normally a local-first desktop or CLI tool.

This template runs the same server on Railway with its whole data root on a volume, behind an admin
account whose password is generated for your deployment. One service, one volume, a public domain,
and nothing to fill in on the deploy form.

The server is one Node process that serves the web app, the agent runtime, the project workspaces,
the terminals and the SQLite database underneath them. Everything it owns lives in a single data
root, so putting a volume at `/data` is the whole persistence story: projects, traces, sessions,
installed plugins, model credentials and the agent's own working tree.

Authentication is on by default here, which is worth stating plainly because it is unusual. Every
route except the install probe answers 401 without a session. What upstream does when no password is
configured is print a one-time claim link to the container log, which is a sensible default on a
laptop and a poor one on a public URL. So this template generates the admin password instead and the
container refuses to start without one — the account exists the moment the first deploy finishes,
and the credential is in the Variables tab rather than in a log line.

Models are yours to choose. The app ships presets for DeepSeek, Kimi, GLM, Qwen, GPT, Gemini, Claude
and others, and any OpenAI-protocol endpoint works, so nothing is proxied through a third party. You
add a key from the Models page after signing in, and it is stored on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| penguin | [RockinPaul/penguin_railway_template](https://github.com/RockinPaul/penguin_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port Railway's healthcheck probes and the public domain targets. Leave as is. |
| `PENGUIN_SEED_ADMIN_PASSWORD` | (secret) | Password for the built-in 'admin' account, created on the first boot. Read it from this service's variables after deploying, then change it in the app. |

## Configuration

- **Healthcheck:** `/api/install`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/penguinharness)
