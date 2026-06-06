# Deploy sparkyfitness on Railway

Track food, fitness, water, and health — together

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sparkyfitness)

## About

SparkyFitness runs on Railway as a Docker-only multi-service deployment with a public web UI, a backend API, and PostgreSQL for durable application data. Railway handles HTTPS domains, private service networking, environment variables, and persistent database storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `codewithcj/sparkyfitness:v0.16.8` | Web service |
| backend | `codewithcj/sparkyfitness_server:v0.16.8` | Web service |
| postgres | `postgres:18.3-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | frontend | 80 |
| `NGINX_ERROR_LOG` | frontend | /dev/stderr |
| `NGINX_ACCESS_LOG` | frontend | /dev/stdout |
| `NGINX_RATE_LIMIT` | frontend | 5r/s |
| `NGINX_LISTEN_PORT` | frontend | 80 |
| `SPARKY_FITNESS_SERVER_PORT` | frontend | 443 |
| `TZ` | backend | Etc/UTC |
| `HOST` | backend | :: |
| `PORT` | backend | 3010 |
| `NODE_ENV` | backend | production |
| `BETTER_AUTH_SECRET` | backend | (secret) |
| `SPARKY_FITNESS_DB_PORT` | backend | 5432 |
| `SPARKY_FITNESS_DB_USER` | backend | (secret) |
| `SPARKY_FITNESS_LOG_LEVEL` | backend | INFO |
| `SPARKY_FITNESS_EMAIL_USER` | backend | (secret) |
| `ALLOW_PRIVATE_NETWORK_CORS` | backend | false |
| `SPARKY_FITNESS_APP_DB_USER` | backend | (secret) |
| `SPARKY_FITNESS_DB_PASSWORD` | backend | (secret) |
| `SPARKY_FITNESS_SERVER_PORT` | backend | 3010 |
| `SPARKY_FITNESS_EMAIL_SECURE` | backend | false |
| `SPARKY_FITNESS_DISABLE_SIGNUP` | backend | false |
| `SPARKY_FITNESS_APP_DB_PASSWORD` | backend | (secret) |
| `SPARKY_FITNESS_FORCE_EMAIL_LOGIN` | backend | (secret) |
| `POSTGRES_DB` | postgres | sparkyfitness_db |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'sed -i "s#proxy_pass http://\${SPARKY_FITNESS_SERVER_HOST}:\${SPARKY_FITNESS_SERVER_PORT}#proxy_ssl_server_name on; proxy_ssl_name \${SPARKY_FITNESS_SERVER_HOST}; proxy_pass https://\${SPARKY_FITNESS_SERVER_HOST}:\${SPARKY_FITNESS_SERVER_PORT}#g; s#proxy_set_header Host \$host;#proxy_set_header Host \${SPARKY_FITNESS_SERVER_HOST}; proxy_set_header X-Forwarded-Host \$host;#g; s#proxy_set_header X-Forwarded-Proto \$scheme;#proxy_set_header X-Forwarded-Proto https;#g" /etc/nginx/templates/default.conf.template && exec /docker-entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/sparkyfitness)
