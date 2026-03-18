# Deploy Dapr Workflow Starter on Railway

Durable workflows, pub/sub, key/value and cron with Dapr & Diagrid Catalyst

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-catalyst-starter)

## About

### What is Dapr?
[Dapr](https://dapr.io) (Distributed Application Runtime) is an open-source set of APIs that makes it easy to connect applications with building blocks like:
* **Service Invocation** (sync calls between services)
* **Publish/Subscribe Messaging** (async event-driven communication)
* **State Management** (key-value state, consistency, concurrency control)
* **Workflows** (durable, long-running, fault-tolerant processes)
* **Bindings & Triggers** (connect apps to external systems and events)
* **Cron & Scheduling** (time-based reminders and event triggers)

Dapr can be used from any major language and framework: **Java, .NET, Go, Python, JavaScript/TypeScript, Rust, PHP, C++**, and more. It enables developers to focus on business logic while Dapr handles retries, security, observability, and portability.

### What is Diagrid Catalyst?
![Catalyst Overview](https://docs.diagrid.io/assets/images/catalyst-hero-graphic-bc80407e257eb81988efbb00c56fe783.png)
[Catalyst](https://www.diagrid.io/catalyst) is **Dapr as a managed service**. Instead of running Dapr sidecars or managing infrastructure, you connect your applications to Catalyst's hosted Dapr endpoints. Catalyst is serverless and multi-cloud portable: your app can run anywhere (such as Railway) and use Dapr APIs for workflows, pub/sub, state, and reliable service invocation.



### Common Use Cases
* Durable Workflows: Orchestrate business processes with retries, error handling, scheduled reminders, and external events.

* Publish/Subscribe Messaging: Enable at-least-once delivery with CloudEvents support, TTL, and bulk message delivery for event-driven systems.

* Service Invocation: Securely call services across clouds, regions, and compute environments with zero-trust communication, service discovery, and message transformation.

* State Management: Store and retrieve state with multi-tenancy, consistency controls (strong or eventual), concurrency rules, and encryption at rest.

* Bindings & Triggers: Integrate with external systems and APIs, handle inbound events, authenticate calls, and observe third-party interactions.

_Note_: This starter template only demonstrates how to use Durable Workflows in Python. Other Catalyst and Dapr APIs (pub/sub, state, service invocation, bindings) can also be used but are not included in this starter.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-catalyst-starter | [diagrid-labs/railway-catalyst-starter](https://github.com/diagrid-labs/railway-catalyst-starter) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DAPR_API_TOKEN` | (secret) | Your Diagrid Catalyst APP_ID API token |
| `DAPR_GRPC_ENDPOINT` | - | Your Diagrid Catalyst project GRPC endpoint URL |
| `DAPR_HTTP_ENDPOINT` | - | Your Diagrid Catalyst project HTTP endpoint URL |

## Configuration

- **Healthcheck:** `/`
- **TCP Proxies:** 5001

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-catalyst-starter)
