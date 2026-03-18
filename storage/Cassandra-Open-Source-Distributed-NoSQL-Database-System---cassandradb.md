# Deploy Cassandra (Open-Source Distributed NoSQL Database System) on Railway

Cassandra [Mar ’26] (Manage Massive Data with High Availability) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cassandradb)

## About

Apache Cassandra is a highly scalable, open-source NoSQL database designed to handle massive amounts of data across distributed systems. It offers exceptional performance, fault tolerance, and high availability without compromising speed. With Cassandra, you can manage large-scale data operations with zero downtime and unmatched scalability. Available on GitHub, it is trusted by major organizations like Netflix, Uber, and Instagram for mission-critical applications.

* * *

Hosting Cassandra on Railway allows developers to enjoy a simple yet powerful way to manage distributed databases. By self-hosting Cassandra, you gain full control over your data architecture and configurations while leveraging Railway’s modern cloud infrastructure for automation and reliability.

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cassandra | `cassandra:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MAX_HEAP_SIZE` | 4G |

## Configuration

- **TCP Proxies:** 9042
- **Volume:** `/var/lib/cassandra`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cassandradb)
