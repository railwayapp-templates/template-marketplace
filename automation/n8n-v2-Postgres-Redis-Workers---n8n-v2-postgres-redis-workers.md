# Deploy n8n v2 (Postgres + Redis + Workers) on Railway

Distributed n8n v2 setup with Postgres, Redis and worker execution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-v2-postgres-redis-workers)

## About

**n8n v2 (Postgres + Redis + Workers)** is a distributed n8n setup using
Postgres for persistence, Redis for queue coordination, and workers for
scalable workflow execution.

---

Hosting n8n v2 with Postgres, Redis, and workers enables a scalable and
production-ready workflow automation platform.  
This setup separates concerns by using Postgres for durable state,
Redis for queue-based execution, and one or more workers to process
workflows asynchronously.

It is well suited for environments with moderate to high execution
volume, concurrent workflows, or long-running tasks.  
Railway simplifies deployment by managing networking, secrets,
health checks, and scaling, allowing you to focus on building and
operating workflows instead of infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n_primary | `n8nio/n8n:2.10.4` | Web service |
| Redis | `redis:8.2.1` | Database |
| n8n_worker | `n8nio/n8n:2.10.4` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | n8n_primary | America/Argentina/Buenos_Aires | Zona horaria del sistema y de ejecución de workflows |
| `PORT` | n8n_primary | - | Puerto que Railway expone (debe coincidir con N8N_PORT) |
| `DB_TYPE` | n8n_primary | postgresdb | Tipo de base de datos usada por n8n |
| `N8N_HOST` | n8n_primary | - | Dominio público asignado por Railway |
| `N8N_PORT` | n8n_primary | 5678 | Puerto interno en el que escucha n8n |
| `PUBLIC_URL` | n8n_primary | - | URL pública base usada para construir links |
| `N8N_METRICS` | n8n_primary | true | Habilita métricas Prometheus en /metrics |
| `WEBHOOK_URL` | n8n_primary | - | URL base para la generación de webhooks públicos |
| `N8N_PROTOCOL` | n8n_primary | https | Protocolo público con el que se accede a n8n (https recomendado) |
| `NODE_OPTIONS` | n8n_primary | --max_old_space_size=4096 | Límite de memoria para Node.js |
| `N8N_LOG_LEVEL` | n8n_primary | info | Nivel de logs (error | warn | info | debug) |
| `N8N_LOG_OUTPUT` | n8n_primary | console | Salida de logs (console es ideal para Railway) |
| `N8N_PROXY_HOPS` | n8n_primary | 1 | Cantidad de proxies delante de n8n (Railway usa reverse proxy) |
| `EXECUTIONS_MODE` | n8n_primary | queue | Modo de ejecución distribuido (requerido para workers) |
| `GENERIC_TIMEZONE` | n8n_primary | - | Zona horaria usada por n8n para fechas/horarios internos |
| `N8N_SECURE_COOKIE` | n8n_primary | true | Fuerza cookies seguras (requiere HTTPS) |
| `DB_POSTGRESDB_HOST` | n8n_primary | postgres.railway.internal | Host interno del servicio Postgres en Railway |
| `DB_POSTGRESDB_PORT` | n8n_primary | - | Puerto de Postgres |
| `DB_POSTGRESDB_USER` | n8n_primary | (secret) | Usuario de Postgres |
| `N8N_ENCRYPTION_KEY` | n8n_primary | - | Clave de cifrado de credenciales (NO debe rotarse) |
| `N8N_LISTEN_ADDRESS` | n8n_primary | :: | Dirección de escucha (IPv4 + IPv6) |
| `N8N_BASIC_AUTH_USER` | n8n_primary | (secret) | Usuario para autenticación básica |
| `N8N_EDITOR_BASE_URL` | n8n_primary | - | URL base del editor web de n8n |
| `N8N_RUNNERS_ENABLED` | n8n_primary | true | Habilita runners para ejecución distribuida |
| `EXECUTIONS_DATA_PRUNE` | n8n_primary | true | Habilita limpieza automática de ejecuciones |
| `N8N_BASIC_AUTH_ACTIVE` | n8n_primary | true | Activa autenticación básica HTTP |
| `N8N_TEMPLATES_ENABLED` | n8n_primary | false | Desactiva descarga de templates oficiales de n8n |
| `QUEUE_BULL_REDIS_HOST` | n8n_primary | redis.railway.internal | Host interno de Redis |
| `QUEUE_BULL_REDIS_PORT` | n8n_primary | - | Puerto de Redis |
| `DB_POSTGRESDB_DATABASE` | n8n_primary | - | Nombre de la base de datos |
| `DB_POSTGRESDB_PASSWORD` | n8n_primary | (secret) | Password de Postgres |
| `EXECUTIONS_DATA_MAX_AGE` | n8n_primary | 336 | Máxima antigüedad de ejecuciones en horas (14 días) |
| `N8N_BASIC_AUTH_PASSWORD` | n8n_primary | (secret) | Password para autenticación básica (generado como secret) |
| `N8N_DIAGNOSTICS_ENABLED` | n8n_primary | false | Desactiva telemetría y envío de diagnósticos a n8n |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n_primary | (secret) | Password de Redis |
| `QUEUE_BULL_REDIS_USERNAME` | n8n_primary | (secret) | Usuario de Redis (si aplica) |
| `N8N_LICENSE_ACTIVATION_KEY` | n8n_primary | _REPLACE_WITH_YOU_N8N_LICENSE_ACTIVATION_KEY_ | Acá debe ir la clave de licencia de n8n (Enterprise) |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n_primary | true | Permite IPv4 + IPv6 (recomendado en Railway) |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n_primary | true | Permite acceso a variables de entorno desde nodes (según necesidad) |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | n8n_primary | true | Permite instalar community nodes |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n_primary | 100000 | Máximo de ejecuciones a conservar |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | n8n_primary | true | Deshabilita repositorios bare en el node Git |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | n8n_primary | true | Incluye métricas del sistema de colas (Bull) |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | n8n_primary | false | Desactiva chequeos automáticos de nuevas versiones |
| `N8N_METRICS_QUEUE_METRICS_INTERVAL` | n8n_primary | 30000 | Intervalo de refresco de métricas de cola (ms) |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n_primary | true | Envía ejecuciones manuales a los workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n_primary | true | Verifica permisos seguros en archivos de configuración |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `TZ` | n8n_worker | - | Zona horaria heredada del primary |
| `DB_TYPE` | n8n_worker | - | Tipo de base de datos |
| `N8N_METRICS` | n8n_worker | - | Métricas habilitadas (opcional en worker) |
| `NODE_OPTIONS` | n8n_worker | - | Memoria de Node heredada del primary |
| `N8N_LOG_LEVEL` | n8n_worker | - | Nivel de logs igual al primary |
| `N8N_LOG_OUTPUT` | n8n_worker | - | Salida de logs igual al primary |
| `EXECUTIONS_MODE` | n8n_worker | - | Modo queue (requerido) |
| `GENERIC_TIMEZONE` | n8n_worker | - | Zona horaria interna de n8n |
| `DB_POSTGRESDB_HOST` | n8n_worker | - | Host de Postgres |
| `DB_POSTGRESDB_PORT` | n8n_worker | - | Puerto de Postgres |
| `DB_POSTGRESDB_USER` | n8n_worker | (secret) | Usuario de Postgres |
| `N8N_ENCRYPTION_KEY` | n8n_worker | - | Misma clave de cifrado que el primary |
| `N8N_LISTEN_ADDRESS` | n8n_worker | :: | Permite acceso al endpoint del healthcheck |
| `N8N_RUNNERS_ENABLED` | n8n_worker | - | Runners habilitados |
| `EXECUTIONS_DATA_PRUNE` | n8n_worker | - | Limpieza de ejecuciones habilitada |
| `N8N_TEMPLATES_ENABLED` | n8n_worker | - | Templates desactivados |
| `QUEUE_BULL_REDIS_HOST` | n8n_worker | - | Host de Redis |
| `QUEUE_BULL_REDIS_PORT` | n8n_worker | - | Puerto de Redis |
| `DB_POSTGRESDB_DATABASE` | n8n_worker | - | Base de datos |
| `DB_POSTGRESDB_PASSWORD` | n8n_worker | (secret) | Password de Postgres |
| `N8N_WORKER_CONCURRENCY` | n8n_worker | 3 | Cantidad de ejecuciones concurrentes por worker |
| `EXECUTIONS_DATA_MAX_AGE` | n8n_worker | - | Antigüedad máxima de ejecuciones |
| `N8N_DIAGNOSTICS_ENABLED` | n8n_worker | - | Telemetría desactivada (heredada) |
| `QUEUE_HEALTH_CHECK_PORT` | n8n_worker | 5678 | Puerto del healthcheck |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n_worker | (secret) | Password de Redis |
| `QUEUE_BULL_REDIS_USERNAME` | n8n_worker | (secret) | Usuario de Redis |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n_worker | true | Habilita healthcheck del worker |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n_worker | - | Dual stack IPv4/IPv6 |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n_worker | - | Acceso a envs desde nodes |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n_worker | - | Máximo de ejecuciones a conservar |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | n8n_worker | - | Git hardening |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | n8n_worker | - | Notificaciones de versión desactivadas |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n_worker | - | Respeta el offload definido en el primary |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n_worker | - | Seguridad de archivos |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `n8n worker`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-v2-postgres-redis-workers)
