# Deploy Github Actions Runner on Railway

Deploy a scalable self-hosted GitHub Actions Runner.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pXId5Q)

## About

```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| myoung34/github-runner | `myoung34/github-runner` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LABELS` | railway,default | A comma (no spaces!) delimited list of labels for the runner. |
| `ORG_NAME` | - | The organization name. Requires RUNNER_SCOPE to be 'org'. |
| `EPHEMERAL` | false | Flag to configure runner with --ephemeral option. Options: 'true', 'false' |
| `GITHUB_HOST` | github.com | URL of dotcom or your Github Enterprise server (e.g. github.mycompany.com) |
| `ACCESS_TOKEN` | (secret) | A fine-grained PAT giving the runner access to register itself. Setup -> https://github.com/settings/personal-access-tokens |
| `RUNNER_SCOPE` | - | The scope the runner will be registered on. Valid values are 'repo', 'org', or 'ent'. For 'org' and 'ent', ACCESS_TOKEN is required and REPO_URL is unnecessary. If 'org', requires ORG_NAME; if 'ent', requires ENTERPRISE_NAME. |
| `ENTERPRISE_NAME` | - | The enterprise name for the runner. Requires RUNNER_SCOPE to be 'enterprise'. |
| `DISABLE_AUTOMATIC_DEREGISTRATION` | true | Flag to disable signal catching for deregistration. Options: 'true' or 'false' |

**Category:** Automation

[View on Railway →](https://railway.com/deploy/pXId5Q)
