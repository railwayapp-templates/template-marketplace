# Deploy Nextcloud on Railway

Nextcloud server on Railway!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/LddOJ1)

## About

Tired of Google, OneDrive, Dropbox? Why not use Nextcloud on Railway to store all your files!

This template will automatically set you up for success with Nextcloud.

### Environment Variable Configuration
- `PORT` should be set to 80. Anything else and it won't work
- `SQLITE_DATABASE` you can give this any name you want with the `.db` file extension.
- `NEXTCLOUD_TRUSTED_DOMAINS` (not set by default) Optional space-separated list of domains

If there are any issues with it, just let me know in the Railway Discord, and I'll gladly fix them!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nextcloud | `nextcloud` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Should be 80! |
| `SQLITE_DATABASE` | nextcloud.db | Name of SQLite for authentication features |
| `TRUSTED_PROXIES` | 100.0.0.0/8 | List of trusted proxies |
| `OVERWRITEPROTOCOL` | https | - |
| `OBJECTSTORE_S3_KEY` | - | AWS style access key |
| `OBJECTSTORE_S3_SSL` | true | (default: true): Whether or not SSL/TLS should be used to communicate with object storage server |
| `OBJECTSTORE_S3_HOST` | - | The hostname of the object storage server |
| `OBJECTSTORE_S3_PORT` | - | The port that the object storage server is being served over |
| `OBJECTSTORE_S3_BUCKET` | - | The name of the bucket that Nextcloud should store the data in |
| `OBJECTSTORE_S3_REGION` | - | The region that the S3 bucket resides in. |
| `OBJECTSTORE_S3_SECRET` | (secret) | AWS style secret access key |
| `NEXTCLOUD_TRUSTED_DOMAINS` | - | Optional space-separated list of domains |
| `OBJECTSTORE_S3_AUTOCREATE` | true | (default: true): Create the container if it does not exist |
| `OBJECTSTORE_S3_LEGACYAUTH` | false | (default: false): Not required for AWS S3 |
| `OBJECTSTORE_S3_OBJECT_PREFIX` | urn:oid | (default: urn:oid:): Prefix to prepend to the fileid |
| `OBJECTSTORE_S3_USEPATH_STYLE` | false | (default: false): Not required for AWS S3 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other

[View on Railway →](https://railway.com/template/LddOJ1)
