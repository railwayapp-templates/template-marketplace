# Deploy LiteLLM on Railway

LiteLLM gateway with Postgres and Redis. Hobby plan or higher required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Lm9gxI)

## About

LiteLLM is an open-source AI gateway that puts one OpenAI-compatible endpoint in front of 100+ LLM providers. This template deploys the LiteLLM Proxy Server with Postgres and Redis, giving you virtual API keys, per-key budgets, spend tracking, rate limits, fallbacks and response caching — managed from a web dashboard.

**Requires Railway Hobby or higher — not Free/Trial.** Migration startup was OOM-killed
at 512 MiB and 1 GiB; a 2 GiB allowance passed. Allow **at least 2 GiB for startup**.
This is a tested allowance, not a guarantee under load. The audit measured roughly
1.29 GB peak migration memory and 0.84 GB idle gateway memory. Budget for the gateway,
Postgres, Redis and provider usage; the $5 Hobby fee does not promise to cover the stack.

LiteLLM Proxy runs as a Python service backed by Postgres for models, keys, budgets and spend history, plus Redis for response caching and cross-replica rate limiting. This template wires all three services together over private networking, generates secrets, uses official digest-pinned images, prepares the database schema in pre-deploy, and gates deployment on readiness. The native LiteLLM CLI still checks/applies migrations at application startup. No config file is required for a default deployment; add models and your provider credentials in the Admin UI afterwards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LiteLLM | `ghcr.io/berriai/litellm:v1.98.0@sha256:20b5044b619055374061a6d5b7b08754cad75aeabbf82ddf4f69cc0cf80ddaf4` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18@sha256:469c779c7c57ec6bad4670a0a3cb5a830aa6e0ce4f3707137608de5223a5041c` | Database |
| Redis | `redis:8.2@sha256:7d1e4ce8b9395088377ab382d1f6cfdbd13b3690795198a0399ab8d683064d6d` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | LiteLLM | 0.0.0.0 | Public listen address. Keep 0.0.0.0; the startup helper rejects a binding Railway cannot reach. |
| `PORT` | LiteLLM | 4000 | Port used by both LiteLLM and Railway readiness. Default 4000; the startup helper validates and passes this value to the server. |
| `REDIS_URL` | LiteLLM | - | Enables response caching and coordinates rate limits across replicas. |
| `OR_APP_NAME` | LiteLLM | - | Optional - Sent to OpenRouter as X-Title for attribution. |
| `OR_SITE_URL` | LiteLLM | - | Optional - Sent to OpenRouter as HTTP-Referer for attribution. |
| `UI_PASSWORD` | LiteLLM | (secret) | Optional - Leave blank to log in with LITELLM_MASTER_KEY. |
| `UI_USERNAME` | LiteLLM | (secret) | Optional - Admin UI username. |
| `DATABASE_URL` | LiteLLM | - | Stores models, virtual keys, budgets and spend. |
| `GEMINI_API_KEY` | LiteLLM | (secret) | Optional |
| `OPENAI_API_KEY` | LiteLLM | (secret) | Optional - Models are normally added from the Admin UI instead. |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts provider credentials at rest. Generated once and NEVER changed - rotating it silently makes every stored provider key unreadable. |
| `ANTHROPIC_API_KEY` | LiteLLM | (secret) | Optional |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Lets you add models from the Admin UI. Without it, Add Model returns HTTP 500. |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Your API key AND the Admin UI password. Generated for you - copy it from this service's Variables tab after deploying. |
| `OPENROUTER_API_KEY` | LiteLLM | (secret) | Optional - One key unlocks ~100 models via the openrouter/* wildcard. |
| `LITELLM_CONFIG_YAML` | LiteLLM | - | Optional - Advanced config.yaml, e.g. Prometheus. Whitespace-only is ignored; invalid YAML fails pre-deploy before migrations. Max 32768 characters. |
| `LITELLM_LOCAL_MODEL_COST_MAP` | LiteLLM | True | Uses the bundled pricing table instead of fetching it at boot. Halves startup time. |
| `ENFORCE_PRISMA_MIGRATION_CHECK` | LiteLLM | true | Fails the deploy loudly on a bad migration instead of serving a half-migrated database. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private-network connection string. LiteLLM stores models, virtual keys, budgets and spend history here. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated once at deploy time. |
| `REDISHOST` | Redis | - | Private-network hostname of the Redis service. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Redis username for this image's default user. |
| `REDIS_URL` | Redis | - | Private-network connection string. LiteLLM uses Redis for response caching and cross-replica rate limiting. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated once at deploy time. |

## Configuration

- **Start command:** `python -c 'exec('"'"'"""Embedded startup command for the official LiteLLM image (no LiteLLM imports)."""\n\nimport os\nimport re\nimport signal\nimport subprocess\nimport sys\nimport tempfile\nimport time\n\nimport yaml\n\n\nclass StartupError(Exception):\n    """Safe-to-log startup failure; never include user values or driver messages."""\n\n\ndef validate_environment(environ):\n    for name in ("LITELLM_MASTER_KEY", "LITELLM_SALT_KEY"):\n        if not environ.get(name, "").strip():\n            raise StartupError(f"{name} must be nonblank")\n    port = environ.get("PORT", "4000")\n    if not re.fullmatch(r"[0-9]{1,5}", port) or not 1 <= int(port) <= 65535:\n        raise StartupError("PORT must be an integer from 1 to 65535")\n    host = environ.get("HOST", "0.0.0.0")\n    if host != "0.0.0.0":\n        raise StartupError("HOST must be 0.0.0.0 for the template public binding")\n    return host, str(int(port))\n\n\ndef validate_config(raw):\n    if not raw or not raw.strip():\n        return None\n    try:\n        config = yaml.safe_load(raw)\n    except yaml.YAMLError as exc:\n        mark = getattr(exc, "problem_mark", None)\n        location = f" at line {mark.line + 1}, column {mark.column + 1}" if mark else ""\n        raise StartupError(f"LITELLM_CONFIG_YAML is invalid YAML{location}") from None\n    if not isinstance(config, dict) or not config:\n        raise StartupError("LITELLM_CONFIG_YAML root must be a nonempty mapping")\n    for key in ("general_settings", "litellm_settings", "router_settings"):\n        if key in config and not isinstance(config[key], dict):\n            raise StartupError(f"LITELLM_CONFIG_YAML {key} must be a mapping")\n    if "model_list" in config and not isinstance(config["model_list"], list):\n        raise StartupError("LITELLM_CONFIG_YAML model_list must be a list")\n    return config\n\n\ndef resolve_database_url(config, environ):\n    """Match LiteLLM\'"'"'s YAML-over-environment database selection before probing."""\n    configured = (config or {}).get("general_settings", {}).get("database_url")\n    value = configured if configured is not None else environ.get("DATABASE_URL")\n    if isinstance(value, str) and value.startswith("os.environ/"):\n        value = environ.get(value.removeprefix("os.environ/"))\n    if not isinstance(value, str) or not value.strip():\n        raise StartupError("Database URL must be nonblank; check DATABASE_URL and general_settings.database_url")\n    return value\n\n\ndef database_probe(dsn, timeout):\n    """Use the image\'"'"'s offline Prisma toolchain, not an extra Python DB driver."""\n    cli = os.environ.get("PRISMA_CLI_PATH")\n    if not cli:\n        raise StartupError("The pinned image must provide PRISMA_CLI_PATH")\n    command = [cli, "db", "execute", "--url", dsn, "--stdin"]\n    with subprocess.Popen(\n        command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,\n        text=True, start_new_session=True,\n    ) as process:\n        try:\n            _, error = process.communicate("SELECT 1;", timeout=timeout)\n        except subprocess.TimeoutExpired:\n            # Retire the native schema-engine child as well as the CLI parent.\n            os.killpg(process.pid, signal.SIGKILL)\n            process.communicate()\n            return False\n        if process.returncode == 0:\n            return True\n    # Driver output can contain credentials and SQL. Classify it, never print it.\n    code = re.search(r"\\bP[0-9]{4}\\b", error)\n    if code and code.group() in {"P1001", "P1002", "P1008", "P1017", "P2024", "P2037"}:\n        return False\n    if "database system is starting up" in error.lower():\n        return False\n    raise StartupError("Database connection rejected; check DATABASE_URL and credentials")\n\n\ndef wait_for_database(dsn):\n    deadline = time.monotonic() + 90\n    waiting = False\n    while (remaining := deadline - time.monotonic()) > 0:\n        if database_probe(dsn, min(5, remaining)):\n            return\n        if not waiting:\n            print("LiteLLM startup: waiting up to 90 seconds for database readiness", file=sys.stderr, flush=True)\n            waiting = True\n        remaining = deadline - time.monotonic()\n        if remaining > 0:\n            time.sleep(min(2, remaining))\n    raise StartupError("Database readiness timed out after 90 seconds")\n\n\ndef main():\n    path = None\n    try:\n        if len(sys.argv) != 2 or sys.argv[1] not in ("predeploy", "serve"):\n            raise StartupError("Expected mode: predeploy or serve")\n        host, port = validate_environment(os.environ)\n        raw = os.environ.get("LITELLM_CONFIG_YAML")\n        parsed = validate_config(raw)\n        wait_for_database(resolve_database_url(parsed, os.environ))\n        command = [\n            "litellm", "--host", host, "--port", port,\n            "--enforce_prisma_migration_check", "--use_v2_migration_resolver",\n        ]\n        if parsed is not None:\n            # NamedTemporaryFile creates mode 0600. Preserve the original YAML,\n            # including environment references, rather than merging or dumping it.\n            with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", suffix=".yaml", delete=False) as config:\n                path = config.name\n                config.write(raw)\n            command.extend(["--config", path])\n        if sys.argv[1] == "predeploy":\n            command.append("--skip_server_startup")\n        os.execvpe("litellm", command, os.environ)\n    except StartupError as exc:\n        print(f"LiteLLM startup: {exc}", file=sys.stderr)\n        return 1\n    except OSError:\n        print("LiteLLM startup: unable to write config or execute litellm", file=sys.stderr)\n        return 1\n    finally:\n        # Successful exec leaves the private file available for LiteLLM to read.\n        if path is not None:\n            os.unlink(path)\n\n\nif __name__ == "__main__":\n    sys.exit(main())\n'"'"')' serve`
- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "${REDIS_PASSWORD:?REDIS_PASSWORD must be nonblank}" --appendonly no --save ""'`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/Lm9gxI)
