# Deploy Chartbrew on Railway

Chartbrew 5.3: dashboards and charts from your databases and APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chartbrew-1)

## About

Chartbrew builds live dashboards and charts from your databases and APIs. It connects to PostgreSQL, MySQL, MongoDB, Firestore, REST APIs and services like Stripe or Google Analytics, lets you query them with a visual builder or SQL, and shares dashboards publicly, by link or embedded in other sites.

This template runs the official `razvanilin/chartbrew:5.3.2` image as two services, the API and the web app, so each gets its own domain, plus Railway PostgreSQL and Redis. The owner account is created on first boot from the variables and further sign-ups are refused. The web service builds the interface at startup with the API's public URL, which takes about a minute. Chart data refreshes run as background jobs in Redis. Dashboards and connections live in Postgres, and credentials for data sources are encrypted with a generated key. Plan on about 1 GB of memory across services. Chartbrew is licensed under FSL-1.1-MIT.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `razvanilin/chartbrew:5.3.2` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | `razvanilin/chartbrew:5.3.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | web | 4018 |
| `NODE_ENV` | web | production |
| `VITE_APP_CLIENT_PORT` | web | 4018 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | api | 4019 |
| `NODE_ENV` | api | production |
| `CB_SECRET` | api | (secret) |
| `CB_API_HOST` | api | 0.0.0.0 |
| `CB_API_PORT` | api | 4019 |
| `CB_ADMIN_MAIL` | api | admin@example.com |
| `CB_DB_DIALECT` | api | postgres |
| `CB_DB_PASSWORD` | api | (secret) |
| `CB_DB_USERNAME` | api | (secret) |
| `CHARTBREW_SEED` | api | // First boot: create the owner account (Chartbrew allows only the first sign-up when CB_RESTRICT_SIGNUP=1).
const base = 'http://127.0.0.1:' + (process.env.CB_API_PORT || 4019);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 120; i++) {
  try {
    const r = await fetch(base + '/user', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Admin', email: process.env.CHARTBREW_ADMIN_EMAIL, password: process.env.CHARTBREW_ADMIN_PASSWORD }),
    });
    console.log('[seed] create owner ->', r.status, r.ok ? 'created' : '(already set up)');
    break;
  } catch (e) {
    await sleep(2000);
  }
} |
| `CB_REDIS_PASSWORD` | api | (secret) |
| `CB_RESTRICT_SIGNUP` | api | 1 |
| `CHARTBREW_ADMIN_EMAIL` | api | admin@example.com |
| `CHARTBREW_ADMIN_PASSWORD` | api | (secret) |

## Configuration

- **Start command:** `sh -c 'cd /code/client && npm run build && exec npx serve -s dist -l 4018'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'printf "%s\n" "$CHARTBREW_SEED" > /tmp/seed.mjs; cd /code/server; node index.js & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; node /tmp/seed.mjs & wait $pid'`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/chartbrew-1)
