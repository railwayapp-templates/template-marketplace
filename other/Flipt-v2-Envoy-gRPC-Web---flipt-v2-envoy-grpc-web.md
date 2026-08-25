# Deploy Flipt v2 + Envoy (gRPC-Web) on Railway

Feature flags with Flipt v2 behind an Envoy gRPC-Web proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flipt-v2-envoy-grpc-web)

## About

Flipt v2 is an open-source feature flag engine that keeps flag state as plain files in a Git repository instead of a database. This template pairs it with an Envoy proxy that bridges gRPC-Web, so browser code and backend services can both evaluate flags against the same instance.

Flipt speaks gRPC and REST, but not gRPC-Web, which is what browsers need. Envoy sits in front and translates. Its route list is restricted to the evaluation service alone, so every other path answers 403 and the management API never reaches the public internet. Flipt keeps its gRPC port and its UI on Railway's private network and writes Git-backed flag state to an attached volume. Server-side callers skip Envoy entirely and evaluate over native gRPC on the private network, which keeps the hot path free of an extra hop.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Envoy | [agafonovim/railway-templates](https://github.com/agafonovim/railway-templates) (root: /flipt/envoy) | Web service |
| Flipt | `flipt/flipt:v2.11.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname other services use to reach Redis. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Redis username. This is the default ACL user. |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD, kept for clients that expect this name. |
| `REDIS_PASSWORD` | Redis | (secret) | Password generated for the Redis default user. |
| `PORT` | Envoy | 8080 | Port Envoy listens on. Railway routes the public domain and the healthcheck to this port. |
| `FLIPT_UPSTREAM_HOST` | Envoy | - | Private hostname of the Flipt service that Envoy proxies gRPC traffic to. |
| `FLIPT_UPSTREAM_PORT` | Envoy | - | Flipt's gRPC port that Envoy proxies to. |
| `PORT` | Flipt | - | Port Railway routes the public domain and the healthcheck to. Matches FLIPT_SERVER_HTTP_PORT. |
| `FLIPT_SERVER_HOST` | Flipt | [::] | Address Flipt binds to. Brackets are required; a bare :: yields an invalid listen address. |
| `FLIPT_SERVER_GRPC_PORT` | Flipt | 9000 | Port for Flipt's gRPC API, used by Envoy and by backend services on the private network. |
| `FLIPT_SERVER_HTTP_PORT` | Flipt | 8080 | Port for Flipt's UI and REST API. |
| `FLIPT_META_TELEMETRY_ENABLED` | Flipt | false | Whether Flipt reports anonymous usage telemetry to its maintainers. |
| `FLIPT_AUTHENTICATION_REQUIRED` | Flipt | true | Requires credentials for Flipt's API and UI. Evaluation is exempted separately. |
| `FLIPT_ENVIRONMENTS_DEFAULT_NAME` | Flipt | production | Key and display name of the single built-in environment. Clients send this as environment_key. |
| `FLIPT_STORAGE_DEFAULT_BACKEND_PATH` | Flipt | - | Directory holding the Git repository of flag state. Points at the mounted volume. |
| `FLIPT_STORAGE_DEFAULT_BACKEND_TYPE` | Flipt | local | Storage backend. local keeps flag state on disk; the default, memory, loses it on restart. |
| `FLIPT_AUTHENTICATION_SESSION_DOMAIN` | Flipt | - | Domain the login session cookie is registered on. Required once any login method is enabled. |
| `FLIPT_AUTHENTICATION_SESSION_SECURE` | Flipt | true | Marks the login session cookies HTTPS-only. |
| `FLIPT_AUTHENTICATION_SESSION_CSRF_KEY` | Flipt | - | Secret used to sign CSRF tokens during the login flow. |
| `FLIPT_AUTHENTICATION_EXCLUDE_EVALUATION` | Flipt | true | Leaves flag evaluation reachable without credentials while the rest of Flipt stays protected. |
| `FLIPT_AUTHENTICATION_SESSION_STORAGE_TYPE` | Flipt | redis | Where login sessions are kept. redis survives restarts; memory signs everyone out on redeploy. |
| `FLIPT_AUTHENTICATION_METHODS_GITHUB_SCOPES` | Flipt | read:org | OAuth scopes requested from GitHub. read:org is required for the organization check to run. |
| `FLIPT_AUTHENTICATION_METHODS_GITHUB_ENABLED` | Flipt | true | Turns on signing in to the Flipt UI with GitHub. |
| `FLIPT_AUTHENTICATION_METHODS_GITHUB_CLIENT_ID` | Flipt | - | Client ID of the GitHub OAuth App. Its callback URL is https://<your-flipt-domain>/auth/v1/method/github/callback. |
| `FLIPT_AUTHENTICATION_SESSION_STORAGE_REDIS_HOST` | Flipt | - | Hostname of the Redis that holds login sessions. |
| `FLIPT_AUTHENTICATION_SESSION_STORAGE_REDIS_MODE` | Flipt | single | Redis topology, single or cluster. Required whenever Redis session storage is used. |
| `FLIPT_AUTHENTICATION_SESSION_STORAGE_REDIS_PORT` | Flipt | - | Port of the Redis that holds login sessions. |
| `FLIPT_AUTHENTICATION_METHODS_GITHUB_CLIENT_SECRET` | Flipt | (secret) | Client secret of the same GitHub OAuth App. |
| `FLIPT_AUTHENTICATION_SESSION_STORAGE_REDIS_PASSWORD` | Flipt | (secret) | Password for the Redis that holds login sessions. |
| `FLIPT_AUTHENTICATION_METHODS_GITHUB_REDIRECT_ADDRESS` | Flipt | - | Public address GitHub redirects back to after sign-in. |
| `FLIPT_AUTHENTICATION_METHODS_GITHUB_ALLOWED_ORGANIZATIONS` | Flipt | - | Space-separated GitHub organizations allowed to sign in. Leaving it empty lets any GitHub account in. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/var/opt/flipt`

**Category:** Other · **Languages:** Go Template, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/flipt-v2-envoy-grpc-web)
