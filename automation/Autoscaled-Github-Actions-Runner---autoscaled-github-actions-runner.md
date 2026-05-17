# Deploy Autoscaled Github Actions Runner on Railway

Autoscale ephemeral GitHub Actions runners on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autoscaled-github-actions-runner)

## About

Autoscaled Github Actions Runner is a self-hosted CI runner solution that automatically scales GitHub Actions runner replicas on Railway in response to job demand — adding replicas as jobs queue and resetting back to one once all runners go inactive.

Self-hosted GitHub Actions runners on Railway come with a difficult tradeoff. Non-ephemeral runners stay registered and ready for jobs, but remain alive between runs — consuming significant memory on Railway even when idle. Ephemeral runners (`--ephemeral`) solve the memory problem by exiting cleanly after each job, but they deregister from GitHub on exit, leaving replicas inactive with no way to pick up the next job without a manual redeploy.

This autoscaler solves both problems. It listens for GitHub `workflow_job` webhook events and calls the Railway GraphQL API to automatically redeploy the runner when a new job arrives, scale up replicas for concurrent workloads, and reset back to one replica once all jobs complete and runners go inactive.

> **Important:** Scaling down is intentionally limited. Railway's API can only set a desired replica count — it cannot target a specific replica for removal. Terminating a random replica risks canceling an in-flight job on another runner. To avoid this, the autoscaler only resets replicas once all jobs are complete and runners are already inactive. **This template is not suitable for projects where runners are consistently active.** If your runners are always busy, use non-ephemeral runners instead, which stay registered between jobs without needing to be restarted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| github-autoscaler | [shaezzy/railway-github-runner-autoscaler](https://github.com/shaezzy/railway-github-runner-autoscaler) | Web service |
| github-runner | `myoung34/github-runner:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | github-autoscaler | 8080 | Port the autoscaler webhook server listens on. |
| `MAX_RUNNERS` | github-autoscaler | - | Maximum number of concurrent runner replicas. |
| `RUNNER_LABELS` | github-autoscaler | - | Comma-separated labels that a workflow job must have to trigger scaling. Must match the LABELS set on the github-runner service. |
| `GITHUB_WEBHOOK_SECRET` | github-autoscaler | (secret) | Secret used to validate incoming GitHub webhook payloads. Copy this value into your GitHub webhook settings. |
| `LABELS` | github-runner | self-hosted,railway | A comma (no spaces!) delimited list of labels for the runner. |
| `ORG_NAME` | github-runner | - | The organization name. Requires RUNNER_SCOPE to be 'org'. |
| `EPHEMERAL` | github-runner | true | Flag to configure runner with --ephemeral option. Should be true for autoscaling |
| `GITHUB_HOST` | github-runner | github.com | URL of dotcom or your Github Enterprise server (e.g. github.mycompany.com) |
| `ACCESS_TOKEN` | github-runner | (secret) | A fine-grained PAT giving the runner access to register itself. Setup -> https://github.com/settings/personal-access-tokens |
| `RUNNER_SCOPE` | github-runner | - | The scope the runner will be registered on. Valid values are 'repo', 'org', or 'ent'. For 'org' and 'ent', ACCESS_TOKEN is required and REPO_URL is unnecessary. If 'org', requires ORG_NAME; if 'ent', requires ENTERPRISE_NAME. |
| `ENTERPRISE_NAME` | github-runner | - | The enterprise name for the runner. Requires RUNNER_SCOPE to be 'enterprise'. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/autoscaled-github-actions-runner)
