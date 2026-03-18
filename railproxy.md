# Deploy Railway Bucket Proxy on Railway

Expose your Railway bucket publicly in second!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railproxy)

## About

railproxy is a lightweight proxy layer that exposes your Railway Bucket (or any S3-compatible storage) through a simple public endpoint. With just a few environment variables, you can instantly make your bucket content accessible on the web without revealing your actual storage credentials or internal endpoints.

Hosting railproxy on Railway is fast, flexible, and requires minimal setup. Once you provide your bucket’s S3 credentials and endpoint as environment variables, railproxy handles the rest, routing public HTTP requests directly to objects in your storage bucket. Deployment can be done with a single click, and Railway handles all the underlying infrastructure, scaling, and logging. This makes railproxy ideal for serving static files, assets, or downloads without spinning up complex S3 configurations or custom CDNs. You manage your bucket; railproxy exposes it securely and reliably.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pxseu/railproxy | `pxseu/railproxy` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PREFIX` | /.* | Regex to match against to publicly expose, can be multiple comma separated |
| `S3_BUCKET` | - | The bucket id, usually labelled as `${{_RAILWAY_NAME_HERE_.BUCKET}}` |
| `S3_REGION` | auto | Region id, defaults to auto |
| `S3_ENDPOINT` | https://storage.railway.app | Railway S3_ENDPOINT |
| `LIST_DIRECTORIES` | false | List directories upon reaching them |
| `S3_ACCESS_KEY_ID` | - | Access Key Id to the bucket, usually labelled as `${{_RAILWAY_NAME_HERE_.ACCESS_KEY_ID}}` |
| `S3_SECRET_ACCESS_KEY` | (secret) | The bucket Secret Access Key, usually labelled as `${{_RAILWAY_NAME_HERE_.SECRET_ACCESS_KEY}}` |

**Category:** Storage

[View on Railway →](https://railway.com/template/railproxy)
