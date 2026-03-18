# Deploy Openship on Railway

E-commerce order management system that enables multi-channel fulfillment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openship)

## About

# Openship - Multi-Channel Order Fulfillment Platform

  A production-ready **order routing platform** that connects your sales channels to fulfillment partners.
  Openship automatically routes orders from multiple storefronts to your suppliers and fulfillment centers,
   giving you complete control over your order flow.

  ## Key Features

  ### Order Routing Intelligence
  - **Automatic order routing** from sales channels to fulfillment partners
  - **Product matching system** for supplier and inventory management
  - **Multi-channel support** - connect Shopify, WooCommerce, eBay, Amazon, and more
  - **Custom channel creation** for any fulfillment destination

  ### Fulfillment Management
  - **Shop connections** to your online stores and marketplaces
  - **Channel integrations** to suppliers, 3PLs, and fulfillment services
  - **Link management** between shops and channels
  - **Order tracking** and status synchronization across platforms

  ### Advanced Controls
  - **Product-level matching** for granular fulfillment control
  - **Vendor flexibility** - easily switch suppliers without losing data
  - **Custom fulfillment workflows** including email notifications and spreadsheet integrations
  - **Real-time order synchronization** between all connected platforms

  ### Enterprise Features
  - **Multi-tenant architecture** for agencies and large operations
  - **Role-based permissions** for team management
  - **Comprehensive API** for custom integrations
  - **Webhook support** for real-time order processing

  ## Tech Stack

  **Backend:**
  - KeystoneJS 6 with GraphQL API
  - Node.js 20+ with TypeScript
  - PostgreSQL with Prisma ORM
  - Built-in authentication and session management

  **Frontend:**
  - Next.js with modern React
  - Responsive admin dashboard
  - Real-time order tracking interface
  - Mobile-optimized management tools

  **Integrations:**
  - Shopify API integration (built-in)
  - Custom channel development framework
  - SMTP email notifications
  - Extensible webhook system

  ## Perfect For

  - **Multi-channel merchants** selling across multiple platforms
  - **E-commerce operations** with multiple suppliers and fulfillment partners
  - **3PL and fulfillment centers** managing client orders
  - **E-commerce agencies** handling multiple client stores
  - **Retail brands** with complex supply chains

  ## Common Use Cases

  **Multi-Channel Fulfillment:**
  - Route orders from your Shopify store to suppliers automatically
  - Switch suppliers without changing product listings
  - Handle orders from multiple marketplaces through one system

  **Multi-Store Operations:**
  - Manage orders from multiple Shopify stores in one dashboard
  - Route different products to different fulfillment centers
  - Consolidate order tracking across all sales channels

  **Agency Management:**
  - Handle fulfillment for multiple client stores
  - Provide clients with order visibility and tracking
  - Scale operations without manual order processing

  **Supply Chain Optimization:**
  - Automatically route orders to the best available supplier
  - Implement fallback suppliers for out-of-stock situations
  - Track performance across different fulfillment partners

  # Deploy and Host

  Deploy Openship to Railway's infrastructure for reliable, scalable order routing that grows with your
  business.

  ## About Hosting

  Railway provides enterprise-grade hosting optimized for multi-channel e-commerce operations. With
  automatic scaling, managed databases, and global edge deployment, Railway ensures your order routing runs
   smoothly even during peak sales periods.

  Key hosting benefits:
  - **Auto-scaling infrastructure** handles traffic spikes during sales events
  - **Managed PostgreSQL** with automated backups and failover
  - **Global CDN** for fast API responses worldwide
  - **Environment isolation** for staging and production environments
  - **Built-in monitoring** with order processing metrics

  ## Why Deploy

  Openship is architected for production deployment with mission-critical reliability:

  **Scalable Architecture:**
  - Handles thousands of orders per minute
  - Horizontal scaling based on order volume
  - Database optimization for high-throughput operations
  - Efficient webhook processing for real-time updates

  **Business Continuity:**
  - Automatic failover and disaster recovery
  - Order data backup and restoration
  - Integration health monitoring
  - Alert systems for failed order routing

  **Multi-Region Support:**
  - Deploy close to your primary markets
  - Reduce API latency for better user experience
  - Comply with regional data requirements
  - Support global supply chains

  ## Dependencies for

  Openship requires these services for full functionality:

  **Required:**
  - **PostgreSQL Database** (automatically provisioned on Railway)
  - **Node.js 20+** runtime environment

  **Optional but Recommended:**
  - **SMTP Server** for order notifications and alerts
  - **Custom domain** for professional API endpoints
  - **SSL certificates** for secure webhook communications
  - **Monitoring service** for order processing insights

  ### Deployment Dependencies

  **Automatic Setup:**
  - PostgreSQL database with connection pooling
  - Environment variables for secure configuration
  - Database migrations and schema setup
  - Health check endpoints for monitoring

  **Manual Configuration:**
  - **SESSION_SECRET**: Secure session encryption key
  - **SMTP Configuration**: Email server settings for notifications
  - **API Keys**: For connected platforms (Shopify, etc.)
  - **Webhook URLs**: For real-time order synchronization

  **Post-Deployment:**
  - Database initialization with required tables
  - Admin user setup through initialization flow
  - Platform connection testing and validation
  - Order routing workflow configuration

  ## Built on KeystoneJS

  Openship leverages [KeystoneJS](https://keystonejs.com/docs) for robust data management and API 
  generation:
  - Automatic GraphQL API for all operations
  - Built-in authentication and session management
  - Flexible data modeling for shops, channels, and orders
  - Admin interface for configuration and monitoring

  ## What You Get

  1. **Complete order routing system** with multi-channel support
  2. **Shopify integration** ready to connect your stores
  3. **Custom channel framework** for any fulfillment partner
  4. **Real-time order tracking** across all platforms
  5. **Scalable architecture** that grows with your business
  6. **Open source foundation** you can customize and extend

  Perfect for businesses ready to automate their order fulfillment and scale across multiple sales channels
   without the complexity of managing individual integrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openship | [openshiporg/openship](https://github.com/openshiporg/openship) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SESSION_SECRET` | Openship | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/openship)
