# Deploy Harness on Railway

End-to-end platform with SCM, CI/CD, hosted envs, and artifact registries

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/harness)

## About

Harness Open Source is a modern, all-in-one development platform offering integrated source code hosting, automated CI/CD pipelines, developer environments (Gitspaces), and artifact registries. It empowers teams to build, test, and deploy software efficiently with a user-friendly interface, robust automation, and end-to-end DevOps capabilities.

- harness docker image

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| harness | `harness/harness` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/harness)
