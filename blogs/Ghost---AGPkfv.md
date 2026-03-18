# Deploy Ghost on Railway

Deploy Ghost to Railway with ease. Almost no configuration needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/AGPkfv)

## About

No configuration is needed to spin up your Ghost blog with persistent volumes. You can go to URL attached to the "ghost" service to see it in action.

After deployment, you probably want to change the URL of your blog. You can do so by changing the `URL` environment variable to whatever your URL is on the `ghost` service. Redeploy your service to propagate the changes.

Do not worry! Your blogs, uploaded themes and images will still be available after redeployment due to the use of Docker volumes. Happy blogging!

Are you happy with this template? Please share your thoughts on [my blog](https://blog.weijland.it/deploying-ghost-on-railway-with-ease/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `mysql:8.0` | Database |
| ghost | `ghost:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_ROOT_PASSWORD` | db | (secret) | - |
| `url` | ghost | - | The URL via which the blog will be accessible. Example: https://myblog.com |
| `PORT` | ghost | 2368 | - |
| `database__client` | ghost | mysql | - |
| `database__connection__host` | ghost | db | - |
| `database__connection__user` | ghost | (secret) | - |
| `database__connection__database` | ghost | ghost | - |
| `database__connection__password` | ghost | (secret) | It's to be advised to change this password to one more complex. Make sure you update the password on the database service to the same string you enter here. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** Blogs

[View on Railway →](https://railway.com/template/AGPkfv)
