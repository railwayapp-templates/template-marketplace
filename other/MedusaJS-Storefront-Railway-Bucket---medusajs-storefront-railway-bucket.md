# Deploy MedusaJS + Storefront (Railway Bucket) on Railway

MedusaJS + Storefront + Railway Bucket (Optimized for low-cost)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusajs-storefront-railway-bucket)

## About

This boilerplate provides a pre-configured e-commerce setup on Railway. It includes **Next.js Storefront Starter** and the **MedusaJS 2.0** backend, configured to work together out of the box.

This template automates the setup of the core services needed for a MedusaJS store. It pre-configures **PostgreSQL, Redis, and Railway Buckets** to ensure all components are connected correctly from the first deployment.

**Key Features:**

- **Pre-configured Environment**: Backend, storefront, and database are pre-linked and ready for use.
- **Updated Tech Stack**: Built with Medusa 2.0, Next.js 15 (App Router), and Tailwind CSS.
- **Integrated Railway Storage**: Uses Railway's internal Bucket system for asset storage via AssetLinker.
- **Deployment Ready**: Includes health checks, environment variable management, and build pipelines.

Suitable for prototyping, custom e-commerce projects, and production deployments that require a scalable foundation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AssetLinker | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Storefront | [georgekarapi/medusajs-railway-boilerplate](https://github.com/georgekarapi/medusajs-railway-boilerplate) (root: /storefront) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Backend | [georgekarapi/medusajs-railway-boilerplate](https://github.com/georgekarapi/medusajs-railway-boilerplate) (root: /backend) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AWS_SECRET_ACCESS_KEY` | AssetLinker | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `NEXT_PUBLIC_DEFAULT_REGION` | Storefront | de |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JWT_SECRET` | Backend | (secret) |
| `COOKIE_SECRET` | Backend | (secret) |
| `STRIPE_API_KEY` | Backend | (secret) |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@youremail.com |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) |

## Configuration

- **Start command:** `./run.sh aW1wb3J0IHsKICBTM0NsaWVudCwKICBHZXRPYmplY3RDb21tYW5kLAogIExpc3RPYmplY3RzVjJDb21tYW5kLAp9IGZyb20gIkBhd3Mtc2RrL2NsaWVudC1zMyI7CmltcG9ydCB7IGdldFNpZ25lZFVybCB9IGZyb20gIkBhd3Mtc2RrL3MzLXJlcXVlc3QtcHJlc2lnbmVyIjsKaW1wb3J0IFJlZGlzIGZyb20gImlvcmVkaXMiOwoKY29uc3QgQlVDS0VUX05BTUUgPSBwcm9jZXNzLmVudi5BV1NfUzNfQlVDS0VUX05BTUU7CmNvbnN0IFJFRElTX1VSTCA9IHByb2Nlc3MuZW52LlJFRElTX1VSTDsKCi8vIEhvdyBsb25nIHRoZSBTMyBVUkwgaXMgdmFsaWQgKGluIHNlY29uZHMpCmNvbnN0IFVSTF9FWFBJUkFUSU9OID0gNjA0ODAwOyAvLyA3IGRheXMKY29uc3QgQ0FDSEVfVFRMID0gVVJMX0VYUElSQVRJT04gLSAxMDA7CmNvbnN0IEJST1dTRVJfQ0FDSEVfVFRMID0gNjAwOyAvLyBCcm93c2VyL0NETiBjYWNoZSBmb3IgMTAgbWlucwovLyAtLS0gQ2xpZW50cyAtLS0KCi8vIEluaXRpYWxpemUgUmVkaXMKaWYgKCFSRURJU19VUkwpIHRocm93IG5ldyBFcnJvcigiUkVESVNfVVJMIGlzIG5vdCBkZWZpbmVkIik7CmNvbnN0IHJlZGlzID0gbmV3IFJlZGlzKFJFRElTX1VSTCk7CgovLyBJbml0aWFsaXplIFMzIChSYWlsd2F5IE9iamVjdCBTdG9yYWdlIC8gTWluSU8gLyBSMiBjb21wYXRpYmxlKQpjb25zdCBzMyA9IG5ldyBTM0NsaWVudCh7CiAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfREVGQVVMVF9SRUdJT04sCiAgZW5kcG9pbnQ6IHByb2Nlc3MuZW52LkFXU19FTkRQT0lOVF9VUkwsIC8vIENydWNpYWwgZm9yIFJhaWx3YXkvUHJpdmF0ZSBidWNrZXRzCiAgY3JlZGVudGlhbHM6IHsKICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCEsCiAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSEsCiAgfSwKICBmb3JjZVBhdGhTdHlsZTogdHJ1ZSwgLy8gT2Z0ZW4gbmVlZGVkIGZvciBub24tQVdTIFMzIGltcGxlbWVudGF0aW9ucwp9KTsKCkJ1bi5zZXJ2ZSh7CiAgcG9ydDogODA4MCwKICBhc3luYyBmZXRjaChyZXEpIHsKICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7CiAgICBjb25zdCBmaWxlS2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybC5wYXRobmFtZS5zbGljZSgxKSk7CgogICAgaWYgKCFmaWxlS2V5IHx8IGZpbGVLZXkgPT09ICJmYXZpY29uLmljbyIpIHsKICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZSgiTm90IEZvdW5kIiwgeyBzdGF0dXM6IDQwNCB9KTsKICAgIH0KCiAgICB0cnkgewogICAgICBjb25zdCBjYWNoZWRVcmwgPSBhd2FpdCByZWRpcy5nZXQoYGJ1Y2tldDoke2ZpbGVLZXl9YCk7CgogICAgICBpZiAoY2FjaGVkVXJsKSB7CiAgICAgICAgY29uc29sZS5sb2coYFtDQUNIRSBISVRdICR7ZmlsZUtleX1gKTsKICAgICAgICByZXR1cm4gUmVzcG9uc2UucmVkaXJlY3QoY2FjaGVkVXJsLCAzMDIpOwogICAgICB9CgogICAgICAvLyAzLiBDYWNoZSBNaXNzOiBHZW5lcmF0ZSBTaWduZWQgVVJMCiAgICAgIGNvbnNvbGUubG9nKGBbQ0FDSEUgTUlTU10gJHtmaWxlS2V5fSAtIFNpZ25pbmcgbmV3IFVSTGApOwoKICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBHZXRPYmplY3RDb21tYW5kKHsKICAgICAgICBCdWNrZXQ6IEJVQ0tFVF9OQU1FLAogICAgICAgIEtleTogZmlsZUtleSwKICAgICAgfSk7CgogICAgICBjb25zdCBzaWduZWRVcmwgPSBhd2FpdCBnZXRTaWduZWRVcmwoczMsIGNvbW1hbmQsIHsKICAgICAgICBleHBpcmVzSW46IFVSTF9FWFBJUkFUSU9OLAogICAgICB9KTsKICAgICAgYXdhaXQgcmVkaXMuc2V0KGBidWNrZXQ6JHtmaWxlS2V5fWAsIHNpZ25lZFVybCwgIkVYIiwgQ0FDSEVfVFRMKTsKICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7CiAgICAgICAgc3RhdHVzOiAzMDIsCiAgICAgICAgaGVhZGVyczogewogICAgICAgICAgTG9jYXRpb246IHNpZ25lZFVybCEsCiAgICAgICAgICAiQ2FjaGUtQ29udHJvbCI6IGBwdWJsaWMsIG1heC1hZ2U9JHtCUk9XU0VSX0NBQ0hFX1RUTH1gLAogICAgICAgIH0sCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZXJyb3IpIHsKICAgICAgY29uc29sZS5lcnJvcigiRXJyb3Igc2lnbmluZyBVUkw6IiwgZXJyb3IpOwogICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IiLCB7IHN0YXR1czogNTAwIH0pOwogICAgfQogIH0sCn0pOwo=`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Shell, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/medusajs-storefront-railway-bucket)
