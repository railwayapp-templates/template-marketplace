# Deploy Deno KV on Railway

DenoKV is a fast, simple key-value DB for persistent storage in Deno apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdi8HH)

## About

DenoKV is a built-in key-value database designed for the Deno runtime, allowing developers to store and retrieve simple data structures in a persistent and scalable manner. It supports both local and remote databases, making it flexible for various application needs. With a minimalistic API and seamless integration into Deno, DenoKV is ideal for projects requiring fast and efficient data storage.

### How to Connect with a Custom URL

To connect to a DenoKV instance using a custom URL, use the following example:

```typescript
// Connect to the DenoKV instance using a custom URL
const kv = await Deno.openKv("http://denokv.railway.internal");

// Set a value with the specified key
await kv.set(["key"], "value");

// Retrieve and log the value associated with the key
console.log(await kv.get(["key"])); // Output: value
```

### Public Access on Railway

**Note:** To make your DenoKV instance publicly accessible, you need to add a custom domain on Railway. This step ensures external applications can interact with your DenoKV instance. You can configure this by setting up a custom domain within your Railway project settings and pointing it to your DenoKV service. This allows for easy public access to your database via the provided URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| denokv | `ghcr.io/denoland/denokv:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DENO_KV_SQLITE_PATH` | /data/denokv.sqlite3 | SQLite Path |
| `DENO_KV_ACCESS_TOKEN` | (secret) | Access Token |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/qdi8HH)
