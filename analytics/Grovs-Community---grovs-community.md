# Deploy Grovs Community on Railway

Self-host deep links, mobile attribution, referrals and analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grovs-community)

## About

Self-host Grovs for deep links, mobile attribution, referrals and analytics using
the official Community images. Your deployment includes the dashboard, API, two
workers, PostgreSQL, Redis and ClickHouse with persistent database volumes.

The services run from versioned container images. PostgreSQL stores application
data, ClickHouse stores analytics and Redis supports background jobs. The API
initializes schemas before starting, and workers wait for its health endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | `ghcr.io/grovs-io/dashboard:2.3.1` | Web service |
| redis | `redis:7-alpine` | Database |
| worker-1 | `ghcr.io/grovs-io/backend:2.3.1` | Worker |
| web | `ghcr.io/grovs-io/backend:2.3.1` | Web service |
| postgres | `postgres:16-alpine` | Database |
| clickhouse | `clickhouse/clickhouse-server:25.3` | Database |
| worker-2 | `ghcr.io/grovs-io/backend:2.3.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dashboard | 3000 | HTTP listening port. Keep at 3000 to match Railway networking. |
| `API_URL` | dashboard | - | Public API URL on your custom domain. |
| `HOSTNAME` | dashboard | :: | Listen on IPv6 and IPv4 for Railway's private network. |
| `OAUTH_CLIENT_UID` | dashboard | - | Shared reference to web.OAUTH_CLIENT_UID; keep in sync with its source. |
| `OAUTH_CLIENT_SECRET` | dashboard | (secret) | Shared reference to web.OAUTH_CLIENT_SECRET; keep in sync with its source. |
| `REDIS_PASSWORD` | redis | (secret) | Generated uniquely for this deployment. |
| `PORT` | worker-1 | - | Shared reference to web.PORT; keep in sync with its source. |
| `GROVS_EE` | worker-1 | - | Shared reference to web.GROVS_EE; keep in sync with its source. |
| `WEB_HOST` | worker-1 | - | Shared reference to web.RAILWAY_PRIVATE_DOMAIN; keep in sync with its source. |
| `WEB_PORT` | worker-1 | 3000 | Private API health-check port for worker startup. |
| `RAILS_ENV` | worker-1 | - | Shared reference to web.RAILS_ENV; keep in sync with its source. |
| `SMTP_PORT` | worker-1 | - | Shared reference to web.SMTP_PORT; keep in sync with its source. |
| `REDIS_HOST` | worker-1 | - | Shared reference to web.REDIS_HOST; keep in sync with its source. |
| `DOMAIN_LIVE` | worker-1 | - | Shared reference to web.DOMAIN_LIVE; keep in sync with its source. |
| `DOMAIN_TEST` | worker-1 | - | Shared reference to web.DOMAIN_TEST; keep in sync with its source. |
| `MAILER_FROM` | worker-1 | - | Shared reference to web.MAILER_FROM; keep in sync with its source. |
| `POSTGRES_DB` | worker-1 | - | Shared reference to web.POSTGRES_DB; keep in sync with its source. |
| `S3_ENDPOINT` | worker-1 | - | Shared reference to web.S3_ENDPOINT; keep in sync with its source. |
| `SERVER_HOST` | worker-1 | - | Shared reference to web.SERVER_HOST; keep in sync with its source. |
| `SMTP_DOMAIN` | worker-1 | - | Shared reference to web.SMTP_DOMAIN; keep in sync with its source. |
| `SMTP_ADDRESS` | worker-1 | - | Shared reference to web.SMTP_ADDRESS; keep in sync with its source. |
| `ADMIN_API_KEY` | worker-1 | (secret) | Shared reference to web.ADMIN_API_KEY; keep in sync with its source. |
| `AWS_S3_BUCKET` | worker-1 | - | Shared reference to web.AWS_S3_BUCKET; keep in sync with its source. |
| `AWS_S3_KEY_ID` | worker-1 | - | Shared reference to web.AWS_S3_KEY_ID; keep in sync with its source. |
| `AWS_S3_REGION` | worker-1 | - | Shared reference to web.AWS_S3_REGION; keep in sync with its source. |
| `POSTGRES_HOST` | worker-1 | - | Shared reference to web.POSTGRES_HOST; keep in sync with its source. |
| `POSTGRES_USER` | worker-1 | (secret) | Shared reference to web.POSTGRES_USER; keep in sync with its source. |
| `RAILS_DB_POOL` | worker-1 | - | Shared reference to web.RAILS_DB_POOL; keep in sync with its source. |
| `SMTP_PASSWORD` | worker-1 | (secret) | Shared reference to web.SMTP_PASSWORD; keep in sync with its source. |
| `SMTP_USERNAME` | worker-1 | (secret) | Shared reference to web.SMTP_USERNAME; keep in sync with its source. |
| `REDIS_PASSWORD` | worker-1 | (secret) | Shared reference to web.REDIS_PASSWORD; keep in sync with its source. |
| `CLICKHOUSE_HOST` | worker-1 | - | Shared reference to web.CLICKHOUSE_HOST; keep in sync with its source. |
| `SECRET_KEY_BASE` | worker-1 | (secret) | Shared reference to web.SECRET_KEY_BASE; keep in sync with its source. |
| `WEB_CONCURRENCY` | worker-1 | - | Shared reference to web.WEB_CONCURRENCY; keep in sync with its source. |
| `DEFAULT_LOGO_URL` | worker-1 | - | Shared reference to web.DEFAULT_LOGO_URL; keep in sync with its source. |
| `OAUTH_CLIENT_UID` | worker-1 | - | Shared reference to web.OAUTH_CLIENT_UID; keep in sync with its source. |
| `PG_SHADOW_WRITES` | worker-1 | - | Shared reference to web.PG_SHADOW_WRITES; keep in sync with its source. |
| `AWS_S3_ACCESS_KEY` | worker-1 | - | Shared reference to web.AWS_S3_ACCESS_KEY; keep in sync with its source. |
| `GROVS_SELF_HOSTED` | worker-1 | - | Shared reference to web.GROVS_SELF_HOSTED; keep in sync with its source. |
| `POSTGRES_PASSWORD` | worker-1 | (secret) | Shared reference to web.POSTGRES_PASSWORD; keep in sync with its source. |
| `RAILS_MAX_THREADS` | worker-1 | - | Shared reference to web.RAILS_MAX_THREADS; keep in sync with its source. |
| `CLICKHOUSE_PRIMARY` | worker-1 | - | Shared reference to web.CLICKHOUSE_PRIMARY; keep in sync with its source. |
| `DEFAULT_LINK_TITLE` | worker-1 | - | Shared reference to web.DEFAULT_LINK_TITLE; keep in sync with its source. |
| `CLICKHOUSE_DATABASE` | worker-1 | - | Shared reference to web.CLICKHOUSE_DATABASE; keep in sync with its source. |
| `CLICKHOUSE_PASSWORD` | worker-1 | (secret) | Shared reference to web.CLICKHOUSE_PASSWORD; keep in sync with its source. |
| `DIAGNOSTICS_API_KEY` | worker-1 | (secret) | Shared reference to web.DIAGNOSTICS_API_KEY; keep in sync with its source. |
| `OAUTH_CLIENT_SECRET` | worker-1 | (secret) | Shared reference to web.OAUTH_CLIENT_SECRET; keep in sync with its source. |
| `RAILS_LOG_TO_STDOUT` | worker-1 | - | Shared reference to web.RAILS_LOG_TO_STDOUT; keep in sync with its source. |
| `REACT_HOST_PROTOCOL` | worker-1 | - | Shared reference to web.REACT_HOST_PROTOCOL; keep in sync with its source. |
| `S3_FORCE_PATH_STYLE` | worker-1 | - | Shared reference to web.S3_FORCE_PATH_STYLE; keep in sync with its source. |
| `SMTP_AUTHENTICATION` | worker-1 | - | Shared reference to web.SMTP_AUTHENTICATION; keep in sync with its source. |
| `SERVER_HOST_PROTOCOL` | worker-1 | - | Shared reference to web.SERVER_HOST_PROTOCOL; keep in sync with its source. |
| `BOOTSTRAP_ADMIN_EMAIL` | worker-1 | - | Shared reference to web.BOOTSTRAP_ADMIN_EMAIL; keep in sync with its source. |
| `DEFAULT_LINK_SUBTITLE` | worker-1 | - | Shared reference to web.DEFAULT_LINK_SUBTITLE; keep in sync with its source. |
| `ACTIVE_STORAGE_SERVICE` | worker-1 | - | Shared reference to web.ACTIVE_STORAGE_SERVICE; keep in sync with its source. |
| `MAILER_DELIVERY_METHOD` | worker-1 | - | Shared reference to web.MAILER_DELIVERY_METHOD; keep in sync with its source. |
| `CLICKHOUSE_READ_ENABLED` | worker-1 | - | Shared reference to web.CLICKHOUSE_READ_ENABLED; keep in sync with its source. |
| `SENT_QUOTAS_WEBHOOK_KEY` | worker-1 | - | Shared reference to web.SENT_QUOTAS_WEBHOOK_KEY; keep in sync with its source. |
| `BOOTSTRAP_ADMIN_PASSWORD` | worker-1 | (secret) | Shared reference to web.BOOTSTRAP_ADMIN_PASSWORD; keep in sync with its source. |
| `CLICKHOUSE_WRITE_ENABLED` | worker-1 | - | Shared reference to web.CLICKHOUSE_WRITE_ENABLED; keep in sync with its source. |
| `POSTGRES_MAX_CONNECTIONS` | worker-1 | - | Shared reference to web.POSTGRES_MAX_CONNECTIONS; keep in sync with its source. |
| `RAILS_SERVE_STATIC_FILES` | worker-1 | - | Shared reference to web.RAILS_SERVE_STATIC_FILES; keep in sync with its source. |
| `REVENUE_READS_FROM_LEDGER` | worker-1 | - | Shared reference to web.REVENUE_READS_FROM_LEDGER; keep in sync with its source. |
| `SMTP_ENABLE_STARTTLS_AUTO` | worker-1 | - | Shared reference to web.SMTP_ENABLE_STARTTLS_AUTO; keep in sync with its source. |
| `DEFAULT_SOCIAL_PREVIEW_URL` | worker-1 | - | Shared reference to web.DEFAULT_SOCIAL_PREVIEW_URL; keep in sync with its source. |
| `SIDEKIQ_EVENTS_CONCURRENCY` | worker-1 | - | Shared reference to web.SIDEKIQ_EVENTS_CONCURRENCY; keep in sync with its source. |
| `CLICKHOUSE_ROLLUP_FAST_LANE` | worker-1 | - | Shared reference to web.CLICKHOUSE_ROLLUP_FAST_LANE; keep in sync with its source. |
| `DASHBOARD_CACHE_TTL_SECONDS` | worker-1 | - | Shared reference to web.DASHBOARD_CACHE_TTL_SECONDS; keep in sync with its source. |
| `PUBLIC_GO_PROJECT_IDENTIFIER` | worker-1 | - | Shared reference to web.PUBLIC_GO_PROJECT_IDENTIFIER; keep in sync with its source. |
| `CLICKHOUSE_ATTRIBUTION_READ_ENABLED` | worker-1 | - | Shared reference to web.CLICKHOUSE_ATTRIBUTION_READ_ENABLED; keep in sync with its source. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | worker-1 | - | Shared reference to web.ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY; keep in sync with its source. |
| `CLICKHOUSE_LINK_DIMENSIONS_READ_ENABLED` | worker-1 | - | Shared reference to web.CLICKHOUSE_LINK_DIMENSIONS_READ_ENABLED; keep in sync with its source. |
| `CLICKHOUSE_ANALYTICS_ROLLUPS_READ_ENABLED` | worker-1 | - | Shared reference to web.CLICKHOUSE_ANALYTICS_ROLLUPS_READ_ENABLED; keep in sync with its source. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | worker-1 | - | Shared reference to web.ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY; keep in sync with its source. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | worker-1 | - | Shared reference to web.ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT; keep in sync with its source. |
| `PORT` | web | 3000 | HTTP listening port. Keep at 3000 to match Railway networking. |
| `GROVS_EE` | web | false | Keep false for the Community edition. |
| `RAILS_ENV` | web | production | Run Rails in production mode. |
| `SMTP_PORT` | web | 587 | SMTP server port. |
| `REDIS_HOST` | web | - | Shared reference to redis.RAILWAY_PRIVATE_DOMAIN; keep in sync with its source. |
| `DOMAIN_LIVE` | web | - | Production links base domain, for example links.example.com. |
| `DOMAIN_TEST` | web | - | Test links base domain, for example test.links.example.com. |
| `MAILER_FROM` | web | - | Sender address used for outgoing Grovs emails. |
| `POSTGRES_DB` | web | grovs_production | Grovs PostgreSQL database name. |
| `S3_ENDPOINT` | web | - | Optional override for S3-compatible storage. |
| `SERVER_HOST` | web | - | App base domain, for example grovs.example.com; no https:// or path. |
| `SMTP_DOMAIN` | web | - | Shared reference to web.SERVER_HOST; keep in sync with its source. |
| `SMTP_ADDRESS` | web | smtp.example.com | SMTP server hostname; only used when email is enabled. |
| `ADMIN_API_KEY` | web | (secret) | Generated uniquely for this deployment. |
| `AWS_S3_BUCKET` | web | - | Private bucket name shared by API and workers. |
| `AWS_S3_KEY_ID` | web | - | Access key for your private S3-compatible bucket. |
| `AWS_S3_REGION` | web | - | Bucket region, for example eu-north-1. |
| `POSTGRES_HOST` | web | - | Shared reference to postgres.RAILWAY_PRIVATE_DOMAIN; keep in sync with its source. |
| `POSTGRES_USER` | web | (secret) | Grovs PostgreSQL database user. |
| `RAILS_DB_POOL` | web | 10 | Database connections available per process. |
| `SMTP_PASSWORD` | web | (secret) | SMTP authentication password, if required. |
| `SMTP_USERNAME` | web | (secret) | SMTP authentication username, if required. |
| `REDIS_PASSWORD` | web | (secret) | Shared reference to redis.REDIS_PASSWORD; keep in sync with its source. |
| `CLICKHOUSE_HOST` | web | - | Shared reference to clickhouse.RAILWAY_PRIVATE_DOMAIN; keep in sync with its source. |
| `SECRET_KEY_BASE` | web | (secret) | Generated uniquely for this deployment. |
| `WEB_CONCURRENCY` | web | 2 | Number of Puma web processes. |
| `DEFAULT_LOGO_URL` | web | https://appssemble-assets.s3.eu-north-1.amazonaws.com/linksquared/logo-square-new.svg | Default app icon on link landing pages. |
| `OAUTH_CLIENT_UID` | web | - | Generated uniquely for this deployment. |
| `PG_SHADOW_WRITES` | web | false | Mirror event writes to PostgreSQL; disabled for ClickHouse-primary storage. |
| `AWS_S3_ACCESS_KEY` | web | - | Secret access key for your private bucket. |
| `GROVS_SELF_HOSTED` | web | true | Enable self-hosted configuration and bootstrap login. |
| `POSTGRES_PASSWORD` | web | (secret) | Shared reference to postgres.POSTGRES_PASSWORD; keep in sync with its source. |
| `RAILS_MAX_THREADS` | web | 5 | Maximum threads per web process. |
| `CLICKHOUSE_PRIMARY` | web | true | Use ClickHouse as the primary event store. |
| `DEFAULT_LINK_TITLE` | web | grovs | Default link landing-page title. |
| `CLICKHOUSE_DATABASE` | web | grovs_production | Analytics database used by the application. |
| `CLICKHOUSE_PASSWORD` | web | (secret) | Shared reference to clickhouse.CLICKHOUSE_PASSWORD; keep in sync with its source. |
| `DIAGNOSTICS_API_KEY` | web | (secret) | Generated uniquely for this deployment. |
| `OAUTH_CLIENT_SECRET` | web | (secret) | Generated uniquely for this deployment. |
| `RAILS_LOG_TO_STDOUT` | web | true | Send Rails logs to Railway's log viewer. |
| `REACT_HOST_PROTOCOL` | web | https:// | Public dashboard URL protocol. |
| `S3_FORCE_PATH_STYLE` | web | - | Optional override for S3-compatible storage. |
| `SMTP_AUTHENTICATION` | web | plain | SMTP authentication mechanism. |
| `SERVER_HOST_PROTOCOL` | web | https:// | Public backend URL protocol. |
| `BOOTSTRAP_ADMIN_EMAIL` | web | - | Email address for the first administrator. |
| `DEFAULT_LINK_SUBTITLE` | web | Dynamic links, attributions, and referrals across mobile and web platforms. | Default link landing-page description. |
| `ACTIVE_STORAGE_SERVICE` | web | amazon | Use S3 storage shared by the API and workers. |
| `MAILER_DELIVERY_METHOD` | web | - | Leave empty to disable email; configure SMTP to enable it. |
| `CLICKHOUSE_READ_ENABLED` | web | true | Read analytics events from ClickHouse. |
| `SENT_QUOTAS_WEBHOOK_KEY` | web | - | Generated uniquely for this deployment. |
| `BOOTSTRAP_ADMIN_PASSWORD` | web | (secret) | Generated uniquely for this deployment. |
| `CLICKHOUSE_WRITE_ENABLED` | web | true | Write analytics events to ClickHouse. |
| `POSTGRES_MAX_CONNECTIONS` | web | 200 | Connection budget setting from the Compose defaults; Railway PostgreSQL tuning is separate. |
| `RAILS_SERVE_STATIC_FILES` | web | true | Serve the backend's bundled static assets. |
| `REVENUE_READS_FROM_LEDGER` | web | true | Read purchase revenue from the event ledger. |
| `SMTP_ENABLE_STARTTLS_AUTO` | web | true | Use STARTTLS when supported by the SMTP server. |
| `DEFAULT_SOCIAL_PREVIEW_URL` | web | https://appssemble-assets.s3.eu-north-1.amazonaws.com/linksquared/social-media-placeholder.jpg | Default image for shared links. |
| `SIDEKIQ_EVENTS_CONCURRENCY` | web | 10 | Concurrent jobs in the event worker. |
| `CLICKHOUSE_ROLLUP_FAST_LANE` | web | true | Enable the fast path for analytics rollups. |
| `DASHBOARD_CACHE_TTL_SECONDS` | web | 60 | Dashboard result cache lifetime in seconds. |
| `PUBLIC_GO_PROJECT_IDENTIFIER` | web | go-self-hosted | Identifier for the built-in public redirect project. |
| `CLICKHOUSE_ATTRIBUTION_READ_ENABLED` | web | true | Read attribution data from ClickHouse. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | web | - | Generated uniquely for this deployment. |
| `CLICKHOUSE_LINK_DIMENSIONS_READ_ENABLED` | web | true | Read link dimensions from ClickHouse. |
| `CLICKHOUSE_ANALYTICS_ROLLUPS_READ_ENABLED` | web | true | Read pre-aggregated ClickHouse analytics. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | web | - | Generated uniquely for this deployment. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | web | - | Generated uniquely for this deployment. |
| `POSTGRES_DB` | postgres | grovs_production | Grovs PostgreSQL database name. |
| `POSTGRES_USER` | postgres | (secret) | Grovs PostgreSQL database user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated uniquely for this deployment. |
| `CLICKHOUSE_DB` | clickhouse | grovs_production | Grovs ClickHouse database name. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Grovs ClickHouse database user. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Generated uniquely for this deployment. |
| `PORT` | worker-2 | - | Shared reference to web.PORT; keep in sync with its source. |
| `GROVS_EE` | worker-2 | - | Shared reference to web.GROVS_EE; keep in sync with its source. |
| `WEB_HOST` | worker-2 | - | Shared reference to web.RAILWAY_PRIVATE_DOMAIN; keep in sync with its source. |
| `WEB_PORT` | worker-2 | 3000 | Private API health-check port for worker startup. |
| `RAILS_ENV` | worker-2 | - | Shared reference to web.RAILS_ENV; keep in sync with its source. |
| `SMTP_PORT` | worker-2 | - | Shared reference to web.SMTP_PORT; keep in sync with its source. |
| `REDIS_HOST` | worker-2 | - | Shared reference to web.REDIS_HOST; keep in sync with its source. |
| `DOMAIN_LIVE` | worker-2 | - | Shared reference to web.DOMAIN_LIVE; keep in sync with its source. |
| `DOMAIN_TEST` | worker-2 | - | Shared reference to web.DOMAIN_TEST; keep in sync with its source. |
| `MAILER_FROM` | worker-2 | - | Shared reference to web.MAILER_FROM; keep in sync with its source. |
| `POSTGRES_DB` | worker-2 | - | Shared reference to web.POSTGRES_DB; keep in sync with its source. |
| `S3_ENDPOINT` | worker-2 | - | Shared reference to web.S3_ENDPOINT; keep in sync with its source. |
| `SERVER_HOST` | worker-2 | - | Shared reference to web.SERVER_HOST; keep in sync with its source. |
| `SMTP_DOMAIN` | worker-2 | - | Shared reference to web.SMTP_DOMAIN; keep in sync with its source. |
| `SMTP_ADDRESS` | worker-2 | - | Shared reference to web.SMTP_ADDRESS; keep in sync with its source. |
| `ADMIN_API_KEY` | worker-2 | (secret) | Shared reference to web.ADMIN_API_KEY; keep in sync with its source. |
| `AWS_S3_BUCKET` | worker-2 | - | Shared reference to web.AWS_S3_BUCKET; keep in sync with its source. |
| `AWS_S3_KEY_ID` | worker-2 | - | Shared reference to web.AWS_S3_KEY_ID; keep in sync with its source. |
| `AWS_S3_REGION` | worker-2 | - | Shared reference to web.AWS_S3_REGION; keep in sync with its source. |
| `POSTGRES_HOST` | worker-2 | - | Shared reference to web.POSTGRES_HOST; keep in sync with its source. |
| `POSTGRES_USER` | worker-2 | (secret) | Shared reference to web.POSTGRES_USER; keep in sync with its source. |
| `RAILS_DB_POOL` | worker-2 | - | Shared reference to web.RAILS_DB_POOL; keep in sync with its source. |
| `SMTP_PASSWORD` | worker-2 | (secret) | Shared reference to web.SMTP_PASSWORD; keep in sync with its source. |
| `SMTP_USERNAME` | worker-2 | (secret) | Shared reference to web.SMTP_USERNAME; keep in sync with its source. |
| `REDIS_PASSWORD` | worker-2 | (secret) | Shared reference to web.REDIS_PASSWORD; keep in sync with its source. |
| `CLICKHOUSE_HOST` | worker-2 | - | Shared reference to web.CLICKHOUSE_HOST; keep in sync with its source. |
| `SECRET_KEY_BASE` | worker-2 | (secret) | Shared reference to web.SECRET_KEY_BASE; keep in sync with its source. |
| `WEB_CONCURRENCY` | worker-2 | - | Shared reference to web.WEB_CONCURRENCY; keep in sync with its source. |
| `DEFAULT_LOGO_URL` | worker-2 | - | Shared reference to web.DEFAULT_LOGO_URL; keep in sync with its source. |
| `OAUTH_CLIENT_UID` | worker-2 | - | Shared reference to web.OAUTH_CLIENT_UID; keep in sync with its source. |
| `PG_SHADOW_WRITES` | worker-2 | - | Shared reference to web.PG_SHADOW_WRITES; keep in sync with its source. |
| `AWS_S3_ACCESS_KEY` | worker-2 | - | Shared reference to web.AWS_S3_ACCESS_KEY; keep in sync with its source. |
| `GROVS_SELF_HOSTED` | worker-2 | - | Shared reference to web.GROVS_SELF_HOSTED; keep in sync with its source. |
| `POSTGRES_PASSWORD` | worker-2 | (secret) | Shared reference to web.POSTGRES_PASSWORD; keep in sync with its source. |
| `RAILS_MAX_THREADS` | worker-2 | - | Shared reference to web.RAILS_MAX_THREADS; keep in sync with its source. |
| `CLICKHOUSE_PRIMARY` | worker-2 | - | Shared reference to web.CLICKHOUSE_PRIMARY; keep in sync with its source. |
| `DEFAULT_LINK_TITLE` | worker-2 | - | Shared reference to web.DEFAULT_LINK_TITLE; keep in sync with its source. |
| `CLICKHOUSE_DATABASE` | worker-2 | - | Shared reference to web.CLICKHOUSE_DATABASE; keep in sync with its source. |
| `CLICKHOUSE_PASSWORD` | worker-2 | (secret) | Shared reference to web.CLICKHOUSE_PASSWORD; keep in sync with its source. |
| `DIAGNOSTICS_API_KEY` | worker-2 | (secret) | Shared reference to web.DIAGNOSTICS_API_KEY; keep in sync with its source. |
| `OAUTH_CLIENT_SECRET` | worker-2 | (secret) | Shared reference to web.OAUTH_CLIENT_SECRET; keep in sync with its source. |
| `RAILS_LOG_TO_STDOUT` | worker-2 | - | Shared reference to web.RAILS_LOG_TO_STDOUT; keep in sync with its source. |
| `REACT_HOST_PROTOCOL` | worker-2 | - | Shared reference to web.REACT_HOST_PROTOCOL; keep in sync with its source. |
| `S3_FORCE_PATH_STYLE` | worker-2 | - | Shared reference to web.S3_FORCE_PATH_STYLE; keep in sync with its source. |
| `SMTP_AUTHENTICATION` | worker-2 | - | Shared reference to web.SMTP_AUTHENTICATION; keep in sync with its source. |
| `SERVER_HOST_PROTOCOL` | worker-2 | - | Shared reference to web.SERVER_HOST_PROTOCOL; keep in sync with its source. |
| `BOOTSTRAP_ADMIN_EMAIL` | worker-2 | - | Shared reference to web.BOOTSTRAP_ADMIN_EMAIL; keep in sync with its source. |
| `DEFAULT_LINK_SUBTITLE` | worker-2 | - | Shared reference to web.DEFAULT_LINK_SUBTITLE; keep in sync with its source. |
| `ACTIVE_STORAGE_SERVICE` | worker-2 | - | Shared reference to web.ACTIVE_STORAGE_SERVICE; keep in sync with its source. |
| `MAILER_DELIVERY_METHOD` | worker-2 | - | Shared reference to web.MAILER_DELIVERY_METHOD; keep in sync with its source. |
| `CLICKHOUSE_READ_ENABLED` | worker-2 | - | Shared reference to web.CLICKHOUSE_READ_ENABLED; keep in sync with its source. |
| `SENT_QUOTAS_WEBHOOK_KEY` | worker-2 | - | Shared reference to web.SENT_QUOTAS_WEBHOOK_KEY; keep in sync with its source. |
| `BOOTSTRAP_ADMIN_PASSWORD` | worker-2 | (secret) | Shared reference to web.BOOTSTRAP_ADMIN_PASSWORD; keep in sync with its source. |
| `CLICKHOUSE_WRITE_ENABLED` | worker-2 | - | Shared reference to web.CLICKHOUSE_WRITE_ENABLED; keep in sync with its source. |
| `POSTGRES_MAX_CONNECTIONS` | worker-2 | - | Shared reference to web.POSTGRES_MAX_CONNECTIONS; keep in sync with its source. |
| `RAILS_SERVE_STATIC_FILES` | worker-2 | - | Shared reference to web.RAILS_SERVE_STATIC_FILES; keep in sync with its source. |
| `REVENUE_READS_FROM_LEDGER` | worker-2 | - | Shared reference to web.REVENUE_READS_FROM_LEDGER; keep in sync with its source. |
| `SMTP_ENABLE_STARTTLS_AUTO` | worker-2 | - | Shared reference to web.SMTP_ENABLE_STARTTLS_AUTO; keep in sync with its source. |
| `DEFAULT_SOCIAL_PREVIEW_URL` | worker-2 | - | Shared reference to web.DEFAULT_SOCIAL_PREVIEW_URL; keep in sync with its source. |
| `SIDEKIQ_EVENTS_CONCURRENCY` | worker-2 | - | Shared reference to web.SIDEKIQ_EVENTS_CONCURRENCY; keep in sync with its source. |
| `CLICKHOUSE_ROLLUP_FAST_LANE` | worker-2 | - | Shared reference to web.CLICKHOUSE_ROLLUP_FAST_LANE; keep in sync with its source. |
| `DASHBOARD_CACHE_TTL_SECONDS` | worker-2 | - | Shared reference to web.DASHBOARD_CACHE_TTL_SECONDS; keep in sync with its source. |
| `PUBLIC_GO_PROJECT_IDENTIFIER` | worker-2 | - | Shared reference to web.PUBLIC_GO_PROJECT_IDENTIFIER; keep in sync with its source. |
| `CLICKHOUSE_ATTRIBUTION_READ_ENABLED` | worker-2 | - | Shared reference to web.CLICKHOUSE_ATTRIBUTION_READ_ENABLED; keep in sync with its source. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | worker-2 | - | Shared reference to web.ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY; keep in sync with its source. |
| `CLICKHOUSE_LINK_DIMENSIONS_READ_ENABLED` | worker-2 | - | Shared reference to web.CLICKHOUSE_LINK_DIMENSIONS_READ_ENABLED; keep in sync with its source. |
| `CLICKHOUSE_ANALYTICS_ROLLUPS_READ_ENABLED` | worker-2 | - | Shared reference to web.CLICKHOUSE_ANALYTICS_ROLLUPS_READ_ENABLED; keep in sync with its source. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | worker-2 | - | Shared reference to web.ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY; keep in sync with its source. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | worker-2 | - | Shared reference to web.ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT; keep in sync with its source. |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -ec 'exec redis-server --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Start command:** `bash -ec '#!/usr/bin/env bash
# Sourced into the commands embedded in Railway/Render configuration.
# No files from this repository need to be present in the application image.
set -eu
: "${SERVER_HOST:?Set your app domain}"
: "${DOMAIN_LIVE:?Set your production links domain}"
: "${DOMAIN_TEST:?Set your test links domain}"
: "${AWS_S3_KEY_ID:?Set object storage credentials}"
: "${AWS_S3_ACCESS_KEY:?Set object storage credentials}"
: "${AWS_S3_REGION:?Set your bucket region}"
: "${AWS_S3_BUCKET:?Set your bucket name}"
export ACTIVE_STORAGE_SERVICE=amazon
export SERVER_HOST_PROTOCOL=https:// REACT_HOST_PROTOCOL=https://
export REACT_HOST="dashboard.$SERVER_HOST"
export API_HOST="api.$SERVER_HOST" SDK_HOST="sdk.$SERVER_HOST"
export DASHBOARD_HOST="$REACT_HOST" MCP_HOST="mcp.$SERVER_HOST" GO_HOST="go.$SERVER_HOST"
export PREVIEW_HOST="preview.$SERVER_HOST"
export LINKS_PROD_HOST="links.$DOMAIN_LIVE" LINKS_TEST_HOST="links.$DOMAIN_TEST"
export PREVIEW_BASE_URL="https://preview.$SERVER_HOST"
export MCP_CONSENT_URL="https://dashboard.$SERVER_HOST/mcp/authorize"
export S3_ASSET_PREFIX="https://api.$SERVER_HOST"
encode_password() {
  ruby -ruri -e '"'"'print URI.encode_www_form_component(ENV.fetch(ARGV.fetch(0))).gsub("+", "%20")'"'"' "$1"
}
if [ -z "${DATABASE_URL:-}" ]; then
  : "${POSTGRES_HOST:?Set the private PostgreSQL host}"
  DATABASE_URL="postgres://grovs:$(encode_password POSTGRES_PASSWORD)@$POSTGRES_HOST:5432/grovs_production"
  export DATABASE_URL
fi
if [ -z "${REDIS_URL:-}" ]; then
  : "${REDIS_HOST:?Set the private Redis host}"
  REDIS_URL="redis://:$(encode_password REDIS_PASSWORD)@$REDIS_HOST:6379/0"
  export REDIS_URL
fi
if [ -z "${CLICKHOUSE_URL:-}" ]; then
  : "${CLICKHOUSE_HOST:?Set the private ClickHouse host}"
  : "${CLICKHOUSE_PASSWORD:?Set the ClickHouse password}"
  ENCODED_PASSWORD=$(encode_password CLICKHOUSE_PASSWORD)
  export CLICKHOUSE_URL="http://grovs:$ENCODED_PASSWORD@$CLICKHOUSE_HOST:8123"
fi

wait_for_http() {
  local attempt
  for ((attempt=0; attempt<120; attempt++)); do
    if curl --fail --silent --max-time 5 "$1" >/dev/null; then return 0; fi
    sleep 5
  done
  echo "Dependency did not become healthy within the startup window." >&2
  return 1
}

wait_for_http "http://$WEB_HOST:${WEB_PORT:-3000}/up"
pids=()
trap '"'"'kill "${pids[@]}" 2>/dev/null || true'"'"' EXIT
trap '"'"'exit 143'"'"' TERM INT
bundle exec sidekiq -C config/sidekiq_scheduler.yml &
pids+=($!)
bundle exec sidekiq -C config/sidekiq_worker.yml &
pids+=($!)
bundle exec sidekiq -C config/sidekiq_batch.yml &
pids+=($!)
wait -n
'`
- **Start command:** `bash -ec '#!/usr/bin/env bash
# Sourced into the commands embedded in Railway/Render configuration.
# No files from this repository need to be present in the application image.
set -eu
: "${SERVER_HOST:?Set your app domain}"
: "${DOMAIN_LIVE:?Set your production links domain}"
: "${DOMAIN_TEST:?Set your test links domain}"
: "${AWS_S3_KEY_ID:?Set object storage credentials}"
: "${AWS_S3_ACCESS_KEY:?Set object storage credentials}"
: "${AWS_S3_REGION:?Set your bucket region}"
: "${AWS_S3_BUCKET:?Set your bucket name}"
export ACTIVE_STORAGE_SERVICE=amazon
export SERVER_HOST_PROTOCOL=https:// REACT_HOST_PROTOCOL=https://
export REACT_HOST="dashboard.$SERVER_HOST"
export API_HOST="api.$SERVER_HOST" SDK_HOST="sdk.$SERVER_HOST"
export DASHBOARD_HOST="$REACT_HOST" MCP_HOST="mcp.$SERVER_HOST" GO_HOST="go.$SERVER_HOST"
export PREVIEW_HOST="preview.$SERVER_HOST"
export LINKS_PROD_HOST="links.$DOMAIN_LIVE" LINKS_TEST_HOST="links.$DOMAIN_TEST"
export PREVIEW_BASE_URL="https://preview.$SERVER_HOST"
export MCP_CONSENT_URL="https://dashboard.$SERVER_HOST/mcp/authorize"
export S3_ASSET_PREFIX="https://api.$SERVER_HOST"
encode_password() {
  ruby -ruri -e '"'"'print URI.encode_www_form_component(ENV.fetch(ARGV.fetch(0))).gsub("+", "%20")'"'"' "$1"
}
if [ -z "${DATABASE_URL:-}" ]; then
  : "${POSTGRES_HOST:?Set the private PostgreSQL host}"
  DATABASE_URL="postgres://grovs:$(encode_password POSTGRES_PASSWORD)@$POSTGRES_HOST:5432/grovs_production"
  export DATABASE_URL
fi
if [ -z "${REDIS_URL:-}" ]; then
  : "${REDIS_HOST:?Set the private Redis host}"
  REDIS_URL="redis://:$(encode_password REDIS_PASSWORD)@$REDIS_HOST:6379/0"
  export REDIS_URL
fi
if [ -z "${CLICKHOUSE_URL:-}" ]; then
  : "${CLICKHOUSE_HOST:?Set the private ClickHouse host}"
  : "${CLICKHOUSE_PASSWORD:?Set the ClickHouse password}"
  ENCODED_PASSWORD=$(encode_password CLICKHOUSE_PASSWORD)
  export CLICKHOUSE_URL="http://grovs:$ENCODED_PASSWORD@$CLICKHOUSE_HOST:8123"
fi

wait_for_http() {
  local attempt
  for ((attempt=0; attempt<120; attempt++)); do
    if curl --fail --silent --max-time 5 "$1" >/dev/null; then return 0; fi
    sleep 5
  done
  echo "Dependency did not become healthy within the startup window." >&2
  return 1
}

exec bundle exec puma -b "tcp://[::]:${PORT:-3000}"'`
- **Healthcheck:** `/up`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `bash -ec '#!/usr/bin/env bash
# Sourced into the commands embedded in Railway/Render configuration.
# No files from this repository need to be present in the application image.
set -eu
: "${SERVER_HOST:?Set your app domain}"
: "${DOMAIN_LIVE:?Set your production links domain}"
: "${DOMAIN_TEST:?Set your test links domain}"
: "${AWS_S3_KEY_ID:?Set object storage credentials}"
: "${AWS_S3_ACCESS_KEY:?Set object storage credentials}"
: "${AWS_S3_REGION:?Set your bucket region}"
: "${AWS_S3_BUCKET:?Set your bucket name}"
export ACTIVE_STORAGE_SERVICE=amazon
export SERVER_HOST_PROTOCOL=https:// REACT_HOST_PROTOCOL=https://
export REACT_HOST="dashboard.$SERVER_HOST"
export API_HOST="api.$SERVER_HOST" SDK_HOST="sdk.$SERVER_HOST"
export DASHBOARD_HOST="$REACT_HOST" MCP_HOST="mcp.$SERVER_HOST" GO_HOST="go.$SERVER_HOST"
export PREVIEW_HOST="preview.$SERVER_HOST"
export LINKS_PROD_HOST="links.$DOMAIN_LIVE" LINKS_TEST_HOST="links.$DOMAIN_TEST"
export PREVIEW_BASE_URL="https://preview.$SERVER_HOST"
export MCP_CONSENT_URL="https://dashboard.$SERVER_HOST/mcp/authorize"
export S3_ASSET_PREFIX="https://api.$SERVER_HOST"
encode_password() {
  ruby -ruri -e '"'"'print URI.encode_www_form_component(ENV.fetch(ARGV.fetch(0))).gsub("+", "%20")'"'"' "$1"
}
if [ -z "${DATABASE_URL:-}" ]; then
  : "${POSTGRES_HOST:?Set the private PostgreSQL host}"
  DATABASE_URL="postgres://grovs:$(encode_password POSTGRES_PASSWORD)@$POSTGRES_HOST:5432/grovs_production"
  export DATABASE_URL
fi
if [ -z "${REDIS_URL:-}" ]; then
  : "${REDIS_HOST:?Set the private Redis host}"
  REDIS_URL="redis://:$(encode_password REDIS_PASSWORD)@$REDIS_HOST:6379/0"
  export REDIS_URL
fi
if [ -z "${CLICKHOUSE_URL:-}" ]; then
  : "${CLICKHOUSE_HOST:?Set the private ClickHouse host}"
  : "${CLICKHOUSE_PASSWORD:?Set the ClickHouse password}"
  ENCODED_PASSWORD=$(encode_password CLICKHOUSE_PASSWORD)
  export CLICKHOUSE_URL="http://grovs:$ENCODED_PASSWORD@$CLICKHOUSE_HOST:8123"
fi

wait_for_http() {
  local attempt
  for ((attempt=0; attempt<120; attempt++)); do
    if curl --fail --silent --max-time 5 "$1" >/dev/null; then return 0; fi
    sleep 5
  done
  echo "Dependency did not become healthy within the startup window." >&2
  return 1
}

wait_for_http "http://$WEB_HOST:${WEB_PORT:-3000}/up"
pids=()
trap '"'"'kill "${pids[@]}" 2>/dev/null || true'"'"' EXIT
trap '"'"'exit 143'"'"' TERM INT
bundle exec sidekiq -C config/sidekiq_maintenance.yml &
pids+=($!)
bundle exec sidekiq -C config/sidekiq_device_updates.yml &
pids+=($!)
wait -n
'`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/grovs-community)
