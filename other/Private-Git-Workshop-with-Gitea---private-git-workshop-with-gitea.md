# Deploy Private Git Workshop with Gitea on Railway

A private Gitea forge with Postgres and native Git HTTPS authentication.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/private-git-workshop-with-gitea)

## About

A private Gitea forge with Postgres and native Git HTTPS authentication.

Small engineering teams keeping internal repositories and issue discussions.

Set ADMIN_EMAIL to your real administrator address before deployment. The startup wrapper waits for database migrations and creates the operator administrator with ADMIN_PASSWORD from Railway variables. Sign in, create a private repository, then clone it over HTTPS using your Gitea username and a personal access token.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /data | HTTPS domain |
| Postgres | /var/lib/postgresql/data | Private network only |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `gitea/gitea@sha256:f505a0d3a41323b786e05942fc7a4075e07ae7c169fd9485649aa55ee543a21a` | Web service |
| Postgres | `postgres@sha256:b0f9560a2de083e2cc7382e75f808c7381a32852a7ec49117deedb300e552b24` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 3000 | - |
| `ADMIN_EMAIL` | App | - | Your administrator email; required for the initial operator account. |
| `ADMIN_PASSWORD` | App | (secret) | - |
| `GITEA__database__NAME` | App | app | - |
| `GITEA__database__USER` | App | (secret) | - |
| `GITEA__actions__ENABLED` | App | false | - |
| `GITEA__database__DB_TYPE` | App | postgres | - |
| `GITEA__server__HTTP_PORT` | App | 3000 | - |
| `GITEA__database__SSL_MODE` | App | disable | - |
| `GITEA__server__DISABLE_SSH` | App | true | - |
| `GITEA__security__SECRET_KEY` | App | (secret) | - |
| `GITEA__security__INSTALL_LOCK` | App | true | - |
| `GITEA__security__INTERNAL_TOKEN` | App | (secret) | - |
| `GITEA__repository__DEFAULT_PRIVATE` | App | private | - |
| `GITEA__service__REQUIRE_SIGNIN_VIEW` | App | true | - |
| `GITEA__service__DISABLE_REGISTRATION` | App | true | - |
| `POSTGRES_DB` | Postgres | app | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; /usr/bin/entrypoint /usr/bin/s6-svscan /etc/s6 & server_pid=$!; trap '"'"'kill -TERM "$server_pid" 2>/dev/null || true'"'"' EXIT; trap '"'"'exit 143'"'"' TERM INT; if [ ! -f /data/.template-admin-created ]; then i=0; until wget -q -O /dev/null http://127.0.0.1:3000/api/healthz; do i=$((i+1)); [ "$i" -lt 120 ] || exit 1; kill -0 "$server_pid"; sleep 2; done; su git -s /bin/sh -c '"'"'exec gitea admin user create --config /data/gitea/conf/app.ini --username operator --password "$ADMIN_PASSWORD" --email "$ADMIN_EMAIL" --admin --must-change-password=false'"'"'; touch /data/.template-admin-created; fi; wait "$server_pid"'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/private-git-workshop-with-gitea)
