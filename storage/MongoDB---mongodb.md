# Deploy MongoDB on Railway

Self-hosted MongoDB latest with persistence volume. It just works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb)

## About

## Deploy and Host MongoDB on Railway

MongoDB is a popular open-source NoSQL document database that provides flexible and scalable data storage. This template deploys the official MongoDB Docker image with a persistent volume and authentication enabled.

### Common Use Cases
- Primary database for web applications, APIs, and backend services
- Data storage for AI agents, automation tools, and self-hosted solutions
- Development and staging environments
- Real-time applications, CMS, e-commerce, and analytics platforms

## Comparison

| Feature              | This Template       | MongoDB Atlas     | Self-managed VPS   |
|----------------------|---------------------|-------------------|--------------------|
| Ease of Deployment   | ✅ 1-Click          | ⚠️ Medium         | ❌ Complex         |
| Cost (Small Usage)   | ✅ Very Affordable  | ❌ Higher         | ⚠️ Variable       |
| Data Persistence     | ✅ Built-in Volume  | ✅ Managed        | ❌ Manual          |
| Private Networking   | ✅ Excellent        | ✅ Good           | ❌ Manual          |
| Control & Flexibility| ✅ Full             | ⚠️ Limited        | ✅ Full            |
| Maintenance Overhead | ✅ Low              | ✅ None           | ❌ High            |

## Dependencies
None — This template is completely standalone.

### Implementation Details
**Start Command:**
```bash
docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false
```

## How to Connect After Deployment

**Note**: TCP Proxy is **enabled by default** after successful deployment.

### Recommended Environment Variables

```env
MONGO_INITDB_ROOT_PASSWORD="${{secret(32)}}"
MONGO_INITDB_ROOT_USERNAME="mongo"

# Public Connection (via TCP Proxy)
MONGO_PUBLIC_URL="mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}}"

# Alternative URLs
MONGO_URL="mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:27017"

MONGOHOST="${{RAILWAY_PRIVATE_DOMAIN}}"
MONGOPORT="27017"
MONGOUSER="${{MONGO_INITDB_ROOT_USERNAME}}"
MONGOPASSWORD="${{MONGO_INITDB_ROOT_PASSWORD}}"
```

### Available Connection Methods

1. **Database Tab (Built-in GUI)**  
   - Go to your MongoDB service → **Database** tab  
   - Simple visual interface to browse collections, run queries, and manage data (as shown in your screenshot).

2. **Console Tab**  
   - Run MongoDB shell commands directly in the browser.

3. **Railway CLI (Secure Local Access)**  
   ```bash
   railway connect MongoDB
   ```
   Opens an encrypted tunnel without exposing the database publicly.

4. **External Tools (DBeaver, MongoDB Compass, etc.)**  
   - Use `MONGO_PUBLIC_URL`  
   - Or manually:
     - Host: `${{RAILWAY_TCP_PROXY_DOMAIN}}`
     - Port: `${{RAILWAY_TCP_PROXY_PORT}}`
     - Username: `mongo`
     - Password: `${{MONGO_INITDB_ROOT_PASSWORD}}`
     - Authentication Database: `admin`

5. **Private Network (Internal Services)**  
   Use the private URL inside the same Railway project.

## Why Deploy MongoDB on Railway?
Railway offers a simple, reliable, and scalable way to run a fully managed MongoDB instance with persistence and multiple easy connection options.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGOPORT` | 27017 |
| `MONGOPASSWORD` | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb)
