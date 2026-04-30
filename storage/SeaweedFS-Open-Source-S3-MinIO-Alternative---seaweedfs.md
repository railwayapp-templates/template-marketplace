# Deploy SeaweedFS | Open Source S3, MinIO Alternative on Railway

Self Host SeaweedFS. Object storage with S3 compatibility & full S3 API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seaweedfs)

## About

Deploy SeaweedFS as a self-hosted S3-compatible object storage system on Railway with one click. SeaweedFS is a distributed file system optimized for storing and serving billions of files with O(1) disk seek — making it ideal for media storage, backups, and any application that speaks the S3 protocol.

This Railway template pre-configures SeaweedFS with master, volume server, filer, and S3 gateway running as a single service. It includes persistent volume storage, S3 authentication with access/secret keys, and a public endpoint ready for S3 client connections.

SeaweedFS is an open-source (Apache 2.0) distributed file system inspired by Facebook's Haystack paper. It solves the "billions of small files" problem that traditional file systems and object stores handle poorly — each file requires only 40 bytes of metadata overhead and a single O(1) disk read to serve.

Key features:

- Full Amazon S3 API compatibility (buckets, multipart uploads, versioning, lifecycle policies, object lock)
- WebDAV support for mounting as a network drive
- POSIX FUSE mount for local directory access
- Cloud tiering to AWS S3, Google Cloud, Azure, and BackBlaze
- Erasure coding (10.4) for cost-efficient warm storage
- Filer metadata backed by LevelDB, MySQL, Postgres, Redis, or 10+ other stores
- Cross-datacenter active-active async replication
- Kubernetes CSI driver for persistent volumes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SeaweedFS | `chrislusf/seaweedfs:4.22` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8333 | S3 gateway listening port |
| `S3_ACCESS_KEY` | - | S3 authentication access key |
| `S3_SECRET_KEY` | (secret) | S3 authentication secret key |

## Configuration

- **Start command:** `/bin/sh -c 'weed server -s3 -dir=/data -ip.bind=0.0.0.0 -master.volumeSizeLimitMB=1024 & sleep 30 && echo "s3.configure -access_key=$S3_ACCESS_KEY -secret_key=$S3_SECRET_KEY -user admin -actions Admin,Read,Write,List,Tagging -apply" | weed shell; wait'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/seaweedfs)
