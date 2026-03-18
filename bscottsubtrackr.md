# Deploy SubTrackr on Railway

Self-hosted Subscription Tracker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bscottsubtrackr)

## About

**bscott/subtrackr** is a self-hosted subscription management application built with Go and HTMX. Track your subscriptions, visualize monthly and annual spending, and receive renewal reminders—all from a secure, mobile-friendly interface. SubTrackr supports multi-currency, beautiful themes, and optional authentication.

Hosting **SubTrackr** on Railway allows you to run a fully self-contained subscription tracking system without relying on third-party services. The application requires a Go runtime and SQLite database, which is automatically persisted via a volume. Optional features like currency conversion via Fixer.io or email notifications via SMTP can be configured. Railway handles deployment, scaling, and networking, enabling users to access SubTrackr from any device with minimal setup while keeping data private and secure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SubTrackr | [bscott/subtrackr](https://github.com/bscott/subtrackr) | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics · **Languages:** HTML, Go, JavaScript, CSS, Makefile, Shell, Dockerfile

[View on Railway →](https://railway.com/template/bscottsubtrackr)
