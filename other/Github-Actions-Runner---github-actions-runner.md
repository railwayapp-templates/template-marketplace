# Deploy Github Actions Runner on Railway

Runs your GitHub Actions workflow jobs on your own server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-actions-runner)

## About

Self-host GitHub Actions runners when hosted minutes stop being a good fit. A self-hosted runner is the same official agent GitHub ships, running on machines you control — you pick the CPU and memory, and jobs can reach private services a GitHub-hosted machine cannot. Teams reach for this when builds outgrow the minute allowance, when a job needs more RAM than a hosted runner offers, or when a deployment step must reach infrastructure that never touches the public internet.

Deploy GitHub Actions runners on Railway and the agent registers itself. This template runs GitHub's own `ghcr.io/actions/actions-runner` image with a startup script that fetches its registration from the GitHub API, so there is no expiring token to paste in. You supply a token and the repository or organisation to join; the container re-registers before each job and serves a private health endpoint reporting whether GitHub sees the runner online.

![Diagram of the single runner service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787241234/github-actions-runner-architecture.png)

GitHub Actions runs workflows on machines called runners, and GitHub's own are metered by the minute. A self-hosted runner is the same agent — the open-source project at [github.com/actions/runner](https://github.com/actions/runner) — connected to your repository from hardware you provide. GitHub still queues jobs, matches them by label, streams logs and enforces permissions; only execution moves, and GitHub bills no minutes for it.

Key characteristics of this deployment:

- **Registers itself** by calling GitHub's API at startup for a just-in-time configuration.
- **Ephemeral by default** — a fresh registration per job and a cleared workspace, GitHub's recommended posture. Set `RUNNER_EPHEMERAL=false` for one long-lived registration.
- **Honest health reporting** — `/healthz` succeeds only while GitHub reports the runner online.
- **Finishes work before restarting**, so a redeploy does not kill a build mid-run.

The architecture is deliberately one service: a runner keeps no durable state, since `actions/cache` stores to GitHub rather than local disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| runner | [gridalpha/github-actions-runner-railway](https://github.com/gridalpha/github-actions-runner-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port serving the health endpoint |
| `GITHUB_PAT` | - | Token used to register the runner |
| `RUNNER_WORK` | /home/runner/_work | Working directory for jobs |
| `GITHUB_SCOPE` | - | owner/repository, or owner for an org |
| `RUNNER_LABELS` | self-hosted,linux,x64,railway | Labels runs-on matches against |
| `RUNNER_GROUP_ID` | 1 | Runner group ID, 1 is Default |
| `RUNNER_EPHEMERAL` | true | Re-register before every job |
| `RUNNER_NAME_PREFIX` | railway | Prefix for the generated runner name |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/github-actions-runner)
