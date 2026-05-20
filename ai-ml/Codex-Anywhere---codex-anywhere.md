# Deploy Codex Anywhere on Railway

Run Codex from a Railway server and connect from anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-anywhere)

## About

Codex Anywhere is a persistent Railway-hosted remote machine for OpenAI Codex. Deploy the template, connect over SSH from the Codex desktop app, and keep working from the same isolated environment with persistent projects, CLI auth, Railway tooling, and Codex sessions.

Hosting Codex Anywhere on Railway gives you a remote development machine that is ready for Codex. The setup flow is simple: install and log in with the Railway CLI, deploy the template, create an SSH key, register the public key with Railway, and run `railway ssh config` to add a named OpenSSH host. From the Codex desktop app, choose the `codex-anywhere` SSH connection and add it as a remote project. After connecting, you can work with Codex as usual, but from an isolated Railway environment that stays available from anywhere.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codex-anywhere | [m-abdelwahab/codex-anywhere](https://github.com/m-abdelwahab/codex-anywhere) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/codex-anywhere)
