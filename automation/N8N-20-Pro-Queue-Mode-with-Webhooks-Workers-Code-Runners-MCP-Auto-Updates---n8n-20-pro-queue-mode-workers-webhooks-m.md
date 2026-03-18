# Deploy N8N 2.0 Pro (Queue Mode with Webhooks, Workers, Code Runners, MCP & Auto-Updates) on Railway

🪄1-Click Deploy | High Performance N8N setup with Postgres17 + Redis + MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-20-pro-queue-mode-workers-webhooks-m)

## About

N8N 2.0 Pro is a production-grade n8n deployment architecture combining distributed queue-based execution, dedicated webhook processors, sandboxed code runners, and Model Context Protocol integration. It scales horizontally with independent workers, handles high-concurrency webhooks, executes JavaScript and Python code securely in isolated environments, and enables AI agent capabilities—all containerized and cloud-ready for Railway deployment.

Hosting n8n in this configuration requires orchestrating multiple interconnected services: a main instance managing workflows and UI, Redis for job queue management, PostgreSQL for persistent data storage, dedicated workers processing queued jobs with configurable concurrency, task runner sidecars for secure Code node execution, and optional webhook processors handling incoming triggers independently. This architecture ensures the main instance remains responsive for UI interactions while background workers handle execution load. Code runners (task runners) provide sandboxed JavaScript and Python execution, isolating user code from the main process for security and stability. MCP integration enables AI agents to access external tools and data. The setup demands proper environment variable synchronization across services, Redis dual-stack configuration, runner-to-main communication via WebSocket grants, and careful concurrency tuning based on available CPU and memory resources.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `n8nio/n8n:latest` | Web service |
| redis | `railwayapp/redis:latest` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| mcp | `ghcr.io/czlonkowski/n8n-mcp-railway:latest` | Web service |
| runner | `n8nio/runners:latest` | Worker |
| main | `n8nio/n8n:latest` | Web service |
| webhook | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | worker | - | 🌍 System-level timezone for the container environment |
| `PORT` | worker | - | 🚪 TCP port where the n8n process listens for HTTP traffic |
| `DB_TYPE` | worker | - | Database engine type (postgresdb) |
| `N8N_HOST` | worker | - | 🌐 The domain name where the n8n main instance is accessible |
| `N8N_METRICS` | worker | - | 📊 Enable Prometheus metrics endpoint for monitoring n8n instance performance, execution counts, and system health |
| `WEBHOOK_URL` | worker | - | Public HTTPS endpoint for incoming webhook triggers |
| `N8N_PROTOCOL` | worker | - | 🔒 Force the use of HTTPS for internal URL generation |
| `NODE_OPTIONS` | worker | - | Node.js runtime options (memory limits, GC tuning) |
| `N8N_LOG_LEVEL` | worker | - | 📝 Logging verbosity level (set to debug for detailed troubleshooting) |
| `EXECUTIONS_MODE` | worker | - | Use queue mode for distributed execution processing |
| `N8N_CONCURRENCY` | worker | - | Disable global concurrency limit (use per-worker --concurrency flag) |
| `GENERIC_TIMEZONE` | worker | - | 🕒 Default timezone used within n8n workflows and nodes |
| `N8N_RUNNERS_MODE` | worker | - | 🏗️ Enable task runners to process node executions externally |
| `N8N_SECURE_COOKIE` | worker | - | 🛡️ Only send session cookies over HTTPS (essential for production) |
| `DB_POSTGRESDB_HOST` | worker | - | PostgreSQL server hostname |
| `DB_POSTGRESDB_PORT` | worker | - | PostgreSQL server port (5432) |
| `DB_POSTGRESDB_USER` | worker | (secret) | PostgreSQL username for n8n connections |
| `N8N_ENCRYPTION_KEY` | worker | - | 🔑 Symmetric key for encrypting credentials in database |
| `N8N_LISTEN_ADDRESS` | worker | :: | Bind address for incoming connections (IPv6 dual-stack) |
| `N8N_EDITOR_BASE_URL` | worker | - | Public URL for n8n editor UI access |
| `N8N_RUNNERS_ENABLED` | worker | - | Enable task runners for isolated Code node execution |
| `N8N_ENDPOINT_WEBHOOK` | worker | - | Path prefix for production webhooks that execute workflows |
| `N8N_PAYLOAD_SIZE_MAX` | worker | - | 📦 Maximum allowed size (in MB) for incoming JSON request payloads |
| `N8N_TEMPLATES_ENABLED` | worker | - | 📁 Enable the workflow templates library in the UI |
| `QUEUE_BULL_REDIS_HOST` | worker | - | Redis hostname for Bull job queue |
| `QUEUE_BULL_REDIS_PORT` | worker | - | Redis port for job queue (6379) |
| `DB_POSTGRESDB_DATABASE` | worker | - | PostgreSQL database name for n8n |
| `DB_POSTGRESDB_PASSWORD` | worker | (secret) | PostgreSQL password for authentication |
| `N8N_RUNNERS_AUTH_TOKEN` | worker | (secret) | 🛡️ Shared secret token for authenticating runners with the broker |
| `N8N_RUNNERS_BROKER_PORT` | worker | - | 🔌 Port used by the broker to communicate with task runners |
| `N8N_RUNNERS_MAX_PAYLOAD` | worker | - | Maximum payload size in bytes for communication between a task broker and a task runner |
| `N8N_NATIVE_PYTHON_RUNNER` | worker | - | 🐍 Enable the native Python execution environment for Code nodes |
| `N8N_ENDPOINT_WEBHOOK_TEST` | worker | - | Path prefix for test webhooks used in the editor |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | worker | - | Path prefix for waiting webhooks that resume workflows |
| `QUEUE_BULL_REDIS_PASSWORD` | worker | (secret) | Redis password for queue connections |
| `QUEUE_BULL_REDIS_USERNAME` | worker | (secret) | Redis username for authentication |
| `QUEUE_HEALTH_CHECK_ACTIVE` | worker | - | 🚦 Enable queue health monitoring and worker status checks |
| `N8N_FORMDATA_FILE_SIZE_MAX` | worker | - | 📁 Maximum allowed size (in MB) for file uploads via multipart/form-data |
| `QUEUE_BULL_REDIS_DUALSTACK` | worker | - | Enable IPv4/IPv6 dual-stack Redis support |
| `N8N_RUNNERS_MAX_CONCURRENCY` | worker | - | 🚀 Maximum number of concurrent tasks a single runner can handle |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | worker | - | Blocking code nodes from accessing environment variables |
| `N8N_DEFAULT_BINARY_DATA_MODE` | worker | - | Sets storage backend for binary data (filesystem, database, or S3) |
| `N8N_REINSTALL_MISSING_PACKAGES` | worker | - | Auto-install missing node packages |
| `N8N_RELOAD_WORKFLOWS_ON_CHANGE` | worker | - | 🔄 Ensure workers immediately pick up workflow changes |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | worker | - | ⚠️ Allow Git node to use bare repositories (security risk - hooks can execute arbitrary code) |
| `N8N_SKIP_AUTH_ON_OAUTH_CALLBACK` | worker | - | Skip authentication on OAuth callback endpoints (security risk in n8n 2.0 - defaults to false for enforced auth) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | worker | - | Enable Railway private networking between services |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | worker | - | 📈 Include detailed Bull queue statistics (waiting, active, failed) in Prometheus metrics |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | worker | - | 📍 Address the broker listens on for runner connections |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | worker | - | Offload production webhooks from main process |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | worker | - | Send UI manual executions to workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | worker | - | Enforce 0600 permissions on config files |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | worker | - | This enables AI Agents in n8n to use community node packages as tools |
| `PORT` | redis | - | 🚪 Port reference for Railway |
| `REDISHOST` | redis | - | Hostname of the private Redis service endpoint inside Railway’s network |
| `REDISPORT` | redis | 6379 | 🚪 TCP port Redis listens on for client connections |
| `REDISUSER` | redis | default | 👤 Redis username, typically the default ACL user in secured Redis setups |
| `REDIS_URL` | redis | - | Full Redis connection URL for the job queue (Bull) |
| `REDISPASSWORD` | redis | (secret) | 🔑 Alias for the Redis password to ensure compatibility with various clients |
| `REDIS_PASSWORD` | redis | (secret) | 🔐 Randomly generated 64-character strong password for Redis authentication |
| `REDIS_PUBLIC_URL` | redis | - | 🌐 External connection string for monitoring Redis via CLI or GUI |
| `PORT` | postgres | - | 🚪 Port reference for Railway |
| `POSTGRES_DB` | postgres | n8n | Name of the primary PostgreSQL database created at initialization |
| `DATABASE_URL` | postgres | - | Full PostgreSQL connection string including credentials, host, port, and database |
| `POSTGRES_USER` | postgres | (secret) | 👤 PostgreSQL username for superuser / application user |
| `POSTGRES_PASSWORD` | postgres | (secret) | 🔑 Random 64-character strong password for securing the PostgreSQL user |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | mcp | 8080 | 🚪 TCP port where the MCP server listens for incoming AI requests |
| `MCP_MODE` | mcp | http | 🌐 Sets the communication protocol (using HTTP for remote AI access) |
| `NODE_ENV` | mcp | production | - |
| `LOG_LEVEL` | mcp | error | 📝 Logging verbosity; "error" ensures clean communication between the AI and MCP |
| `AUTH_TOKEN` | mcp | (secret) | 🛡️ Links the active authentication token to the generated secret below |
| `CORS_ORIGIN` | mcp | * | - |
| `N8N_API_KEY` | mcp | (secret) | 🔑 API key from your n8n User Settings to allow MCP to control n8n |
| `N8N_API_URL` | mcp | - | 🔗 The base URL of your main n8n instance for API calls |
| `TRUST_PROXY` | mcp | true | - |
| `AUTH_TOKEN_KEY` | mcp | (secret) | 🔐 Auto-generated 64-character secret to secure the MCP-to-AI connection |
| `WEBHOOK_SECURITY_MODE` | mcp | strict | 🛡️ "strict" enforces high security; use "moderate" only for local testing |
| `DISABLE_CONSOLE_OUTPUT` | mcp | false | 🔇 If true, hides logs to prevent JSON-RPC corruption (keep false unless using Stdio) |
| `N8N_MCP_TELEMETRY_DISABLED` | mcp | true | 🛑 Opt-out of anonymous usage data collection for privacy |
| `TZ` | runner | - | 🌍 System-level timezone for the runner container |
| `TINI_SUBREAPER` | runner | true | - |
| `GENERIC_TIMEZONE` | runner | - | 🕒 Timezone inherited for code execution logic |
| `N8N_RUNNERS_AUTH_TOKEN` | runner | (secret) | 🛡️ Shared secret token to authenticate this runner with the Task Broker |
| `N8N_RUNNERS_GRANT_TOKEN` | runner | (secret) | Token the runner uses to authenticate with the task broker. This is automatically provided by the launcher. |
| `N8N_RUNNERS_MAX_PAYLOAD` | runner | - | Maximum payload size in bytes for communication between a task broker and a task runner |
| `N8N_RUNNERS_STDLIB_ALLOW` | runner | * | 📚 List of allowed Python standard library modules (* allows all) |
| `N8N_RUNNERS_EXTERNAL_ALLOW` | runner | * | 📦 List of allowed external npm/pip packages for use in Code nodes |
| `N8N_BLOCK_RUNNER_ENV_ACCESS` | runner | true | 🔒 Security: Prevents code executed in the runner from accessing system environment variables |
| `N8N_RUNNERS_MAX_CONCURRENCY` | runner | - | 🚀 Maximum number of code tasks this runner can execute simultaneously |
| `N8N_RUNNERS_TASK_BROKER_URI` | runner | - | 🔗 Internal URI used to connect the runner to the task broker |
| `NODE_FUNCTION_ALLOW_BUILTIN` | runner | * | 🛠️ Built-in Node.js modules allowed in the Code node (e.g., path, fs) |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | runner | * | 🔌 External npm packages allowed in the Code node |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | runner | - | 📝 Logging verbosity for the runner's launcher process |
| `N8N_RUNNERS_MAX_OLD_SPACE_SIZE` | runner | - | The `--max-old-space-size` option to use for a task runner (in MB). By default, Node.js will set this based on available memory. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | runner | 15 | ⏳ Minutes to wait before shutting down an idle runner (useful for serverless/auto-scaling) |
| `N8N_RUNNERS_ALLOW_PROTOTYPE_MUTATION` | runner | true | 🧪 Allows modifying JS prototypes (required for certain complex libraries in Code nodes) |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | runner | 5680 | 🚦 Port dedicated to the runner launcher's health check monitoring |
| `TZ` | main | Etc/UTC | 🌍 System-level timezone for the container environment |
| `PORT` | main | 5678 | 🚪 Port where n8n listens for incoming connections |
| `DB_TYPE` | main | postgresdb | Database type - using PostgreSQL for data storage |
| `N8N_HOST` | main | - | 🌐 The domain name where the n8n main instance is accessible |
| `N8N_METRICS` | main | true | 📊 Enable Prometheus metrics endpoint for monitoring n8n instance performance |
| `WEBHOOK_URL` | main | - | Public webhook URL for incoming webhook triggers |
| `N8N_PROTOCOL` | main | https | 🔒 Protocol used for internal URL generation (ensures generated links use https) |
| `NODE_OPTIONS` | main | --max_old_space_size=8192 | Node.js memory limit set to 8GB for handling concurrent executions |
| `N8N_LOG_LEVEL` | main | debug | 📝 Logging verbosity level (set to debug for detailed troubleshooting) |
| `EXECUTIONS_MODE` | main | queue | Use queue mode with workers for distributed execution |
| `N8N_CONCURRENCY` | main | -1 | Disable global concurrency limit (use per-worker --concurrency flag) |
| `N8N_TRUST_PROXY` | main | true | - |
| `GENERIC_TIMEZONE` | main | Europe/Zurich | 🕒 Default timezone used within n8n workflows and nodes |
| `N8N_RUNNERS_MODE` | main | external | 🏗️ Enable task runners to process node executions outside the main process |
| `N8N_SECURE_COOKIE` | main | true | 🛡️ Only send session cookies over HTTPS (essential for production) |
| `DB_POSTGRESDB_HOST` | main | - | PostgreSQL server hostname |
| `DB_POSTGRESDB_PORT` | main | - | PostgreSQL server port number |
| `DB_POSTGRESDB_USER` | main | (secret) | PostgreSQL username for authentication |
| `N8N_ENCRYPTION_KEY` | main | - | 🔑 Encryption key for sensitive data stored in database |
| `N8N_LISTEN_ADDRESS` | main | :: | Listen on all IPv6 addresses (and IPv4 via dual-stack) |
| `N8N_EDITOR_BASE_URL` | main | - | Public URL for n8n editor UI access |
| `N8N_RUNNERS_ENABLED` | main | true | ✅ Enable the use of Task Runners for improved scalability |
| `N8N_ENDPOINT_WEBHOOK` | main | hook | Path prefix for production webhooks that execute workflows |
| `N8N_PAYLOAD_SIZE_MAX` | main | 1024 | 📦 Maximum allowed size (in MB) for incoming JSON request payloads |
| `N8N_TEMPLATES_ENABLED` | main | true | 📁 Enable the workflow templates library in the UI |
| `QUEUE_BULL_REDIS_HOST` | main | - | Redis server hostname for job queue |
| `QUEUE_BULL_REDIS_PORT` | main | - | Redis server port for job queue |
| `DB_POSTGRESDB_DATABASE` | main | - | PostgreSQL database name |
| `DB_POSTGRESDB_PASSWORD` | main | (secret) | PostgreSQL password for authentication |
| `N8N_RUNNERS_AUTH_TOKEN` | main | (secret) | 🛡️ Shared secret token for authenticating runners with the broker |
| `N8N_RUNNERS_BROKER_PORT` | main | 5679 | 🔌 Port used by the broker to communicate with task runners |
| `N8N_RUNNERS_MAX_PAYLOAD` | main | 1073741824 | Maximum payload size in bytes for communication between a task broker and a task runner |
| `N8N_NATIVE_PYTHON_RUNNER` | main | true | 🐍 Enable the native Python execution environment for Code nodes |
| `N8N_ENDPOINT_WEBHOOK_TEST` | main | test | Path prefix for test webhooks used in the editor |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | main | waiting | Path prefix for waiting webhooks that resume waiting workflows when called |
| `QUEUE_BULL_REDIS_PASSWORD` | main | (secret) | Redis password for authentication |
| `QUEUE_BULL_REDIS_USERNAME` | main | (secret) | Redis username for authentication |
| `QUEUE_HEALTH_CHECK_ACTIVE` | main | true | 🚦 Enable queue health monitoring and worker status checks |
| `N8N_FORMDATA_FILE_SIZE_MAX` | main | 1024 | 📁 Maximum allowed size (in MB) for file uploads via multipart/form-data |
| `QUEUE_BULL_REDIS_DUALSTACK` | main | true | Enable IPv4 and IPv6 dual-stack support for Redis connections |
| `N8N_RUNNERS_MAX_CONCURRENCY` | main | 20 | 🚀 Maximum number of concurrent tasks a single runner can handle |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | main | true | Blocking code-nodes from accessing environment variables |
| `N8N_DEFAULT_BINARY_DATA_MODE` | main | database | Sets the storage backend for binary data (e.g. files) during executions |
| `N8N_REINSTALL_MISSING_PACKAGES` | main | true | Automatically install missing npm packages for nodes |
| `N8N_RELOAD_WORKFLOWS_ON_CHANGE` | main | true | 🔄 Ensure workers immediately pick up changes made in the editor |
| `N8N_RUNNERS_MAX_OLD_SPACE_SIZE` | main | 8192 | The `--max-old-space-size` option to use for a task runner (in MB). By default, Node.js will set this based on available memory. |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | main | false | ⚠️ Allow Git node to use bare repositories (security risk - hooks can execute arbitrary code) |
| `N8N_SKIP_AUTH_ON_OAUTH_CALLBACK` | main | false | Skip authentication on OAuth callback endpoints (security risk in n8n 2.0 - defaults to false for enforced auth) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | main | true | Enable private networking for Railway services communication |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | main | true | 📈 Include detailed Bull queue statistics (waiting, active, failed) in Prometheus metrics |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | main | :: | 📍 Address the broker listens on for runner connections |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | main | true | Offload production webhook processing to workers instead of main process |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | main | true | Route manual workflow executions (UI "Run" button) to workers instead of main instance |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | main | true | Enforce 0600 file permissions on configuration files for security |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | main | true | This enables AI Agents in n8n to use community node packages as tools |
| `TZ` | webhook | - | 🌍 System-level timezone for the container environment |
| `PORT` | webhook | - | 🚪 TCP port where the n8n process listens for HTTP traffic |
| `DB_TYPE` | webhook | - | Database engine type used by n8n (PostgreSQL in this setup) |
| `N8N_HOST` | webhook | - | 🌐 The domain name where the n8n main instance is accessible |
| `N8N_METRICS` | webhook | - | 📊 Enable Prometheus metrics endpoint for monitoring n8n instance performance |
| `WEBHOOK_URL` | webhook | - | Public HTTPS endpoint used for incoming n8n webhooks |
| `N8N_PROTOCOL` | webhook | - | 🔒 Protocol used for the instance (set to https for production) |
| `NODE_OPTIONS` | webhook | - | Node.js runtime flags such as memory limits or GC tuning |
| `N8N_LOG_LEVEL` | webhook | - | 📝 Logging verbosity level (set to debug for detailed troubleshooting) |
| `EXECUTIONS_MODE` | webhook | - | Select execution mode; “queue” uses workers via Redis |
| `N8N_CONCURRENCY` | webhook | - | Disable global concurrency limit (use per-worker flags) |
| `GENERIC_TIMEZONE` | webhook | - | 🕒 Default timezone used within n8n workflows and nodes |
| `N8N_RUNNERS_MODE` | webhook | - | 🏗️ Enable task runners to process node executions externally |
| `N8N_SECURE_COOKIE` | webhook | - | 🛡️ Only send session cookies over HTTPS (essential for security) |
| `DB_POSTGRESDB_HOST` | webhook | - | Hostname of the PostgreSQL server on the private network |
| `DB_POSTGRESDB_PORT` | webhook | - | TCP port PostgreSQL listens on (usually 5432) |
| `DB_POSTGRESDB_USER` | webhook | (secret) | PostgreSQL username used by n8n to connect |
| `N8N_ENCRYPTION_KEY` | webhook | - | 🔑 Symmetric key used to encrypt credentials at rest |
| `N8N_LISTEN_ADDRESS` | webhook | :: | Bind to all IPv6 interfaces (and IPv4 via dual-stack) |
| `N8N_EDITOR_BASE_URL` | webhook | - | Public URL for n8n editor UI access |
| `N8N_RUNNERS_ENABLED` | webhook | - | Turn on task runners to isolate Code node execution |
| `N8N_ENDPOINT_WEBHOOK` | webhook | - | Path prefix for production webhooks |
| `N8N_PAYLOAD_SIZE_MAX` | webhook | - | 📦 Maximum allowed size (in MB) for incoming JSON request payloads |
| `N8N_TEMPLATES_ENABLED` | webhook | - | 📁 Enable the workflow templates library in the UI |
| `QUEUE_BULL_REDIS_HOST` | webhook | - | Redis server hostname used for Bull job queues |
| `QUEUE_BULL_REDIS_PORT` | webhook | - | TCP port Redis listens on (usually 6379) |
| `DB_POSTGRESDB_DATABASE` | webhook | - | Name of the PostgreSQL database n8n will use |
| `DB_POSTGRESDB_PASSWORD` | webhook | (secret) | Password for authenticating the PostgreSQL user |
| `N8N_RUNNERS_AUTH_TOKEN` | webhook | (secret) | 🛡️ Shared secret token for authenticating runners with the broker |
| `N8N_RUNNERS_BROKER_PORT` | webhook | - | 🔌 Port used by the broker to communicate with task runners |
| `N8N_RUNNERS_MAX_PAYLOAD` | webhook | - | Maximum payload size in bytes for communication between a task broker and a task runner |
| `N8N_NATIVE_PYTHON_RUNNER` | webhook | - | 🐍 Enable the native Python execution environment for Code nodes |
| `N8N_ENDPOINT_WEBHOOK_TEST` | webhook | - | Path prefix for test webhooks used in the editor |
| `N8N_ENDPOINT_WEBHOOK_WAIT` | webhook | - | Path prefix for waiting webhooks |
| `QUEUE_BULL_REDIS_PASSWORD` | webhook | (secret) | Redis password for authenticating queue connections |
| `QUEUE_BULL_REDIS_USERNAME` | webhook | (secret) | Redis username for ACL‑based authentication |
| `QUEUE_HEALTH_CHECK_ACTIVE` | webhook | - | 🚦 Enable queue health monitoring and worker status checks |
| `N8N_FORMDATA_FILE_SIZE_MAX` | webhook | - | 📁 Maximum allowed size (in MB) for file uploads via multipart/form-data |
| `QUEUE_BULL_REDIS_DUALSTACK` | webhook | - | Enable IPv4/IPv6 dual-stack support for Redis |
| `N8N_RUNNERS_MAX_CONCURRENCY` | webhook | - | 🚀 Maximum number of concurrent tasks a single runner can handle |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | webhook | - | Blocking code-nodes from accessing environment variables |
| `N8N_DEFAULT_BINARY_DATA_MODE` | webhook | - | 💾 Sets the storage backend for binary data during executions |
| `N8N_REINSTALL_MISSING_PACKAGES` | webhook | - | Auto-install missing node packages |
| `N8N_RELOAD_WORKFLOWS_ON_CHANGE` | webhook | - | 🔄 Ensure workers immediately pick up workflow changes |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | webhook | - | Allow Git node to use bare repositories (security risk) |
| `N8N_SKIP_AUTH_ON_OAUTH_CALLBACK` | webhook | - | Skip authentication on OAuth callback endpoints |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | webhook | - | Enable private networking for Railway services communication |
| `N8N_METRICS_INCLUDE_QUEUE_METRICS` | webhook | - | 📈 Include detailed Bull queue statistics (waiting, active, failed) in Prometheus metrics |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | webhook | - | 📍 Address the broker listens on for runner connections |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | webhook | - | Offload production webhook processing to workers |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | webhook | - | Send manual “Run” executions to workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | webhook | - | Enforce strict 0600 permissions on n8n config files |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | webhook | - | Allows AI Agents to use community node packages as tools |

## Configuration

- **Start command:** `n8n worker --concurrency=20`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Start command:** `n8n webhook`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-20-pro-queue-mode-workers-webhooks-m)
