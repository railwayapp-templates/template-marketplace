# Deploy RustyAuth on Railway

Self-host passkey authentication with RustyAuth and SableDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustyauth)

## About

RustyAuth is a small, self-hosted identity service for WebAuthn passkey ceremonies, durable browser
sessions, and short-lived ES256 access tokens. This template deploys the public RustyAuth service
alongside a private, persistent SableDB service in one Railway project. The services communicate
over Railway's private network; only RustyAuth receives a public HTTPS domain. Railway places both
services in the template group named `RustyAuth`.

RustyAuth is pre-release software. Recovery, scheduled backup and restore, signing-key rotation,
and an independent security assessment are not complete. Use this template for evaluation and
integration work, and do not make this release the sole identity system for a production service.

The template creates RustyAuth and SableDB services from versioned public container images built
from the [`rusty-auth/rustyauth`](https://github.com/rusty-auth/rustyauth) repository. SableDB has no
public domain or TCP proxy and stores identity state on a Railway volume mounted at
`/var/lib/sabledb`.

Railway generates `AUTH_MASTER_KEY_HEX` and `BOOTSTRAP_TOKEN` independently for every template
deployment. `SABLEDB_URL` is assembled from the SableDB service's Railway private-domain reference,
so no database hostname or credential needs to be copied between services.

The deploy form asks for the browser application's WebAuthn origin and RP ID. The RP ID must exactly
match the hostname in the WebAuthn origin, and production origins must use HTTPS. Other values have
safe template defaults but remain editable during the environment step.

| Variable | Deployment behavior |
| --- | --- |
| `WEBAUTHN_RP_ORIGIN` | Required user input: the exact HTTPS origin of the browser application |
| `WEBAUTHN_RP_ID` | Required user input: the hostname from `WEBAUTHN_RP_ORIGIN` |
| `WEBAUTHN_RP_NAME` | Editable display name; defaults to `RustyAuth` |
| `SPACETIME_AUDIENCE` | Editable access-token audience; defaults to `rustyauth` |
| `AUTH_TENANT_ID` | Editable tenant claim; defaults to `default` |
| `AUTH_ISSUER` | Automatically references the RustyAuth public Railway domain |
| `SABLEDB_URL` | Automatically references SableDB on Railway's private network |
| `AUTH_MASTER_KEY_HEX` | Automatically generated 256-bit hexadecimal secret |
| `BOOTSTRAP_TOKEN` | Automatically generated 64-character secret |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RustyAuth | `ghcr.io/rusty-auth/rustyauth:template-882c0a0` | Web service |
| SableDB | `ghcr.io/rusty-auth/rustyauth-sabledb:template-882c0a0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | RustyAuth | 8080 | HTTP port exposed by the RustyAuth service. |
| `AUTH_ENV` | RustyAuth | production | Runtime environment. Keep production for hosted deployments. |
| `RUST_LOG` | RustyAuth | passkey_auth_service=info,tower_http=info | Rust logging filter for RustyAuth and HTTP middleware. |
| `AUTH_ISSUER` | RustyAuth | - | Public issuer URL derived automatically from the Railway domain. |
| `SABLEDB_URL` | RustyAuth | - | Private Railway connection to the bundled SableDB service. |
| `AUTH_TENANT_ID` | RustyAuth | default | Tenant identifier used by RustyAuth. |
| `WEBAUTHN_RP_ID` | RustyAuth | - | Required relying-party domain only, without a scheme or path (for example, auth.example.com). |
| `BOOTSTRAP_TOKEN` | RustyAuth | (secret) | Automatically generated token for initial administrative bootstrap. |
| `WEBAUTHN_RP_NAME` | RustyAuth | RustyAuth | Human-readable relying-party name shown by passkey prompts. |
| `SPACETIME_AUDIENCE` | RustyAuth | rustyauth | Audience claim placed in tokens issued for SpacetimeDB consumers. |
| `WEBAUTHN_RP_ORIGIN` | RustyAuth | - | Required HTTPS origin used by the application (for example, https://auth.example.com). |
| `AUTH_MASTER_KEY_HEX` | RustyAuth | - | Automatically generated 64-character hexadecimal master key. |
| `AUTH_ACCESS_TOKEN_SECONDS` | RustyAuth | (secret) | Access token lifetime in seconds. |
| `AUTH_SESSION_IDLE_SECONDS` | RustyAuth | 1800 | Session idle timeout in seconds. |
| `AUTH_SESSION_ABSOLUTE_SECONDS` | RustyAuth | 604800 | Maximum session lifetime in seconds. |
| `PORT` | SableDB | 6379 | Private SableDB port used by RustyAuth. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sabledb`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/rustyauth)
