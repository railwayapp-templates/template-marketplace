# Deploy nexus-repository on Railway

Private artifact repository with generated admin and backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexus-repository)

## About

Nexus Repository is a universal artifact manager for Maven, npm, NuGet, PyPI, Docker, raw files, and other package formats. This template deploys stable 3.94.1 with generated admin credentials and anonymous access disabled.

Sign in as `admin` with `NEXUS_ADMIN_PASSWORD`, then read and explicitly accept the Community Edition EULA in the onboarding wizard. This template does not accept legal terms for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nexus | [monotykamary/railway-template-nexus3](https://github.com/monotykamary/railway-template-nexus3) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8081 | Nexus HTTP port. |
| `NEXUS_ADMIN_PASSWORD` | (secret) | Generated admin password. Sign in and explicitly accept the CE EULA before creating repositories. |
| `INSTALL4J_ADD_VM_PARAMS` | -Xms512m -Xmx1536m -XX:MaxDirectMemorySize=1024m -Djava.util.prefs.userRoot=/nexus-data/javaprefs | Bounded JVM memory and persistent preferences. |

## Configuration

- **Healthcheck:** `/service/rest/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/nexus-data`

**Category:** Storage · **Languages:** Python, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/nexus-repository)
