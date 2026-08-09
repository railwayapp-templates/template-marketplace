# Deploy GitLab on Railway

GitHub alternative. DevSecOps platform that provides a complete SDLC.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab-ce-railway)

## About

GitLab CE is the open-source Community Edition of GitLab — a DevOps platform that puts Git hosting, merge requests, issue boards, wikis, package and container registries and a full CI/CD engine behind one login. Teams reach for it when they outgrow a bare Git server or when per-seat source control stops adding up. CE is MIT (Expat) licensed, so you can self-host GitLab with no subscription and no seat count.

Deploying GitLab on Railway with this template runs the official `gitlab/gitlab-ce:19.2.1-ce.0` Omnibus image as one service — no external database or Redis to wire up. Omnibus bundles Puma, Sidekiq, Gitaly, gitlab-shell/sshd, Workhorse, PostgreSQL, Redis and nginx under runit in one container. Railway terminates TLS at the edge and forwards HTTP to nginx on port 80, and a TCP proxy maps port 22 so Git over SSH works.

![GitLab CE Railway architecture](placeholder-architecture.png)

Self-hosted GitLab CE ends DevOps tool sprawl: one application with one permission model and one audit trail replaces a Git host, a CI service, a tracker and an artifact store. Teams host it themselves when code cannot leave infrastructure they control.

- Unlimited private repositories, protected branches, merge requests, code review
- GitLab CI/CD: `.gitlab-ci.yml` pipelines, stages, artifacts, environments, schedules
- Issue boards, milestones, labels, time tracking and wikis
- Package and container registries for npm, Maven, PyPI, Go, NuGet and OCI images
- Roles, 2FA, audit events, REST/GraphQL APIs, Slack/Jira/Kubernetes integrations

The Railway architecture is deliberately flat: one service runs the whole stack, with PostgreSQL and Redis managed by GitLab in-container. The volume at `/var/opt/gitlab` holds repositories, the database, uploads and CI artifacts, and also `/etc/gitlab`, which stores `gitlab-secrets.json` and the SSH host keys — lose those and every encrypted database column becomes unreadable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitlab | `gitlab/gitlab-ce:19.2.1-ce.0` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | nginx listen port inside the container |
| `GITLAB_ROOT_PASSWORD` | (secret) | Initial root admin password, first boot only |
| `GITLAB_OMNIBUS_CONFIG` | external_url "https://#{ENV['RAILWAY_PUBLIC_DOMAIN']}"
nginx['listen_port'] = 80
nginx['listen_https'] = false
nginx['worker_processes'] = 2
nginx['custom_nginx_config'] = 'map $http_x_forwarded_for $real_client_ip { "~^\s*(?P<first>[^,\s]+)" $first; default $remote_addr; }'
nginx['proxy_set_headers'] = { 'Host' => '$http_host_with_default', 'X-Real-IP' => '$real_client_ip', 'X-Forwarded-For' => '$real_client_ip', 'X-Forwarded-Proto' => 'https', 'X-Forwarded-Ssl' => 'on', 'Upgrade' => '$http_upgrade', 'Connection' => '$connection_upgrade' }
letsencrypt['enable'] = false
gitlab_rails['trusted_proxies'] = ['100.64.0.0/10', 'fd00::/8']
if ENV['RAILWAY_TCP_PROXY_DOMAIN'].to_s != ''
  gitlab_rails['gitlab_ssh_host'] = ENV['RAILWAY_TCP_PROXY_DOMAIN']
  gitlab_rails['gitlab_shell_ssh_port'] = ENV['RAILWAY_TCP_PROXY_PORT'].to_i
end
gitlab_rails['gitlab_email_enabled'] = false
gitlab_rails['smtp_enable'] = false
gitlab_rails['initial_root_password'] = ENV['GITLAB_ROOT_PASSWORD']
puma['worker_processes'] = 3
puma['min_threads'] = 4
puma['max_threads'] = 4
puma['per_worker_max_memory_mb'] = 1100
sidekiq['concurrency'] = 10
postgresql['dynamic_shared_memory_type'] = 'mmap'
prometheus_monitoring['enable'] = false
gitlab_kas['enable'] = false
registry['enable'] = false
gitlab_pages['enable'] = false
 | - |

## Configuration

- **Start command:** `/bin/bash -c 'set -e; mkdir -p /var/opt/gitlab/_config; if [ ! -L /etc/gitlab ]; then if [ -d /etc/gitlab ]; then cp -an /etc/gitlab/. /var/opt/gitlab/_config/ 2>/dev/null || true; fi; rm -rf /etc/gitlab; ln -sfn /var/opt/gitlab/_config /etc/gitlab; fi; echo "railway-boot: /etc/gitlab -> $(readlink -f /etc/gitlab)"; exec /assets/init-container'`
- **Healthcheck:** `/explore`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/var/opt/gitlab`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitlab-ce-railway)
