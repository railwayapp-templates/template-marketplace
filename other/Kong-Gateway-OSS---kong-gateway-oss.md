# Deploy Kong Gateway OSS on Railway

A Kong Gateway OSS deployment running in hybrid mode

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kong-gateway-oss)

## About

Kong Gateway OSS is an open-source, high-performance API gateway and reverse proxy designed to handle authentication, rate-limiting, observability, traffic routing, and plugin-based extensibility. It sits in front of your services to securely and efficiently manage API traffic at scale.

This Kong Gateway OSS template involves provisioning a database, configuring the Control Plane (CP), and running one or more Data Plane (DP) nodes to process traffic. The CP stores configuration and syncs it to each DP. Railway simplifies this setup by providing a managed environment where services can be connected with minimal manual wiring—database volumes, networking, secrets, and scaling are all handled through the platform’s UI. This lets you focus on API governance and routing instead of infrastructure complexity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kong-cp | `kong/kong:3.9.1` | TCP service |
| kong-db | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| kong-dp | `kong/kong:3.9.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KONG_ROLE` | kong-cp | control_plane | Role that this kong node would assume |
| `KONG_PG_HOST` | kong-cp | - | PostgreSQL database host |
| `KONG_PG_PORT` | kong-cp | - | PostgreSQL database port |
| `KONG_PG_USER` | kong-cp | (secret) | PostgreSQL username |
| `KONG_DATABASE` | kong-cp | postgres | Database strategy (Postgres) |
| `KONG_PG_DATABASE` | kong-cp | - | PostgreSQL database name |
| `KONG_PG_PASSWORD` | kong-cp | (secret) | PostgreSQL password |
| `KONG_ADMIN_LISTEN` | kong-cp | 0.0.0.0:8001, [::]:8001 | Admin API listen interface/port |
| `KONG_CLUSTER_CERT` | kong-cp | - | Base64-encoded certificate for cluster mTLS (required) |
| `KONG_PROXY_LISTEN` | kong-cp | off | Disable data-plane proxy ports on Control Plane |
| `KONG_ADMIN_GUI_URL` | kong-cp | - | Public URL for Kong Manager GUI |
| `KONG_CLUSTER_LISTEN` | kong-cp | 0.0.0.0:8005 ssl, [::]:8005 ssl | CP ↔ DP cluster communication endpoint |
| `KONG_ADMIN_ERROR_LOG` | kong-cp | /dev/stderr | Admin API error logs destination |
| `KONG_PROXY_ERROR_LOG` | kong-cp | /dev/stderr | Proxy error logs (mostly unused on CP) |
| `KONG_ADMIN_ACCESS_LOG` | kong-cp | /dev/stdout | Admin API access logs |
| `KONG_ADMIN_API_LISTEN` | kong-cp | 0.0.0.0:8001 reuseport backlog=16384 | Admin API listen settings |
| `KONG_ADMIN_GUI_LISTEN` | kong-cp | 0.0.0.0:8002, [::]:8002 | Kong Manager GUI port bindings |
| `KONG_CLUSTER_CERT_KEY` | kong-cp | - | Base64-encoded private key for cluster mTLS (required) |
| `KONG_ADMIN_GUI_API_URL` | kong-cp | - | API endpoint used by GUI |
| `KONG_LUA_SSL_VERIFY_DEPTH` | kong-cp | 2 | SSL certificate chain validation depth |
| `KONG_NGINX_WORKER_PROCESSES` | kong-cp | 2 | Number of Nginx worker processes (IMPORTANT: Fine tune this variable depending on your needs. Setting this to the default value of `auto` will essentially eat the container's resources indefinitely. I recommend setting it to be the same as this node's max num vCPU cores) |
| `KONG_CLUSTER_TELEMETRY_LISTEN` | kong-cp | 0.0.0.0:8006 ssl, [::]:8006 ssl | Telemetry channel for hybrid mode |
| `KONG_LUA_SSL_TRUSTED_CERTIFICATE` | kong-cp | /etc/ssl/certs/ca-certificates.crt | Trusted CA bundle for Lua SSL |
| `POSTGRES_DB` | kong-db | kong | Default database created when image is started. |
| `DATABASE_URL` | kong-db | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | kong-db | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | kong-db | (secret) | Password to connect to DB |
| `KONG_ROLE` | kong-dp | data_plane | Role that this kong node would assume |
| `KONG_DATABASE` | kong-dp | off | Disable local database; DP receives config from CP |
| `KONG_PROXY_URL` | kong-dp | - | Public URL where the DP proxy is exposed |
| `KONG_ADMIN_LISTEN` | kong-dp | off | Disable Admin API on the Data Plane for security |
| `KONG_CLUSTER_CERT` | kong-dp | - | Base64-encoded certificate for cluster mTLS (required) |
| `KONG_PROXY_LISTEN` | kong-dp | 0.0.0.0:8000, [::]:8000 | Proxy listener for incoming traffic |
| `KONG_PROXY_ERROR_LOG` | kong-dp | /dev/stderr | Error logs for the proxy |
| `KONG_ADMIN_GUI_LISTEN` | kong-dp | off | Disable Manager GUI on the DP (only on CP) |
| `KONG_CLUSTER_CERT_KEY` | kong-dp | - | Base64-encoded private key for cluster mTLS (required) |
| `KONG_PROXY_ACCESS_LOG` | kong-dp | /dev/stdout | Access logs for proxied requests |
| `KONG_LUA_SSL_VERIFY_DEPTH` | kong-dp | 2 | SSL certificate chain verification depth |
| `KONG_CLUSTER_CONTROL_PLANE` | kong-dp | - | Address of CP for config sync |
| `KONG_NGINX_WORKER_PROCESSES` | kong-dp | 2 | Number of Nginx worker processes (IMPORTANT: Fine tune this variable depending on your needs. Setting this to the default value of `auto` will essentially eat the container's resources indefinitely. I recommend setting it to be the same as this node's max num vCPU cores) |
| `KONG_CLUSTER_TELEMETRY_ENDPOINT` | kong-dp | - | Telemetry channel to CP |
| `KONG_LUA_SSL_TRUSTED_CERTIFICATE` | kong-dp | /etc/ssl/certs/ca-certificates.crt | Trusted CA bundle for SSL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8001
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kong-gateway-oss)
