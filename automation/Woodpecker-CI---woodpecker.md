# Deploy Woodpecker-CI on Railway

Continuous integration server that runs builds from your Git repos

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/woodpecker)

## About

Woodpecker CI is an open source continuous integration engine that runs the pipeline described by a `.woodpecker.yaml` file in your repository. It signs users in through GitHub, Gitea, Forgejo, GitLab or Bitbucket, takes a webhook on every push, tag and pull request, and reports each result back as a commit status. Teams pick it over Jenkins because there are no plugins to maintain, and over hosted CI because build minutes stop being a line item.

Deploy Woodpecker CI on Railway and you get the split topology rather than a single box: `woodpecker-server` holding the web UI, API and webhook receiver on a public HTTPS domain, a private `woodpecker-agent` that executes your pipelines, and managed Postgres behind both. The runner reaches the server over the private network on gRPC port 9000 and needs no public address. To self-host Woodpecker CI elsewhere means a Compose file, a hand-wired shared secret and a mounted Docker socket; here the three arrive already connected.

![Woodpecker server, agent and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787815314/woodpecker-ci-architecture.png)

Woodpecker splits into two processes. The server owns everything stateful — login, repositories, secrets, cron triggers, the queue and build logs. Runners hold no state: they connect outward over gRPC, claim a workflow, run its steps and stream logs back, so the runner needs no public domain.

- Pipelines as YAML in the repo: matrix builds, multiple workflows, `when` conditions on branch, path or event
- Repository, organisation and global secrets, injected per step and withheld from forked pull requests
- Cron pipelines, manual and deploy triggers, a REST API and a `woodpecker-cli`

The server writes to managed Postgres rather than the embedded SQLite file, so nothing important sits on a container filesystem. The runner keeps one volume at `/var/lib/woodpecker` for its identity and working directories.

**The runner uses Woodpecker's Local backend.** Railway exposes no container runtime inside a service, so steps run as ordinary processes rather than per-step containers. Two things follow: `image:` names the shell or executable to run rather than a container image (`image: bash`, not `image: alpine`), and steps are not sandboxed from one another, so enable only repositories you trust. The runner ships bash, git, git-lfs, ssh, curl, jq, make, tar, unzip, openssl, Node and Python; install anything else in the step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| woodpecker-agent | [gridalpha/woodpecker-ci-railway](https://github.com/gridalpha/woodpecker-ci-railway) | Database |
| woodpecker-server | `woodpeckerci/woodpecker-server:v3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | woodpecker-agent | 3000 | Health check port |
| `WOODPECKER_SERVER` | woodpecker-agent | - | Server gRPC address |
| `WOODPECKER_BACKEND` | woodpecker-agent | local | Run steps as processes |
| `WOODPECKER_HOSTNAME` | woodpecker-agent | railway-agent | Stable runner name across deploys |
| `WOODPECKER_LOG_LEVEL` | woodpecker-agent | info | Runner log verbosity |
| `WOODPECKER_AGENT_SECRET` | woodpecker-agent | (secret) | Shared runner authentication secret |
| `WOODPECKER_MAX_WORKFLOWS` | woodpecker-agent | 2 | Parallel workflows per runner |
| `WOODPECKER_RAILWAY_DATA_DIR` | woodpecker-agent | /var/lib/woodpecker | Volume mount path |
| `PORT` | woodpecker-server | 8000 | HTTP port Railway health-checks |
| `WOODPECKER_HOST` | woodpecker-server | - | Public URL, used for OAuth callback |
| `WOODPECKER_OPEN` | woodpecker-server | false | Closed registration |
| `WOODPECKER_ADMIN` | woodpecker-server | - | Comma-separated forge logins granted admin |
| `WOODPECKER_GITHUB` | woodpecker-server | true | Enable the GitHub forge driver |
| `WOODPECKER_GRPC_ADDR` | woodpecker-server | :9000 | gRPC listener for runners |
| `WOODPECKER_LOG_LEVEL` | woodpecker-server | info | Server log verbosity |
| `WOODPECKER_GRPC_SECRET` | woodpecker-server | (secret) | Signs gRPC tokens issued to runners |
| `WOODPECKER_SERVER_ADDR` | woodpecker-server | :8000 | HTTP listener address |
| `WOODPECKER_AGENT_SECRET` | woodpecker-server | (secret) | Shared runner authentication secret |
| `WOODPECKER_GITHUB_CLIENT` | woodpecker-server | - | Paste your OAuth app client ID |
| `WOODPECKER_GITHUB_SECRET` | woodpecker-server | (secret) | Paste your OAuth app client secret |
| `WOODPECKER_DATABASE_DRIVER` | woodpecker-server | postgres | Use Postgres, not SQLite |
| `WOODPECKER_DATABASE_DATASOURCE` | woodpecker-server | - | Private Postgres connection string |
| `WOODPECKER_METRICS_SERVER_ADDR` | woodpecker-server | :9001 | Prometheus endpoint, private only |
| `WOODPECKER_MAX_PIPELINE_TIMEOUT` | woodpecker-server | 120 | Maximum pipeline timeout, minutes |
| `WOODPECKER_DEFAULT_PIPELINE_TIMEOUT` | woodpecker-server | 60 | Default pipeline timeout, minutes |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Volume:** `/var/lib/woodpecker`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/woodpecker)
