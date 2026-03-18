# Deploy Harness on Railway

Harness Open Source: SCM, CI/CD, Dev Env, Registry. An E2E dev platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/harness-1)

## About

**What is Harness Open Source?**  
Harness Open Source is an end-to-end, open source developer platform that combines source code management (SCM), continuous integration/continuous delivery (CI/CD), hosted development environments, and an artifact registry into a unified solution.

---

Hosting Harness Open Source involves deploying all the core services—code repository hosting, CI/CD pipelines, cloud development environments (Gitspaces), and an artifact registry—in one stack. It is designed for rapid setup via container or Docker-based deployments, with environment variables for configuration and all state backed by volumes or databases. You’ll need to provide persistent storage, set up your database backend (for example PostgreSQL or another supported datastore), expose necessary ports, and configure your SCM integrations. The open-source platform supports self-hosting, giving you full control of your development lifecycle, while offering scalability and flexibility to handle multiple teams and workflows.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Harness | `harness/harness` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GITNESS_URL_BASE` | https://website.com | - |
| `GITNESS_TOKEN_EXPIRE` | (secret) | - |
| `GITNESS_DATABASE_DRIVER` | - | sqlite or postgres |
| `GITNESS_ENCRYPTER_SECRET` | (secret) | - |
| `GITNESS_TOKEN_COOKIE_NAME` | (secret) | - |
| `GITNESS_USER_SIGNUP_ENABLED` | true | - |
| `GITNESS_PRINCIPAL_ADMIN_PASSWORD` | (secret) | - |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/harness-1)
