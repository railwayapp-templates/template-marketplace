# Deploy Rundeck on Railway

Run and schedule your ops scripts from one permissioned web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rundeck)

## About

Rundeck is an open-source operations platform that turns the scripts your team runs by hand into named jobs anyone can be trusted with. An engineer defines a job once — a shell command, a script, an Ansible playbook, an HTTP call — decides which nodes it targets, and hands the run button to support, QA or on-call under a policy saying who may run what, where. Self-host Rundeck when the shell access needed to restart a stuck consumer is the thing you want to stop giving out.

Deploy Rundeck on Railway and you get the production shape rather than the laptop one: Rundeck Community backed by a managed PostgreSQL database holding every project, job definition, execution record and encrypted key; a Railway object storage bucket receiving each execution's log files, so history is not tied to one container's disk; and a Mailpit service catching the notification emails Rundeck sends, so alerting works the moment the deploy finishes.

![Rundeck, Postgres and Mailpit services connected on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788319387/rundeck-architecture.png)

Rundeck sits between the people who need an operational task done and the machines it happens on. Instead of an engineer SSHing in at 2am, the task is a job with a defined workflow, a node filter, an audit trail and a permission policy. PagerDuty maintains it.

- **Jobs and workflows** — ordered command, script, playbook or HTTP steps, with error handlers
- **Node targeting** — filter by name, tag, OS or attribute and run across matching hosts
- **Scheduling** — cron-style schedules on any job, on-demand and nightly from one definition
- **ACL policies** — YAML rules granting run, read or kill on specific projects, jobs and nodes
- **Key storage** — SSH keys and passwords encrypted at rest and referenced by path
- **REST API, webhooks and a large plugin catalogue**

The Railway architecture is three cooperating services. Rundeck is the web UI, scheduler and executor. PostgreSQL replaces the file-based H2 database the image defaults to: job definitions, execution history and the encrypted key store all live there. The bucket receives the raw `.rdlog` output, its state JSON and its execution XML per run, so a redeployed container still serves full history. Mailpit accepts SMTP on the private network; swap it for a real relay when you want mail to leave the project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| rundeck | [gridalpha/rundeck-railway](https://github.com/gridalpha/rundeck-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Inbox UI port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Basic-auth credentials for the inbox |
| `MP_WEBROOT` | mailpit | / | Inbox UI path prefix |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Inbox UI bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP bind address, IPv6 for private networking |
| `PORT` | rundeck | 4440 | HTTP listen port Railway probes |
| `RUNDECK_MAIL_FROM` | rundeck | - | Default notification sender |
| `RUNDECK_ADMIN_USER` | rundeck | (secret) | Seeded administrator login |
| `RUNDECK_GRAILS_URL` | rundeck | - | Public base URL for links |
| `RUNDECK_ADMIN_ROLES` | rundeck | user,admin,architect,deploy,build | Roles on that account |
| `RUNDECK_DATABASE_URL` | rundeck | - | Private JDBC connection string |
| `RUNDECK_ADMIN_PASSWORD` | rundeck | (secret) | Seeded administrator password |
| `RUNDECK_MAIL_SMTP_HOST` | rundeck | - | Notification SMTP host |
| `RUNDECK_MAIL_SMTP_PORT` | rundeck | 1025 | Notification SMTP port |
| `RUNDECK_SERVER_ADDRESS` | rundeck | 0.0.0.0 | Bind address inside the container |
| `RUNDECK_DATABASE_DRIVER` | rundeck | org.postgresql.Driver | JDBC driver class |
| `RUNDECK_LOGGING_STRATEGY` | rundeck | CONSOLE | Send application logs to stdout |
| `RUNDECK_SERVER_FORWARDED` | rundeck | true | Honour X-Forwarded-* from the edge |
| `RUNDECK_DATABASE_PASSWORD` | rundeck | (secret) | Database password |
| `RUNDECK_DATABASE_USERNAME` | rundeck | (secret) | Database user |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_NAME` | rundeck | org.rundeck.amazon-s3 | Execution log storage plugin |
| `RUNDECK_STORAGE_CONVERTER_1_CONFIG_PASSWORD` | rundeck | (secret) | Encrypts key storage at rest |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET` | rundeck | - | Bucket receiving log files |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION` | rundeck | us-east-1 | SigV4 signing region |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ENDPOINT` | rundeck | - | S3-compatible endpoint |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ACCESSKEY` | rundeck | - | Bucket access key id |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_PATHSTYLE` | rundeck | true | Path-style bucket addressing |
| `RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_SECRETKEY` | rundeck | (secret) | Bucket secret access key |
| `RUNDECK_CONFIG_STORAGE_CONVERTER_1_CONFIG_PASSWORD` | rundeck | (secret) | Encrypts project config at rest |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Volume:** `/home/rundeck/railway-data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rundeck)
