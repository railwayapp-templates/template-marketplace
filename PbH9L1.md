# Deploy SeaweedFS on Railway

S3 Compatible Server ontop SeaweedFS (Apache-2.0 license)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/PbH9L1)

## About

Minio is nice but is AGPL licensed, which is a no-go for any commercial project. If you still want to use S3-compatible API and store files SeaweedFS is your savior.

### Setup:
- Make sure to add port 8333 as a binding to your HTTP networking for it to work.
![image](https://github.com/user-attachments/assets/a55d0a4b-2eb0-463c-b00e-62106cc135c6)


Taken from official docker image:
https://hub.docker.com/r/chrislusf/seaweedfs

More reference links:
https://github.com/seaweedfs/seaweedfs/wiki/Amazon-S3-API

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SeaweedFS | `chrislusf/seaweedfs` | Database |

## Configuration

- **Start command:** `weed server -s3 -dir /data`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/PbH9L1)
