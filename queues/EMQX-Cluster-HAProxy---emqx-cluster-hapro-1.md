# Deploy EMQX Cluster + HAProxy on Railway

Deploy an EMQX Cluster with HAProxy Load Balancing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/emqx-cluster-hapro-1)

## About

A **production-ready 3-node EMQX cluster** with HAProxy load balancing. Provides **high availability**, automatic failover, sticky session routing, and weighted load distribution. Built for mission-critical IoT applications requiring **zero-downtime** deployments and horizontal scalability with secure cluster communication.

This template deploys three EMQX broker nodes in a cluster behind an HAProxy load balancer. The cluster ensures continuous operation when individual nodes fail or restart.

HAProxy routes MQTT clients based on their client identifier, ensuring sticky sessions while automatically failing over to healthy nodes. The cluster uses Erlang cookie authentication for secure inter-node communication and synchronizes shared state across all brokers.

Railway's private networking handles connectivity between components with TLS termination at the edge. Health checks monitor all backends and instantly reroute traffic during failures. The setup supports MQTT over TCP and WebSocket, with a load-balanced admin dashboard accessible from any node.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| emqx3 | [crisog/emqx-cluster-haproxy](https://github.com/crisog/emqx-cluster-haproxy) (root: /emqx) | Worker |
| emqx1 | [crisog/emqx-cluster-haproxy](https://github.com/crisog/emqx-cluster-haproxy) (root: /emqx) | Worker |
| haproxy | [crisog/emqx-cluster-haproxy](https://github.com/crisog/emqx-cluster-haproxy) (root: /haproxy) | TCP service |
| emqx2 | [crisog/emqx-cluster-haproxy](https://github.com/crisog/emqx-cluster-haproxy) (root: /emqx) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `EMQX_CLUSTER__DISCOVERY_STRATEGY` | emqx3 | static |
| `EMQX_DASHBOARD__DEFAULT_PASSWORD` | emqx3 | (secret) |
| `EMQX_VERSION` | emqx1 | 5.4.1 |
| `EMQX_NODE__COOKIE` | emqx1 | 6a9c7d5f8a790c9ad4762de217f32a304511226b0ede670b405c20bd841dace7259bd1ffc8c38ed2855addbb5c81df2ceeaf9b2246572cdf56f066e41bacf27c |
| `EMQX_CLUSTER__DISCOVERY_STRATEGY` | emqx1 | static |
| `EMQX_DASHBOARD__DEFAULT_PASSWORD` | emqx1 | (secret) |
| `PORT` | haproxy | 8080 |
| `EMQX1_WEIGHT` | haproxy | 5 |
| `EMQX2_WEIGHT` | haproxy | 2 |
| `EMQX3_WEIGHT` | haproxy | 3 |
| `EMQX_WS_PORT` | haproxy | 8083 |
| `EMQX_MQTT_PORT` | haproxy | 1883 |
| `HAPROXY_VERSION` | haproxy | 3.2.7 |
| `EMQX_DASHBOARD_PORT` | haproxy | 18083 |
| `EMQX_CLUSTER__DISCOVERY_STRATEGY` | emqx2 | static |
| `EMQX_DASHBOARD__DEFAULT_PASSWORD` | emqx2 | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1883

**Category:** Queues · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/emqx-cluster-hapro-1)
