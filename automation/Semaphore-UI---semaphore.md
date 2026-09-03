# Deploy Semaphore UI on Railway

Web UI for running Ansible, Terraform and Bash automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/semaphore)

## About

Semaphore UI is an open-source web interface and REST API for running Ansible playbooks, OpenTofu and Terraform plans, Terragrunt stacks, Bash scripts and PowerShell. Teams self-host Semaphore UI when playbooks have outgrown one engineer's laptop: it keeps inventories, SSH keys and cloud credentials in an encrypted key store, records who ran what and when, streams live output to the browser and exposes every operation over an API.

Deploy Semaphore UI on Railway and you get the production shape, not a single box. Three services come up together: the **semaphore** server, serving the web UI and API on a public domain; a dedicated **runner**, the process that checks out your repository and runs the playbook; and managed **Postgres**, holding projects, templates, history and the encrypted key store. The server never executes automation itself, so a runaway playbook cannot take the UI down. Both application services keep a volume — the server's holds the encryption keys generated on first boot, the runner's the credential it is issued at registration.

![Diagram of the Semaphore, runner and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788316469/semaphore-ui-architecture.png)

Ansible is excellent at describing work and poor at sharing it: playbooks end up on one machine, with one person's SSH agent, and nobody else can see what ran. Semaphore UI closes that gap without a heavyweight orchestrator — one Go binary with an embedded Vue front end.

- **Multiple tools** — Ansible, OpenTofu, Terraform, Terragrunt, Bash and PowerShell templates in one image
- **Encrypted key store** — SSH keys and cloud credentials encrypted at rest, the key held outside it
- **Schedules and webhooks** — cron schedules plus incoming hooks from GitHub, GitLab or Bitbucket
- **Alerting and SSO** — failure notifications by email, Slack, Teams or Gotify; LDAP, OIDC and TOTP

The **semaphore** service holds the API, web assets, scheduler and task queue; it reaches **Postgres** over the private network and hands each queued task to a registered runner, which clones the repository, installs what the run needs and streams output back.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| semaphore | [gridalpha/semaphore-ui-railway](https://github.com/gridalpha/semaphore-ui-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| runner | [gridalpha/semaphore-ui-railway](https://github.com/gridalpha/semaphore-ui-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | semaphore | 3000 | Port Railway health-checks |
| `SEMAPHORE_DB` | semaphore | - | Database name |
| `SEMAPHORE_PORT` | semaphore | 3000 | HTTP listener port |
| `SEMAPHORE_ADMIN` | semaphore | admin | First administrator username |
| `SEMAPHORE_DB_HOST` | semaphore | - | Private Postgres hostname |
| `SEMAPHORE_DB_PASS` | semaphore | - | Postgres password |
| `SEMAPHORE_DB_PORT` | semaphore | - | Postgres port |
| `SEMAPHORE_DB_USER` | semaphore | (secret) | Postgres username |
| `SEMAPHORE_TMP_PATH` | semaphore | /tmp/semaphore | Repository checkout directory |
| `SEMAPHORE_WEB_ROOT` | semaphore | - | Public URL, enables secure cookies |
| `SEMAPHORE_ADMIN_NAME` | semaphore | Administrator | Administrator display name |
| `SEMAPHORE_DB_DIALECT` | semaphore | postgres | Database driver selection |
| `SEMAPHORE_ADMIN_EMAIL` | semaphore | admin@localhost | Administrator email address |
| `SEMAPHORE_CONFIG_PATH` | semaphore | /var/lib/semaphore/config | Config directory on the volume |
| `SEMAPHORE_ADMIN_PASSWORD` | semaphore | (secret) | First administrator password |
| `SEMAPHORE_USE_REMOTE_RUNNER` | semaphore | true | Dispatch every task to runners |
| `SEMAPHORE_RUNNER_REGISTRATION_TOKEN` | semaphore | (secret) | Shared runner registration token |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `SEMAPHORE_TMP_PATH` | runner | /tmp/semaphore | Repository checkout directory |
| `SEMAPHORE_WEB_ROOT` | runner | http://semaphore.railway.internal:3000 | Private server URL, first-boot safe |
| `SEMAPHORE_DATA_PATH` | runner | /var/lib/semaphore | Volume holding the runner token |
| `SEMAPHORE_RUNNER_NAME` | runner | railway-runner-1 | Name shown in Admin Runners |
| `SEMAPHORE_RUNNER_ENABLED` | runner | true | Register as an active runner |
| `SEMAPHORE_RUNNER_EXECUTOR_TYPE` | runner | local | Run tasks as local processes |
| `SEMAPHORE_RUNNER_MAX_PARALLEL_TASKS` | runner | 5 | Concurrent tasks per runner |
| `SEMAPHORE_RUNNER_REGISTRATION_TOKEN` | runner | (secret) | Shared runner registration token |

## Configuration

- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/semaphore`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/semaphore)
