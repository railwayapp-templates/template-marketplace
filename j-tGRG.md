# Deploy Vince Analytics on Railway

Cost effective, self-hosted website analytics, based on Plausible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/j-tGRG)

## About

# Vince Analytics Template

This template allows you to deploy Vince Analytics on Railway with minimal configuration.

**Why is this cool?**: Analytics services like Plausible require expensive to run dependencies like Clickhouse, which is overkill for most users. Vince Analytics is a lightweight alternative that runs on a single server, a Go binary that takes advantages of optimized storage technologies like roaring bitmaps.

You can save _lots_ of money by using Vince Analytics instead of other analytics services if it's capable enough for your use case.

## Deployment Steps

1. **Deploy on Railway**  
   Click the button below to deploy:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/j-tGRG?referralCode=1Apk1r)

2. **Configure Environment Variables**  
   When deploying, set the following environment variables in the Railway dashboard, when prompted to during template deployment:

   - `VINCE_ADMIN_NAME`: The admin username for Vince Analytics.
   - `VINCE_ADMIN_PASSWORD`: The admin password for Vince Analytics, this is what you'll use to log in.

3. **Access the Vince Analytics Dashboard**  
   Once the deployment is complete, a Railway managed domain with SSL and a subdomain will be generated to access Vince Analytics.

4. **Login**  
   Use the credentials you configured in the environment variables to log in. You'll usually just be prompted for the password.

You'll then be able to add a domain for tracking, prompting you to add a tracking code to your website. Once a domain is added, you'll be able to view your data in the dashboard.

![Vince Analytics Dashboard](https://raw.githubusercontent.com/gillkyle/vince-analytics-template/main/assets/analytics.png)

---

## Notes

- Railway automatically manages container restarts and scaling.
- A volume is mounted to the container to persist data between server restarts.
- To change your admin credentials, you'll need to update the environment variables in the Railway dashboard and redeploy.

For further information about Vince Analytics, visit the [official website](https://vinceanalytics.com).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vince-analytics-template | [gillkyle/vince-analytics-template](https://github.com/gillkyle/vince-analytics-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VINCE_URL` | - | This URL is what represents the running Vince Analytics service. It gets pre-filled in forms in the Admin UI when you are fetching your own tracking script. |
| `VINCE_ADMIN_NAME` | admin | This is the name of the admin user, since only a single admin user can be created its not necessary to use a name other than something easy like "admin". |
| `VINCE_ADMIN_PASSWORD` | (secret) | This is sensitive and should be protected, it's what you'll use to log in as the admin user. Can be set to whatever you like. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/vince-data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/j-tGRG)
