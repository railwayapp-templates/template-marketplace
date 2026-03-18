# Deploy LaunchPad [Strapi Starter] on Railway

new & improved strapi official demo app, deployed in 1 click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/84HU7D)

## About

LaunchPad: The new Official Strapi Demo App
LaunchPad isn’t just an upgrade to Strapi 5 and Nextjs 14 —it’s a complete redesign of the frontend with TailwindCSS and Aceternity. Built with a cleaner structure and more modern UI components LaunchPad gives you a great overview of what using Strapi looks and feels like for backend, frontend development and content management. Whether you're new to Strapi or have been using it for a while, LaunchPad will help you better understand how Strapi can adapt to fit projects of all sizes.

What LaunchPad Offers and How It Improves on FoodAdvisor
LaunchPad is packed with essential features to help you explore Strapi, along with several key improvements over FoodAdvisor. Here’s what you can expect:

What’s Included in LaunchPad:
Pre-configured Strapi setup: LaunchPad is ready to use out of the box, with everything you need to get started, from content creation to API interactions.
Complete content workflows: It comes with built-in demonstrations of Strapi’s collection and single types, components, dynamic zones, internationalization (i18n), and media library. Everything is pre-configured so you can explore without any extra setup.
Role-based access control (RBAC): Manage user permissions with ease, simulating how you would control access in a real-world application.
Internationalization (i18n): Create and manage content in multiple languages and regions, with pre-configured examples to show you how it works in practice.
What’s Improved Over FoodAdvisor:
New Strapi 5 Features: LaunchPad introduces key updates like Content History, letting you easily track changes and revert to previous versions of your content. The upgraded Draft & Publish system allows for smoother content management—work on drafts and only publish when everything’s ready. These tools give you more control over your workflow, making revisions and publishing simpler.
Rebuilt Next.js Application: We've reworked the demo app using the Aceternity UI to show what a Strapi-powered site can really do. In collaboration with Manu Arora, founder of Aceternity , we built a brand-new frontend with a theme that better reflects Strapi today. This custom app connects seamlessly with Strapi to power the new official Strapi 5 demo.
100% TypeScript: Unlike FoodAdvisor which is full JavaScript, LaunchPad is fully written in TypeScript as it's based on Strapi 5 which has moved from being written in plain JavaScript to being almost entirely TypeScript.
These updates make LaunchPad a more powerful, flexible, and practical demo for developers who want to see Strapi’s full capabilities in action.

And the best part is that it's fully open source. Check out the LaunchPad repository on GitHub and feel free to give it a ⭐ if you like what you see!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LaunchPad-Frontend | [strapi/LaunchPad](https://github.com/strapi/LaunchPad) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Strapi Admin | [strapi/LaunchPad](https://github.com/strapi/LaunchPad) (root: /strapi/) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | LaunchPad-Frontend | 3000 | - |
| `PREVIEW_SECRET` | LaunchPad-Frontend | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | Strapi Admin | 0.0.0.0 | - |
| `PORT` | Strapi Admin | 1337 | - |
| `APP_KEYS` | Strapi Admin | toBeModified1,toBeModified2 | - |
| `JWT_SECRET` | Strapi Admin | (secret) | - |
| `API_TOKEN_SALT` | Strapi Admin | (secret) | - |
| `DATABASE_CLIENT` | Strapi Admin | postgres | - |
| `ADMIN_JWT_SECRET` | Strapi Admin | (secret) | - |
| `TRANSFER_TOKEN_SALT` | Strapi Admin | (secret) | - |
| `STRAPI_ADMIN_CLIENT_PREVIEW_SECRET` | Strapi Admin | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `yarn add pg --save && yarn run start`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/84HU7D)
