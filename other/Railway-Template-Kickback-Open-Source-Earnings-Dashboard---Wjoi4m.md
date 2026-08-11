# Deploy Railway Template Kickback | Open Source Earnings Dashboard on Railway

Publish your Railway template earnings as a public page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Wjoi4m)

## About

Railway pays template authors a share of what their deployments consume, but those earnings are visible only inside your own dashboard. This publishes them: a small web app that reads your template metrics through the Railway API and serves them as a public page.

A single service built from a Git repository, with no database — every figure is fetched from the Railway API on request. It needs one thing from you: a Railway API token with access to the workspace whose templates you want to show.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [IKatsuba/railway-template-kickback](https://github.com/IKatsuba/railway-template-kickback) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/Wjoi4m)
