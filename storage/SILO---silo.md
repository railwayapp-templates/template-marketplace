# Deploy SILO on Railway

Self-host S3 storage — SILO, a maintained MinIO fork with full console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/silo)

## About

SILO is an S3-compatible object storage server maintained by Pigsty — a community fork of MinIO, created because the upstream repository was archived in April 2026 with no further releases, Helm charts or image updates. It keeps the S3 API, `MINIO_*` variables, metrics, headers and on-disk format unchanged, and keeps the admin console upstream had removed. This template runs it with a volume, generated root credentials, and the proxy setting that makes its access policies mean what you think.

SILO's appeal is that nothing about it is new — the protocol, variables and data format are MinIO's. The things that *have* changed are the ones that bite, because a drop-in replacement is exactly what nobody re-reads release notes for.

**Policies that worked on MinIO can fail here.** SILO tightened resource matching: a `bucket/*` grant no longer authorises twelve sensitive bucket-level writes on Allow statements, which now need `arn:aws:s3:::bucket` alongside the object pattern. Migrating existing IAM policies, expect some to stop working and fix them properly. `MINIO_API_LEGACY_BUCKET_RESOURCE_MATCH=on` restores the old behaviour as a migration control, not a setting to leave on.

**Behind Railway's proxy, every request appears to come from one address.** `aws:SourceIp` conditions and audit attribution read the client address, and behind an edge proxy that is the proxy. `MINIO_API_TRUSTED_PROXIES` makes the boundary explicit and enforceable; unset, it preserves permissive behaviour and your IP conditions evaluate against the wrong thing.

**The binary is `silo` and the client is `mcli`.** The fork renames delivery surfaces while preserving the protocol, and deliberately installs no `minio` alias. Scripts, units and runbooks invoking `minio` or `mc` need updating, even though nothing about your data or API calls does.

**One node means no erasure coding.** A single-node deployment has no redundancy — the volume is the only copy of every object. Fine for a backup target, a development bucket, or assets you can regenerate. Not a durability story for anything irreplaceable, and S3 compatibility does not change that.

**Pin a release, and do not build from main.** The project ships dated server releases while the main branch carries unreleased security, storage and console changes. Pin a published release tag, read its notes before bumping, and treat upgrades as something you schedule.

**The console is an admin surface, not a file browser.** It manages IAM, lifecycle, replication and tiering, which makes the root password the boundary around your whole storage layer. Generate it, never reuse it, and think before giving the console a public domain.

Typical cost: **~$8–20/month** for one small service at $10/GB/month RAM and $20/vCPU/month, plus $0.15/GB/month for whatever you store. SILO is AGPL-3.0 and free.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SILO | `pgsty/silo:RELEASE.2026-09-16T00-00-00Z-distroless` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MINIO_ROOT_USER` | (secret) | Root Username |
| `MINIO_ROOT_PASSWORD` | (secret) | Root Password |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/silo)
