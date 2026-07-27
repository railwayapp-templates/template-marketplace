# Deploy Hugo | Static Site Starter Built by a Dockerfile on Railway

Hugo starter for Railway — pinned build, Caddy serving, real 404s.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hugo-or-static-site-starter-built-by-a-d)

## About

A minimal [Hugo](https://gohugo.io) site — Markdown in, static HTML out, served by Caddy. The build is described by a Dockerfile, so it does not depend on which builder the platform happens to be using this month.

A Hugo site has no runtime to speak of: the interesting work all happens at build time, and what gets served afterwards is a directory of files. That makes hosting it simple and makes the build the only thing that can break. It breaks in a specific way — build instructions written for one builder stop being read when the platform switches to another, and the failure looks like the site has no start command rather than like a configuration mismatch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hugo-railway-starter | [ak40u/hugo-railway-starter](https://github.com/ak40u/hugo-railway-starter) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/hugo-or-static-site-starter-built-by-a-d)
