# Deploy Directus + Cloudinary on Railway

Open-source CMS platform for building websites and internal tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9-6XyM)

## About

## Overview
Combining the utility of a Headless CMS with the power of a Backend-as-a-Service, Directus handles APIs, Auth, Admin, and more so you can focus on building amazing apps and websites.

## Features
- Instant GraphQL + REST APIs out of the box
- Granular RBAC to protect data
- Visualize data with custom dashboards
- Automate flows that trigger on actions
- Enable anyone to author content, manage media, and visualize data
- Build admin panels, manage digital experiences content, power SaaS platforms, and more

## Learn More
- [Directus](https://directus.io/)
- [Documentation](https://docs.directus.io/getting-started/introduction.html)
- [GitHub](https://github.com/kadumedim/directus-starter)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Directus | `directus/directus:10.11.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KEY` | - | Unique identifier for the project |
| `SECRET` | (secret) | Secret string for the project. |
| `DB_CLIENT` | pg | Database client to use |
| `EMAIL_FROM` | no-reply@example.com | Email address from which emails are sent |
| `PUBLIC_URL` | - | Public URL |
| `ADMIN_EMAIL` | - | First Admin user email |
| `CACHE_ENABLED` | true | Whether or not data caching is enabled |
| `ADMIN_PASSWORD` | (secret) | First Admin user password |
| `AUTH_PROVIDERS` | local | A comma-separated list of auth providers |
| `EXTENSIONS_PATH` | /directus/data/extensions | Path to your local extensions folder. |
| `AUTH_LOCAL_DRIVER` | local | Which driver to use |
| `STORAGE_LOCATIONS` | cloudinary | A CSV of storage locations to use |
| `WEBSOCKETS_ENABLED` | true | - |
| `DB_CONNECTION_STRING` | - | Database connection string for pg |
| `EMAIL_TEMPLATES_PATH` | /directus/data/templates | Path to email templates folder. |
| `STORAGE_CLOUDINARY_API_KEY` | (secret) | Cloudinary API Key |
| `STORAGE_CLOUDINARY_DRIVER	` | cloudinary | Cloudinary storage driver |
| `STORAGE_CLOUDINARY_API_SECRET` | (secret) | Cloudinary API secret |
| `STORAGE_CLOUDINARY_CLOUD_NAME` | - | Cloudinary Cloud Name |
| `STORAGE_CLOUDINARY_ACCESS_MODE` | public | Access mode, can be public or authenticated |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/9-6XyM)
