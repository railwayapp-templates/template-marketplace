# Deploy solidjs on Railway

SolidJS + Vite + Caddy Starter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/w5OSVq)

## About

# SolidJS + Vite + Caddy

This template should help get you started developing with Solid and JavaScript in Vite.

## ✨ Features

- SolidJS + JavaScript + Vite + Caddy
- Caddy v2

## 💁‍♀️ Local Development

- Install required dependencies with `npm install`
- Start the server for local development `npm run dev`


## ❓ Why use `Caddy` when deploying to Railway?

Caddy is a powerful, enterprise-ready, open source web server, and therefore Caddy is far better suited to serve websites than Vite is, using Caddy will result in much less memory and cpu usage compared to serving with Vite (much lower running costs too)

To see how this is achieved with nixpacks, check out the fully documented nixpacks.toml file in this repository

The configuration for Caddy is called a Caddyfile, and you can edit that file to further suite your needs, by default it comes configured to serve a single page app for Vue 3, and to also gzip the responses

**Relevant Caddy documentation:**

- [The Caddyfile](https://caddyserver.com/docs/caddyfile)
- [Caddyfile Directives](https://caddyserver.com/docs/caddyfile/directives)
- [root](https://caddyserver.com/docs/caddyfile/directives/root)
- [encode](https://caddyserver.com/docs/caddyfile/directives/encode)
- [file_server](https://caddyserver.com/docs/caddyfile/directives/file_server)
- [try_files](https://caddyserver.com/docs/caddyfile/directives/try_files)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| solidjs | [unicodeveloper/solidjs-starter](https://github.com/unicodeveloper/solidjs-starter) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/w5OSVq)
