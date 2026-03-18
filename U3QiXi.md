# Deploy Novu on Railway

Open-source notification infrastructure

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/U3QiXi)

## About

# Novu Self-Hosted Template for Railway

## Overview
Novu is an open-source notification infrastructure designed for developers who need powerful, flexible notification capabilities in their applications. This template deploys a self-hosted version of Novu, providing complete control over your notification infrastructure while maintaining the ease of use that Novu is known for. Perfect for teams that need to manage complex notification workflows across multiple channels while keeping their data within their own infrastructure.

## Features
- **Powerful Workflow Engine**: Build code-first notification workflows that run within your infrastructure
- **Multi-Channel Support**: Send notifications across email, SMS, push, and in-app channels through a single API
- **Built-in Component Library**: Ready-to-use notification components including a customizable inbox
- **No-Code Editor**: Enable product teams to manage notification content without developer intervention
- **Type-Safe Operations**: End-to-end validation with custom JSON schemas
- **User Preference Management**: Built-in support for user notification preferences including language and timezone
- **Developer-First Architecture**: API-first design with complete workflow control
- **Open Source**: Full access to the source code with community backing

## Deployment Instructions
1. Click the "Deploy on Railway" button
2. Configure the required environment variables (see below)
3. Deploy the service
4. Access your Novu dashboard

### Important Post-Deployment Steps
5. Navigate to the Project Settings in Railway
6. Go to the "Networking" tab
7. Find the "NovuWeb" service
8. Look for the automatically generated public URL
9. If the URL doesn't work:
   - Delete the current public URL
   - Click "Generate Domain" to create a fresh public URL
   - Alternatively, attach your custom domain if you prefer
10. Use this URL to access your Novu dashboard
11. Set up your notification channels and providers
12. Integrate Novu into your application using the provided SDKs

## Getting Started
After successful deployment and URL configuration:
1. Access your Novu dashboard through the working public URL
2. Create your first notification template
3. Set up your preferred notification providers
4. Integrate the Novu SDK into your application
5. Send your first notification using the provided code:

```javascript
await novu.trigger('workflow-name', {
  to: {
    subscriberId: 'user-id',
    email: 'user@example.com'
  },
  payload: {
    name: 'John Doe',
    message: 'Hello world!'
  }
});
```

## Security Considerations
- Secure your MongoDB and Redis instances
- Set a strong JWT_SECRET
- Configure appropriate access controls
- Enable authentication for the dashboard
- Regularly update to the latest version
- Monitor your notification workflows

## Customization
- Add custom notification providers
- Implement custom notification templates
- Configure workflow rules and conditions
- Set up digest and delay steps
- Customize the in-app notification center
- Implement custom authentication logic

## Support
For issues with the template itself, please each out to me at youssef@reflectfy.com. For Novu-specific questions, refer to the [official documentation](https://docs.novu.co/) or join the Novu community.

## Troubleshooting
- If you can't access the dashboard after deployment, verify that the public URL is properly generated
- Ensure all environment variables are correctly set
- Check Railway logs for any deployment errors
- Verify that both the API and Web services are running
- If using a custom domain, ensure DNS settings are properly configured

Build powerful notification experiences with Novu!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NovuAPI | `ghcr.io/novuhq/novu/api:2.0.0` | Web service |
| MongoDB | `mongo:7` | Database |
| NovuWS | `ghcr.io/novuhq/novu/ws:2.0.0` | Web service |
| NovuWeb | `ghcr.io/novuhq/novu/web:2.0.0` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| NovuWorker | `ghcr.io/novuhq/novu/worker:2.0.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | NovuAPI | 3000 | - |
| `NODE_ENV` | NovuAPI | production | - |
| `JWT_SECRET` | NovuAPI | (secret) | - |
| `REDIS_DB_INDEX` | NovuAPI | 2 | - |
| `REDIS_PASSWORD` | NovuAPI | (secret) | - |
| `MONGO_MAX_POOL_SIZE` | NovuAPI | 200 | - |
| `MONGO_MIN_POOL_SIZE` | NovuAPI | 75 | - |
| `AWS_SECRET_ACCESS_KEY` | NovuAPI | (secret) | - |
| `DISABLE_USER_REGISTRATION` | NovuAPI | false | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | NovuWS | 3002 | - |
| `NODE_ENV` | NovuWS | production | - |
| `JWT_SECRET` | NovuWS | (secret) | - |
| `REDIS_DB_INDEX` | NovuWS | 2 | - |
| `REDIS_PASSWORD` | NovuWS | (secret) | - |
| `MONGO_MAX_POOL_SIZE` | NovuWS | 200 | - |
| `MONGO_MIN_POOL_SIZE` | NovuWS | 75 | - |
| `REACT_APP_ENVIRONMENT` | NovuWeb | prod | - |
| `REACT_APP_IS_SELF_HOSTED` | NovuWeb | true | - |
| `REACT_APP_DOCKER_HOSTED_ENV` | NovuWeb | true | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PORT` | NovuWorker | 3000 | - |
| `NODE_ENV` | NovuWorker | production | - |
| `JWT_SECRET` | NovuWorker | (secret) | - |
| `REDIS_DB_INDEX` | NovuWorker | 2 | - |
| `REDIS_PASSWORD` | NovuWorker | (secret) | - |
| `MONGO_MAX_POOL_SIZE` | NovuWorker | 200 | - |
| `MONGO_MIN_POOL_SIZE` | NovuWorker | 75 | - |
| `AWS_SECRET_ACCESS_KEY` | NovuWorker | (secret) | - |
| `DISABLE_USER_REGISTRATION` | NovuWorker | false | - |
| `BROADCAST_QUEUE_CHUNK_SIZE` | NovuWorker | 100 | - |
| `MULTICAST_QUEUE_CHUNK_SIZE` | NovuWorker | 100 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "pnpm run envsetup:docker && pnpm run start:static:build"`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/template/U3QiXi)
