# Deploy Garage — Self-Hosted S3 Storage, MinIO Alternative on Railway

Self-host S3-compatible storage: the lightweight MinIO replacement.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/garage-minio-alternative)

## About

Garage is the lightweight, self-hosted, S3-compatible object store built by the Deuxfleurs
collective — a single Rust binary that gives you Amazon S3's API on your own infrastructure with
zero JVM, zero cluster complexity, and zero drama. Store files in buckets, get S3 compatibility
that works with the AWS CLI, restic, Immich, Nextcloud, and any S3 SDK, and even serve static
websites directly from buckets — a feature MinIO and Ceph don't offer.

With MinIO's community edition archived and end-of-lifed in 2026, Garage has become the
**most-recommended self-hosted S3 replacement** — actively maintained (v2.3.0, in production since
2020), AGPL-3.0, and light enough to run on a Raspberry Pi. Self-host on Railway for ~$5–15/month
flat, and pay for storage you own instead of AWS S3's per-GB-plus-egress bill.

---

Every self-hosted app that needs storage — Immich, Nextcloud, restic, Mastodon, PeerTube — wants
an S3 endpoint. AWS S3 bills per GB plus egress, and MinIO, the old go-to, archived its community
edition in 2026. Garage is the lightweight replacement the community moved to: S3-compatible,
resilient, and easy to operate.

Railway runs Garage as a single service with a persistent volume and automatic HTTPS. As a compact
Rust binary with no external dependencies, it starts fast and runs cheap — set up a bucket and
access keys, and any S3 tool works against your Railway endpoint immediately.

&gt; **Two honest tradeoffs:** Garage uses full duplication rather than erasure coding, so a
&gt; multi-node replicated setup uses 3× disk per byte (fine for single-node/personal use; matters at
&gt; TB scale). And it doesn't implement S3 Object Lock, so if you rely on bucket-level immutability
&gt; for ransomware-proof restic/Kopia backups, factor that in. For most self-hosted storage needs,
&gt; neither is a blocker.

Typical cost: **~$5–15/month** on Railway depending on storage. AWS S3 charges per GB stored plus
$0.09/GB egress; Garage on Railway is flat compute plus your volume, with no egress metering and
full data ownership.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Garage S3 | [matheusac19/railway_garage_template](https://github.com/matheusac19/railway_garage_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3900 | - |
| `GARAGE_BUCKET` | my-bucket | - |
| `GARAGE_KEY_NAME` | my-admin-key | - |
| `GARAGE_ACCESS_KEY` | - | Must start with GK followed by exactly 24 hexadecimal characters (0-9, a-f), for a total length of 26 characters. |
| `GARAGE_SECRET_KEY` | (secret) | (Recommended) Create your S3 Secret Key. It must be EXACTLY 64 hexadecimal characters (letters a-f, numbers 0-9). If left blank, one will be automatically generated in the logs. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/garage-minio-alternative)
