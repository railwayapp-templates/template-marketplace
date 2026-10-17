# Deploy SkillHub | Self-Hosted Agent Skill Registry (ClawHub Alternative) on Railway

Self-hosted registry for AI agent skills: publish, scan, version, RBAC

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/skillhub-registry)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/skillhub-registry?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=skillhub-registry)

[SkillHub](https://github.com/iflytek/skillhub) is iFLYTEK's open-source, self-hosted registry for AI agent skills: the `SKILL.md` packages used by Claude Code, Codex, OpenClaw and other agents. Your team publishes skills to it, and every upload is checked by a security scanner before it goes live. Skills are organised in namespaces with roles and review, and versions are kept. Agents install skills with one CLI command. It also speaks the ClawHub registry protocol, so existing ClawHub-style clients can point at it.

This template runs the official `v0.2.22` images as five services:

| Service | What it does |
| --- | --- |
| **SkillHub** | The web app (nginx) on your Railway domain. It proxies `/api` to the server. |
| **server** | The Spring Boot API. Skill packages are stored on its volume. |
| **scanner** | The skill security scanner. Every uploaded package is checked for risky behaviour before release. |
| **Postgres** | Users, namespaces, skills and versions |
| **Redis** | Sessions and the scan queue |

- **Admin account, no default password.** On first boot the server creates the user `admin` with a generated password, `BOOTSTRAP_ADMIN_PASSWORD` on the **server** service. Upstream ships the publicly known `ChangeMe!2026`.
- **Sign-up closed by default.** SkillHub `v0.2.x` lets anyone with the URL create an account, and every new account gets its own namespace to publish into. The web service blocks the sign-up endpoint unless you set `SKILLHUB_ALLOW_SIGNUP=true`. OAuth sign-in works once you configure it.
- **HTTPS-correct.** Session cookies are `Secure`. nginx trusts Railway's forwarded protocol, and the public URL is wired in, so the CLI install commands the UI shows point at your domain.
- **Bounded memory.** The JVM heap is capped with `-Xmx512m`. Without the cap, the JVM sizes its heap from the plan's RAM limit, not from what the registry needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `ghcr.io/iflytek/skillhub-server:v0.2.22` | Database |
| Postgres | `postgres:16.15-alpine` | Database |
| Redis | `redis:8.10.2-alpine` | Database |
| SkillHub | [nomideusz/skillhub-railway](https://github.com/nomideusz/skillhub-railway) | Web service |
| scanner | `ghcr.io/iflytek/skillhub-scanner:v0.2.22` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | server | 8080 | Server port - leave as is |
| `MALLOC_ARENA_MAX` | server | 2 | Fewer glibc malloc arenas - saves ~100 MB of RAM for the JVM |
| `JAVA_TOOL_OPTIONS` | server | -Xmx512m -XX:+UseSerialGC -XX:MaxMetaspaceSize=192m -XX:ReservedCodeCacheSize=64m -Xss512k | JVM memory caps. Without them the JVM sizes itself from the plan's RAM limit, not from what the registry needs. Raise -Xmx for many users or big uploads. |
| `STORAGE_BASE_PATH` | server | /var/lib/skillhub/storage | Volume path for skill packages |
| `SKILLHUB_LOG_FORMAT` | server | json | Log format |
| `BOOTSTRAP_ADMIN_EMAIL` | server | admin@skillhub.local | Email of the first admin account |
| `SESSION_COOKIE_SECURE` | server | true | Send the session cookie over https only |
| `SPRING_DATASOURCE_URL` | server | - | Postgres connection |
| `SPRING_DATA_REDIS_HOST` | server | - | Redis host |
| `SPRING_DATA_REDIS_PORT` | server | 6379 | Redis port |
| `BOOTSTRAP_ADMIN_ENABLED` | server | true | Create the admin account on first boot |
| `BOOTSTRAP_ADMIN_PASSWORD` | server | (secret) | Password of the first admin account (username: admin). Only used when the account is first created - change it later in the UI. |
| `BOOTSTRAP_ADMIN_USERNAME` | server | (secret) | Username of the first admin account |
| `SKILLHUB_PUBLIC_BASE_URL` | server | - | Public URL of the registry (the SkillHub web service) |
| `SKILLHUB_STORAGE_PROVIDER` | server | local | Skill packages are stored on this service's volume |
| `SPRING_DATASOURCE_PASSWORD` | server | (secret) | Postgres password |
| `SPRING_DATASOURCE_USERNAME` | server | (secret) | Postgres user |
| `SPRING_DATA_REDIS_PASSWORD` | server | (secret) | Redis password |
| `SKILLHUB_SERVICE_ENVIRONMENT` | server | production | Environment label |
| `SKILLHUB_SECURITY_SCANNER_URL` | server | - | Scanner service on the private network |
| `SKILLHUB_SECURITY_SCANNER_MODE` | server | upload | Send packages to the scanner over HTTP |
| `SKILLHUB_SECURITY_SCANNER_ENABLED` | server | true | Scan every uploaded skill with the scanner service before it is published |
| `SKILLHUB_DOWNLOAD_ANON_COOKIE_SECRET` | server | (secret) | Signs anonymous download rate-limit cookies |
| `SKILLHUB_SUITE_REVIEW_WRITES_ENABLED` | server | true | Safe with a single server replica |
| `SKILLHUB_AUTH_INITIAL_SELF_REGISTRATION_ENABLED` | server | false | Whether anyone can sign up on first boot. Off so a public URL isn't an open registry; the admin can turn it on in the UI. |
| `POSTGRES_DB` | Postgres | skillhub | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | SkillHub | 80 | nginx port behind the Railway domain - leave as is |
| `SKILLHUB_ALLOW_SIGNUP` | SkillHub | false | Let anyone with the URL create an account. Off by default: the admin creates accounts, or you set this to true and redeploy. |
| `SKILLHUB_API_UPSTREAM` | SkillHub | - | Where nginx forwards /api - the server service on the private network |
| `SKILLHUB_PUBLIC_BASE_URL` | SkillHub | - | Public URL of this registry, used in the agent install guide |
| `SKILLHUB_TRUST_FORWARDED_PROTO` | SkillHub | true | Trust Railway's edge X-Forwarded-Proto so login cookies and redirects use https |
| `PORT` | scanner | 8000 | Scanner port - leave as is |
| `SKILL_SCANNER_LLM_MODEL` | scanner | - | Optional: model for the scanner's LLM analyzer |
| `SKILL_SCANNER_LLM_API_KEY` | scanner | (secret) | Optional: API key for the scanner's LLM analyzer |
| `SKILL_SCANNER_LLM_BASE_URL` | scanner | - | Optional: base URL for an OpenAI-compatible LLM endpoint |
| `SKILLHUB_SCANNER_MAX_CONCURRENT_SCANS` | scanner | 1 | Scans running at once |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Volume:** `/var/lib/skillhub/storage`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Healthcheck:** `/nginx-health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/skillhub-registry)
