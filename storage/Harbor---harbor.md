# Deploy Harbor on Railway

Private Docker registry with vulnerability scanning, roles and replication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/harbor)

## About

Harbor is a CNCF graduated container registry that stores and secures the OCI artifacts your builds produce — Docker images, Helm charts and signed attestations. It adds what a bare registry leaves out: projects with role-based access control, per-image vulnerability scanning, robot accounts for CI, replication to and from other registries, retention rules and storage quotas. Teams reach for it when pushing to Docker Hub stops being acceptable and a plain `registry:2` container stops being enough.

Deploy Harbor on Railway and you get its full production topology, not a single-container approximation. Seven services run here: a Caddy edge routing `/api`, `/v2`, `/service` and `/c` to core and everything else to the portal; core, which owns authentication and issues the bearer tokens Docker clients present; the OCI distribution registry; a registry controller for garbage collection; a job service running replication, scan and webhook work; and a Trivy adapter. Managed Postgres holds the metadata, Redis carries job queues and the layer cache, and image layers go to an S3-compatible bucket, so the registry is not capped by a disk you resize by hand.

![Diagram of Harbor's seven services with Postgres and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788293846/harbor-architecture.png)

Harbor began at VMware and graduated from the CNCF in 2020. It is an OCI-compliant registry with a policy and identity layer around it — which is what separates it from the reference `distribution` registry, which has no users, projects or scanning. Teams self-host it to keep proprietary images off public infrastructure, to enforce a "no critical vulnerabilities in production" rule at the registry instead of in a CI script, and to mirror upstream images so a rate limit never stops a deploy.

- Projects with per-user and per-group roles, plus LDAP and OIDC single sign-on
- Trivy vulnerability scanning on demand or automatically on push, with scoped robot accounts for CI
- Replication to and from Docker Hub, GHCR, ECR, GCR, ACR, Quay and other Harbor instances
- Proxy cache projects that pull through to an upstream registry and cache locally
- Tag retention, immutable tags, storage quotas, garbage collection, Cosign and SBOM support

The multi-service split is Harbor's own design. Core alone talks to Postgres and authenticates users; the registry is deliberately dumb, storing blobs and trusting core for authorization. The job service is a real worker tier — replication, garbage collection and scan jobs queue through Redis and execute there, which is why scanning a large image never blocks the API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| harbor-jobservice | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Worker |
| harbor-core | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| harbor-registry | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Worker |
| harbor-portal | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Worker |
| harbor-registryctl | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Worker |
| harbor-trivy | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Database |
| harbor-proxy | [gridalpha/harbor-railway](https://github.com/gridalpha/harbor-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | harbor-jobservice | 8080 | Job service HTTP port |
| `CORE_URL` | harbor-jobservice | - | Core API address |
| `LOG_LEVEL` | harbor-jobservice | info | Job service log verbosity |
| `CORE_SECRET` | harbor-jobservice | (secret) | Core authentication secret |
| `PRIVATE_URL` | harbor-jobservice | http://harbor-jobservice.railway.internal:8080 | Address peers dial |
| `REGISTRY_URL` | harbor-jobservice | - | Distribution registry address |
| `MAX_JOB_WORKERS` | harbor-jobservice | 10 | Concurrent job workers |
| `JOBSERVICE_SECRET` | harbor-jobservice | (secret) | Job service authentication secret |
| `JOBSERVICE_REDIS_URL` | harbor-jobservice | - | Job queue backend |
| `REGISTRY_CONTROLLER_URL` | harbor-jobservice | - | Registry controller address |
| `REGISTRY_CREDENTIAL_PASSWORD` | harbor-jobservice | (secret) | Registry basic auth password |
| `REGISTRY_CREDENTIAL_USERNAME` | harbor-jobservice | (secret) | Registry basic auth user |
| `JOBSERVICE_WEBHOOK_JOB_MAX_RETRY` | harbor-jobservice | 3 | Webhook delivery retries |
| `JOBSERVICE_WEBHOOK_JOB_HTTP_CLIENT_TIMEOUT` | harbor-jobservice | 3 | Webhook client timeout seconds |
| `PORT` | harbor-core | 8080 | Core HTTP listening port |
| `CORE_URL` | harbor-core | http://harbor-core.railway.internal:8080 | Core address given to peers |
| `CSRF_KEY` | harbor-core | - | CSRF token key, exactly 32 characters |
| `LOG_LEVEL` | harbor-core | info | Core log verbosity |
| `READ_ONLY` | harbor-core | false | Allow pushes |
| `PORTAL_URL` | harbor-core | - | Web UI address |
| `RELOAD_KEY` | harbor-core | - | Configuration reload key |
| `WITH_TRIVY` | harbor-core | true | Register Trivy as default scanner |
| `CONFIG_PATH` | harbor-core | /harbor/app.conf | Beego application config location |
| `CORE_SECRET` | harbor-core | (secret) | Core to component authentication |
| `PRIVATE_URL` | harbor-core | http://harbor-core.railway.internal:8080 | Address peers dial |
| `EXT_ENDPOINT` | harbor-core | - | Public URL in token realm |
| `REGISTRY_URL` | harbor-core | - | Distribution registry address |
| `DATABASE_TYPE` | harbor-core | postgresql | Metadata backend type |
| `CORE_LOCAL_URL` | harbor-core | http://localhost:8080 | Core loopback address |
| `JOBSERVICE_URL` | harbor-core | - | Job service address |
| `_REDIS_URL_REG` | harbor-core | - | Registry layer cache |
| `MAX_JOB_WORKERS` | harbor-core | 10 | Concurrent job workers |
| `POSTGRESQL_HOST` | harbor-core | - | Postgres private hostname |
| `POSTGRESQL_PORT` | harbor-core | - | Postgres port |
| `_REDIS_URL_CORE` | harbor-core | - | Core cache and sessions |
| `HARBOR_SECRET_KEY` | harbor-core | (secret) | Encrypts stored credentials, never change |
| `JOBSERVICE_SECRET` | harbor-core | (secret) | Job service authentication |
| `TOKEN_SERVICE_URL` | harbor-core | (secret) | Self-hosted token endpoint |
| `TRIVY_ADAPTER_URL` | harbor-core | - | Scanner adapter address |
| `POSTGRESQL_SSLMODE` | harbor-core | disable | Private network, no TLS needed |
| `POSTGRESQL_DATABASE` | harbor-core | - | Harbor metadata database |
| `POSTGRESQL_PASSWORD` | harbor-core | (secret) | Postgres password |
| `POSTGRESQL_USERNAME` | harbor-core | (secret) | Postgres role |
| `REGISTRY_HTTP_SECRET` | harbor-core | (secret) | Signs registry upload state |
| `HARBOR_ADMIN_PASSWORD` | harbor-core | (secret) | Initial admin password, change after login |
| `REGISTRY_CONTROLLER_URL` | harbor-core | - | Registry controller address |
| `POSTGRESQL_MAX_IDLE_CONNS` | harbor-core | 50 | Idle connection pool size |
| `POSTGRESQL_MAX_OPEN_CONNS` | harbor-core | 100 | Maximum open connections |
| `ROBOT_SCANNER_NAME_PREFIX` | harbor-core | scanner | Prefix for scanner robot accounts |
| `POSTGRESQL_CONN_MAX_LIFETIME` | harbor-core | 5m | Connection recycle interval |
| `REGISTRY_CREDENTIAL_PASSWORD` | harbor-core | (secret) | Basic auth password for registry |
| `REGISTRY_CREDENTIAL_USERNAME` | harbor-core | (secret) | Basic auth user for registry |
| `POSTGRESQL_CONN_MAX_IDLE_TIME` | harbor-core | 0s | Idle connection timeout |
| `REPLICATION_ADAPTER_WHITELIST` | harbor-core | ali-acr,aws-ecr,azure-acr,docker-hub,docker-registry,github-ghcr,google-gcr,harbor,huawei-SWR,jfrog-artifactory,tencent-tcr,volcengine-cr | Allowed replication targets |
| `REGISTRY_STORAGE_PROVIDER_NAME` | harbor-core | s3 | Storage driver in use |
| `PERMITTED_REGISTRY_TYPES_FOR_PROXY_CACHE` | harbor-core | docker-hub,harbor,azure-acr,ali-acr,aws-ecr,google-gcr,docker-registry,github-ghcr,jfrog-artifactory | Allowed proxy cache upstreams |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | harbor-registry | 5001 | Debug listener probed for health |
| `REDIS_DB` | harbor-registry | 1 | Redis database for layer cache |
| `LOG_LEVEL` | harbor-registry | info | Registry log verbosity |
| `S3_BUCKET` | harbor-registry | - | Bucket holding image layers |
| `S3_REGION` | harbor-registry | - | Bucket region |
| `REDIS_HOST` | harbor-registry | - | Redis private hostname |
| `REDIS_PORT` | harbor-registry | - | Redis port |
| `PRIVATE_URL` | harbor-registry | http://harbor-registry.railway.internal:5000 | Address peers dial |
| `S3_ENDPOINT` | harbor-registry | - | S3-compatible endpoint |
| `S3_ACCESS_KEY` | harbor-registry | - | Bucket access key |
| `S3_SECRET_KEY` | harbor-registry | (secret) | Bucket secret key |
| `REDIS_PASSWORD` | harbor-registry | (secret) | Redis password |
| `REDIS_USERNAME` | harbor-registry | (secret) | Redis username |
| `REGISTRY_PASSWORD` | harbor-registry | (secret) | Basic auth password |
| `REGISTRY_USERNAME` | harbor-registry | (secret) | Basic auth user |
| `REGISTRY_HTTP_SECRET` | harbor-registry | (secret) | Signs upload state |
| `PORT` | harbor-portal | 8080 | Nginx listening port |
| `PRIVATE_URL` | harbor-portal | http://harbor-portal.railway.internal:8080 | Address the edge dials |
| `PORT` | harbor-registryctl | 8080 | Controller HTTP port |
| `REDIS_DB` | harbor-registryctl | 1 | Redis database for layer cache |
| `LOG_LEVEL` | harbor-registryctl | info | Controller log verbosity |
| `S3_BUCKET` | harbor-registryctl | - | Bucket holding image layers |
| `S3_REGION` | harbor-registryctl | - | Bucket region |
| `REDIS_HOST` | harbor-registryctl | - | Redis private hostname |
| `REDIS_PORT` | harbor-registryctl | - | Redis port |
| `CORE_SECRET` | harbor-registryctl | (secret) | Core authentication secret |
| `PRIVATE_URL` | harbor-registryctl | http://harbor-registryctl.railway.internal:8080 | Address peers dial |
| `S3_ENDPOINT` | harbor-registryctl | - | S3-compatible endpoint |
| `S3_ACCESS_KEY` | harbor-registryctl | - | Bucket access key |
| `S3_SECRET_KEY` | harbor-registryctl | (secret) | Bucket secret key |
| `REDIS_PASSWORD` | harbor-registryctl | (secret) | Redis password |
| `REDIS_USERNAME` | harbor-registryctl | (secret) | Redis username |
| `JOBSERVICE_SECRET` | harbor-registryctl | (secret) | Job service authentication secret |
| `REGISTRY_HTTP_SECRET` | harbor-registryctl | (secret) | Signs upload state |
| `PORT` | harbor-trivy | 8080 | Scanner adapter HTTP port |
| `PRIVATE_URL` | harbor-trivy | http://harbor-trivy.railway.internal:8080 | Address peers dial |
| `SCANNER_LOG_LEVEL` | harbor-trivy | info | Scanner log verbosity |
| `SCANNER_REDIS_URL` | harbor-trivy | - | Scanner Redis connection |
| `SCANNER_TRIVY_TIMEOUT` | harbor-trivy | 5m0s | Per-scan timeout |
| `SCANNER_TRIVY_INSECURE` | harbor-trivy | false | Verify TLS to the registry |
| `SCANNER_TRIVY_SEVERITY` | harbor-trivy | UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL | Severities reported |
| `SCANNER_STORE_REDIS_URL` | harbor-trivy | - | Scan report store |
| `SCANNER_TRIVY_CACHE_DIR` | harbor-trivy | /home/scanner/.cache/trivy | Vulnerability database location |
| `SCANNER_TRIVY_VULN_TYPE` | harbor-trivy | os,library | Scan OS and language packages |
| `SCANNER_TRIVY_REPORTS_DIR` | harbor-trivy | /home/scanner/.cache/reports | Scan report working directory |
| `SCANNER_TRIVY_SKIP_UPDATE` | harbor-trivy | false | Keep the vulnerability database current |
| `SCANNER_TRIVY_OFFLINE_SCAN` | harbor-trivy | false | Allow dependency lookups during scans |
| `SCANNER_JOB_QUEUE_REDIS_URL` | harbor-trivy | - | Scan job queue |
| `SCANNER_TRIVY_DB_REPOSITORY` | harbor-trivy | ghcr.io/aquasecurity/trivy-db | Vulnerability database source |
| `SCANNER_TRIVY_IGNORE_UNFIXED` | harbor-trivy | false | Include vulnerabilities without fixes |
| `SCANNER_STORE_REDIS_NAMESPACE` | harbor-trivy | harbor.scanner.trivy:store | Report store key prefix |
| `SCANNER_TRIVY_SECURITY_CHECKS` | harbor-trivy | vuln | Run vulnerability checks |
| `SCANNER_TRIVY_JAVA_DB_REPOSITORY` | harbor-trivy | ghcr.io/aquasecurity/trivy-java-db | Java database source |
| `SCANNER_JOB_QUEUE_REDIS_NAMESPACE` | harbor-trivy | harbor.scanner.trivy:job-queue | Job queue key prefix |
| `SCANNER_TRIVY_SKIP_JAVA_DB_UPDATE` | harbor-trivy | false | Keep the Java database current |
| `PORT` | harbor-proxy | 8080 | Caddy listening port |
| `CORE_URL` | harbor-proxy | - | Upstream for API and registry paths |
| `PORTAL_URL` | harbor-proxy | - | Upstream for the web UI |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/stats`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/debug/health`
- **Healthcheck:** `/`
- **Healthcheck:** `/api/health`
- **Healthcheck:** `/probe/healthy`
- **Volume:** `/home/scanner/.cache`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/harbor)
