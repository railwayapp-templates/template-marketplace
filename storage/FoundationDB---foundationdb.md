# Deploy FoundationDB on Railway

[Updated Jul 2026] Apple's distributed ordered key-value store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/foundationdb)

## About

FoundationDB is a distributed, ordered key-value store originally built and now open-sourced by Apple. It offers strict serializable ACID transactions across the entire keyspace, automatic sharding and replication, and is famously the database that powers Apple's iCloud — alongside Snowflake's metadata layer, IBM Db2 on Cloud, and storage backends like JanusGraph and Tigris.

  ## About Hosting FoundationDB

  FoundationDB is normally operated as a multi-machine cluster — a coordinator quorum, replicated storage roles, dedicated transaction logs — which is overkill for development environments, side projects, or small production workloads. This template runs a single-node FoundationDB instance from the official upstream Docker image, with a persistent volume so your data survives redeploys and container replacements. A small entrypoint discovers the container's current IPv4 on every boot, rewrites the coordinator address in the cluster file, and on the very first boot only runs `configure new single ssd-2` to initialise the database. One click, no compilation, no configuration files to hand-edit, cold start to a usable database in roughly 10 seconds.

  ## Common Use Cases

  - Transactional key-value backend for a Railway-hosted app that wants real ACID guarantees without operating a cluster
  - Local-feeling development environment against a real FoundationDB — same client libraries, same wire protocol, no SQLite stand-ins
  - Metadata or coordination store for systems built on FDB layers (Stalwart Mail Server, JanusGraph, Tigris, custom record-layer apps)

  ## Dependencies for FoundationDB Hosting

  - A Railway persistent volume mounted at `/var/fdb/data` (provisioned automatically by this template)
  - Railway private networking so other services in the same project can resolve the coordinator over internal DNS


  ### Implementation Details

  Built from `foundationdb/foundationdb:7.3.63`. The entrypoint script handles every pDB normally expects an operator to do: it picks the current container IPv4, writes acluster file whose coordinator
   address matches `--public-address`, starts `fdbserver` with the SSD storage engine,etects a fresh volume and runs `configure new single ssd-2`. A storage-file marker on the volume prevents re-initialisation on later boots, so your data is safe across redeploys, scaling events, and Railway-side container replacements.

  Client services in the same project connect by referencing a single variable — `${{FoundationDB.FDB_CONNECTION_STRING}}` — which resolves to a full cluster string using Railway's private DNS. No port forwarding, no Compose files, no manual cluster-file plumbing.

  ## Why Deploy FoundationDB on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying FoundationDB on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway. can you help it add it here as faq or stuff so peopel can see it directly also in rialway

Yes — here's a fixed, FAQ-extended version. I also patched a small typo in Implementation Details ("every pDB" → readable sentence) where text looks to have been clobbered:                     er replacements. A small entrypoint discovers the container's current IPv4 on every boot, rewrites the coordinator address in the cluster file, and on the very first boot only runs `configure new single ssd-2` to initialise the database. One click, no compilation, no configuration files to hand-edit, cold start to a usable database in roughly 10 seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FoundationDB | [ramadanomar/foundationdb-singlenode-railway-template](https://github.com/ramadanomar/foundationdb-singlenode-railway-template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FDB_PORT` | 4500 |
| `FDB_FORCE_INIT` | 0 |
| `FDB_PROCESS_CLASS` | unset |
| `FDB_STORAGE_ENGINE` | ssd-2 |

## Configuration

- **TCP Proxies:** 4500
- **Volume:** `/var/fdb/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/foundationdb)
