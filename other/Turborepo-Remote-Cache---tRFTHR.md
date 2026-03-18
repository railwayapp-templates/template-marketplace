# Deploy Turborepo Remote Cache on Railway

Open source implementation of the Turborepo custom remote cache server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tRFTHR)

## About

# 🚂 Self-Hosted Turborepo Remote Cache on Railway

Deploy a secure, self-hosted Turborepo remote cache on Railway with just a few clicks. This alternative provides you full control over your build cache infrastructure. 🔒

## Setup Guide 

### 1. Deploy to Railway with One Click 🎯  
Deploy to Railway by clicking the big purple `Deploy Now` button 

### 2. Configure Turborepo Project 🛠️

After deploying, you'll need to configure your Turborepo project to use the new remote cache:

1. Open your Railway project we just deployed
2. Select the service with the Turborepo logo
3. Navigate to the "Variables" tab
4. Copy these required environment variables:
  - `TURBO_TOKEN`: Authentication token
  - `TURBO_API_URL`: Remote cache endpoint

### 3. Update Turborepo Configuration 📝

Time to modify your code to use the remote cache, but trust me, it's easy.  
Set the following environment variables that you copied from the Railway project we just deployed:

```properties
# When deploying your code on the same Railway project as this template, you can use ${{"Turborepo Remote Cache".TURBO_TOKEN}}
TURBO_TOKEN={TURBO_TOKEN}
# When deploying your code on the same Railway project as this template, you can use ${{"Turborepo Remote Cache".TURBO_API_URL}}
TURBO_API={TURBO_API_URL}
# Leave this as is
TURBO_TEAM=railway-remote-cache
```

And in case you prefer `.env` file instead of filling out those env variables in your shell everytime, you can use the `dotenv-cli` package.  
Modify the `build` script in your `package.json` root to include the following:

```bash
dotenv -e .env -- turbo build
```

### 4. Use Remote Cache 🎉

Run your Turborepo commands as normal. The remote cache will be automatically utilized:

```bash
turbo build
```
You can verify the remote cache is working by checking your Turborepo build logs. When successful, you'll see:

```
Remote caching enabled
```

## Troubleshooting 🔍

### Common Issues
- Verify Railway deployment is running and accessible
- Double-check that your token and API URL are correctly configured
- Test the setup using the [example reference project](https://github.com/ThallesP/remote-cache-railway) to validate configuration and rule out any potential template-specific issues

### Need More Help?
Join Railway's [Discord community](https://discord.gg/railway) for additional support and troubleshooting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Turborepo Remote Cache | `ducktors/turborepo-remote-cache` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TURBO_TOKEN` | (secret) | Your authentication token |
| `STORAGE_PATH` | /app/storage | Where the cache will be saved |
| `TURBO_API_URL` | - | The URL of the remote cache |
| `STORAGE_PROVIDER` | local | The type of storage. Possible values are `local`, `s3`, `google-cloud-storage` or `azure-blob-storage` |
| `STORAGE_PATH_USE_TMP_FOLDER` | false | Uses the system tmp folder as a prefix to `STORAGE_PATH` |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tRFTHR)
