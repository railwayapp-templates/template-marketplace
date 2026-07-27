# Deploy React | Vite SPA Starter That Actually Has a Start Command on Railway

React 19 on Vite, served as static files with SPA routing and health check

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/react-or-vite-spa-starter-that-actually-)

## About

A React 19 single-page app, built with Vite and served as static files.

The Create React App template on Railway still builds with react-scripts 5.0.1 and React 18, from a repository last touched in July 2024. Two things are wrong with it, and the second is the one that actually stops deployments.

**Create React App is retired.** The React team deprecated it in February 2025 and now points people at Vite for this exact kind of app. react-scripts carries a large tree of unmaintained transitive dependencies, and Railway refuses to build when the committed lockfile contains a HIGH advisory.

**There is nothing to run after the build.** That project defines only `dev` and `build` scripts. No `start`. So even a build that somehow succeeds leaves the platform with nothing to launch.

This template builds with Vite and ships a start command that serves the built output.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [ak40u/react-vite-railway-starter](https://github.com/ak40u/react-vite-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/react-or-vite-spa-starter-that-actually-)
