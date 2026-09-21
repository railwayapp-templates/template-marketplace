# Deploy Onyx Lite Chat + Postgres on Railway

Onyx Lite self hosted AI chat with Postgres, four services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onyx-lite-chat-postgres)

## About

Onyx is an open source AI chat platform that works with every LLM. It gives a team a shared, self hosted chat workspace with agents, Projects, actions and tools, MCP support, per user file uploads, real accounts and roles, and SSO. This template deploys Onyx in its official **Lite** configuration, which is the upstream topology for running Onyx without a search index.

Onyx ships two documented topologies. The full stack runs ten containers, including OpenSearch, Redis, MinIO, a Celery worker and two machine learning model servers, and upstream sizes it at about 12 CPU and 24 GB of memory. The Lite topology, defined in upstream's own `docker-compose.onyx-lite.yml`, sets `DISABLE_VECTOR_DB=true` and moves caching, sessions and file storage onto PostgreSQL, which removes six of those containers and brings the footprint down to about 2.5 CPU and 1.7 GiB.

This template is the Lite topology: an nginx front door, the FastAPI backend, the Next.js UI, and PostgreSQL. It pins `v4.7.7`, generates `USER_AUTH_SECRET` and `ENCRYPTION_KEY_SECRET` for you, wires every service over Railway's private network with explicit ports, and renders the nginx config at boot so the proxy re-resolves the private DNS names on every redeploy instead of caching a stale address the way upstream's static config would.

The trade is explicit: **connectors and retrieval augmented search are off.** Chat, agents, Projects, tools and user file uploads all work. If you need to index Slack, Google Drive, Confluence or GitHub, use the full stack instead and budget accordingly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| onyx-api | `onyxdotapp/onyx-backend:v4.7.7` | Worker |
| Onyx | `nginx:1.25.5-alpine` | Web service |
| onyx-web | `onyxdotapp/onyx-web-server:v4.7.7` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | onyx | Database created on first boot. Holds users, chats, agents, settings, cache, sessions and uploaded files. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. Superuser is required: the Onyx migrations run CREATE EXTENSION pg_trgm and pgcrypto. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password, referenced by onyx-api. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy, for psql or a GUI client. |
| `PORT` | onyx-api | 8080 | uvicorn listen port. Railway's healthcheck probes $PORT/health, so keep it equal to the port in the start command and to the port in ONYX_API_HOST and INTERNAL_URL. |
| `AUTH_TYPE` | onyx-api | basic | Legacy pre-v4.4 variable, kept only because older Onyx guides still mention it. Authentication is ALWAYS on in v4.7: the first account to sign up becomes the admin, and SSO (Google / OIDC / SAML) is configured in Admin Panel > Organization > SSO Providers. AUTH_TYPE=disabled is no longer supported and only logs a warning. |
| `LOG_LEVEL` | onyx-api | info | Log verbosity for the API server (upstream default). |
| `WEB_DOMAIN` | onyx-api | - | Public base URL, used to build redirect URIs after login and links in emails. Points at the Onyx (nginx) service because that is the only public entry point. |
| `POSTGRES_DB` | onyx-api | - | Database name. `alembic upgrade head` runs against it on every boot (440 migrations on a fresh database, which is why healthcheckTimeout is 900). |
| `AUTH_BACKEND` | onyx-api | postgres | Session tokens live in Postgres instead of Redis (upstream lite overlay), so logins survive an API server redeploy. |
| `CACHE_BACKEND` | onyx-api | postgres | Caches, locks and ephemeral state live in Postgres instead of Redis (upstream lite overlay). The API server refuses to start with CACHE_BACKEND=postgres unless DISABLE_VECTOR_DB=true. |
| `POSTGRES_HOST` | onyx-api | - | Private hostname of the Postgres service. |
| `POSTGRES_PORT` | onyx-api | 5432 | Postgres port. Private networking always needs an explicit port. |
| `POSTGRES_USER` | onyx-api | (secret) | Postgres user (mirrors the Postgres service). |
| `GEN_AI_API_KEY` | onyx-api | (secret) | Optional. Seeds a default LLM provider key at first boot. The normal path is to add providers in Admin Panel > Configuration > LLM after deploy. |
| `USER_AUTH_SECRET` | onyx-api | (secret) | Signs password-reset, email-verification, OAuth state and captcha cookies. Required: the API server refuses to start when it is empty. 64 hex characters, the equivalent of `openssl rand -hex 32`. |
| `DISABLE_TELEMETRY` | onyx-api | true | Turns off anonymous usage telemetry to Onyx. Set to false to opt back in. |
| `DISABLE_VECTOR_DB` | onyx-api | true | Onyx Lite mode, from upstream deployment/docker_compose/docker-compose.onyx-lite.yml. Skips document index setup and embedding warm-up, so neither OpenSearch nor the model servers are needed. Connectors and RAG search are off; chat, Projects, agents, actions and user file uploads stay on. Setting this to false also requires adding OpenSearch, Redis and two model servers. |
| `POSTGRES_PASSWORD` | onyx-api | (secret) | Postgres password (mirrors the Postgres service). |
| `FILE_STORE_BACKEND` | onyx-api | postgres | User file uploads and generated images are stored in Postgres instead of S3/MinIO (upstream lite overlay), so no MinIO service is needed. |
| `VALID_EMAIL_DOMAINS` | onyx-api | - | Comma separated email domains allowed to register, for example acme.com. Onyx has no signup switch: without this, anyone who finds the URL can create an account. Your first signup at one of these domains becomes the administrator. |
| `DISABLE_MODEL_SERVER` | onyx-api | true | No inference or indexing model server runs in this template. Each model-server image is 4.8 GB and only serves local embeddings and reranking, which Lite mode never calls. Also skips the GPU probe at boot. |
| `ENCRYPTION_KEY_SECRET` | onyx-api | (secret) | Encrypts stored credentials and LLM provider API keys at rest in Postgres. Do not rotate it after credentials are saved or they become unreadable. |
| `SESSION_EXPIRE_TIME_SECONDS` | onyx-api | 604800 | Login session lifetime in seconds (upstream default, 7 days). |
| `POSTGRES_API_SERVER_POOL_SIZE` | onyx-api | 20 | SQLAlchemy pool size per engine. Onyx defaults to 40 and the API server opens a sync AND an async engine, which would reach the stock max_connections=100 of the Postgres image. 20 plus 10 overflow per engine leaves headroom. |
| `POSTGRES_API_SERVER_POOL_OVERFLOW` | onyx-api | 10 | SQLAlchemy overflow connections per engine (upstream default). |
| `ENABLE_PAID_ENTERPRISE_EDITION_FEATURES` | onyx-api | false | Enterprise Edition features need a paid Onyx license. Leave false for the community build. |
| `PORT` | Onyx | 80 | nginx listen port. Railway's healthcheck and the public domain probe $PORT, so keep this equal to the domain target port. |
| `ONYX_API_HOST` | Onyx | - | host:port of the Onyx API service on the private network. The start script renders it into nginx as the /api upstream and re-resolves it per request (upstream's app.conf.template hardcodes api_server:8080 inside an upstream block, which nginx resolves once at boot and which does not exist here). |
| `ONYX_WEB_HOST` | Onyx | - | host:port of the Onyx Web (Next.js) service on the private network. Everything that is not /api, /openapi.json, /scim or /auth/saml is proxied here. |
| `NGINX_PROXY_READ_TIMEOUT` | Onyx | 300 | Upstream read timeout in seconds (upstream default). Chat responses stream for as long as the model takes. |
| `NGINX_PROXY_SEND_TIMEOUT` | Onyx | 300 | Upstream send timeout in seconds (upstream default). |
| `NGINX_CLIENT_MAX_BODY_SIZE` | Onyx | 5G | Maximum upload size (upstream default). Lower it to cap user file uploads at the proxy. |
| `NGINX_PROXY_CONNECT_TIMEOUT` | Onyx | 300 | Upstream connect timeout in seconds (upstream default). Long LLM streams need a generous value. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Onyx | true | Alpine (musl) image: required for *.railway.internal DNS resolution from this container. |
| `PORT` | onyx-web | 3000 | Port the Next.js standalone server binds. Must match the port in the Onyx service's ONYX_WEB_HOST. |
| `HOSTNAME` | onyx-web | :: | Next.js standalone binds this. '::' listens on both address families; the image would otherwise set it to the container id. |
| `INTERNAL_URL` | onyx-web | - | Server-side base URL the web app uses to reach the API for SSR and for the /openapi.json and /api/docs rewrites. Must include the port. |
| `WEB_FRAME_PROTECTION_ENABLED` | onyx-web | true | Emits a frame-ancestors CSP so other sites cannot iframe Onyx. Set to false only if you intentionally embed Onyx. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgUmFpbHdheSBzdGFydCBjb21tYW5kIGZvciB0aGUgT255eCBBUEkgc2VydmVyLgojCiMgbmdpbnggYW5kIHRoZSB3ZWIgc2VydmVyIGJvdGggY2FsbCB0aGlzIHNlcnZpY2Ugb3ZlciBSYWlsd2F5J3MgcHJpdmF0ZSBuZXR3b3JrLCB3aGljaCBpcyBJUHY2CiMgb25seSwgd2hpbGUgUmFpbHdheSdzIG93biBoZWFsdGhjaGVjayBhcnJpdmVzIG92ZXIgSVB2NC4gdXZpY29ybiBjYW4gYmluZCBvbmUgYWRkcmVzcyBmYW1pbHkgYXQgYQojIHRpbWU6IC0taG9zdCAwLjAuMC4wIGxvc2VzIHRoZSBwcml2YXRlIGNhbGxlcnMsIC0taG9zdCA6OiBsb3NlcyB0aGUgaGVhbHRoY2hlY2ssIGJlY2F1c2UgYXN5bmNpbwojIHNldHMgSVBWNl9WNk9OTFkgb24gdGhlIHNvY2tldCBpdCBjcmVhdGVzLiBTbyBjcmVhdGUgdGhlIGxpc3RlbmluZyBzb2NrZXQgaGVyZSB3aXRoCiMgSVBWNl9WNk9OTFkgb2ZmIGFuZCBoYW5kIHV2aWNvcm4gdGhlIGZpbGUgZGVzY3JpcHRvci4Kc2V0IC1lCmFsZW1iaWMgdXBncmFkZSBoZWFkCmVjaG8gIlN0YXJ0aW5nIE9ueXggQXBpIFNlcnZlciIKZXhlYyBweXRob24gLSA8PCdQWScKaW1wb3J0IG9zLCBzb2NrZXQKcyA9IHNvY2tldC5zb2NrZXQoc29ja2V0LkFGX0lORVQ2LCBzb2NrZXQuU09DS19TVFJFQU0pCnMuc2V0c29ja29wdChzb2NrZXQuU09MX1NPQ0tFVCwgc29ja2V0LlNPX1JFVVNFQUREUiwgMSkKcy5zZXRzb2Nrb3B0KHNvY2tldC5JUFBST1RPX0lQVjYsIHNvY2tldC5JUFY2X1Y2T05MWSwgMCkKcy5iaW5kKCgiOjoiLCBpbnQob3MuZW52aXJvbi5nZXQoIlBPUlQiLCAiODA4MCIpKSkpCnMubGlzdGVuKDIwNDgpCm9zLnNldF9pbmhlcml0YWJsZShzLmZpbGVubygpLCBUcnVlKQpvcy5leGVjdnAoInV2aWNvcm4iLCBbInV2aWNvcm4iLCAib255eC5tYWluOmFwcCIsICItLWZkIiwgc3RyKHMuZmlsZW5vKCkpXSkKUFkK | base64 -d > /tmp/start.sh && exec sh /tmp/start.sh'`
- **Healthcheck:** `/health`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgT255eCBmcm9udCBkb29yIGZvciBSYWlsd2F5LgojCiMgVXBzdHJlYW0ncyBkZXBsb3ltZW50L2RhdGEvbmdpbngvYXBwLmNvbmYudGVtcGxhdGUgY2Fubm90IGJlIHVzZWQgYXMtaXMgaGVyZToKIyAgICogaXQgZGVjbGFyZXMgYHVwc3RyZWFtIGFwaV9zZXJ2ZXIgeyBzZXJ2ZXIgYXBpX3NlcnZlcjo4MDgwOyB9YCwgYW5kIG5naW54CiMgICAgIHJlc29sdmVzIHVwc3RyZWFtIGJsb2NrcyBvbmNlIGF0IGNvbmZpZyBsb2FkIGFuZCB0aGVuIGNhY2hlcyB0aGUgYWRkcmVzcwojICAgICBmb3JldmVyLiBSYWlsd2F5IHByaXZhdGUgSVBzIGNoYW5nZSBvbiBldmVyeSByZWRlcGxveSwgYW5kIHRoZSBuYW1lIGRvZXMKIyAgICAgbm90IHJlc29sdmUgYXQgYWxsIHVudGlsIHRoZSB0YXJnZXQgc2VydmljZSBoYXMgZGVwbG95ZWQsIHNvIG5naW54IGVpdGhlcgojICAgICBjcmFzaC1sb29wcyB3aXRoICJob3N0IG5vdCBmb3VuZCBpbiB1cHN0cmVhbSIgb3IgcGlucyBhIHN0YWxlIGFkZHJlc3MuCiMgICAqIGl0IGxpc3RlbnMgb24gYSBoYXJkY29kZWQgcG9ydCA4MCBhbmQgSVB2NCBvbmx5LgojCiMgU28gdGhpcyBzY3JpcHQgcmVuZGVycyBhbiBlcXVpdmFsZW50IGNvbmZpZyBhdCBib290IHdpdGggYSBydW50aW1lIGByZXNvbHZlcmAKIyBwbHVzIHZhcmlhYmxlcyBpbiBwcm94eV9wYXNzIChyZS1yZXNvbHZlZCBwZXIgcmVxdWVzdCksIGFuZCBsaXN0ZW5zIG9uICRQT1JUCiMgb24gYm90aCBJUHY0IGFuZCBJUHY2LiBSb3V0ZSBtYXAgbWF0Y2hlcyB1cHN0cmVhbSBhcHAuY29uZi50ZW1wbGF0ZS4Kc2V0IC1ldQoKUE9SVD0iJHtQT1JUOi04MH0iCkFQST0iJHtPTllYX0FQSV9IT1NUOj9PTllYX0FQSV9IT1NUIG11c3QgYmUgPGhvc3Q+Ojxwb3J0PiBvZiB0aGUgT255eCBBUEkgc2VydmljZX0iCldFQj0iJHtPTllYX1dFQl9IT1NUOj9PTllYX1dFQl9IT1NUIG11c3QgYmUgPGhvc3Q+Ojxwb3J0PiBvZiB0aGUgT255eCBXZWIgc2VydmljZX0iCkNUPSIke05HSU5YX1BST1hZX0NPTk5FQ1RfVElNRU9VVDotMzAwfSIKU1Q9IiR7TkdJTlhfUFJPWFlfU0VORF9USU1FT1VUOi0zMDB9IgpSVD0iJHtOR0lOWF9QUk9YWV9SRUFEX1RJTUVPVVQ6LTMwMH0iCkJPRFk9IiR7TkdJTlhfQ0xJRU5UX01BWF9CT0RZX1NJWkU6LTVHfSIKCk5TPSIkKGF3ayAnL15uYW1lc2VydmVyLyB7IHByaW50ICQyOyBleGl0IH0nIC9ldGMvcmVzb2x2LmNvbmYpIgpjYXNlICIkTlMiIGluICo6KikgTlM9IlskTlNdIiA7OyBlc2FjCgpIRFJTPSdwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7IHByb3h5X3NldF9oZWFkZXIgWC1SZWFsLUlQICRyZW1vdGVfYWRkcjsgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Gb3IgJHByb3h5X2FkZF94X2ZvcndhcmRlZF9mb3I7IHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtUHJvdG8gJG9ueXhfcHJvdG87IHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtSG9zdCAkaG9zdDsgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qb3J0ICRzZXJ2ZXJfcG9ydDsnClRNTz0icHJveHlfY29ubmVjdF90aW1lb3V0ICR7Q1R9czsgcHJveHlfc2VuZF90aW1lb3V0ICR7U1R9czsgcHJveHlfcmVhZF90aW1lb3V0ICR7UlR9czsiCgpjYXQgPiAvZXRjL25naW54L2NvbmYuZC9kZWZhdWx0LmNvbmYgPDxOR0lOWApzZXJ2ZXJfdG9rZW5zIG9mZjsKbG9nX2Zvcm1hdCBvbnl4X21haW4gJ1wkcmVtb3RlX2FkZHIgLSBcJHJlbW90ZV91c2VyIFtcJHRpbWVfbG9jYWxdICJcJHJlcXVlc3QiIFwkc3RhdHVzIFwkYm9keV9ieXRlc19zZW50ICJcJGh0dHBfcmVmZXJlciIgIlwkaHR0cF91c2VyX2FnZW50IiBydD1cJHJlcXVlc3RfdGltZSc7CnJlc29sdmVyICROUyB2YWxpZD0zMHM7CnJlc29sdmVyX3RpbWVvdXQgNXM7Cm1hcCBcJGh0dHBfdXBncmFkZSBcJGNvbm5lY3Rpb25fdXBncmFkZSB7IGRlZmF1bHQgdXBncmFkZTsgJycgY2xvc2U7IH0KbWFwIFwkaHR0cF94X2ZvcndhcmRlZF9wcm90byBcJG9ueXhfcHJvdG8geyBkZWZhdWx0IFwkaHR0cF94X2ZvcndhcmRlZF9wcm90bzsgJycgXCRzY2hlbWU7IH0Kc2VydmVyIHsKICAgIGxpc3RlbiAkUE9SVCBkZWZhdWx0X3NlcnZlcjsKICAgIGxpc3RlbiBbOjpdOiRQT1JUIGRlZmF1bHRfc2VydmVyOwogICAgc2VydmVyX25hbWUgXzsKICAgIGFjY2Vzc19sb2cgL3Zhci9sb2cvbmdpbngvYWNjZXNzLmxvZyBvbnl4X21haW47CiAgICBjbGllbnRfbWF4X2JvZHlfc2l6ZSAkQk9EWTsKICAgIGNsaWVudF9oZWFkZXJfYnVmZmVyX3NpemUgMTZrOwogICAgbGFyZ2VfY2xpZW50X2hlYWRlcl9idWZmZXJzIDQgNjRrOwogICAgc2V0IFwkb255eF9hcGkgIiRBUEkiOwogICAgc2V0IFwkb255eF93ZWIgIiRXRUIiOwoKICAgIGxvY2F0aW9uID0gL25naW54LWhlYWx0aCB7IGFjY2Vzc19sb2cgb2ZmOyBhZGRfaGVhZGVyIENvbnRlbnQtVHlwZSB0ZXh0L3BsYWluOyByZXR1cm4gMjAwICJvayI7IH0KCiAgICBsb2NhdGlvbiB+IF4vYXBpLyguKilcJCB7CiAgICAgICAgJEhEUlMKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgVXBncmFkZSBcJGh0dHBfdXBncmFkZTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIENvbm5lY3Rpb24gXCRjb25uZWN0aW9uX3VwZ3JhZGU7CiAgICAgICAgcHJveHlfYnVmZmVyaW5nIG9mZjsKICAgICAgICBwcm94eV9yZWRpcmVjdCBvZmY7CiAgICAgICAgJFRNTwogICAgICAgIHByb3h5X3Bhc3MgaHR0cDovL1wkb255eF9hcGkvXCQxXCRpc19hcmdzXCRhcmdzOwogICAgfQoKICAgIGxvY2F0aW9uID0gL29wZW5hcGkuanNvbiB7CiAgICAgICAgJEhEUlMKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X3JlZGlyZWN0IG9mZjsKICAgICAgICAkVE1PCiAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vXCRvbnl4X2FwaS9vcGVuYXBpLmpzb25cJGlzX2FyZ3NcJGFyZ3M7CiAgICB9CgogICAgbG9jYXRpb24gfiBeL2F1dGgvc2FtbCgvLiopP1wkIHsKICAgICAgICAkSERSUwogICAgICAgIHByb3h5X2h0dHBfdmVyc2lvbiAxLjE7CiAgICAgICAgcHJveHlfYnVmZmVyaW5nIG9mZjsKICAgICAgICBwcm94eV9yZWRpcmVjdCBvZmY7CiAgICAgICAgJFRNTwogICAgICAgIHByb3h5X3Bhc3MgaHR0cDovL1wkb255eF9hcGlcJHJlcXVlc3RfdXJpOwogICAgfQoKICAgIGxvY2F0aW9uIH4gXi9zY2ltKC8uKik/XCQgewogICAgICAgICRIRFJTCiAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgICAgICBwcm94eV9idWZmZXJpbmcgb2ZmOwogICAgICAgIHByb3h5X3JlZGlyZWN0IG9mZjsKICAgICAgICAkVE1PCiAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vXCRvbnl4X2FwaVwkcmVxdWVzdF91cmk7CiAgICB9CgogICAgbG9jYXRpb24gLyB7CiAgICAgICAgJEhEUlMKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgVXBncmFkZSBcJGh0dHBfdXBncmFkZTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIENvbm5lY3Rpb24gXCRjb25uZWN0aW9uX3VwZ3JhZGU7CiAgICAgICAgcHJveHlfcmVkaXJlY3Qgb2ZmOwogICAgICAgICRUTU8KICAgICAgICBwcm94eV9wYXNzIGh0dHA6Ly9cJG9ueXhfd2ViXCRyZXF1ZXN0X3VyaTsKICAgIH0KfQpOR0lOWAoKZWNobyAib255eC1uZ2lueDogbGlzdGVuaW5nIG9uICRQT1JUOyAvYXBpIC0+ICRBUEk7IC8gLT4gJFdFQiAocmVzb2x2ZXIgJE5TKSIKZXhlYyAvZG9ja2VyLWVudHJ5cG9pbnQuc2ggbmdpbnggLWcgImRhZW1vbiBvZmY7Igo= | base64 -d > /tmp/railway-start.sh && exec sh /tmp/railway-start.sh'`
- **Healthcheck:** `/nginx-health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/onyx-lite-chat-postgres)
