# Deploy Phase Console on Railway

A railway template to deploy Phase Secrets Manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FgdM-Z)

## About

Phase is an open source platform for fast-moving engineering teams to secure and deploy application secrets — from development to production.

Website: https://phsae.dev

GitHub: https://github.com/phasehq/console

Docs: https://docs.phase.dev

Slack: https://slack.phase.dev

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `phasehq/frontend:latest` | Worker |
| worker | `phasehq/backend:latest` | Worker |
| backend | `phasehq/backend:latest` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| railway-nginx | `phasehq/railway-nginx:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frontend | 3000 | Port of the Phase frontend service. Default 3000 |
| `DEBUG` | frontend | False | Debug mode toggle for the Phase frontend service |
| `NEXTAUTH_URL` | frontend | - | The URL where the authentication page will be setup by the Phase frontend service. |
| `NEXTAUTH_SECRET` | frontend | (secret) | A 32 byte hex encoded secret key for the Phase frontend service. Please generate locally on your machine using `openssl rand -hex 32` |
| `BACKEND_API_BASE` | frontend | - | The private or public URL of the Phase backend service to be used internally by the Phsae fontend service. (Mostly during authentication) Example: http://${{backend.RAILWAY_PRIVATE_DOMAIN}}:${{backend.PORT}} |
| `GITHUB_CLIENT_ID` | frontend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-hub-sso |
| `GITLAB_CLIENT_ID` | frontend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-lab-sso |
| `GOOGLE_CLIENT_ID` | frontend | - | https://docs.phase.dev/self-hosting/configuration/envars#google-sso |
| `GITHUB_CLIENT_SECRET` | frontend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-hub-sso |
| `GITLAB_CLIENT_SECRET` | frontend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-lab-sso |
| `GOOGLE_CLIENT_SECRET` | frontend | (secret) | https://docs.phase.dev/self-hosting/configuration/envars#google-sso |
| `NEXT_TELEMETRY_DISABLED` | frontend | 1 | - |
| `NEXT_PUBLIC_BACKEND_API_BASE` | frontend | - | The public URL of the Phase backend service. Example: https://${{railway-nginx.RAILWAY_PUBLIC_DOMAIN}}/service |
| `NEXT_PUBLIC_NEXTAUTH_PROVIDERS` | frontend | - | A lower-case, comma separated list of SSO auth providers that are to be used to log into to Phase. Example: google,github,gitlab |
| `DEBUG` | worker | False | Debug mode toggle for the Phase worker job |
| `REDIS_HOST` | worker | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#redis-configuration |
| `REDIS_PORT` | worker | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#redis-configuration |
| `SECRET_KEY` | worker | (secret) | A 32 byte hex encoded secret key for the Phase worker job. This must be the same as Phase backends's SECRET_KEY. Example: ${{backend.SECRET_KEY}} |
| `ALLOWED_HOSTS` | worker | - | A comma separated list of hosts from which it's permitted to access the Phase backend service, publicly or privately. Should be the same as Phase backend's ALLOWED_HOSTS. Example: ${{backend.ALLOWED_HOSTS}} |
| `DATABASE_HOST` | worker | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DATABASE_NAME` | worker | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DATABASE_PORT` | worker | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DATABASE_USER` | worker | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `SERVER_SECRET` | worker | (secret) | A 32 byte hex encoded secret key for the Phase worker job. This must be the same as Phase backends's SERVER_SECRET. Example: ${{backend.SERVER_SECRET}} |
| `REDIS_PASSWORD` | worker | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#redis-configuration |
| `ALLOWED_ORIGINS` | worker | - | The URLs which are allowed to access the Phase backend service. Example: ${{backend.ALLOWED_ORIGINS}} |
| `DATABASE_PASSWORD` | worker | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `PORT` | backend | 8000 | Port of the Phase backend service. Default 8000 |
| `DEBUG` | backend | False | Debug mode toggle for the Phase backend service |
| `REDIS_HOST` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#redis-configuration |
| `REDIS_PORT` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#redis-configuration |
| `SECRET_KEY` | backend | (secret) | A 32 byte hex encoded secret key for the Phase Backend service. Please generate locally on your machine using `openssl rand -hex 32` |
| `SMTP_SERVER` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#email-gateway-configuration |
| `ALLOWED_HOSTS` | backend | - | A comma separated list of hosts from which it's permitted to access the Phase backend service, publicly or privately. Note: Please make sure to pass `healthcheck.railway.app` else the health checks will fail. |
| `DATABASE_HOST` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DATABASE_NAME` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DATABASE_PORT` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DATABASE_USER` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `SERVER_SECRET` | backend | (secret) | A 32 byte hex encoded server secret key for the Phase Backend service. Please generate locally on your machine using `openssl rand -hex 32` |
| `SMTP_PASSWORD` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#email-gateway-configuration |
| `SMTP_USERNAME` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#email-gateway-configuration |
| `REDIS_PASSWORD` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#redis-configuration |
| `ALLOWED_ORIGINS` | backend | - | The URLs which are allowed to access the Phase backend service. Example: https://${{railway-nginx.RAILWAY_PUBLIC_DOMAIN}} |
| `GITHUB_CLIENT_ID` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-hub-sso |
| `GITLAB_CLIENT_ID` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-lab-sso |
| `GOOGLE_CLIENT_ID` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#google-sso |
| `DATABASE_PASSWORD` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#database-configuration |
| `DEFAULT_FROM_EMAIL` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#email-gateway-configuration |
| `OAUTH_REDIRECT_URI` | backend | - | The URL to which to redirect to after an OAuth authentication transaction. Example: https://${{railway-nginx.RAILWAY_PUBLIC_DOMAIN}} |
| `GITHUB_CLIENT_SECRET` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-hub-sso |
| `GITLAB_CLIENT_SECRET` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#git-lab-sso |
| `GOOGLE_CLIENT_SECRET` | backend | (secret) | https://docs.phase.dev/self-hosting/configuration/envars#google-sso |
| `SESSION_COOKIE_DOMAIN` | backend | - | The domain to which session cookies are assigned by the Phase backend service. Example: ${{railway-nginx.RAILWAY_PUBLIC_DOMAIN}} |
| `GITHUB_INTEGRATION_CLIENT_ID` | backend | - | Please refer https://docs.phase.dev/self-hosting/configuration/envars#third-party-integrations-configuration |
| `GITHUB_INTEGRATION_CLIENT_SECRET` | backend | (secret) | Please refer https://docs.phase.dev/self-hosting/configuration/envars#third-party-integrations-configuration |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | Generate a secure random redis password using: `openssl rand -hex 32` |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Please generate a secure Postgresql password using: `openssl rand -hex 32` |
| `BACKEND_HOST` | railway-nginx | - | Private hostname of the Phase backend service. Example:http://${{backend.RAILWAY_PRIVATE_DOMAIN}}:${{backend.PORT}} |
| `FRONTEND_HOST` | railway-nginx | - | Private hostname of the Phase frontend service. Example: http://${{frontend.RAILWAY_PRIVATE_DOMAIN}}:${{frontend.PORT}} |

## Configuration

- **Healthcheck:** `/api/health`
- **Start command:** `python manage.py rqworker default`
- **Healthcheck:** `/health/`
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/FgdM-Z)
