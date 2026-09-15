# Deploy bureaucat on Railway

Task and approval workflow manager with Postgres and uploads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bureaucat)

## About

[Bureaucat](https://github.com/bureaucatorg/bureaucat) is a no-nonsense open-source task and approval workflow manager. It ships as a single Go binary with an embedded frontend, PostgreSQL-backed storage, JWT auth, and S3-compatible file uploads.

This template deploys `codingcoffee/bureaucat:v0.16.15` with managed PostgreSQL and SeaweedFS (S3 API on port 8333) for uploads. The app runs `bureaucat serve --migrate` on port 1341. Bureaucat requires path-style S3, which SeaweedFS provides. Set `JWT_SECRET` carefully; database and object-store wiring are prefilled over Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seaweedfs | `chrislusf/seaweedfs:3.80` | Database |
| bureaucat | `codingcoffee/bureaucat:v0.16.15` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MINIO_ROOT_USER` | seaweedfs | (secret) |
| `MINIO_ROOT_PASSWORD` | seaweedfs | (secret) |
| `JWT_SECRET` | bureaucat | (secret) |
| `FILES_BUCKET_SECRET_ACCESS_KEY` | bureaucat | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'weed server -dir=/data -s3 -ip.bind=0.0.0.0 -master.volumeSizeLimitMB=100 & for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do sleep 2; echo "s3.bucket.create -name bureaucat" | weed shell -master=localhost:9333 && break; done; wait'`
- **Volume:** `/data`
- **Start command:** `./bureaucat serve --migrate`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bureaucat)
