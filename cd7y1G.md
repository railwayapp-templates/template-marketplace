# Deploy GitHub Actions Runner on Railway

A self-hosted GitHub Actions runner

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cd7y1G)

## About

Run GitHub Actions in Railway if, for example, you want to access your services or databases using private networking.

**Caution! GitHub recommends only using self-hosted runners for private repositories!!**

## Per-repository runner

Go to your repository settings, then click actions, then runners, then "New self-hosted runner". Under the "configure" section, you'll see a line with `--url` and `--token`. Put the value of `--url` in the `REPO_URL` env var, and the value of `--token` in the `RUNNER_TOKEN ` env var.

## Organization-wide runner

Go to your org's settings, then actions, then runners. Click "New Runner", then "Self-hosted runner". Under "Configure", copy the value after `--token` and paste it into the `RUNNER_TOKEN` env var.

Set `RUNNER_SCOPE` to `org` and `ORG_NAME` to the name of your org.

## Using it in GitHub Actions

Just set `runs-on` to `self-hosted` in your workflow.

## More config

See [the GitHub repo](https://github.com/myoung34/docker-github-actions-runner?tab=readme-ov-file#environment-variables) for all available environment variables and tags.

## App sleeping

Do not use app sleeping with this template. Runners work by long-polling and will not wake themselves up when there's a new job to run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| myoung34/github-runner | `myoung34/github-runner` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ORG_NAME` | - | Required for org-wide runners |
| `REPO_URL` | - | For per-repository runners, the URL to the repo. |
| `RUNNER_SCOPE` | - | Set to `org` for organization-wide runners |
| `RUNNER_TOKEN` | (secret) | The token shown with `--token` when creating the runner in GitHub |

**Category:** Other

[View on Railway →](https://railway.com/template/cd7y1G)
