# Deploy Forma - Test Template Development on Railway

Laravel + React + PostgreSQL small business website template by Forma.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/forma-test-template-development)

## About

Forma - Test Template Development is a production-ready Laravel + React website template for small businesses. Built on Laravel 13, React 19, Inertia.js, and Tailwind CSS, it includes a Filament admin dashboard, PostgreSQL database, and authentication with 2FA — deploy in one click, manage everything through the admin panel.

  ## About Hosting Forma - Test Template Development

  Hosting this template on Railway automatically provisions both the Laravel app service and a managed PostgreSQL database. Railway builds the app using Railpack, compiles PHP and frontend assets, runs database migrations, and caches config and routes before the app goes live. No server configuration required. Your app runs with automatic SSL and a Railway subdomain out of the box, with optional custom domain support. To use background jobs, add a separate Railway worker service running `php artisan queue:work`.

  ## Common Use Cases

  - Small business websites (restaurants, coffee shops, fitness studios, salons)
  - Service business landing pages with admin-managed content
  - Client site deployments for agencies using Forma templates

  ## Dependencies for Forma - Test Template Development Hosting

  - PHP 8.5
  - Node.js 22
  - PostgreSQL (auto-provisioned by this template)

  ### Deployment Dependencies

  - [Forma](https://github.com/launchforma) — template source and license
  - A Forma license key (provided at purchase — you will be prompted to enter it during deploy)

  ### Implementation Details

  Build and deploy are configured via `railway.json`:

  - **Build:** Railpack compiles assets, generates app key, and links storage
  - **Pre-deploy:** Migrations run, then config/route/view caches are warmed
  - **Health check:** `/`

  ## Why Deploy Forma - Test Template Development on Railway?

  
  Railway is a singular platform to deploy your infrastructure stack. Railway
  will host your infrastructure so you don't have to deal with configuration,
  while allowing you to vertically and horizontally scale it.

  By deploying Forma - Test Template Development on Railway, you are one step
  closer to supporting a complete full-stack application with minimal burden.
  Host your servers, databases, AI agents, and more on Railway.

**Category:** Other

[View on Railway →](https://railway.com/deploy/forma-test-template-development)
