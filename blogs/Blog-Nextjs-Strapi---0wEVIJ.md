# Deploy Blog (Next.js + Strapi) on Railway

A production-ready blog built with Next.js 14 and Strapi CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0wEVIJ)

## About

# Blog: Next.js + Strapi 

A production-ready blog built with **Nextjs 14** (App Router, RSC) and **Strapi CMS** configured to host files in a S3 Bucket

## Important:

It's optional to add the AWS S3 variables, the deployment will complete, but the files will be saved in the deployment file system, therefore, if you update or redeploy the Strapi Admin, **the files will be lost**.

To make Strapi host the files in a S3 Bucket, [follow the instructions of this post](https://strapi.io/blog/how-to-set-up-amazon-s3-upload-provider-plugin-for-our-strapi-app). You can jump to the **Set up AWS** since the project is already configured. You only need to create a bucket, an user and give it the permissions to manage the bucket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Strapi Admin | [bmarianome/strapi-blog-railway-template](https://github.com/bmarianome/strapi-blog-railway-template) | Web service |
| Next.js Blog | [bmarianome/next-blog-railway-template](https://github.com/bmarianome/next-blog-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Strapi Admin | 0.0.0.0 | - |
| `PORT` | Strapi Admin | 1337 | - |
| `AWS_BUCKET` | Strapi Admin | - | The name of your S3 bucket |
| `AWS_REGION` | Strapi Admin | - | The region where your S3 Bucket is. Example: "us-east-1" |
| `JWT_SECRET` | Strapi Admin | (secret) | - |
| `DATABASE_SSL` | Strapi Admin | false | - |
| `API_TOKEN_SALT` | Strapi Admin | (secret) | - |
| `DATABASE_CLIENT` | Strapi Admin | postgres | - |
| `ADMIN_JWT_SECRET` | Strapi Admin | (secret) | - |
| `AWS_ACCESS_KEY_ID` | Strapi Admin | - | The "Access key" that AWS provides when you create an Access key in an IAM User |
| `AWS_ACCESS_SECRET` | Strapi Admin | (secret) | The "Secret access key" that AWS provides when you create an Access key in an IAM User |
| `TRANSFER_TOKEN_SALT` | Strapi Admin | (secret) | - |
| `BLOG_TITLE` | Next.js Blog | My Blog | - |
| `FAVICON_URL` | Next.js Blog | https://bmariano.me/favicon.png | - |
| `BLOG_DESCRIPTION` | Next.js Blog | This is my new blog! | - |
| `AWS_BUCKET_HOSTNAME` | Next.js Blog | - | Next.js requires to specify the sources of the images to optimize them. This will be added to the next.config.js file. |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/0wEVIJ)
