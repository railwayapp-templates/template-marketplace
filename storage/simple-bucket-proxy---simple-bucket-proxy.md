# Deploy simple-bucket-proxy on Railway

A simple Railway bucket proxy with proper cache-control headers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simple-bucket-proxy)

## About

A simple Railway bucket proxy with proper cache-control headers.

⚠️ **Warning:** This will make your bucket publicly accessible.

Standard Railway egress costs will apply, since all content is delivered by the service itself.

Any request to `/*`, where `*` represents the path to an object in the bucket, will be served by the function endpoint.

The default cache-control TTL is **1 hour**.

---

This project is a lightweight Bun function that streams the contents of a connected Railway bucket.

It serves the use case described in Railway docs here: https://docs.railway.com/guides/storage-buckets#serve-files-with-a-backend-proxy

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| simple-bucket-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `S3_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Start command:** `./run.sh aW1wb3J0IHsgSG9ubyB9IGZyb20gImhvbm8iOwppbXBvcnQgeyBjb3JzIH0gZnJvbSAiaG9uby9jb3JzIjsKaW1wb3J0IHsgUzNDbGllbnQgfSBmcm9tICJidW4iOwppbXBvcnQgeyBzdHJlYW0gfSBmcm9tICJob25vL3N0cmVhbWluZyI7Cgpjb25zdCBhcHAgPSBuZXcgSG9ubygpOwoKY29uc3QgY2xpZW50ID0gbmV3IFMzQ2xpZW50KHsKICBhY2Nlc3NLZXlJZDogQnVuLmVudi5TM19BQ0NFU1NfS0VZX0lELAogIHNlY3JldEFjY2Vzc0tleTogQnVuLmVudi5TM19TRUNSRVRfQUNDRVNTX0tFWSwKICBidWNrZXQ6IEJ1bi5lbnYuUzNfQlVDS0VULAogIGVuZHBvaW50OiBCdW4uZW52LlMzX0VORFBPSU5ULAp9KTsKCmFwcC51c2UoIi8qIiwgY29ycygpKTsKCmFwcC5nZXQoIi8qIiwgYXN5bmMgKGMpID0+IHsKICBjb25zdCBwYXRobmFtZSA9IGMucmVxLnBhdGg7CgogIGlmIChwYXRobmFtZSA9PT0gIi8iKSB7CiAgICByZXR1cm4gYy5ub3RGb3VuZCgpOwogIH0KCiAgY29uc3QgczNmaWxlID0gY2xpZW50LmZpbGUocGF0aG5hbWUpOwogIGlmICghKGF3YWl0IHMzZmlsZS5leGlzdHMoKSkpIHsKICAgIHJldHVybiBjLm5vdEZvdW5kKCk7CiAgfQoKICBjb25zdCBtZXRhID0gYXdhaXQgczNmaWxlLnN0YXQoKTsKCiAgaWYgKG1ldGEudHlwZSkgewogICAgYy5oZWFkZXIoIkNvbnRlbnQtVHlwZSIsIG1ldGEudHlwZSk7CiAgfQogIGlmIChtZXRhLmV0YWcpIHsKICAgIGMuaGVhZGVyKCJFVGFnIiwgbWV0YS5ldGFnKTsKICB9CiAgaWYgKG1ldGEubGFzdE1vZGlmaWVkKSB7CiAgICBjLmhlYWRlcigiTGFzdC1Nb2RpZmllZCIsIG1ldGEubGFzdE1vZGlmaWVkLnRvR01UU3RyaW5nKCkpOwogIH0KCiAgYy5oZWFkZXIoIkNhY2hlLUNvbnRyb2wiLCAicHVibGljLCBtYXgtYWdlPTM2MDAiKTsKCiAgcmV0dXJuIHN0cmVhbShjLCBhc3luYyAoc3RyZWFtKSA9PiB7CiAgICBhd2FpdCBzdHJlYW0ucGlwZShzM2ZpbGUuc3RyZWFtKCkpOwogIH0pOwp9KTsKCkJ1bi5zZXJ2ZSh7CiAgcG9ydDogQnVuLmVudi5QT1JUID8/IDMwMDAsCiAgZmV0Y2g6IGFwcC5mZXRjaCwKfSk7Cg==`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/simple-bucket-proxy)
