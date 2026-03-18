# Deploy Openfront on Railway

Opensource Shopify alternative based on Next.js and Keystone.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openfront)

## About

# Openfront - Multi-Region E-commerce Platform

  A comprehensive **e-commerce platform** designed for businesses that need complete control over their
  online store. Openfront provides everything from storefront to admin dashboard, payment processing, and
  inventory management - all built with modern architecture you can customize and truly own.

  ## Key Features

  ### Complete E-commerce Solution
  - **Customer storefront** with mobile-responsive design
  - **Admin dashboard** for complete store management
  - **Product catalog** with advanced inventory tracking
  - **Order management** with automated workflows

  ### Industry-Specific Solutions
  - **Restaurant ordering** with table management and kitchen workflows
  - **Automotive parts** with compatibility matching and service scheduling
  - **Healthcare** with appointment booking and patient records
  - **Fitness** with class scheduling and membership management
  - **Generic e-commerce** for any retail business

  ### Payment & Fulfillment
  - **Multi-provider support** - Stripe, PayPal, and custom gateways
  - **Regional payment methods** with currency localization
  - **Shipping integrations** with multiple carriers
  - **Automated tax calculations** for global sales

  ### Ownership & Customization
  - **100% open source** - modify anything to fit your business
  - **Self-hostable** - complete data ownership and control
  - **Standards-based** - integrate with any third-party service
  - **Industry templates** - pre-configured for specific business types

  ## Tech Stack

  **Backend:**
  - KeystoneJS 6 with GraphQL API
  - Node.js 20+ with TypeScript
  - PostgreSQL with Prisma ORM
  - Built-in authentication and multi-tenancy

  **Frontend:**
  - Next.js with modern React
  - Mobile-first responsive design
  - Real-time inventory updates
  - Progressive Web App capabilities

  **Payment & Shipping:**
  - Stripe and PayPal integrations (built-in)
  - Custom payment provider framework
  - Multi-carrier shipping support
  - Regional tax and compliance tools

  **Architecture:**
  - Multi-region deployment support
  - Microservices-ready design
  - API-first architecture
  - Extensible plugin system

  ## Perfect For

  - **Independent retailers** wanting marketplace alternatives
  - **Multi-location businesses** with regional requirements
  - **Industry-specific stores** needing custom workflows
  - **Agencies** building client e-commerce solutions
  - **Enterprise merchants** requiring complete customization

  ## Built for Commerce Independence

  Unlike platforms like Shopify that lock you into monthly fees and unchangeable features, Openfront gives
  you:

  **True Ownership:**
  - Full source code access for unlimited customization
  - No monthly fees or artificial feature limitations
  - Self-hosting options for complete data control
  - Freedom to modify any aspect of the system

  **Industry Focus:**
  - Pre-built templates for restaurants, automotive, healthcare, and more
  - Workflows designed for specific business models
  - Customizable to match your exact processes
  - Built by people who understand your industry

  ## Common Use Cases

  **Multi-Region Retail:**
  - Deploy stores in different countries with localized payments
  - Handle multi-currency pricing and regional inventory
  - Comply with local tax and shipping regulations
  - Provide native language shopping experiences

  **Restaurant Chains:**
  - Online ordering with table management integration
  - Kitchen workflow optimization and order routing
  - Multi-location inventory and menu management
  - Custom meal configuration and dietary restrictions

  **Healthcare Providers:**
  - Patient booking and appointment management
  - Insurance processing and billing integration
  - HIPAA-compliant patient record handling
  - Telemedicine and consultation scheduling

  **Automotive Retailers:**
  - Parts compatibility checking and recommendations
  - Service appointment scheduling and tracking
  - Warranty management and claim processing
  - Integration with inventory and repair systems

  **Fitness Businesses:**
  - Class and session booking management
  - Membership tiers and billing automation
  - Equipment tracking and maintenance
  - Personal trainer scheduling and client management

  # Deploy and Host

  Deploy Openfront to Railway for enterprise-grade e-commerce hosting that scales with your business
  growth.

  ## About Hosting

  Railway provides production-ready infrastructure specifically optimized for high-traffic e-commerce
  applications. With global edge deployment, managed databases, and automatic scaling, Railway ensures your
   store performs flawlessly during peak shopping periods.

  Key hosting benefits:
  - **Global edge network** for fast page loads worldwide
  - **Auto-scaling** handles traffic spikes during sales events
  - **Managed PostgreSQL** with automated backups and high availability
  - **SSL certificates** and security monitoring included
  - **Real-time metrics** for sales, performance, and customer behavior

  ## Why Deploy

  Openfront is engineered for production deployment with enterprise-grade reliability:

  **Performance Optimized:**
  - Sub-second page load times with optimized caching
  - CDN integration for global content delivery
  - Database optimization for high-transaction volumes
  - Real-time inventory updates without performance impact

  **Security First:**
  - PCI DSS compliant payment processing
  - GDPR and privacy regulation compliance
  - Automated security updates and monitoring
  - Secure API endpoints with rate limiting

  **Business Continuity:**
  - 99.9% uptime SLA with automatic failover
  - Real-time data backup and disaster recovery
  - Order processing continues during maintenance
  - Built-in monitoring and alerting systems

  ## Dependencies for

  Openfront requires these services for complete e-commerce functionality:

  **Required:**
  - **PostgreSQL Database** (automatically provisioned on Railway)
  - **Node.js 20+** runtime environment

  **Payment Processing:**
  - **Stripe Account** for credit card processing
  - **PayPal Business Account** for PayPal payments
  - **Custom payment gateways** as needed for your region

  **Optional Services:**
  - **SMTP Server** for order confirmations and customer emails
  - **S3-compatible storage** for product images and media
  - **Custom domain** with SSL for professional branding
  - **Analytics service** for detailed sales reporting

  ### Deployment Dependencies

  **Automatic Setup:**
  - PostgreSQL database with e-commerce optimizations
  - Environment variables for secure configuration
  - Database migrations with sample data
  - Health monitoring and performance metrics

  **Manual Configuration:**
  - **SESSION_SECRET**: Secure session encryption key
  - **Payment Provider Credentials**: Stripe keys, PayPal client credentials
  - **SMTP Configuration**: Email server for customer communications
  - **Storage Configuration**: S3 bucket for product images and files

  **Post-Deployment Setup:**
  - Admin user creation and store initialization
  - Payment provider testing and validation
  - Shipping integration configuration
  - Tax calculation setup for your regions

  ## Built on KeystoneJS

  Openfront leverages [KeystoneJS](https://keystonejs.com/docs) for robust e-commerce data management:
  - Automatic GraphQL API for all store operations
  - Built-in authentication with customer accounts
  - Flexible product catalog and inventory system
  - Admin interface for complete store management

  ## What You Get

  1. **Complete e-commerce platform** with storefront and admin dashboard
  2. **Multi-payment support** with Stripe, PayPal, and custom providers
  3. **Industry-specific templates** for restaurants, automotive, healthcare, and more
  4. **Mobile-optimized experience** for customers and administrators
  5. **Full source code ownership** with unlimited customization rights
  6. **Global deployment ready** with multi-region and multi-currency support

  Perfect for businesses ready to own their e-commerce infrastructure instead of renting it, with the 
  flexibility to customize every aspect of the shopping experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openfront | [openshiporg/openfront](https://github.com/openshiporg/openfront) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Bucket | `minio/minio:latest` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `S3_REGION` | Openfront | us-east-1 | - |
| `S3_BUCKET_NAME` | Openfront | openfront | - |
| `SESSION_SECRET` | Openfront | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | Openfront | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `  /bin/sh -c "minio server --address [::]:\$MINIO_PRIVATE_PORT \$RAILWAY_VOLUME_MOUNT_PATH & while ! curl -s    http://localhost:\$MINIO_PRIVATE_PORT/minio/health/live; do echo 'Waiting for MinIO to be ready...'; sleep 2; done; mc    alias set myminio http://localhost:\$MINIO_PRIVATE_PORT \$MINIO_ROOT_USER \$MINIO_ROOT_PASSWORD; mc ls myminio/openfront >    /dev/null 2>&1 || (mc mb myminio/openfront && mc anonymous set public myminio/openfront); wait"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/openfront)
