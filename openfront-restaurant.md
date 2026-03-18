# Deploy Openfront Restaurant on Railway

Opensource Toast alternative using Next.js and Keystone.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openfront-restaurant)

## About

# Openfront Restaurant - Modern Restaurant Operating Platform

   A comprehensive **restaurant operating platform** designed for restaurants that need complete
 control over direct ordering, point of sale, kitchen operations, service workflows, and guest
 experience. Openfront Restaurant provides everything from guest storefront to admin dashboard,
 payments, kitchen display, and operational reporting - all built with modern architecture you can
 customize and truly own.

   ## Key Features

   ### Complete Restaurant Solution
   - **Guest storefront** with mobile-responsive online ordering
   - **Admin dashboard** for complete restaurant management
   - **Point of Sale (POS)** for dine-in, takeout, and counter service
   - **Order management** with kitchen, service, and payment workflows

   ### Restaurant-Specific Operations
   - **Kitchen Display System (KDS)** with station-based ticket management
   - **Table and floor management** for dine-in service workflows
   - **Waitlist and reservation support** for front-of-house coordination
   - **Menu management** with modifiers, categories, and operational controls

   ### Payments & Fulfillment
   - **Multi-provider support** - Stripe, PayPal, and custom gateways
   - **Localized currency support** with region-aware formatting
   - **Pickup, dine-in, and delivery workflows** with live status tracking
   - **Integrated service sequencing** for cashier, kitchen, and handoff operations

   ### Ownership & Customization
   - **100% open source** - modify anything to fit your restaurant
   - **Self-hostable** - complete data ownership and control
   - **Standards-based** - integrate with any third-party service
   - **Restaurant-focused architecture** - built as a modern alternative to Toast

   ## Tech Stack

   **Backend:**
   - KeystoneJS 6 with GraphQL API
   - Node.js 20+ with TypeScript
   - PostgreSQL with Prisma ORM
   - Built-in authentication and extensible business logic

   **Frontend:**
   - Next.js with modern React
   - Mobile-first responsive design
   - Real-time order and kitchen updates
   - Progressive Web App capabilities

   **Payment & Operations:**
   - Stripe and PayPal integrations (built-in)
   - Custom payment provider framework
   - Restaurant workflow orchestration
   - Currency, locale, and timezone support

   **Architecture:**
   - Single-location-first deployment model
   - Feature-sliced platform design
   - API-first architecture
   - Extensible admin and storefront system

   ## Perfect For

   - **Independent restaurants** wanting an alternative to Toast
   - **Restaurant groups** with branded ordering and operational needs
   - **Hospitality businesses** needing custom service workflows
   - **Agencies** building restaurant ordering solutions for clients
   - **Operators** who want full ownership and customization

   ## Built for Restaurant Independence

   Unlike platforms like Toast that lock you into monthly fees, hardware decisions, and rigid
 workflows, Openfront Restaurant gives you:

   **True Ownership:**
   - Full source code access for unlimited customization
   - No monthly platform lock-in or artificial feature limitations
   - Self-hosting options for complete data control
   - Freedom to modify any aspect of the system

   **Industry Focus:**
   - Built for restaurants, not generic online retail
   - Workflows designed for real front-of-house and back-of-house operations
   - Customizable to match your exact service model
   - Built by people who understand hospitality operations

   ## Common Use Cases

   **Independent Restaurant Operations:**
   - Run direct online ordering without marketplace dependency
   - Manage dine-in, takeout, and delivery from one system
   - Coordinate kitchen and service teams in real time
   - Customize menus, modifiers, and service flows

   **Restaurant Groups:**
   - Standardize operational tooling across multiple concepts
   - Configure currency, hours, and settings per deployment
   - Launch branded ordering experiences for each restaurant
   - Extend the platform with internal integrations and reporting

   **Full-Service Dining:**
   - Table management and floor coordination
   - Split checks, paced service, and server-friendly workflows
   - Kitchen and expediter visibility across live orders
   - Better control over dine-in operations than generic POS tools

   **Quick Service & Counter Service:**
   - Fast cashier workflows with touch-friendly POS design
   - Streamlined KDS ticket routing and preparation flow
   - Pickup-focused online ordering
   - Direct integrated payment processing

   **Modern Hospitality Brands:**
   - Unified ordering, operations, and reporting stack
   - Custom branded guest experiences
   - Operational dashboards for labor, menu, and sales visibility
   - Flexible architecture for unique restaurant models

   # Deploy and Host

   Deploy Openfront Restaurant to Railway for production-grade restaurant infrastructure that
 scales with your operational growth.

   ## About Hosting

   Railway provides production-ready infrastructure optimized for operational web applications
 like restaurant ordering, POS, and kitchen workflow platforms. With managed databases, deployment
 automation, and scalable services, Railway gives restaurant teams a reliable way to host
 Openfront Restaurant in production.

   Key hosting benefits:
   - **Managed infrastructure** for app and database deployment
   - **Auto-scaling** handles growth in order volume
   - **Managed PostgreSQL** with automated backups and high availability
   - **SSL certificates** and security tooling included
   - **Real-time logs and metrics** for operational visibility

   ## Why Deploy

   Openfront Restaurant is engineered for production deployment with restaurant-grade operational
 reliability:

   **Performance Optimized:**
   - Fast guest ordering and operator workflows
   - Responsive POS and KDS interfaces
   - Efficient GraphQL-backed data access
   - Real-time operational updates without unnecessary complexity

   **Security First:**
   - Secure payment provider integrations
   - Protected admin and staff authentication
   - Automated deployment workflows and secret management
   - Secure API endpoints and server-side business logic

   **Business Continuity:**
   - Reliable infrastructure for critical restaurant workflows
   - Managed database foundation for orders, payments, and menus
   - Easier monitoring, rollback, and deployment management
   - Operational logs to diagnose issues quickly

   ## Dependencies for

   Openfront Restaurant requires these services for complete restaurant functionality:

   **Required:**
   - **PostgreSQL Database** (automatically provisioned on Railway)
   - **Node.js 20+** runtime environment

   **Payment Processing:**
   - **Stripe Account** for credit card processing
   - **PayPal Business Account** for PayPal payments
   - **Custom payment gateways** as needed for your region

   **Optional Services:**
   - **SMTP Server** for order confirmations and operational emails
   - **S3-compatible storage** for menu images and media
   - **Custom domain** with SSL for branded ordering
   - **Analytics service** for sales and operational reporting

   ### Deployment Dependencies

   **Automatic Setup:**
   - PostgreSQL database provisioning
   - Environment variables for secure configuration
   - Deployable Node.js application runtime
   - Health monitoring and logs through Railway

   **Manual Configuration:**
   - **SESSION_SECRET**: Secure session encryption key
   - **DATABASE_URL**: PostgreSQL connection string
   - **Payment Provider Credentials**: Stripe keys, PayPal client credentials
   - **SMTP Configuration**: Email server for confirmations and receipts
   - **Storage Configuration**: S3 bucket for menu images and uploaded files

   **Post-Deployment Setup:**
   - Admin user creation and restaurant initialization
   - Payment provider testing and validation
   - Store settings setup for currency, locale, timezone, and hours
   - Menu, floor plan, and operational workflow configuration

   ## Built on KeystoneJS

   Openfront Restaurant leverages [KeystoneJS](https://keystonejs.com/docs) for robust restaurant
 data management:
   - Automatic GraphQL API for restaurant operations
   - Built-in authentication for admins and staff
   - Flexible modeling for menus, orders, payments, and kitchen workflows
   - Admin interface foundation for complete restaurant management

   ## What You Get

   1. **Complete restaurant platform** with storefront and admin dashboard
   2. **Integrated POS and KDS workflows** for front-of-house and back-of-house teams
   3. **Restaurant-specific tooling** for menus, tables, waitlists, and service operations
   4. **Mobile-optimized experience** for guests, cashiers, servers, and managers
   5. **Full source code ownership** with unlimited customization rights
   6. **Production-ready deployment path** for teams building a Toast alternative

   Perfect for restaurants ready to own their software infrastructure instead of renting rigid
 systems, with the flexibility to customize every aspect of the guest and staff experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bucket | `minio/minio:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Openfront | [openshiporg/openfront-restaurant](https://github.com/openshiporg/openfront-restaurant) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `S3_REGION` | Openfront | us-east-1 | - |
| `S3_BUCKET_NAME` | Openfront | openfront | - |
| `SESSION_SECRET` | Openfront | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | Openfront | (secret) | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |

## Configuration

- **Start command:** `  /bin/sh -c "minio server --address [::]:\$MINIO_PRIVATE_PORT \$RAILWAY_VOLUME_MOUNT_PATH & while ! curl -s    http://localhost:\$MINIO_PRIVATE_PORT/minio/health/live; do echo 'Waiting for MinIO to be ready...'; sleep 2; done; mc    alias set myminio http://localhost:\$MINIO_PRIVATE_PORT \$MINIO_ROOT_USER \$MINIO_ROOT_PASSWORD; mc ls myminio/openfront >    /dev/null 2>&1 || (mc mb myminio/openfront && mc anonymous set public myminio/openfront); wait"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/template/openfront-restaurant)
