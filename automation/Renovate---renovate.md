# Deploy Renovate on Railway

Bot that opens pull requests to update your dependencies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/renovate)

## About

Renovate is the open-source dependency bot from Mend.io. It reads the manifests and lock files in your repositories, works out which dependencies have newer versions, and opens pull requests that bump them — one per dependency, or grouped however you like. It understands more than ninety package managers, so one bot covers `package.json`, `go.mod`, Dockerfiles, Helm charts and GitHub Actions workflows in the same repository. Self-host Renovate to point it at private repositories or a self-managed GitLab or Gitea, and to keep its schedule under your control.

Deploy Renovate on Railway and it runs as a scheduled worker rather than a one-shot command you drive yourself. The template provisions a `renovate` service running the bot on a loop behind a password-protected status dashboard, a Redis service holding the global lookup cache so repeated version checks do not re-query npm and Docker Hub every pass, and an object storage bucket for each repository's extracted dependency state. A 5 GB volume keeps Git clones warm between runs.

![Diagram of the Renovate worker connected to Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787812423/renovate-architecture.png)

Dependency upgrades are individually trivial and collectively enormous. Left alone, a service drifts until upgrading anything means upgrading everything at once. Renovate turns that into a steady stream of small, reviewable pull requests, each carrying a changelog and your own CI results.

Key capabilities:

- Ninety-plus managers: npm, pnpm, Yarn, pip, Poetry, uv, Go modules, Maven, Gradle, Bundler, Composer, NuGet, Cargo, Docker, Helm, Terraform, Actions
- Works with GitHub, GitLab, Bitbucket, Azure DevOps, Gitea, Forgejo and Gerrit
- Grouping, scheduling, automerge, and separate handling of major versus minor updates
- A Dependency Dashboard issue listing every pending and errored update
- Shareable presets so many repositories inherit one policy, plus lock file maintenance

The `renovate` service is the bot, on a timer set by `RENOVATE_INTERVAL_SECONDS` and defaulting to the hourly cadence upstream recommends. Redis holds the global lookup cache — the answers to "what versions of this package exist" — shared across every repository and run. The bucket holds each repository's extracted dependencies, so repeat runs skip parsing they already did.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| renovate | [gridalpha/renovate-railway](https://github.com/gridalpha/renovate-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | renovate | 3000 | Status dashboard listening port |
| `LOG_LEVEL` | renovate | info | Renovate log verbosity |
| `AWS_REGION` | renovate | - | Bucket region |
| `RENOVATE_TOKEN` | renovate | (secret) | Git platform token; the one value you must supply |
| `STATUS_PASSWORD` | renovate | (secret) | Dashboard basic-auth password |
| `STATUS_USERNAME` | renovate | (secret) | Dashboard basic-auth username |
| `AWS_ACCESS_KEY_ID` | renovate | - | Bucket access key |
| `RENOVATE_PLATFORM` | renovate | github | Git platform the bot talks to |
| `RENOVATE_REDIS_URL` | renovate | - | Global lookup cache connection |
| `RENOVATE_S3_ENDPOINT` | renovate | - | S3-compatible endpoint |
| `AWS_SECRET_ACCESS_KEY` | renovate | (secret) | Bucket secret key |
| `RENOVATE_S3_PATH_STYLE` | renovate | true | Path-style addressing required here |
| `RENOVATE_INTERVAL_SECONDS` | renovate | 3600 | Gap between bot runs |
| `RENOVATE_REPOSITORY_CACHE` | renovate | enabled | Keep per-repository extraction cache |
| `RENOVATE_REPOSITORY_CACHE_TYPE` | renovate | - | Remote repository cache location |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Automation · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/renovate)
