# Deploy AEROSPIKE: LATEST on Railway

Aerospike NoSQL database, with mounted volume for data persistence.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aerospike-latest)

## About

## Aerospike Community Edition - Quick Guide

### ⚠️ Important: TCP Connection Required
Aerospike is **NOT** accessible via HTTP/HTTPS. You must use TCP protocol with an Aerospike client library.

### Quick Setup Summary
1. ✅ **Template deployed** - Aerospike Community Edition running
2. ✅ **Volume mounted** at `/opt/aerospike/data` for data persistence  
3. ✅ **Default namespace** "test" with 4GB storage configured

### Connection Methods

#### Internal Connection (Railway Services)
```javascript
// test-aerospike.js
const Aerospike = require('aerospike');

const client = Aerospike.client({
  hosts: 'your-service-name.railway.internal:3000'
});

client.connect((error) => {
  if (error) {
    console.log('Failed:', error.message);
  } else {
    console.log('Connected to Aerospike!');
    
    const key = new Aerospike.Key('test', 'demo', 'test1');
    client.put(key, { data: 'Hello!' }, (err) => {
      if (!err) {
        client.get(key, (err, record) => {
          console.log('Data:', record.bins);
          client.close();
        });
      }
    });
  }
});
```

#### External Connection (TCP Proxy)
Railway Settings → Networking → TCP Proxy → Port 3000
```javascript
// Use generated proxy address like:
hosts: 'viaduct.proxy.rlwy.net:12345'
```

### Client Libraries & Examples
For complete examples in multiple languages, visit:  
📚 **https://aerospike.com/docs/database/quick-start/**

Available clients:
- Java
- C#
- Go
- Python
- Node.js


## Deploy and Host

Deploy Aerospike Community Edition on Railway with one click using the template. The service runs in a Docker container with automatic restarts and health monitoring.

### About Hosting

Railway provides managed hosting with persistent volumes for database storage. Your Aerospike instance runs 24/7 with automatic SSL/TLS for TCP connections and built-in DDoS protection.

### Why Deploy

- **High-speed NoSQL** - Sub-millisecond latency for real-time applications
- **Hybrid memory architecture** - Combines RAM and SSD for optimal performance
- **Automatic scaling** - Handles millions of transactions per second
- **No configuration needed** - Works out of the box with sensible defaults

### Common Use Cases

- **Session store** - Fast user session management
- **Real-time analytics** - Stream processing and counters
- **Cache layer** - High-speed caching for databases
- **User profiles** - Quick access to user data
- **IoT data ingestion** - Time-series data storage

## Dependencies for

Railway handles all infrastructure dependencies automatically.

### Deployment Dependencies

- **Docker**: Base image `aerospike/aerospike-server:latest`
- **Volume**: Persistent storage at `/opt/aerospike/data`
- **Network**: TCP port 3000 (internal), configurable TCP proxy for external
- **Memory**: Minimum 1GB RAM (configurable via `MEM_GB` env variable)
- **Client libraries**: Install via npm/pip/maven as needed (not included)

### Notes
- Will remove upon request from Railway or regulatory bodies
- Default configuration suitable for development/testing
- For production: configure environment variables and increase resources

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aerospike-server | `aerospike/aerospike-server:latest` | Database |

## Configuration

- **TCP Proxies:** 3000
- **Volume:** `/opt/aerospike/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/aerospike-latest)
