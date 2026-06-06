# Deploy taskflowapi on Railway

Deploy and Host taskflowapi with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/taskflowapi)

## About

Hosting TaskFlow API on Railway allows developers to deploy a fully functional ASP.NET Core backend without managing server infrastructure. The application requires a .NET runtime, a database connection, and environment variables for JWT authentication. Railway handles deployment, networking, environment configuration, and scaling, making it easier to focus on building features instead of maintaining servers. Once deployed, the API can be consumed by web, mobile, or desktop applications while benefiting from Railway's managed platform and deployment workflow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| taskflow-api | [Rethabile2004/taskflow-api](https://github.com/Rethabile2004/taskflow-api) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JwtSettings__Issuer` | TaskFlowAPI |
| `JwtSettings__Audience` | TaskFlowAPIUsers |
| `ASPNETCORE_ENVIRONMENT` | Production |
| `JwtSettings__SecretKey` | (secret) |
| `JwtSettings__ExpiryHours` | 24 |
| `ConnectionStrings__DefaultConnection` | Host=localhost;Port=5432;Database=TaskFlowDb;Username=postgres;Password=P@ss040409 |

## Configuration

- **Healthcheck:** `health`

**Category:** Other · **Languages:** C#

[View on Railway →](https://railway.com/deploy/taskflowapi)
