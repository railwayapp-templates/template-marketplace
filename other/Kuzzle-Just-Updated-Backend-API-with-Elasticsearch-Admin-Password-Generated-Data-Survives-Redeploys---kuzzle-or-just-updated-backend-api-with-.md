# Deploy Kuzzle | (Just Updated) Backend API with Elasticsearch, Admin Password Generated, Data Survives Redeploys on Railway

Kuzzle backend API with Elasticsearch and Redis, secrets generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kuzzle-or-just-updated-backend-api-with-)

## About

Kuzzle is an open-source backend: a document store API over Elasticsearch with realtime subscriptions, users, roles and permissions built in. This template deploys Kuzzle with its own Elasticsearch and Redis, with the admin password and token secret generated for you.

The template starts three services: `kuzzle` (public HTTPS API), `elasticsearch` (private, persistent volume) and `redis` (private, password protected, persistent volume). On first boot Kuzzle creates an `admin` user with the generated `KUZZLE_ADMIN_PASSWORD` and restricts the `anonymous` role, so nothing is writable without logging in.

Machine-readable contract:

```
public_url:     https://${RAILWAY_PUBLIC_DOMAIN of service kuzzle}
internal_url:   http://kuzzle.railway.internal:8080
health:         GET /_healthCheck  (200 when ready)
login:          POST /_login/local
admin_user:     admin
credentials:    KUZZLE_ADMIN_PASSWORD (service kuzzle), REDIS_PASSWORD (service redis)
storage:        elasticsearch.railway.internal:9200 (private, no auth)
anonymous:      restricted (401 on user and admin routes)
port:           8080 (HTTP)
```

Working check, run after the deploy turns green:

```
curl -s https:///_healthCheck

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elasticsearch | `elasticsearch:8.19.5@sha256:767258226c972b46c0c22817c16a9d7f40a90f67ec71fdc33f3c831c8eecdd6e` | Database |
| redis | `redis:8@sha256:2c2dff791878316e3b083188be0d578423b24813cdda5de0e80ea4f7b3e6bfd6` | Database |
| kuzzle | `kuzzleio/kuzzle@sha256:e35ef299f221ce3ef0f90cf7b656ea55ad22df947fe1b177cd342c76d1766603` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `KUZZLE_ADMIN_PASSWORD` | kuzzle | (secret) |
| `kuzzle_security__authToken__secret` | kuzzle | (secret) |
| `kuzzle_services__internalCache__node__password` | kuzzle | (secret) |
| `kuzzle_services__memoryStorage__node__password` | kuzzle | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export ES_JAVA_OPTS="-Xms512m -Xmx512m" JAVA_TOOL_OPTIONS=-XX:ActiveProcessorCount=2; mkdir -p /usr/share/elasticsearch/data/es && chown -R 1000:0 /usr/share/elasticsearch/data && exec setpriv --reuid=1000 --regid=0 --clear-groups /usr/local/bin/docker-entrypoint.sh eswrapper -Ediscovery.type=single-node -Expack.security.enabled=false -Epath.data=/usr/share/elasticsearch/data/es -Enetwork.host=\"::\"'`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'export kuzzle_server__port=$PORT kuzzle_cluster__enabled=false kuzzle_services__storageEngine__majorVersion=8; B=http://localhost:$PORT; (until [ "$(curl -s -o /dev/null -w %{http_code} $B/_healthCheck)" != 000 ]; do sleep 2; done; curl -s -X POST "$B/_createFirstAdmin/admin?reset=true" -H "Content-Type: application/json" -d "{\"content\":{},\"credentials\":{\"local\":{\"username\":\"admin\",\"password\":\"$KUZZLE_ADMIN_PASSWORD\"}}}" >/dev/null; J=$(curl -s -X POST $B/_login/local -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"$KUZZLE_ADMIN_PASSWORD\"}" | sed -n "s/.*\"jwt\":\"\([^\"]*\)\".*/\1/p"); curl -s -X PUT $B/roles/anonymous -H "Authorization: Bearer $J" -H "Content-Type: application/json" -d "{\"controllers\":{\"auth\":{\"actions\":{\"login\":true,\"checkToken\":true,\"getCurrentUser\":true,\"getMyRights\":true,\"logout\":true}},\"server\":{\"actions\":{\"healthCheck\":true,\"now\":true}}}}" >/dev/null; echo kuzzle bootstrap done) & exec docker-entrypoint.sh node ./bin/start-kuzzle-server'`
- **Healthcheck:** `/_healthCheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kuzzle-or-just-updated-backend-api-with-)
