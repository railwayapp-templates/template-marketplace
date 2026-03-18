# Deploy Hugo on Railway

Hugo static site generator (empty project template)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hugo)

## About

A minimal Hugo static site with custom layouts built from scratch. No theme dependencies, full control over HTML/CSS, served with Caddy.

This template uses Nixpacks to install Hugo and build your static site. Custom layouts in layouts/ directory give you complete control over HTML structure. Build generates static files to public/ folder, served by Caddy. Dynamic baseURL from Railway's environment variables ensures proper asset linking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hugo-empty | [railtools/hugo-empty](https://github.com/railtools/hugo-empty) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML

[View on Railway →](https://railway.com/deploy/hugo)
