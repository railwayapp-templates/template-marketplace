# Deploy Hugo (Blog) on Railway

A Hugo + Congo blog template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hugo-blog)

## About

A minimal Hugo static site using the Congo theme, built with Hugo v0.147.0 extended and served with Caddy. No backend or extra setup required.

This template installs Hugo, runs the build with `--baseURL=${RAILWAY_PUBLIC_DOMAIN}`, and serves the static `public/` folder with Caddy. It includes Hugo Modules and relative URL support for Railway compatibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hugo-blog-congo | [railtools/hugo-blog-congo](https://github.com/railtools/hugo-blog-congo) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/hugo-blog)
