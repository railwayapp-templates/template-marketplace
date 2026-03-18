# Deploy n8n on Railway

N8N Template for Scalable n8n with Integrated Backup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/a_pour)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/a_pour?referralCode=4pD7Sc)

This Railway template sets up a robust automation platform using:
1. n8n: Low-code automation tool with a visual workflow editor.

2. Worker: Handles background tasks, allowing for horizontal scaling.

3. PostgreSQL: Primary database for storing workflows, executions, and credentials.

4. Redis: Acts as a message broker between the main instance and workers.

5. Webhook: Public URL endpoint for triggering workflows.

6. Backup to Google Drive: Scheduled n8n workflow to back up workflows to Google Drive.

Ideal for:
1. Automating business logic.

2. Integrating APIs.

3. Creating no-code workflows.

4. Ensuring regular backups to Google Drive.

Installation Guide
1. Deploy the Template

Click the button below to deploy the template on Railway:

Deploy on Railway

This will set up the all services (dont need to change any varibales)

3. Set Up Google Drive Backup Workflow (not must - its must)

To automate backups of your n8n workflows DB to Google Drive:
1. Create a Google Service Account:
    - Go to Google Cloud Console.
	- Create a new project or select an existing one.
	- Navigate to "APIs & Services" > "Credentials".
	- Click "Create Credentials" > "Service Account".
	- Follow the prompts to create the service account.

        After creation, go to the service account Download the JSON file.

2. Enable Google Drive API:
	- In the Google Cloud Console, navigate to "APIs & Services" > "Library".
	- Search for "Google Drive API" and enable it.

3. Store Service Account Credentials in Railway:

     - In your Railway project, go to the Google Drive Backup Service.
     - Add an environment variable named GOOGLE_SERVICE_ACCOUNT and paste the contents of the JSON file as its value.
	- Add an environment variable named GDRIVE_FOLDER and add folder name to save.
	- Add an environment variable named SHARE_EMAIL and add your email to get notification.

4. After deployment - Accessing n8n
	- Access the n8n Primary UI via the provided Railway domain.
	- Create user and pass and login.

Enjoy

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Primary | `n8nio/n8n` | Web service |
| PostgresGBackup | [omryatia/postgres-gdrive-backup](https://github.com/omryatia/postgres-gdrive-backup) | Worker |
| Worker | `n8nio/n8n` | Worker |
| Webhook | `n8nio/n8n` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | n8n | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `PGPORT_PRIVATE` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | postgres password |
| `PORT` | Primary | 5678 | - |
| `DB_TYPE` | Primary | postgresdb | - |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | Primary | queue | - |
| `DB_POSTGRESDB_USER` | Primary | (secret) | - |
| `N8N_ENCRYPTION_KEY` | Primary | - | secret n8n enc key |
| `N8N_LISTEN_ADDRESS` | Primary | :: | - |
| `N8N_RUNNERS_ENABLED` | Primary | true | - |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | - |
| `N8N_REINSTALL_MISSING_PACKAGES` | Primary | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `SHARE_EMAIL` | PostgresGBackup | - | email to share the files with |
| `CRON_SCHEDULE` | PostgresGBackup | 0 2 * * * | - |
| `RETENTION_DAYS` | PostgresGBackup | 7 | - |
| `RUN_ON_STARTUP` | PostgresGBackup | true | - |
| `GOOGLE_SERVICE_ACCOUNT` | PostgresGBackup | - | google json key |
| `PORT` | Worker | 5678 | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Worker | :: | - |
| `N8N_RUNNERS_ENABLED` | Worker | true | - |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | - |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Worker | true | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | - |
| `N8N_REINSTALL_MISSING_PACKAGES` | Worker | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |
| `PORT` | Webhook | 5678 | - |
| `DB_TYPE` | Webhook | postgresdb | - |
| `NODE_OPTIONS` | Webhook | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | Webhook | queue | - |
| `DB_POSTGRESDB_USER` | Webhook | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Webhook | :: | - |
| `N8N_RUNNERS_ENABLED` | Webhook | true | - |
| `DB_POSTGRESDB_PASSWORD` | Webhook | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Webhook | (secret) | - |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Webhook | true | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Webhook | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Webhook | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Webhook | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Webhook | true | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_PASSWORD` | Redis | (secret) | redis password |
| `REDISPORT_PRIVATE` | Redis | 6379 | - |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `n8n worker`
- **Start command:** `n8n webhook`
- **Volume:** `/bitnami`

**Category:** Automation · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/template/a_pour)
