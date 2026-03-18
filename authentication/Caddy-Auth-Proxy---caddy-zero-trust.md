# Deploy Caddy Auth Proxy on Railway

A lightweight Caddy-based authentication proxy that protects services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-zero-trust)

## About

caddy-auth-proxy is a lightweight authentication proxy built on Caddy. It protects internal services with Basic Auth, converting plain passwords to bcrypt hashes at startup. Designed to run behind TLS-terminating edges like Railway, it proxies authenticated requests to private upstream services.

Deploying caddy-auth-proxy on Railway requires minimal configuration. The service runs as a Docker container that listens on port 80, while Railway handles TLS termination and certificate management. You configure three environment variables: username, password, and the upstream service URL. The entrypoint script hashes the password at boot, so no manual bcrypt generation is needed. Railway's private networking allows caddy-auth-proxy to reach internal services that have no public exposure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy-auth-proxy | [rubenszinho/caddy-zero-trust](https://github.com/rubenszinho/caddy-zero-trust) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_USER` | (secret) | - |
| `QUERY_PARAMS` | - | Optional query string to append to requests |
| `UPSTREAM_URL` | - | The `UPSTREAM_URL` points to the private internal address of the service you want to protect.  e.g. UPSTREAM_URL="http://${{service-name.RAILWAY_PRIVATE_DOMAIN}}:${{service-name.PORT}}" |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/caddy-zero-trust)
