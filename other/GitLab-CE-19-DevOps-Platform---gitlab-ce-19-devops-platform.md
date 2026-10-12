# Deploy GitLab CE 19 DevOps Platform on Railway

Self-hosted Git, merge requests, issues and wiki. Own your code.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab-ce-19-devops-platform)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab-ce-19-devops-platform?referralCode=20H68q)

GitLab Community Edition is an open-source DevOps platform: Git repositories, merge requests with code review, issues, boards, wikis and built-in CI/CD. This community template runs the official GitLab Omnibus image on Railway with a persistent volume, Git over SSH through a TCP proxy, and a CI runner that registers itself.

GitLab Omnibus bundles nginx, Puma, Sidekiq, Gitaly, gitlab-shell, PostgreSQL and Redis in one container. Hosting it well means keeping three kinds of state: repositories and the database, the configuration with `gitlab-secrets.json` (the keys that decrypt CI variables and 2FA secrets), and the SSH host keys. Railway allows one volume per service, so this template keeps all of it on a single volume and builds GitLab's configuration from service variables: external URL, SSH host and port, memory profile and optional SMTP. A separate GitLab Runner service uses the shell executor, because Railway has no Docker-in-Docker, and registers itself with a short-lived token that is revoked after use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GitLab | [baranberkay96/gitlab-railway](https://github.com/baranberkay96/gitlab-railway) (branch: main) (root: /services/gitlab) | TCP service |
| GitLab Runner | [baranberkay96/gitlab-railway](https://github.com/baranberkay96/gitlab-railway) (branch: main) (root: /services/gitlab-runner) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GitLab | 80 | Port GitLab's bundled nginx listens on; Railway routes the public domain and its healthcheck here. |
| `SMTP_PORT` | GitLab | 587 | SMTP port (587 STARTTLS, 465 implicit TLS). |
| `SMTP_USER` | GitLab | (secret) | SMTP user name. |
| `GITLAB_HOST` | GitLab | - | Host name in GitLab's external URL (https://...). Change it to your custom domain after adding one, then redeploy. |
| `SMTP_ADDRESS` | GitLab | - | Optional SMTP server for e-mail (notifications, password resets). Leave empty to disable e-mail. Outbound SMTP needs Railway Pro. |
| `SMTP_PASSWORD` | GitLab | (secret) | SMTP password. |
| `GITLAB_EMAIL_FROM` | GitLab | - | Sender address for GitLab e-mails, e.g. gitlab@{your-domain}. |
| `GITLAB_KAS_ENABLED` | GitLab | false | Run the GitLab agent server for Kubernetes (KAS), served under /-/kubernetes-agent/ on the same domain. |
| `GITLAB_PUMA_THREADS` | GitLab | 4 | Threads per Puma worker. |
| `GITLAB_PUMA_WORKERS` | GitLab | 2 | Puma web worker processes (~600-900 MB each). 0 = single process for very small instances. |
| `GITLAB_ROOT_PASSWORD` | GitLab | (secret) | Password of the 'root' administrator, applied once when the database is created. Change it in GitLab afterwards. |
| `GITLAB_OMNIBUS_CONFIG` | GitLab | - | Optional extra gitlab.rb Ruby lines, applied after the template's settings (e.g. registry or OmniAuth configuration). |
| `GITLAB_PROMETHEUS_ENABLED` | GitLab | false | Run the bundled Prometheus, Alertmanager and exporters (about 300 MB extra). |
| `GITLAB_SIDEKIQ_CONCURRENCY` | GitLab | 10 | Sidekiq background job threads (GitLab default 20). |
| `GITLAB_RUNNER_BOOTSTRAP_TOKEN` | GitLab | (secret) | One-time token (create_runner scope only, 30-day expiry) that GitLab creates for root so the GitLab Runner service can register itself. The runner revokes it after use. Clear it to disable automatic runner registration. |
| `GITLAB_POSTGRES_SHARED_BUFFERS` | GitLab | 256MB | shared_buffers of the bundled PostgreSQL. Raise it with the service's memory. |
| `GITLAB_RUNNER_TAGS` | GitLab Runner | railway,shell | Tags of the automatically created runner (comma separated). |
| `GITLAB_INTERNAL_URL` | GitLab Runner | - | GitLab URL on the private network; used for the API, job traffic and git clones. |
| `GITLAB_RUNNER_TOKEN` | GitLab Runner | (secret) | Optional runner authentication token (glrt-...) from Admin > CI/CD > Runners > New instance runner. Takes precedence over the bootstrap token. |
| `GITLAB_RUNNER_CONCURRENT` | GitLab Runner | 2 | Jobs this runner executes at the same time. |
| `GITLAB_RUNNER_DESCRIPTION` | GitLab Runner | Railway shell runner | Description of the automatically created runner in GitLab. |
| `GITLAB_RUNNER_RUN_UNTAGGED` | GitLab Runner | true | Let the automatically created runner pick up jobs without tags. |
| `GITLAB_RUNNER_BOOTSTRAP_TOKEN` | GitLab Runner | (secret) | Token used once to create and register an instance runner automatically, then revoked. |

## Configuration

- **Healthcheck:** `/users/sign_in`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/var/opt/gitlab`
- **Volume:** `/etc/gitlab-runner`

**Category:** Other · **Tags:** gitlab, git, devops, ci-cd, code-review · **Languages:** Shell, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/gitlab-ce-19-devops-platform)
