# Deploy VitoDeploy on Railway

Free, Self-Hosted, Open-Source Server Management Tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vitodeploy)

## About

VitoDeploy (Vito) is a **free, self‑hosted, open‑source server management tool** for PHP apps (especially Laravel). It provisions servers, deploys applications, manages databases, SSL, firewalls, cron, queues, services, and SSH keys—giving you a clean web UI and API to automate production operations.

Hosting VitoDeploy on Railway lets you run the Vito web app as a simple container and use it to manage *other* target servers. You’ll run the Vito container, set an `APP_KEY`, create the initial admin user, and then connect cloud/VPS hosts to provision and deploy your PHP applications. After the first boot, configure networking in Railway and expose **port 80** so your instance is reachable. From there, add servers, sites, databases, SSL, workers, and more.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vitodeploy | `vitodeploy/vito` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NAME` | - | Your account's name |
| `EMAIL` | - | Your account's email for login |
| `APP_KEY` | - | A 32-character string app key used for encryption within the app. Get it from here: https://vitodeploy.com/docs/getting-started/installation#environment-variables |
| `APP_URL` | - | The URL of your Vito instance, It is required for some features like Vito Logs to work properly. |
| `PASSWORD` | (secret) | Your account's password for login (You can change it after login) |
| `MAIL_PASSWORD` | (secret) | - |
| `MAIL_USERNAME` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/vitodeploy)
