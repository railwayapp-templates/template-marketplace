# Deploy Zipline on Railway

 A ShareX/file upload server that is easy to use, packed with features!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vBGKg3)

## About

<div align="center">
  <img src="https://raw.githubusercontent.com/diced/zipline/trunk/public/zipline_small.png">

A ShareX/file upload server that is easy to use, packed with features, and with an easy setup!
</div>

## Features
- Configurable
- Fast
- Built with Next.js &amp; React
- Token protected uploading
- Image uploading
- Image compression
- Password Protected Uploads
- URL shortening
- Text uploading
- URL Formats (uuid, dates, random alphanumeric, original name, zws, gfycat -&gt; [animals](https://assets.gfycat.com/animals) [adjectives](https://assets.gfycat.com/adjectives))
- Discord embeds (OG metadata)
- Gallery viewer, and multiple file format support
- Code highlighting
- Fully customizable Discord webhook notifications
- OAuth2 registration (Discord and GitHub)
- Two-Factor authentication with Google Authenticator, Authy, etc (totp services).
- User invites
- File Chunking (for large files)
- File deletion once it reaches a certain amount of views
- Automatic video thumbnail generation

### Default Credentials
The default credentials are "administrator" and "password". Once you login please immediately change the details to something more secure. You can do this by clicking on the top right corner where it says "administrator" with a gear icon and clicking Manage Account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Zipline | `ghcr.io/diced/zipline` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Zipline | 3000 | - |
| `CORE_HOST` | Zipline | 0.0.0.0 | - |
| `CORE_PORT` | Zipline | 3000 | - |
| `CORE_SECRET` | Zipline | (secret) | - |
| `WEBSITE_TITLE` | Zipline | - | The title of the website. This will change anything that says "Zipline", into your name of choice. |
| `CORE_RETURN_HTTPS` | Zipline | false | - |
| `DATASOURCE_S3_PORT` | Zipline | - | The port for your S3 source, if you want to connect to your locally hosted S3 (Example: Local Minio instance) |
| `DATASOURCE_S3_BUCKET` | Zipline | - | The name of the bucket to save files to. |
| `DATASOURCE_S3_REGION` | Zipline | - | The region to connect to the S3 bucket, if using a custom S3 provider they might use the default us-east-1 region so you can leave this field as is, or if they use a different region you can set it here. |
| `DATASOURCE_S3_USE_SSL` | Zipline | - | Whether or not to use SSL when connecting to the S3 bucket. |
| `DATASOURCE_S3_ENDPOINT` | Zipline | - | The endpoint for your S3 region, if your S3 bucket was created in us-west-2, then the endpoint would look like s3.us-west-2.amazonaws.com, etc. If using a different S3 provider they will usually provide these details. |
| `WEBSITE_EXTERNAL_LINKS` | Zipline | - | External links to show on the sidebar, see https://zipline.diced.sh/docs/guides/external-links. |
| `DATASOURCE_LOCAL_DIRECTORY` | Zipline | /zipline/uploads | - |
| `DATASOURCE_S3_ACCESS_KEY_ID` | Zipline | - | The access key id for your Amazon AWS account, or if using a different S3 provider they will usually provide these details. |
| `DATASOURCE_S3_FORCE_S3_PATH` | Zipline | - | Whether or not to force the path to be s3://bucket/path/to/file. |
| `DATASOURCE_S3_SECRET_ACCESS_KEY` | Zipline | (secret) | The secret access key for your Amazon AWS account, or if using a different S3 provider they will usually provide these details. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zipline/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/vBGKg3)
