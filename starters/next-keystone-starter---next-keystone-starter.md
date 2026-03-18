# Deploy next-keystone-starter on Railway

Deploy and Host next-keystone-starter with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/next-keystone-starter)

## About

# Next.js + KeystoneJS Starter with AI & MCP Integration

  A production-ready full-stack application template combining **Next.js 15** with **KeystoneJS 6**,
  featuring an integrated AI assistant powered by **Model Context Protocol (MCP)** and a sophisticated
  admin dashboard.

  ## Key Features

  ### Modern Architecture
  - **Next.js 15** with App Router and React 19
  - **KeystoneJS 6** for GraphQL API and database operations
  - **PostgreSQL** with Prisma ORM
  - **TypeScript** throughout the entire stack

  ### Built-in AI Integration
  - **AI Chat Assistant** with natural language to GraphQL conversion
  - **Model Context Protocol (MCP)** server for intelligent data operations
  - **OpenRouter/OpenAI** integration for multiple AI model support
  - **Real-time streaming** responses with tool calling capabilities

  ### Advanced Admin Dashboard
  - Custom **dual-sidebar interface** with AI chat integration
  - **Role-based access control** with granular permissions
  - **Rich content editing** with document fields
  - **Image management** with S3-compatible storage
  - **Advanced filtering** and search across all data types
  - **Inline editing** capabilities for seamless workflow

  ### Enterprise-Ready Features
  - **Sophisticated permission system** (canAccessDashboard, canManagePeople, etc.)
  - **S3-compatible image storage** with upload management
  - **GraphQL API** with full CRUD operations
  - **Database migrations** with Prisma
  - **Responsive design** with Tailwind CSS 4

  ## Tech Stack

  **Frontend:**
  - Next.js 15, React 19, TypeScript
  - Tailwind CSS 4 + Radix UI components
  - SWR for data fetching

  **Backend:**
  - KeystoneJS 6 with GraphQL Yoga
  - Prisma ORM with PostgreSQL
  - Model Context Protocol (MCP) integration
  - AI SDK with OpenRouter support

  **AI & Tools:**
  - Built-in MCP server for GraphQL operations
  - AI chat assistant with tool calling
  - **MCP client support** - connect Claude Desktop or other MCP-compatible clients directly to your data
  - Natural language to GraphQL conversion
  - Real-time streaming responses

  ## Perfect For

  - **SaaS applications** requiring admin dashboards
  - **Content management systems** with AI assistance
  - **E-commerce platforms** with inventory management
  - **Multi-tenant applications** with role-based access
  - **Data-driven applications** needing intelligent querying

  ## Powers These Applications

  This starter template is the foundation for several production applications:
  - **[Openship](https://github.com/openshiporg/openship)** - Multi-channel fulfillment platform
  - **[Openfront](https://github.com/openshiporg/openfront)** - Multi-region e-commerce platform
  - **[Opensource.builders](https://github.com/junaid33/opensource.builders)** - Open source software
  directory

  ## Built on KeystoneJS

  This template leverages the power of [KeystoneJS](https://keystonejs.com/docs), a powerful GraphQL-first
  CMS and application framework that provides:
  - Automatic GraphQL API generation
  - Built-in authentication and session management
  - Flexible field types and relationships
  - Extensible admin interface

  # Deploy and Host

  Deploy your Next.js + KeystoneJS application with AI capabilities to Railway's infrastructure for
  reliable, scalable hosting.

  ## About Hosting

  Railway provides a complete hosting solution optimized for full-stack applications like this starter
  template. With automatic deployments, managed PostgreSQL databases, and built-in scaling, Railway handles
   the infrastructure complexity so you can focus on building features.

  Key hosting benefits:
  - **Automatic deployments** from Git repositories
  - **Managed PostgreSQL** database with automated backups
  - **Environment variable management** for secure configuration
  - **Custom domains** and SSL certificates
  - **Horizontal scaling** based on traffic demands
  - **Built-in monitoring** and logging

  ## Why Deploy

  This starter template is designed for production deployment with several advantages:

  **Production-Ready Architecture:**
  - Pre-configured environment variables and secrets management
  - Database migration scripts that run automatically on deployment
  - Optimized build process with Next.js 15 and Turbopack
  - Health checks and error monitoring built-in

  **AI Integration Benefits:**
  - MCP server runs seamlessly in production
  - OpenRouter/OpenAI integrations work out-of-the-box
  - Real-time streaming responses scale with your traffic
  - Connect external AI clients to your deployed data

  **Enterprise Features:**
  - Role-based authentication and permissions
  - S3-compatible image storage integration
  - GraphQL API ready for mobile apps and integrations
  - Admin dashboard accessible from anywhere

  ## Common Use Cases

  **SaaS Platforms:**
  - Customer management dashboards with AI-powered insights
  - Multi-tenant applications with role-based access control
  - Subscription management with automated billing integration

  **E-commerce Solutions:**
  - Product catalog management with AI-assisted descriptions
  - Order management and fulfillment tracking
  - Multi-channel inventory synchronization

  **Content Management:**
  - Blog platforms with AI writing assistance
  - Documentation sites with intelligent search
  - Media management with automated tagging

  **Business Applications:**
  - CRM systems with natural language querying
  - Project management tools with AI task suggestions
  - Data analytics dashboards with conversational interfaces

  ## Dependencies for

  This template requires the following services for full functionality:

  **Required:**
  - **PostgreSQL Database** (automatically provisioned on Railway)
  - **Node.js 20+** runtime environment

  **Optional but Recommended:**
  - **S3-compatible storage** (AWS S3, Railway Volumes, or Cloudflare R2) for image uploads
  - **OpenRouter or OpenAI API key** for AI chat functionality
  - **Custom domain** for production deployment

  ### Deployment Dependencies

  **Automatic Setup:**
  - PostgreSQL database with connection pooling
  - Environment variables for database URL and session secrets
  - Build and deployment pipeline with Next.js optimization

  **Manual Configuration:**
  - **AI_API_KEY**: OpenRouter or OpenAI API key for AI features
  - **S3_BUCKET_NAME**: S3 bucket for image storage (optional)
  - **S3_ACCESS_KEY** and **S3_SECRET_KEY**: S3 credentials (optional)
  - **SESSION_SECRET**: Secure session key (auto-generated if not provided)

  **Post-Deployment:**
  - Database migrations run automatically
  - Admin user creation through `/dashboard/init` endpoint
  - MCP server available at `/api/mcp-transport/http`
  - GraphQL API accessible at `/api/graphql`

  ## What You Get

  1. **Complete admin dashboard** with user management, roles, and permissions
  2. **AI-powered assistant** for natural language database queries
  3. **Rich content editing** with document fields and image management
  4. **Production-ready authentication** with role-based access control
  5. **Extensible data models** - easily add your own content types
  6. **Modern development experience** with TypeScript, hot reload, and best practices

  Perfect for developers who want to skip the boilerplate and start building features immediately, with the
   power of AI assistance built right in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| next-keystone-starter | [junaid33/next-keystone-starter](https://github.com/junaid33/next-keystone-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SESSION_SECRET` | next-keystone-starter | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/next-keystone-starter)
