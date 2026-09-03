# Deploy Apache APISIX on Railway

API gateway that routes and secures traffic to your services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apisix)

## About

Apache APISIX is a high-performance, open-source API gateway that sits in front of your backend services and handles routing, authentication, rate limiting, observability and request transformation, so none of that logic lives in your application code. Built on NGINX and OpenResty and governed by the Apache Software Foundation, it keeps every route, upstream, consumer and plugin in etcd and pushes changes to running workers in milliseconds, so traffic can be reshaped without restarting anything.

This template lets you self-host Apache APISIX on Railway with three services wired together: the `apisix` gateway, which takes public traffic on its own domain; an `etcd` service holding all configuration on a persistent volume; and `apisix-dashboard`, a Caddy proxy publishing the Admin API and the dashboard UI that ships inside APISIX 3.13 and later on a second domain. The gateway reads its configuration from etcd over Railway's private network.

![Diagram of the APISIX, etcd and dashboard services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788299556/apisix-architecture.png)

An API gateway gives every service behind it one front door with a shared set of policies. Instead of each backend re-implementing API keys, JWT validation, CORS and quotas, you attach plugins to a route and APISIX applies them before the request reaches your code. Teams self-host once they run several internal services, or need API traffic and its logs on infrastructure they control.

Key capabilities:

- **Dynamic routing** by path, host, method, header, query argument or remote address, with regex rewriting.
- **Authentication plugins** — key auth, JWT, HMAC, basic auth, LDAP and OpenID Connect, on a shared consumer model.
- **Traffic control** through rate limiting, quotas, circuit breaking, canary release and mirroring.
- **Observability** with Prometheus, OpenTelemetry, SkyWalking, Datadog and Kafka or Loki loggers.
- **AI gateway plugins** that proxy, cache, rate-limit and guard LLM provider requests.
- **Service discovery** from DNS, Consul, Nacos and Eureka, plus gRPC and WebSocket support.

The `etcd` service is the configuration store, not a cache: routes, upstreams, consumers, certificates and plugin settings live there, which is why it carries the volume. APISIX keeps a copy in memory, so proxying continues even while etcd restarts. The dashboard is a separate service because Railway gives each service one public hostname, so the gateway's traffic port and the Admin API cannot share one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apisix | [gridalpha/apisix-railway](https://github.com/gridalpha/apisix-railway) | Web service |
| etcd | [gridalpha/apisix-railway](https://github.com/gridalpha/apisix-railway) | Database |
| apisix-dashboard | [gridalpha/apisix-railway](https://github.com/gridalpha/apisix-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | apisix | 7085 | Status listener probed by the health check |
| `APISIX_KEYRING` | apisix | - | Encrypts secrets stored in etcd |
| `APISIX_ETCD_URL` | apisix | - | Private etcd client endpoint |
| `APISIX_ADMIN_KEY` | apisix | - | Admin API and dashboard key |
| `APISIX_ETCD_USER` | apisix | (secret) | etcd account used by the gateway |
| `APISIX_ADMIN_CORS` | apisix | false | Dashboard is same-origin |
| `APISIX_ENABLE_SSL` | apisix | false | Railway terminates TLS at the edge |
| `PRIVATE_ADMIN_URL` | apisix | http://apisix.railway.internal:9180 | Admin API address for the proxy |
| `APISIX_ENABLE_IPV6` | apisix | true | Resolve upstreams over IPv6 |
| `APISIX_ETCD_PASSWORD` | apisix | (secret) | etcd password |
| `APISIX_WORKER_PROCESSES` | apisix | 2 | NGINX worker processes |
| `PORT` | etcd | 2379 | Client port probed by the health check |
| `ETCD_NAME` | etcd | apisix-etcd | Member name |
| `ETCD_LOGGER` | etcd | zap | Structured logger |
| `PRIVATE_URL` | etcd | http://etcd.railway.internal:2379 | Private client endpoint |
| `ETCD_DATA_DIR` | etcd | /var/lib/etcd/data | Data directory below the volume root |
| `ETCD_LOG_LEVEL` | etcd | info | Log verbosity |
| `ETCD_LOG_OUTPUTS` | etcd | stdout | Send logs to the deploy log |
| `ETCD_ROOT_PASSWORD` | etcd | (secret) | Enables etcd authentication at first boot |
| `ETCD_SNAPSHOT_COUNT` | etcd | 10000 | Writes between raft snapshots |
| `ETCD_INITIAL_CLUSTER` | etcd | apisix-etcd=http://127.0.0.1:2380 | Single-node cluster |
| `ETCD_LISTEN_PEER_URLS` | etcd | http://127.0.0.1:2380 | Loopback peer listener |
| `ETCD_MAX_REQUEST_BYTES` | etcd | 10485760 | Largest accepted client request |
| `ETCD_LISTEN_CLIENT_URLS` | etcd | http://[::]:2379 | Dual-stack client listener |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 2147483648 | Backend database size limit |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision | Compact by revision count |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd | http://127.0.0.1:2379 | Advertised client URL |
| `ETCD_INITIAL_CLUSTER_STATE` | etcd | new | Bootstrap a fresh cluster |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd | (secret) | Cluster identity token |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 | Revisions kept before compaction |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd | http://127.0.0.1:2380 | Advertised peer URL |
| `PORT` | apisix-dashboard | 8080 | HTTP listener and health check port |
| `APISIX_ADMIN_UPSTREAM` | apisix-dashboard | - | Private Admin API address |

## Configuration

- **Healthcheck:** `/status/ready`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/readyz`
- **Volume:** `/var/lib/etcd`
- **Healthcheck:** `/healthz`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apisix)
