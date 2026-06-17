# Deploy Agente_IA_sin_supabase on Railway

Deploy and Host Agente_IA_sin_supabase with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agenteiasinsupabase)

## About

Agente Python is a high-performance, multi-channel conversational AI pipeline built with FastAPI. It features a robust Redis-based debounce buffer, multi-provider LLM support (Claude, Gemini, Grok), and real-time observability. It seamlessly integrates with Telegram, WhatsApp, and Instagram to deliver context-aware, tool-calling AI agents.

Deploying this AI Pipeline on Railway involves running a Python FastAPI application using Gunicorn/Uvicorn workers. The architecture requires a PostgreSQL database (accessed via asyncpg) for state, history, and configuration management, alongside a Redis instance for critical operations like caching, rate limiting, and message debouncing (fast-path).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| panel_gestion_fibex_sofia | [Automatianos/panel_gestion_fibex_sofia](https://github.com/Automatianos/panel_gestion_fibex_sofia) (root: /frontend) | Worker |
| MinIO-Console | [iqbalexperience/MinIO](https://github.com/iqbalexperience/MinIO) (root: /Console) | Web service |
| Chat_wed_python_backend | [Automatianos/Chat_wed_python](https://github.com/Automatianos/Chat_wed_python) (root: /backend) | Web service |
| API_Gestor_de_Colas_para_Campa-as_WhatsApp | [Automatianos/API_Gestor_de_Colas_para_Campa-as_WhatsApp](https://github.com/Automatianos/API_Gestor_de_Colas_para_Campa-as_WhatsApp) | Worker |
| Redis_colas | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Chat_wed_python | [Automatianos/Chat_wed_python](https://github.com/Automatianos/Chat_wed_python) (root: /frontend) | Web service |
| Redis | `redis:8.2.1` | Database |
| proyecto-ia_Python | [Automatianos/proyecto-ia_Python](https://github.com/Automatianos/proyecto-ia_Python) | Web service |
| panel_gestion_bakent | [Automatianos/panel_gestion_fibex_sofia](https://github.com/Automatianos/panel_gestion_fibex_sofia) (root: /backend) | Web service |
| MinIO-Bucket | [iqbalexperience/MinIO](https://github.com/iqbalexperience/MinIO) (root: /Bucket) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PANEL_NAME` | panel_gestion_fibex_sofia | SMART-PANEL | - |
| `PORT` | MinIO-Console | 9090 | - |
| `PASSWORD` | MinIO-Console | (secret) | - |
| `USERNAME` | MinIO-Console | (secret) | - |
| `DEBUG` | Chat_wed_python_backend | true | ── Proxy / Balanceador ─────────────────────────────────────────────────────── |
| `public` | Chat_wed_python_backend | - | The public service or customer domain, of the form `example.up.railway.app` |
| `JWT_SECRET` | Chat_wed_python_backend | (secret) | WEB_ENC_SECRET: semilla para derivar enc_key por sesión (AES-256-GCM). |
| `DATABASE_URL` | Chat_wed_python_backend | - | ── Seguridad de sesiones ───────────────────────────────────────────────────── |
| `IPQS_API_KEY` | Chat_wed_python_backend | (secret) | IPs con fraud_score >= este valor se bloquean aunque no sean VPN |
| `VPN_PROVIDER` | Chat_wed_python_backend | vpnapi | true: si la API falla el acceso se PERMITE (fail-open) |
| `VPN_FAIL_OPEN` | Chat_wed_python_backend | true | Horas que el resultado de la API se guarda en panel.ip_intel (default 168 = 7 días) |
| `VPNAPI_API_KEY` | Chat_wed_python_backend | (secret) | IPQualityScore — https://ipqualityscore.com  (plan free: 5 000 req/mes) |
| `WEB_ENC_SECRET` | Chat_wed_python_backend | (secret) | ── CORS / Cookies ──────────────────────────────────────────────────────────── |
| `ALLOWED_ORIGINS` | Chat_wed_python_backend | http://localhost:3000,http://localhost:8000 | true solo si frontend y backend están en dominios distintos (SameSite=None + Secure) |
| `VPN_CHECK_ENABLED` | Chat_wed_python_backend | true | Proveedor activo: vpnapi | ipqs | proxycheck |
| `LOGIN_MAX_ATTEMPTS` | Chat_wed_python_backend | (secret) | Ventana de tiempo en la que se cuentan los intentos (minutos) |
| `TRUST_PROXY_HEADERS` | Chat_wed_python_backend | false | ── Detección de VPN / proxy / Tor ─────────────────────────────────────────── |
| `VPN_CACHE_TTL_HOURS` | Chat_wed_python_backend | 168 | VPNAPI.io — https://vpnapi.io  (plan free: 1 000 req/día) |
| `CROSS_ORIGIN_COOKIES` | Chat_wed_python_backend | false | ── Entorno ─────────────────────────────────────────────────────────────────── |
| `RATE_LIMIT_IP_REQUESTS` | Chat_wed_python_backend | 120 | - |
| `MAIN_AGENT_INTERNAL_URI` | Chat_wed_python_backend | - | CONEXION INTERNA AL AGNETE |
| `IPQS_FRAUD_SCORE_THRESHOLD` | Chat_wed_python_backend | 85 | Proxycheck.io — https://proxycheck.io  (plan free: 1 000 req/día sin key) |
| `LOGIN_BLOCK_DURATION_HOURS` | Chat_wed_python_backend | (secret) | ── Rate limiting (sliding window in-memory) ───────────────────────────────── |
| `LOGIN_BLOCK_WINDOW_MINUTES` | Chat_wed_python_backend | (secret) | Duración del bloqueo automático de IP (horas) |
| `RATE_LIMIT_SESSION_REQUESTS` | Chat_wed_python_backend | 30 | - |
| `RATE_LIMIT_IP_WINDOW_SECONDS` | Chat_wed_python_backend | 60 | Nivel 2 — por sesión autenticada: fuerza velocidad humana |
| `RATE_LIMIT_SESSION_WINDOW_SECONDS` | Chat_wed_python_backend | 10 | ── Legado / no usada en el panel ───────────────────────────────────────────── |
| `LOTES` | API_Gestor_de_Colas_para_Campa-as_WhatsApp | true | - |
| `private` | API_Gestor_de_Colas_para_Campa-as_WhatsApp | - | The private DNS name of the service. |
| `LOTES_SIZE` | API_Gestor_de_Colas_para_Campa-as_WhatsApp | 10 | - |
| `INSTANCE_ID` | API_Gestor_de_Colas_para_Campa-as_WhatsApp | instance-1 | - |
| `INTERVALO_ENVIO_MS` | API_Gestor_de_Colas_para_Campa-as_WhatsApp | 2000 | - |
| `TEMPLATES_WRAPPER_STATUS` | API_Gestor_de_Colas_para_Campa-as_WhatsApp | APPROVED | - |
| `REDISPORT` | Redis_colas | 6379 | - |
| `REDISUSER` | Redis_colas | default | - |
| `REDIS_URL` | Redis_colas | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis_colas | (secret) | - |
| `REDIS_PASSWORD` | Redis_colas | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis_colas | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Chat_wed_python | 80 | - |
| `CROSS_ORIGIN_COOKIES` | Chat_wed_python | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `APP_ENV` | proyecto-ia_Python | development | - |
| `APP_PORT` | proyecto-ia_Python | 8000 | - |
| `REDIS_URL` | proyecto-ia_Python | - | Key para el cahe del sistema |
| `PRIVATE_URI` | proyecto-ia_Python | - | The private DNS name of the service. |
| `DATABASE_URL` | proyecto-ia_Python | - | Base de datos |
| `MEMORY_TABLE` | proyecto-ia_Python | memory_pepeline | - |
| `ADMIN_API_KEY` | proyecto-ia_Python | (secret) | - |
| `S3_BUCKET_NAME` | proyecto-ia_Python | agente-python | - |
| `THINKING_LEVEL` | proyecto-ia_Python | medium | - |
| `MAX_TOOL_ROUNDS` | proyecto-ia_Python | 5 | - |
| `WEB_CONCURRENCY` | proyecto-ia_Python | 2 | - |
| `CACHE_CONFIG_TTL` | proyecto-ia_Python | 86400 | - |
| `GUNICORN_TIMEOUT` | proyecto-ia_Python | 120 | - |
| `REMINDER_ENABLED` | proyecto-ia_Python | true | ----------------------------------------------------------------------------- |
| `AGENT_OUTPUT_MODE` | proyecto-ia_Python | json_schema | - |
| `MEMORY_TABLE_CORE` | proyecto-ia_Python | memory_pepeline_core | - |
| `MAX_REQUEST_TOKENS` | proyecto-ia_Python | (secret) | ----------------------------------------------------------------------------- |
| `PARSER_MAX_RETRIES` | proyecto-ia_Python | 2 | ----------------------------------------------------------------------------- |
| `TRUST_PROXY_HEADERS` | proyecto-ia_Python | false | - |
| `CORS_ALLOWED_ORIGINS` | proyecto-ia_Python | - | ----------------------------------------------------------------------------- |
| `MAX_FLUSH_BATCH_SIZE` | proyecto-ia_Python | 80 | - |
| `S3_SECRET_ACCESS_KEY` | proyecto-ia_Python | (secret) | - |
| `AGENT_TIMEOUT_SECONDS` | proyecto-ia_Python | 30 | - |
| `BUFFER_WINDOW_SECONDS` | proyecto-ia_Python | 5.0 | - |
| `COMPRESSOR_MAX_TOKENS` | proyecto-ia_Python | (secret) | - |
| `TELEGRAM_NOTIFI_TOKEN` | proyecto-ia_Python | (secret) | Bot para notificaicones internas |
| `COMPRESSOR_TEMPERATURE` | proyecto-ia_Python | 0.1 | - |
| `MAX_USER_MESSAGE_CHARS` | proyecto-ia_Python | 4000 | Proteccion anti-replay en webhooks. |
| `MAX_WEBHOOK_BODY_BYTES` | proyecto-ia_Python | 524288 | ----------------------------------------------------------------------------- |
| `PARSER_TIMEOUT_SECONDS` | proyecto-ia_Python | 30 | - |
| `SHUTDOWN_GRACE_SECONDS` | proyecto-ia_Python | 30 | - |
| `COMPRESSION_WINDOW_DAYS` | proyecto-ia_Python | 3 | Cantidad de dias en el que se mantiene la ventana de contexto comprimido |
| `ERROR_NOTIFY_RATE_LIMIT` | proyecto-ia_Python | 30 | TELEGRAM_NOTIFI_TOKEN=... |
| `LOADING_STICKER_ENABLED` | proyecto-ia_Python | false | LOADING_STICKER_URL=https://... |
| `RATE_LIMIT_MAX_REQUESTS` | proyecto-ia_Python | 60 | - |
| `SYSTEM_PROMPT_CACHE_TTL` | proyecto-ia_Python | 900 | ----------------------------------------------------------------------------- |
| `TELEGRAM_NOTIFI_CHAT_ID` | proyecto-ia_Python | - | Chat de notificaicones |
| `BUFFER_FAST_PATH_SECONDS` | proyecto-ia_Python | 5 | ----------------------------------------------------------------------------- |
| `MAX_CONCURRENT_PIPELINES` | proyecto-ia_Python | 60 | - |
| `PIPELINE_TIMEOUT_SECONDS` | proyecto-ia_Python | 120 | - |
| `RATE_LIMIT_WINDOW_SECONDS` | proyecto-ia_Python | 60 | - |
| `WEBHOOK_NONCE_TTL_SECONDS` | proyecto-ia_Python | 600 | definir maximo de tokens por interaccion |
| `COMPRESSOR_TIMEOUT_SECONDS` | proyecto-ia_Python | 30 | - |
| `CORE_AGENT_TIMEOUT_SECONDS` | proyecto-ia_Python | 20 | - |
| `WEBHOOK_TIMESTAMP_SKEW_SECONDS` | proyecto-ia_Python | 300 | - |
| `DEBUG` | panel_gestion_bakent | true | ── Proxy / Balanceador ─────────────────────────────────────────────────────── |
| `JWT_SECRET` | panel_gestion_bakent | (secret) | WEB_ENC_SECRET: semilla para derivar enc_key por sesión (AES-256-GCM). |
| `DATABASE_URL` | panel_gestion_bakent | - | ── Seguridad de sesiones ───────────────────────────────────────────────────── |
| `IPQS_API_KEY` | panel_gestion_bakent | (secret) | IPs con fraud_score >= este valor se bloquean aunque no sean VPN |
| `VPN_PROVIDER` | panel_gestion_bakent | vpnapi | true: si la API falla el acceso se PERMITE (fail-open) |
| `BAKENT_PUBLIC` | panel_gestion_bakent | - | The public service or customer domain, of the form `example.up.railway.app` |
| `VPN_FAIL_OPEN` | panel_gestion_bakent | false | Horas que el resultado de la API se guarda en panel.ip_intel (default 168 = 7 días) |
| `VPNAPI_API_KEY` | panel_gestion_bakent | (secret) | IPQualityScore — https://ipqualityscore.com  (plan free: 5 000 req/mes) |
| `WEB_ENC_SECRET` | panel_gestion_bakent | (secret) | ── CORS / Cookies ──────────────────────────────────────────────────────────── |
| `ALLOWED_ORIGINS` | panel_gestion_bakent | http://localhost:3000,http://localhost:8000 | true solo si frontend y backend están en dominios distintos (SameSite=None + Secure) |
| `VPN_CHECK_ENABLED` | panel_gestion_bakent | false | Proveedor activo: vpnapi | ipqs | proxycheck |
| `LOGIN_MAX_ATTEMPTS` | panel_gestion_bakent | (secret) | Ventana de tiempo en la que se cuentan los intentos (minutos) |
| `TRUST_PROXY_HEADERS` | panel_gestion_bakent | false | ── Detección de VPN / proxy / Tor ─────────────────────────────────────────── |
| `VPN_CACHE_TTL_HOURS` | panel_gestion_bakent | 168 | VPNAPI.io — https://vpnapi.io  (plan free: 1 000 req/día) |
| `CROSS_ORIGIN_COOKIES` | panel_gestion_bakent | false | ── Entorno ─────────────────────────────────────────────────────────────────── |
| `VPN_ALLOWED_COUNTRIES` | panel_gestion_bakent | VE | - |
| `RATE_LIMIT_IP_REQUESTS` | panel_gestion_bakent | 120 | - |
| `IPQS_FRAUD_SCORE_THRESHOLD` | panel_gestion_bakent | 85 | Proxycheck.io — https://proxycheck.io  (plan free: 1 000 req/día sin key) |
| `LOGIN_BLOCK_DURATION_HOURS` | panel_gestion_bakent | (secret) | ── Rate limiting (sliding window in-memory) ───────────────────────────────── |
| `LOGIN_BLOCK_WINDOW_MINUTES` | panel_gestion_bakent | (secret) | Duración del bloqueo automático de IP (horas) |
| `RATE_LIMIT_SESSION_REQUESTS` | panel_gestion_bakent | 30 | - |
| `RATE_LIMIT_IP_WINDOW_SECONDS` | panel_gestion_bakent | 60 | Nivel 2 — por sesión autenticada: fuerza velocidad humana |
| `RATE_LIMIT_SESSION_WINDOW_SECONDS` | panel_gestion_bakent | 10 | ── Legado / no usada en el panel ───────────────────────────────────────────── |
| `MINIO_ROOT_USER` | MinIO-Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | MinIO-Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | MinIO-Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | MinIO-Bucket | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Rust, Python, PLpgSQL, CSS, JavaScript, HTML, Dockerfile, Shell, Procfile, PowerShell

[View on Railway →](https://railway.com/deploy/agenteiasinsupabase)
