# Deploy Crawlab on Railway

Open Source Scrapy Cloud Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawlab)

## About

Crawlab is a distributed web crawler management platform written in Go. You upload spiders written in any language — Python, Node.js, Go, Java, PHP — built on any framework, from Scrapy and Puppeteer to a bare `requests` script, then schedule them, dispatch them across a pool of worker nodes, and watch every run's logs and results from one web console. It solves the problem every team hits past its third scraper: knowing which ones ran, which failed, what they produced, and where each one's code lives. Over 12,000 GitHub stars and a BSD-3 licence make it the most widely used open-source alternative to hosted crawler platforms.

Self-host Crawlab on Railway and the three services that make up a real cluster come up together and already wired to each other. `crawlab-master` serves the web console and API, runs the gRPC hub that worker nodes register with, and stores spider source in an embedded file server. `crawlab-worker` pulls spider code from the master and executes tasks, keeping crawls off the machine serving your UI. `mongo` holds spiders, schedules, tasks, logs and results. Only the master gets a public URL. The administrator password is applied before anything is reachable, so the deployment never serves the upstream `admin`/`admin` default.

![Diagram of the Crawlab master, worker and MongoDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788893401/crawlab-architecture.png)

Crawlab is framework-agnostic by design. It does not ask you to rewrite scrapers against its own API — it runs whatever shell command you give it, in a container that already has Python, Node.js, Go and a Chrome driver, and captures the output. That makes it a control plane rather than a crawling library, which is why teams reach for it when their scrapers are written by different people in different tools.

Key features:

- Spider management with a browser-based file editor and Git integration
- Cron scheduling, per-task priorities and configurable concurrency per node
- Distributed execution across master and worker nodes, dispatched over gRPC
- Live task logs, per-spider statistics and a results browser
- Dependency management for Python and Node packages, per node
- Role-based users, API tokens and a full REST API

The master is the only service that needs a public address. It runs nginx in front of the API, the gRPC hub that workers dial, and an embedded SeaweedFS file store that holds spider source; worker nodes fetch code from it before every run. MongoDB is not optional — Crawlab wraps user, spider and task writes in transactions, so it runs as a single-node replica set rather than a standalone server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crawlab-worker | [gridalpha/crawlab-railway](https://github.com/gridalpha/crawlab-railway) | Database |
| crawlab-master | [gridalpha/crawlab-railway](https://github.com/gridalpha/crawlab-railway) | Web service |
| mongo | [gridalpha/crawlab-railway](https://github.com/gridalpha/crawlab-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CRAWLAB_MONGO_DB` | crawlab-worker | crawlab | Database name |
| `CRAWLAB_MONGO_URI` | crawlab-worker | - | MongoDB connection string |
| `CRAWLAB_MAX_RUNNERS` | crawlab-worker | 8 | Concurrent tasks on this node |
| `CRAWLAB_NODE_MASTER` | crawlab-worker | N | Run this node as a worker |
| `CRAWLAB_API_ENDPOINT` | crawlab-worker | - | Master's private API |
| `CRAWLAB_FS_FILER_URL` | crawlab-worker | - | Where spider source is fetched |
| `CRAWLAB_GRPC_ADDRESS` | crawlab-worker | - | Master's gRPC hub |
| `CRAWLAB_NODE_AUTH_KEY` | crawlab-worker | (secret) | Shared gRPC secret between nodes |
| `PORT` | crawlab-master | 8080 | Port the web console is served on |
| `CRAWLAB_MONGO_DB` | crawlab-master | crawlab | Database name |
| `CRAWLAB_MONGO_URI` | crawlab-master | - | MongoDB connection string |
| `PRIVATE_FILER_URL` | crawlab-master | http://crawlab-master.railway.internal:8000/filer | Spider file store for workers |
| `CRAWLAB_MAX_RUNNERS` | crawlab-master | 8 | Concurrent tasks on this node |
| `CRAWLAB_NODE_MASTER` | crawlab-master | Y | Run this node as the master |
| `PRIVATE_API_ENDPOINT` | crawlab-master | http://crawlab-master.railway.internal:8000 | Private API address for workers |
| `PRIVATE_GRPC_ADDRESS` | crawlab-master | crawlab-master.railway.internal:9666 | gRPC hub address for workers |
| `CRAWLAB_NODE_AUTH_KEY` | crawlab-master | (secret) | Shared gRPC secret between nodes |
| `CRAWLAB_ADMIN_PASSWORD` | crawlab-master | (secret) | Password for the admin account |
| `PORT` | mongo | 8081 | Health endpoint port; MongoDB stays on 27017 |
| `MONGO_PRIVATE_URI` | mongo | - | Private connection string |
| `MONGO_ROOT_PASSWORD` | mongo | (secret) | Superuser password, also seeds the replica-set keyfile |
| `MONGO_ROOT_USERNAME` | mongo | (secret) | Database superuser name |
| `MONGO_REPLICA_SET_NAME` | mongo | rs0 | Single-member replica set name |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/mongo`

**Category:** Automation · **Languages:** Shell, Python, Dockerfile, Smarty

[View on Railway →](https://railway.com/deploy/crawlab)
