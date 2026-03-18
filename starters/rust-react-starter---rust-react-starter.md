# Deploy rust-react-starter on Railway

  Rust (Axum) + Next.js monorepo with PostgreSQL and type-safe API SDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rust-react-starter)

## About

A production-ready fullstack monorepo combining Rust (Axum) backend
  with Next.js frontend, featuring PostgreSQL database, WebSocket
  real-time updates, and automatic TypeScript SDK generation from
  OpenAPI schemas. Built for type safety across the entire stack with
  compile-time guarantees.

https://github.com/trevor-trinh/rust-react-starter

  ## About Hosting rust-react-starter

  Deploying rust-react-starter involves running three services: a Rust
  backend API server with REST and WebSocket endpoints, a Next.js
  frontend with server-side rendering, and a PostgreSQL database. The
  backend uses SQLx for compile-time verified queries and utoipa for
  automatic OpenAPI spec generation. The frontend automatically
  generates a type-safe SDK from the backend's OpenAPI schema, ensuring
  end-to-end type safety. The architecture supports real-time features
  via WebSockets with broadcast channels, making it ideal for
  collaborative applications. Docker images are optimized for production
   with multi-stage builds and standalone Next.js output.

  ## Common Use Cases

  - **Real-time collaborative applications** - Todo apps, dashboards, or
   project management tools with live updates across clients
  - **Type-safe API development** - Projects requiring guaranteed type
  consistency between Rust backend and TypeScript frontend
  - **Full-stack prototypes** - Rapid development of modern web
  applications with production-ready architecture and database
  migrations

  ## Dependencies for rust-react-starter Hosting

  - **PostgreSQL** - Primary database for application data with SQLx
  migrations
  - **Rust toolchain** - Backend compilation (handled automatically in
  Docker build)
  - **Bun runtime** - Frontend package management and Next.js server
  runtime

  ### Deployment Dependencies

  - [Rust &amp; Axum Documentation](https://docs.rs/axum)
  - [Next.js Standalone Output](https://nextjs.org/docs/app/api-referenc
  e/config/next-config-js/output)
  - [SQLx Migrations](https://github.com/launchbadge/sqlx/blob/main/sqlx
  -cli/README.md)
  - [utoipa OpenAPI Generator](https://github.com/juhaku/utoipa)

  ### Implementation Details

  The project uses a monorepo structure with automatic type generation:

  **Backend (Rust)**:
  ```rust
  // Define API types with OpenAPI schema generation
  #[derive(Serialize, Deserialize, ToSchema)]
  pub enum TodoRequest {
      List,
      Create { title: String, description: Option },
      // ... other operations
  }

  Frontend (TypeScript):
  // SDK auto-generated from OpenAPI spec
  import { ApiClient } from "@rust-react-starter/sdk";

  const client = new ApiClient({ baseUrl: API_URL });
  const response = await client.todos({ List: {} }); // Fully typed!

  Environment Variables Required:
  - DATABASE_URL - PostgreSQL connection string (auto-configured by
  Railway)
  - NEXT_PUBLIC_API_URL - Backend API URL for frontend
  - NEXT_PUBLIC_WS_URL - WebSocket endpoint URL
  - PORT - Server port (defaults to 8888 for backend, 3000 for frontend)

  ### Why Deploy rust-react-starter on Railway?

  Railway is a singular platform to deploy your infrastructure stack.
  Railway will host your infrastructure so you don't have to deal with
  configuration, while allowing you to vertically and horizontally scale
   it.

  By deploying rust-react-starter on Railway, you are one step closer to
   supporting a complete full-stack application with minimal burden.
  Host your servers, databases, AI agents, and more on Railway.
  ```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | [trevor-trinh/rust-react-starter](https://github.com/trevor-trinh/rust-react-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| backend | [trevor-trinh/rust-react-starter](https://github.com/trevor-trinh/rust-react-starter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/rust-react-starter)
