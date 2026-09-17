# Deploy Flipt on Railway

Run Flipt: REST, gRPC and OpenFeature flag evaluation on your own server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flipt-v2)

## About

Flipt is an open-source feature flag and experimentation server. Rather than keeping flag state in a proprietary database, Flipt v2 stores every flag, segment and rollout as YAML in a Git repository, so a change made in the web UI is an ordinary commit you can review, revert and diff. Teams use it to ship code behind flags, run percentage rollouts and target releases at specific customers without redeploying. Evaluation happens on your own server, so no user attribute leaves your infrastructure — the usual reason to self-host Flipt instead of paying per seat.

This template runs two services. `flipt` is the server: the UI, the REST and gRPC evaluation APIs and an OpenFeature-compatible OFREP endpoint, with its Git repository on a persistent volume. `gateway` is a Caddy reverse proxy holding the only public domain, which puts HTTP basic authentication in front of everything and forwards requests to `flipt` privately with the server's own API token attached. Applications in the same project call `flipt.railway.internal` directly.

![Flipt server and Caddy gateway services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789516835/flipt-architecture.webp)

Flipt is a single Go binary with no external database requirement, which makes it cheap to self-host. Teams reach for it when flag data is sensitive, when evaluation latency matters, or when they want flags in version control beside the code they gate.

- Boolean flags, multivariate flags and percentage rollouts
- Segments with string, number, boolean and date constraints
- REST, gRPC and OFREP (OpenFeature) APIs, with SDKs for Go, Java, JavaScript, Python, Ruby, Rust, PHP and .NET
- Multiple environments and namespaces, mapped to Git branches or directories
- Server-Sent Events streaming, so SDKs pick up changes without polling
- API tokens, OIDC, GitHub OAuth, JWT and Kubernetes auth

The `flipt` service owns all state: its volume holds a real Git repository at `/var/opt/flipt/data`, so history and blame come for free. The `gateway` service adds the authentication layer Flipt cannot supply without an external identity provider, and is where `/metrics` and the profiling endpoints stay closed to the internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flipt | [gridalpha/flipt-railway](https://github.com/gridalpha/flipt-railway) | Database |
| gateway | [gridalpha/flipt-railway](https://github.com/gridalpha/flipt-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | flipt | 8080 | HTTP port Railway health-checks |
| `PRIVATE_URL` | flipt | http://flipt.railway.internal:8080 | Private address for the gateway |
| `FLIPT_LOG_LEVEL` | flipt | INFO | Log verbosity, DEBUG when troubleshooting |
| `FLIPT_AUTHENTICATION_REQUIRED` | flipt | true | Reject unauthenticated API calls |
| `FLIPT_AUTHENTICATION_METHODS_TOKEN_ENABLED` | flipt | (secret) | Enable static API tokens |
| `FLIPT_AUTHENTICATION_METHODS_TOKEN_STORAGE_TYPE` | flipt | (secret) | Token storage backend |
| `FLIPT_AUTHENTICATION_METHODS_TOKEN_STORAGE_TOKENS_ADMIN_CREDENTIAL` | flipt | (secret) | API token for SDKs |
| `PORT` | gateway | 8080 | HTTP port Railway health-checks |
| `FLIPT_UPSTREAM` | gateway | - | Private address of the Flipt server |
| `FLIPT_AUTH_TOKEN` | gateway | (secret) | Token sent upstream |
| `GATEWAY_PASSWORD` | gateway | (secret) | Basic-auth password for the UI |
| `GATEWAY_USERNAME` | gateway | (secret) | Basic-auth username for the UI |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/opt/flipt`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/flipt-v2)
