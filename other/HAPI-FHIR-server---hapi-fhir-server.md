# Deploy HAPI FHIR server on Railway

Protected HAPI FHIR R4 server with durable PostgreSQL storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hapi-fhir-server)

## About

HAPI FHIR is an open-source FHIR server for storing, searching, and exchanging healthcare resources through the standard FHIR R4 API.

This template runs HAPI FHIR JPA Starter 8.10.0 with durable PostgreSQL storage. A Basic Auth Caddy gateway is the only public service, so the upstream server and database remain on Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HAPI FHIR | `hapiproject/hapi:v8.10.0-3@sha256:55213612779ab3eeec919226b7bad378f0061ade823393a61d7dd46dd5087a3d` | Worker |
| FHIR Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| HAPI PostgreSQL | `postgres:16-alpine@sha256:57c72fd2a128e416c7fcc499958864df5301e940bca0a56f58fddf30ffc07777` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | HAPI FHIR | 8080 | Private HAPI FHIR HTTP listener. |
| `HIBERNATE_DIALECT` | HAPI FHIR | ca.uhn.fhir.jpa.model.dialect.HapiFhirPostgresDialect | HAPI FHIR PostgreSQL schema dialect. |
| `JAVA_TOOL_OPTIONS` | HAPI FHIR | -XX:InitialRAMPercentage=15.0 -XX:MaxRAMPercentage=55.0 | Bounds the JVM heap relative to Railway's service memory. |
| `SPRING_DATASOURCE_URL` | HAPI FHIR | - | Private PostgreSQL JDBC URL. |
| `HAPI_FHIR_FHIR_VERSION` | HAPI FHIR | R4 | Pins the server API and model to FHIR R4. |
| `HAPI_FHIR_SERVER_ADDRESS` | HAPI FHIR | - | Public FHIR base URL used for generated absolute resource links. |
| `SPRING_DATASOURCE_PASSWORD` | HAPI FHIR | (secret) | Generated PostgreSQL password shared by the database service. |
| `SPRING_DATASOURCE_USERNAME` | HAPI FHIR | (secret) | PostgreSQL application user. |
| `SERVER_FORWARD_HEADERS_STRATEGY` | HAPI FHIR | framework | Honors Railway and Caddy forwarding headers when constructing links. |
| `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | HAPI FHIR | org.postgresql.Driver | Official PostgreSQL JDBC driver. |
| `HAPI_FHIR_TESTER_HOME_SERVER_ADDRESS` | HAPI FHIR | - | Authenticated public FHIR base URL shown in the test UI. |
| `HAPI_FHIR_TESTER_HOME_REFUSE_TO_FETCH_THIRD_PARTY_URLS` | HAPI FHIR | true | Prevents the web tester from fetching arbitrary remote FHIR servers. |
| `PORT` | FHIR Gateway | 8080 | Caddy listener exposed through the Railway domain. |
| `CADDY_CONFIG` | FHIR Gateway | :8080 {
  handle_path /healthz {
    rewrite * /actuator/health/readiness
    reverse_proxy http://__UPSTREAM__
  }
  @protected not path /healthz
  basic_auth @protected {
    __USERNAME__ __PASSWORD_HASH__
  }
  reverse_proxy http://__UPSTREAM__ {
    header_up -Authorization
  }
} | Audited gateway policy that leaves only health anonymous and strips the shared credential upstream. |
| `FHIR_PASSWORD` | FHIR Gateway | (secret) | Generated Basic Auth password; store it securely and rotate deliberately. |
| `FHIR_UPSTREAM` | FHIR Gateway | - | Private HAPI FHIR server endpoint. |
| `FHIR_USERNAME` | FHIR Gateway | (secret) | Basic Auth username protecting every FHIR and UI route. |
| `POSTGRES_DB` | HAPI PostgreSQL | hapi | Database created for HAPI FHIR. |
| `POSTGRES_USER` | HAPI PostgreSQL | (secret) | Database role created for HAPI FHIR. |
| `POSTGRES_PASSWORD` | HAPI PostgreSQL | (secret) | Generated database password referenced by HAPI FHIR. |

## Configuration

- **Healthcheck:** `/fhir/metadata`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$FHIR_PASSWORD")"; printf "%s\n" "$CADDY_CONFIG" | sed -e "s|__USERNAME__|$FHIR_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$FHIR_UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hapi-fhir-server)
