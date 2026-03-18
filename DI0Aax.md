# Deploy Next.js with Auth.js on Railway

Nextjs starter with Auth.js for user authentication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/DI0Aax)

## About

A Next.js starter project set up with Auth.js for user authentication and protected routes. The project includes:

- **Husky**: Pre-configured for Git hooks to enforce code quality before commits.
- **Playwright**: Installed for end-to-end (e2e) testing to ensure application functionality.
- **ESLint and Prettier**: Configured for consistent code formatting and linting.
- **shadcn/ui**: Integrated as the primary UI component library.
- **Tailwind CSS**: Used for styling, offering rapid and responsive design capabilities.
- **Nx**: Set up for monorepo management, streamlining project organization and scalability.
- **Serverless Redis**: Integrated for authentication, compatible with **Upstash Redis**, ensuring fast and scalable session storage.

This starter is equipped with a robust development environment and a complete toolset for building scalable, maintainable applications with smooth authentication and testing setups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| http | `ghcr.io/ikatsuba/serverless-redis:latest` | Database |
| nxnext | [IKatsuba/nxnext](https://github.com/IKatsuba/nxnext) | Web service |
| Redis | `redis/redis-stack` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SR_TOKEN` | http | (secret) | Super secret token |
| `REDIS_URL` | http | - | Private Redis URL |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | Private Network Workaround for Alpine-based images |
| `AUTH_URL` | nxnext | - | Site Host |
| `AUTH_SECRET` | nxnext | (secret) | Auth Secret |
| `UPSTASH_REDIS_URL` | nxnext | - | Redis URL |
| `UPSTASH_REDIS_TOKEN` | nxnext | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | nxnext | true | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/template/DI0Aax)
