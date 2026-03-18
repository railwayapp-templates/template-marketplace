# Deploy ConvertX on Railway

Self-hosted online file converter supporting over 1,000 formats

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convertx)

## About

**ConvertX** is a self-hosted online file converter supporting over 1,000 different formats. Built with TypeScript, Bun, and Elysia, it features multi-file processing, password protection, and support for multiple user accounts.

### Deployment Steps

1.  After the app is deployed, click on the ConvertX deployment and then click on the pre-generated URL.
2.  You should see a “Welcome!” page — create an account to finish deployment!

If you see a Railway error page instead, it's likely Railway hasn't automatically added the port to your domain. Go to Settings → Networking, click the Edit button next to the domain and click "edit port", then select or enter port `3000`.

If you wish to use a custom domain, you simply need to click on the deployment, go to Settings → Networking and click on the **\+ Custom Domain** button. Enter your domain and select or enter port `3000`.

### Post-Deployment Steps

The first account created has admin privileges, so create it immediately after deployment to secure your instance.

All data is stored in the attached volume, so keep an eye on usage. If the volume becomes full, you may run into errors. You can adjust the size of the volume, or reduce the `AUTO_DELETE_EVERY_N_HOURS` environment variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ConvertX | `ghcr.io/c4illin/convertx` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Used to help Railway auto-detect the port; not changeable. |
| `LANGUAGE` | en | Language to format date strings in, specified as a BCP 47 language tag |
| `JWT_SECRET` | (secret) | A long and secret string used to sign the JSON Web Token |
| `HIDE_HISTORY` | false | Hide the history page |
| `ACCOUNT_REGISTRATION` | false | Allow users to register accounts |
| `ALLOW_UNAUTHENTICATED` | false | Allow unauthenticated users to use the service, only set this to true locally |
| `AUTO_DELETE_EVERY_N_HOURS` | 24 | Checks every n hours for files older then n hours and deletes them, set to 0 to disable |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convertx)
