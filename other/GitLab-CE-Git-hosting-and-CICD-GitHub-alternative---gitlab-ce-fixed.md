# Deploy GitLab CE: Git hosting and CI/CD, GitHub alternative on Railway

Private Git repos, merge requests, CI/CD pipelines, issue boards and wiki

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab-ce-fixed)

## About

GitLab Community Edition is the free, MIT-licensed edition of GitLab: Git repositories, merge requests with code review, issues and boards, wikis and CI/CD pipelines in one application. This template runs the official GitLab image, pinned to an exact release, with HTTPS on your Railway domain and Git over SSH through a TCP proxy. You get a private GitHub alternative on your own infrastructure without setting up a server, a reverse proxy or certificates.

GitLab ships as one container that runs everything it needs: PostgreSQL, Redis, Gitaly for repository storage, Sidekiq for background jobs, Puma for the web app and nginx in front. This template configures it for a single Railway service using [GitLab's own low-memory settings](https://docs.gitlab.com/omnibus/settings/memory_constrained_envs/), and keeps repositories, the database, uploads, GitLab's configuration and secrets, and the SSH host keys on one volume. CI/CD variables, two-factor secrets and SSH fingerprints survive every redeploy. The root password is generated for you. First boot takes about six minutes while GitLab sets up its database; redeploys take about three.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GitLab | `gitlab/gitlab-ce:19.4.2-ce.0` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | [Do not change] Port GitLab's web server listens on. |
| `GITLAB_HOST` | - | Domain GitLab uses in its links and HTTPS clone URLs. |
| `GITLAB_SSH_HOST` | - | [Do not change] Host in SSH clone URLs. |
| `GITLAB_SSH_PORT` | - | [Do not change] Port in SSH clone URLs. |
| `GITLAB_PUMA_WORKERS` | 0 | Web worker processes; 0 runs a single process. |
| `GITLAB_ROOT_PASSWORD` | (secret) | Password for the root user, applied once when GitLab first starts. Change it inside GitLab afterwards. |
| `GITLAB_OMNIBUS_CONFIG` | external_url 'https://' + ENV['GITLAB_HOST']; nginx['listen_port'] = 80; nginx['listen_https'] = false; nginx['proxy_set_headers'] = { 'X-Forwarded-Proto' => 'https', 'X-Forwarded-Ssl' => 'on' }; nginx['real_ip_trusted_addresses'] = ['100.64.0.0/10', 'fd00::/8']; nginx['real_ip_header'] = 'X-Forwarded-For'; nginx['real_ip_recursive'] = 'on'; gitlab_rails['trusted_proxies'] = ['100.64.0.0/10', 'fd00::/8']; letsencrypt['enable'] = false; gitlab_rails['initial_root_password'] = ENV['GITLAB_ROOT_PASSWORD']; gitlab_rails['gitlab_ssh_host'] = ENV['GITLAB_SSH_HOST'] unless ENV['GITLAB_SSH_HOST'].to_s.empty?; gitlab_rails['gitlab_shell_ssh_port'] = ENV['GITLAB_SSH_PORT'].to_i unless ENV['GITLAB_SSH_PORT'].to_s.empty?; puma['worker_processes'] = ENV.fetch('GITLAB_PUMA_WORKERS', '0').to_i; sidekiq['concurrency'] = ENV.fetch('GITLAB_SIDEKIQ_CONCURRENCY', '10').to_i; postgresql['dynamic_shared_memory_type'] = 'mmap'; postgresql['shared_buffers'] = '256MB'; prometheus_monitoring['enable'] = false; gitlab_kas['enable'] = false; gitlab_rails['env'] = { 'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000' }; gitaly['env'] = { 'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000', 'GITALY_COMMAND_SPAWN_MAX_PARALLEL' => '2' } | GitLab settings (gitlab.rb lines, separated by semicolons). Add your own at the end. |
| `GITLAB_SIDEKIQ_CONCURRENCY` | 10 | Background job threads. |

## Configuration

- **Start command:** `/bin/bash -c 'set -e; mkdir -p /var/opt/gitlab/etc-gitlab; if [ ! -L /etc/gitlab ]; then cp -an /etc/gitlab/. /var/opt/gitlab/etc-gitlab/ 2>/dev/null || true; rm -rf /etc/gitlab; ln -s /var/opt/gitlab/etc-gitlab /etc/gitlab; fi; set +e; /assets/init-container & child=$!; trap "gitlab-ctl stop sidekiq; gitlab-ctl stop puma; gitlab-ctl stop; rc=\$?; kill -TERM $child 2>/dev/null; wait $child; exit \$rc" TERM; wait $child'`
- **Healthcheck:** `/users/sign_in`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/var/opt/gitlab`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitlab-ce-fixed)
