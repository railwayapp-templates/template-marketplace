# Deploy Octobox on Railway

Inbox for your GitHub notifications, with archiving and search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/octobox)

## About

Octobox turns GitHub's notification feed into a real inbox. Instead of a list that empties itself the moment you glance at it, every thread gets an explicit *archived* state: mark it done, and if the issue or pull request sees new activity it comes back. Maintainers watching dozens of repositories triage with Gmail-style keyboard shortcuts and filter by repository, organisation, CI status, labels, author or assignee. It is an open-source Rails application from the Octobox team — self-host Octobox when notification history, saved searches and GitHub tokens should stay on infrastructure you control.

Deploy Octobox on Railway and you get the full production topology, not a single container. `octobox` runs the Puma web tier behind your public domain and migrates the database as it boots. `octobox-worker` runs Sidekiq with a scheduler, pulling fresh notifications from the GitHub API every ten minutes so the inbox is current before you open the tab. `Postgres` stores users, notifications and saved searches on a volume; `Redis` carries the Sidekiq queues and the Action Cable channel that live-updates rows. Only the web service is exposed — everything else talks over the private network.

![Railway architecture diagram of Octobox web, worker, Postgres and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789577812/octobox-architecture.webp)

GitHub marks a notification read as soon as you look at it, which makes the built-in inbox useless as a to-do list. Octobox keeps its own copy in Postgres and adds the states GitHub lacks, so a thread you are waiting on stays visible until you clear it. Teams self-host it when notification metadata — which private repositories you watch, who mentions you — should not sit on a third-party service.

- An archived state that un-archives itself when a thread gets new activity
- Starring, muting and bulk actions over multi-select, with keyboard shortcuts
- Filtering by repository, organisation, type, reason, state, CI status, labels, author and assignee
- Saved searches pinned to the sidebar, and rows showing issue, PR and CI status
- A documented REST API with bearer-token auth, plus a browser extension
- Optional per-user personal access tokens for wider scope and rate limits

The deployment splits the application the way upstream's Procfile does: the web tier answers requests and owns migrations, the worker tier owns every background job. Redis is not a cache here — it is the job queue.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| octobox | [gridalpha/octobox-railway](https://github.com/gridalpha/octobox-railway) | Web service |
| Redis | `redis:8.2` | Database |
| octobox-worker | [gridalpha/octobox-railway](https://github.com/gridalpha/octobox-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | octobox | 3000 | HTTP listener and healthcheck port |
| `FORCE_SSL` | octobox | true | HSTS and Secure session cookie |
| `RAILS_ENV` | octobox | production | Rails environment |
| `REDIS_URL` | octobox | - | Redis connection string |
| `SOURCE_REPO` | octobox | https://github.com/gridalpha/octobox-railway | AGPL modified-source link |
| `DATABASE_URL` | octobox | - | Postgres connection string |
| `OCTOBOX_ROLE` | octobox | web | Runs the Puma web tier |
| `SECRET_KEY_BASE` | octobox | (secret) | Rails session and cookie signing key |
| `WEB_CONCURRENCY` | octobox | 2 | Puma cluster worker processes |
| `GITHUB_CLIENT_ID` | octobox | - | GitHub OAuth app client id; required for sign-in |
| `RAILS_MAX_THREADS` | octobox | 5 | Puma threads and ActiveRecord pool size |
| `PUSH_NOTIFICATIONS` | octobox | true | Action Cable live row updates |
| `RAILS_LOG_TO_STDOUT` | octobox | true | Send logs to the deploy log |
| `GITHUB_CLIENT_SECRET` | octobox | (secret) | GitHub OAuth app client secret |
| `MINIMUM_REFRESH_INTERVAL` | octobox | 10 | Lowest user auto-refresh interval, minutes |
| `RAILS_SERVE_STATIC_FILES` | octobox | true | Serve precompiled assets; no nginx in front |
| `WEBSOCKET_ALLOWED_ORIGINS` | octobox | - | Allowed Action Cable origins |
| `PERSONAL_ACCESS_TOKENS_ENABLED` | octobox | (secret) | Let users add their own GitHub token |
| `OCTOBOX_BACKGROUND_JOBS_ENABLED` | octobox | true | Enqueue syncs instead of running them inline |
| `OCTOBOX_ATTRIBUTE_ENCRYPTION_KEY` | octobox | - | Encrypts stored GitHub tokens; exactly 32 chars |
| `OCTOBOX_SIDEKIQ_SCHEDULE_ENABLED` | octobox | true | Enables the sidekiq-scheduler cron |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | octobox-worker | 8080 | Health probe listener, private only |
| `FORCE_SSL` | octobox-worker | true | Matches the web tier |
| `RAILS_ENV` | octobox-worker | production | Rails environment |
| `REDIS_URL` | octobox-worker | - | Sidekiq queue connection |
| `SOURCE_REPO` | octobox-worker | https://github.com/gridalpha/octobox-railway | AGPL modified-source link |
| `DATABASE_URL` | octobox-worker | - | Postgres connection string |
| `OCTOBOX_ROLE` | octobox-worker | worker | Runs Sidekiq instead of Puma |
| `SECRET_KEY_BASE` | octobox-worker | (secret) | Must match the web tier |
| `RAILS_MAX_THREADS` | octobox-worker | 5 | Sidekiq concurrency and pool size |
| `RAILS_LOG_TO_STDOUT` | octobox-worker | true | Send logs to the deploy log |
| `RAILS_SERVE_STATIC_FILES` | octobox-worker | true | Matches the web tier's asset config |
| `OCTOBOX_WORKER_PROBE_GRACE` | octobox-worker | 120 | Probe grace while Sidekiq boots, seconds |
| `OCTOBOX_BACKGROUND_JOBS_ENABLED` | octobox-worker | true | Required for Sidekiq server config |
| `OCTOBOX_ATTRIBUTE_ENCRYPTION_KEY` | octobox-worker | - | Must match the web tier |
| `OCTOBOX_SIDEKIQ_SCHEDULE_ENABLED` | octobox-worker | true | Ten-minute notification sync cron |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Ruby, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/octobox)
