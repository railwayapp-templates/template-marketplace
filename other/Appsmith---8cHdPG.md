# Deploy Appsmith on Railway

Build the tools you can’t buy off the shelf

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/8cHdPG)

## About

Appsmith is an open-source tool that enables the rapid development of internal applications. Organizations use it to build dashboards, database GUIs, admin panels, approval apps, customer support dashboards, and more to help their teams perform day-to-day operations.

Hosting Appsmith involves deploying a full-stack application platform that provides a visual development environment accessible through a web browser. The deployment includes both the Appsmith server and a database for storing application configurations, user data, and Git repositories for version control. Once deployed, teams can access the platform to build and deploy internal tools without requiring additional infrastructure setup.

![Appsmith Logo](https://github.com/appsmithorg/appsmith/raw/release/static/appsmith_logo_white.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Appsmith | `appsmith/appsmith-ee:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Appsmith runs on port 80 |

## Configuration

- **Healthcheck:** `/user/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appsmith-stacks`

**Category:** Other

[View on Railway →](https://railway.com/deploy/8cHdPG)
