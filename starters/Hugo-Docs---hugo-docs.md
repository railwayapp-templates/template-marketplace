# Deploy Hugo (Docs) on Railway

A hugo + Books template = generating documentation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hugo-docs)

## About

A minimal Hugo static site using the Hugo Book theme, optimized for clean documentation with tree-structured navigation, multi-language support, and dark mode. Built with Hugo extended and served with Caddy.

This template installs Hugo and uses the Hugo Book theme specifically designed for documentation sites. Features automatic menu generation from content structure, mobile-friendly design, and zero initial configuration. Build process uses `--baseURL=${RAILWAY_PUBLIC_DOMAIN}` and serves static files via Caddy with Hugo Modules support for seamless Railway deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hugo-mydocs | [railtools/hugo-mydocs](https://github.com/railtools/hugo-mydocs) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/hugo-docs)
