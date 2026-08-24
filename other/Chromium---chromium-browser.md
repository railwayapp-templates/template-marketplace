# Deploy Chromium on Railway

Your private browser in the cloud, accessible from anywhere.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromium-browser)

## About

Chromium Browser provides a private, browser-based Chromium desktop that you can access remotely from anywhere. This template uses the LinuxServer Chromium container with persistent storage, authentication, and additional shared memory for a smoother browser experience.

This template deploys **Chromium as a remote web browser** that runs entirely inside your Railway project.

Instead of installing Chromium on your local device, you access the browser through a normal web page. The actual Chromium session runs in the container, while the interface is streamed securely to your browser.

A persistent volume stores the Chromium profile and configuration so bookmarks, browser preferences, cookies, extensions, and other profile data can survive restarts and redeployments.

The template also includes authentication to prevent unrestricted public access to the remote browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chromium | `linuxserver/chromium:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Jakarta | Container timezone |
| `PGID` | 1000 | Group ID used internally by the LinuxServer container |
| `PORT` | 3000 | Railway public service port for Chromium |
| `PUID` | 1000 | User ID used internally by the LinuxServer container |
| `TITLE` | Chromium Browser | Browser session title |
| `PASSWORD` | (secret) | Strong generated password |
| `CHROME_CLI` | https://www.google.com/ | Optional Chromium startup URL or CLI options |
| `CUSTOM_USER` | (secret) | Username for Chromium web access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chromium-browser)
