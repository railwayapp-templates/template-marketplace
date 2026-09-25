# Deploy WireMock on Railway

WireMock 3.13 HTTP mock server with a protected admin API and saved stubs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wiremock)

## About

WireMock is a widely used tool for mocking HTTP APIs. You define stubs that match requests by URL, method, headers and body, and return canned or templated responses, delays and faults. Teams use it to test against third-party APIs that are slow, costly or unavailable, and to develop against APIs that do not exist yet.

This template deploys WireMock v3.13.2 from the official image as a single service. Mocked endpoints are served on your Railway domain, while the admin API under `/__admin` requires a generated username and password. Response templating is enabled globally. Stub mappings and response files live on a Railway volume, so stubs saved there survive redeploys. The JVM heap is capped at 384 MB, which fits the Hobby plan. Services in the same project can call the mock over the private network, for example from a staging environment. Stubs can also be edited as JSON files on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wiremock | `wiremock/wiremock:3.13.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `JAVA_OPTS` | -Xmx384m |
| `WIREMOCK_ADMIN_USER` | (secret) |
| `WIREMOCK_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `bash -c 'mkdir -p /home/wiremock/mappings /home/wiremock/__files && exec /docker-entrypoint.sh --port 8080 --root-dir /home/wiremock --admin-api-basic-auth "$WIREMOCK_ADMIN_USER:$WIREMOCK_ADMIN_PASSWORD" --global-response-templating --disable-banner --async-response-enabled true'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/wiremock`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wiremock)
