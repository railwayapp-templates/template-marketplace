# Deploy Argus on Railway

A Python-based toolkit for Information Gathering & Reconnaissance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/argus)

## About

Argus is an open-source, interactive OSINT and reconnaissance framework designed to streamline common information-gathering workflows. It provides a modular, command-driven CLI that wraps multiple reconnaissance techniques into a single, easy-to-use interface for security research and authorized testing.

![](https://camo.githubusercontent.com/de2b6963f4da72d6ca0f96030ab974fe9c2719df6c1c26295acf197819417a17/68747470733a2f2f692e696d6775722e636f6d2f4849515750504f2e676966)

Deploying Argus on Railway runs the upstream Argus framework inside a secure, browser-based web terminal powered by `ttyd`. This template installs all required system-level tools needed by Argus modules, ensuring everything works out of the box with no manual setup. Railway handles container orchestration, networking, and restarts, while environment-based authentication protects access to the interactive shell. A persistent volume is attached to retain scan results across redeployments, making this setup suitable for repeatable research workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Argus | [decoge/argus-railway](https://github.com/decoge/argus-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Choose a login password for the web terminal |
| `USERNAME` | (secret) | Choose a login username for the web terminal |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/argus/results`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/argus)
