# Deploy Umbraco on Railway

.NET content management system for building and editing websites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umbraco)

## About

Umbraco CMS is an open-source .NET content management system used by marketing teams, agencies and product companies to run editorial websites on infrastructure they control. Editors work in a backoffice built around a content tree, document types and reusable blocks; developers build the front end in Razor, or consume the built-in Delivery API from Next.js, Astro or a mobile app. Self-host Umbraco when you want a mature CMS without a per-seat licence and without your content in someone else's database.

Deploy Umbraco on Railway and you get one service, named `umbraco`, built from a public GitHub repository and backed by a persistent volume. The volume holds the content database, media, search indexes, encryption keys and the templates the backoffice writes to disk, so everything survives a redeploy. Umbraco installs itself on first boot from the administrator email and password you supply — no setup wizard, and no public sign-up to lock down afterwards. Traffic goes from Railway's edge straight to the app on port 8080.

![Umbraco service and its data volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788463485/umbraco-cms-architecture.png)

Umbraco is a CMS you build on rather than a finished website. You model content as document types with strongly typed properties, compose pages from block lists and grids, and render them with Razor views you control. It has been developed in the open since 2004 and is MIT licensed, with a large package ecosystem.

Key features:

- A content tree with drafts, scheduled publishing, versioning and rollback
- Document types, compositions and block-based editors
- A media library with image cropping and focal points
- A read-only **Delivery API** for headless and hybrid front ends
- Backoffice editing of templates, partial views, stylesheets and scripts
- Users, groups and granular permissions, plus a members system
- Multilingual content through cultures and per-property variance

The Railway deployment is deliberately a single service: Umbraco's database, media, search indexes and editable templates all live on one attached volume, so a redeploy replaces the container without touching your content.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umbraco | [gridalpha/umbraco-railway](https://github.com/gridalpha/umbraco-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway health-checks |
| `DATA_DIR` | /data | Volume mount path used by the entrypoint |
| `ASPNETCORE_HTTP_PORTS` | 8080 | Kestrel listening port |
| `Umbraco__CMS__Imaging__HMACSecretKey` | (secret) | Signs generated image URLs |
| `Umbraco__CMS__Hosting__MachineIdentifier` | railway | Stable instance id, keeps search indexes |
| `Umbraco__CMS__Unattended__UnattendedUserName` | (secret) | First backoffice user's display name |
| `Umbraco__CMS__Unattended__UnattendedUserEmail` | admin@example.com | First backoffice user's email |
| `Umbraco__CMS__WebRouting__UmbracoApplicationUrl` | - | Public base URL, required in production mode |
| `Umbraco__CMS__Unattended__UnattendedUserPassword` | (secret) | First backoffice user's password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Shell, C#, HTML, Dockerfile, TSQL

[View on Railway →](https://railway.com/deploy/umbraco)
