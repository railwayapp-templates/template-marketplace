# Deploy bisibility on Railway

Self-hosted open-source SEO platform with a PostgreSQL database you own.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bisibility-1)

## About

bisibility is a self-hosted, open-source SEO platform (AGPL-3.0) for researching keywords, inspecting backlinks, and tracking Google rankings. This template deploys the complete scheduled-check stack with the web/API, worker, application PostgreSQL, Redis, Temporal Server, Temporal PostgreSQL, and idempotent bootstrap jobs.

Railway keeps every service on private networking and exposes only the web application. Both PostgreSQL services use independent persistent volumes. The application and worker are pinned to the same immutable bisibility release, while Temporal Server is pinned independently.

Before serving users, configure `EMAIL_FROM` and `RESEND_API_KEY`, connect a SERP provider, and complete the production checklist.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal | `temporalio/server:1.31.2` | Worker |
| worker | `corgicorner/bisibility-worker:0.8.1` | Worker |
| redis | `redis:8.2.1` | Database |
| temporal-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| temporal-schema | `temporalio/admin-tools:1.31.2` | Worker |
| web | `corgicorner/bisibility:0.8.1` | Web service |
| app-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| temporal-namespace | `temporalio/admin-tools:1.31.2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | temporal | postgres12 | Temporal SQL plugin |
| `DBNAME` | temporal | temporal | Temporal persistence database |
| `DB_PORT` | temporal | 5432 | Temporal PostgreSQL port |
| `BIND_ON_IP` | temporal | 0.0.0.0 | Temporal bind address |
| `POSTGRES_PWD` | temporal | - | Temporal DB password |
| `POSTGRES_USER` | temporal | (secret) | Temporal DB user |
| `POSTGRES_SEEDS` | temporal | - | Temporal DB host |
| `VISIBILITY_DBNAME` | temporal | temporal_visibility | Temporal visibility database |
| `NUM_HISTORY_SHARDS` | temporal | 4 | Temporal history shards |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal | /tmp/temporal-dynamic/docker.yaml | Generated empty dynamic configuration |
| `SITE_URL` | worker | - | Public application origin |
| `REDIS_URL` | worker | - | Private Redis connection URL |
| `DIRECT_URL` | worker | - | Migration database |
| `EMAIL_FROM` | worker | - | Verified email sender |
| `DATABASE_URL` | worker | - | Application database |
| `TEMPORAL_TLS` | worker | - | Temporal transport security |
| `DEPLOYMENT_ENV` | worker | production | Deployment stage |
| `EMAIL_PROVIDER` | worker | - | Transactional email provider |
| `RESEND_API_KEY` | worker | (secret) | Resend API key |
| `DEPLOYMENT_MODE` | worker | self-host | Deployment mode |
| `SERPAPI_API_KEY` | worker | (secret) | Optional SERP API key |
| `SCHEDULER_DRIVER` | worker | - | Scheduler execution backend |
| `TEMPORAL_ADDRESS` | worker | - | Temporal frontend address |
| `TEMPORAL_NAMESPACE` | worker | - | Temporal namespace |
| `TEMPORAL_TASK_QUEUE` | worker | - | Rank-check task queue |
| `BISIBILITY_SECRETS_KEY` | worker | (secret) | Shared provider-credential encryption key |
| `RANK_CHECK_SCHEDULER_MODE` | worker | - | Automatic scheduling owner |
| `BISIBILITY_DEPLOYMENT_SUFFIX` | worker | - | Shared deployment suffix |
| `SCHEDULED_MAINTENANCE_ENABLED` | worker | 1 | Enable worker maintenance schedules |
| `TEMPORAL_ALERT_DELIVERY_TASK_QUEUE` | worker | - | Alert delivery task queue |
| `REDISHOST` | redis | - | Railway private domain |
| `REDISPORT` | redis | 6379 | Redis port |
| `REDISUSER` | redis | default | Redis user |
| `REDIS_URL` | redis | - | Private Redis connection URL |
| `REDISPASSWORD` | redis | (secret) | Redis password alias |
| `REDIS_PASSWORD` | redis | (secret) | Generated Redis password |
| `POSTGRES_DB` | temporal-postgres | postgres | Initial database |
| `DATABASE_URL` | temporal-postgres | - | Private PostgreSQL connection URL |
| `POSTGRES_USER` | temporal-postgres | (secret) | Database owner |
| `POSTGRES_PASSWORD` | temporal-postgres | (secret) | Generated database password |
| `DB` | temporal-schema | postgres12 | Temporal SQL plugin |
| `DB_PORT` | temporal-schema | 5432 | Temporal PostgreSQL port |
| `POSTGRES_PWD` | temporal-schema | - | Temporal DB password |
| `POSTGRES_USER` | temporal-schema | (secret) | Temporal DB user |
| `POSTGRES_SEEDS` | temporal-schema | - | Temporal DB host |
| `SITE_URL` | web | - | Public application origin |
| `REDIS_URL` | web | - | Private Redis connection URL |
| `DIRECT_URL` | web | - | Migration database |
| `EMAIL_FROM` | web | - | Verified sender for sign-in email |
| `DATABASE_URL` | web | - | Application database |
| `TEMPORAL_TLS` | web | false | Bundled Temporal uses private plaintext transport |
| `DEPLOYMENT_ENV` | web | production | Deployment stage |
| `EMAIL_PROVIDER` | web | resend | Transactional email provider |
| `RESEND_API_KEY` | web | (secret) | Resend API key |
| `BETTER_AUTH_URL` | web | - | Public authentication origin |
| `DEPLOYMENT_MODE` | web | self-host | Deployment mode |
| `SERPAPI_API_KEY` | web | (secret) | Optional SERP API key for rank checks |
| `SCHEDULER_DRIVER` | web | temporal | Scheduler execution backend |
| `TEMPORAL_ADDRESS` | web | - | Private Temporal frontend address |
| `BETTER_AUTH_SECRET` | web | (secret) | Generated authentication secret |
| `TEMPORAL_NAMESPACE` | web | - | Deployment-isolated Temporal namespace |
| `TEMPORAL_TASK_QUEUE` | web | - | Deployment-isolated rank-check task queue |
| `INTERNAL_PROBE_TOKEN` | web | (secret) | Detailed health probe token |
| `BISIBILITY_SECRETS_KEY` | web | (secret) | Generated provider-credential encryption key |
| `RANK_CHECK_SCHEDULER_MODE` | web | legacy | Automatic scheduling owner |
| `SELF_HOSTED_ALLOW_INDEXING` | web | false | Keep private instances out of search |
| `BISIBILITY_DEPLOYMENT_SUFFIX` | web | - | Shared deployment suffix |
| `TEMPORAL_ALERT_DELIVERY_TASK_QUEUE` | web | - | Deployment-isolated alert delivery task queue |
| `POSTGRES_DB` | app-postgres | bisibility | Initial database |
| `DATABASE_URL` | app-postgres | - | Private PostgreSQL connection URL |
| `POSTGRES_USER` | app-postgres | (secret) | Database owner |
| `POSTGRES_PASSWORD` | app-postgres | (secret) | Generated database password |
| `TEMPORAL_ADDRESS` | temporal-namespace | - | Temporal frontend address |
| `TEMPORAL_NAMESPACE` | temporal-namespace | - | Temporal namespace |
| `BISIBILITY_DEPLOYMENT_SUFFIX` | temporal-namespace | - | Shared deployment suffix |
| `TEMPORAL_NAMESPACE_RETENTION` | temporal-namespace | 24h | Bundled namespace retention |

## Configuration

- **Start command:** `sh -eu -c 'mkdir -p /tmp/temporal-dynamic; printf "{}\n" > /tmp/temporal-dynamic/docker.yaml; attempt=1; while ! /etc/temporal/entrypoint.sh; do if [ "$attempt" -ge 30 ]; then echo "temporal startup retries exhausted after $attempt attempts" >&2; exit 1; fi; echo "temporal startup prerequisite not ready; retrying in 2s ($attempt/30)" >&2; attempt=$((attempt + 1)); sleep 2; done'`
- **Start command:** `/bin/sh -c 'rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -eu -c 'timeout 300 sh -c "until nc -z $POSTGRES_SEEDS $DB_PORT; do echo Waiting for Temporal PostgreSQL; sleep 2; done"; export SQL_PLUGIN=$DB; export SQL_HOST=$POSTGRES_SEEDS; export SQL_PORT=$DB_PORT; export SQL_USER=$POSTGRES_USER; export SQL_PASSWORD=$POSTGRES_PWD; ensure_database() { database=$1; if output=$(temporal-sql-tool --db "$database" create 2>&1); then printf "%s\n" "$output"; return 0; fi; if printf "%s\n" "$output" | grep -qi "already exists"; then printf "Database %s already exists; applying versioned updates.\n" "$database"; return 10; fi; printf "%s\n" "$output" >&2; return 1; }; if ensure_database temporal; then temporal-sql-tool --db temporal setup-schema -v 0.0; elif [ $? -ne 10 ]; then exit 1; fi; temporal-sql-tool --db temporal update-schema -d /etc/temporal/schema/postgresql/v12/temporal/versioned; if ensure_database temporal_visibility; then temporal-sql-tool --db temporal_visibility setup-schema -v 0.0; elif [ $? -ne 10 ]; then exit 1; fi; temporal-sql-tool --db temporal_visibility update-schema -d /etc/temporal/schema/postgresql/v12/visibility/versioned'`
- **Healthcheck:** `/api/v1/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -eu -c 'timeout 300 sh -c "until temporal operator cluster health --address $TEMPORAL_ADDRESS | grep -q SERVING; do echo Waiting for the Temporal frontend; sleep 2; done"; if temporal operator namespace describe --address "$TEMPORAL_ADDRESS" --namespace "$TEMPORAL_NAMESPACE" >/dev/null 2>&1; then temporal operator namespace update --address "$TEMPORAL_ADDRESS" --namespace "$TEMPORAL_NAMESPACE" --retention "$TEMPORAL_NAMESPACE_RETENTION"; else temporal operator namespace create --address "$TEMPORAL_ADDRESS" --namespace "$TEMPORAL_NAMESPACE" --retention "$TEMPORAL_NAMESPACE_RETENTION" --description "bisibility application namespace"; fi; timeout 120 sh -c "until temporal operator namespace describe --address $TEMPORAL_ADDRESS --namespace $TEMPORAL_NAMESPACE >/dev/null 2>&1; do echo Waiting for the namespace cache; sleep 2; done"; list_search_attributes() { deadline=$(( $(date +%s) + 120 )); until current=$(temporal operator search-attribute list --address "$TEMPORAL_ADDRESS" --namespace "$TEMPORAL_NAMESPACE" --output json 2>/dev/null); do if [ "$(date +%s)" -ge "$deadline" ]; then echo "Timed out waiting for Temporal search-attribute namespace visibility." >&2; return 1; fi; echo "Waiting for Temporal search-attribute namespace visibility..." >&2; sleep 2; done; printf "%s" "$current" | tr -d "[:space:]"; }; has_keyword_attribute() { printf "%s" "$1" | grep -o "$2[^,}]*" | grep -Fq "INDEXED_VALUE_TYPE_KEYWORD"; }; ensure_search_attribute() { attribute=$1; current=$(list_search_attributes); if has_keyword_attribute "$current" "$attribute"; then echo "Temporal search attribute $attribute already exists as Keyword."; return 0; fi; if output=$(temporal operator search-attribute create --address "$TEMPORAL_ADDRESS" --namespace "$TEMPORAL_NAMESPACE" --name "$attribute" --type Keyword 2>&1); then printf "%s\n" "$output"; return 0; fi; current=$(list_search_attributes); if has_keyword_attribute "$current" "$attribute"; then echo "Temporal search attribute $attribute was created concurrently."; return 0; fi; printf "%s\n" "$output" >&2; return 1; }; for attribute in keywordId projectId provider; do ensure_search_attribute "$attribute"; done'`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/bisibility-1)
