# Deploy Botway CE on Railway

VS Code in the browser, with full packages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9wleNz)

## About

## Overview

Coder is your self-hosted remote development platform.

Coder shifts software development from local machines to on-prem and public cloud infrastructure. Onboard new developers in minutes, build code on powerful servers—all while keeping source code and data secure behind your firewall.

This template creates a dev environment that you can access from any device.

## Highlights

- Create a code-server deployment on Railway
- With Full Packages, like `git-lfs`, `Ruby`, `Python`, `C`, `Node.js`, `HomeBrew`, `CMake`, `GitHub CLI`, `Deno`, 
`Go`, `Botway CLI`, `Rust`, `.NET`, `MongoDB`, `MySQL`, `Redis`, `PostgreSQL`, `Railway CLI` and more
- Redeploy automatically after each change

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CE | [abdfnx/botway](https://github.com/abdfnx/botway) (root: /coder) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIT_REPO` | - | A git repo to auto-clone and open in code-server |
| `PASSWORD` | (secret) | Your password to log in to code-server |
| `GITHUB_TOKEN` | (secret) |  Your GitHub Token to clone your repo, with `repo`, `read:org` and `read:user` scopes |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Go, Dockerfile, Rust, JavaScript, Ruby, Python, PHP, Dart, C#, PowerShell, SCSS, Kotlin, Shell, C, Swift, C++, Nim

[View on Railway →](https://railway.com/template/9wleNz)
