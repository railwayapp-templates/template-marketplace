# Deploy Sandbox on Railway

Create sandboxes on Railway with ComputeSDK.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sandbox)

## About

Use Railway as a sandbox provider for executing AI-generated code. This ComputeSDK template deploys a binary that exposes Railway as a sandbox backend, allowing you to self-host code execution environments—giving you cost-effective sandbox infrastructure.

This template converts Railway into a full-featured sandbox provider for running AI-generated code. Instead of relying solely on third-party providers, you run your own sandbox execution environment on Railway's platform. The ComputeSDK binary handles sandbox lifecycle management, code execution, file system operations, and resource isolation. This means your applications continue using ComputeSDK as the orchestration layer, but now Railway is one of your available backends for executing untrusted code securely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Compute Sandbox | `computesdk/compute` | Worker |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sandbox)
