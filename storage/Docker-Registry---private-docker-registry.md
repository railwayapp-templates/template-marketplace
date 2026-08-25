# Deploy Docker Registry on Railway

A private server for storing and sharing container images

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/private-docker-registry)

## About

Docker Registry is the reference implementation of the OCI Distribution Specification, the server behind `docker push` and `docker pull`. Maintained by the CNCF as [distribution/distribution](https://github.com/distribution/distribution), it gives a team its own image store rather than an account on a shared one, so proprietary images stay private, CI stops hitting Docker Hub rate limits, and build artifacts live where you choose.

Self-host Docker Registry on Railway and the template wires up three services. **registry** runs `registry:3` and serves the `/v2/` API on a public HTTPS domain — the endpoint you point `docker login` at. Railway terminates TLS for you, so no `insecure-registries` entry is needed on any client. **registry-ui** runs [joxit/docker-registry-ui](https://github.com/Joxit/docker-registry-ui), a browsable catalog of everything you have pushed; it proxies the registry over the private network, so one login covers both. **Redis** holds distribution's shared blob-descriptor cache, which lets the registry run more than one replica coherently. Every layer, manifest and tag goes to a Railway object storage bucket rather than a disk, so nothing is pinned to a single container.

![Diagram of the registry, registry-ui and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787354934/docker-registry-architecture.png)

A container registry is a content-addressable store: clients upload layers by digest, then a manifest naming them, then a tag pointing at the manifest. Docker Registry implements exactly that and nothing more, which is why it is small and fast. Teams self-host when images hold source, models or customer data that should not sit in a third-party account, or when CI pulls enough that public rate limits bite.

- Full OCI Distribution Specification v1.1 support: Docker, Podman, BuildKit, containerd, Skopeo, ORAS and Helm all work unchanged
- Username and password auth on every request, catalog reads included
- Object-storage backend, so image data is not tied to one container's disk
- Tag deletion through the API and the web UI, plus Prometheus metrics privately
- Stores any OCI artifact, not only images — Helm charts, WASM modules, SBOMs

The split is clean: the registry owns the API and all storage access, the UI is a static app plus a small reverse proxy holding no state, and Redis caches blob descriptors so repeated lookups skip object storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| registry | [gridalpha/docker-registry-railway](https://github.com/gridalpha/docker-registry-railway) | Web service |
| Redis | `redis:8.2` | Database |
| registry-ui | `joxit/docker-registry-ui:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | registry | 5001 | Debug port the health check probes |
| `S3_BUCKET` | registry | - | Bucket holding all image data |
| `S3_REGION` | registry | - | Bucket placement region |
| `REDIS_HOST` | registry | - | Blob descriptor cache host |
| `REDIS_PORT` | registry | - | Blob descriptor cache port |
| `REDIS_USER` | registry | (secret) | Blob descriptor cache username |
| `S3_ENDPOINT` | registry | - | Object storage endpoint URL |
| `REDIS_PASSWORD` | registry | (secret) | Blob descriptor cache password |
| `S3_ACCESS_KEY_ID` | registry | - | Bucket access key |
| `REGISTRY_PASSWORD` | registry | (secret) | Password docker login accepts |
| `REGISTRY_USERNAME` | registry | (secret) | Account docker login accepts |
| `REGISTRY_LOG_LEVEL` | registry | info | Log verbosity; debug is very loud |
| `REGISTRY_HTTP_SECRET` | registry | (secret) | Signs in-progress upload state |
| `S3_SECRET_ACCESS_KEY` | registry | (secret) | Bucket secret key |
| `REGISTRY_HTTP_DRAINTIMEOUT` | registry | 25s | Graceful shutdown window |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | registry-ui | 8080 | HTTP port nginx listens on |
| `PULL_URL` | registry-ui | - | Hostname shown in pull commands |
| `DELETE_IMAGES` | registry-ui | true | Offer tag deletion in the UI |
| `REGISTRY_TITLE` | registry-ui | Docker Registry | Name shown in the UI header |
| `SINGLE_REGISTRY` | registry-ui | true | Hide the registry switcher |
| `REGISTRY_SECURED` | registry-ui | true | Registry requires authentication |
| `SHOW_TAG_HISTORY` | registry-ui | true | Show image history and layers |
| `NGINX_LISTEN_PORT` | registry-ui | 8080 | Same port, read by the image entrypoint |
| `TAGLIST_PAGE_SIZE` | registry-ui | 100 | Tags shown per page |
| `SHOW_CONTENT_DIGEST` | registry-ui | true | Show manifest digests in tag lists |
| `NGINX_PROXY_PASS_URL` | registry-ui | - | Private registry upstream |
| `SHOW_CATALOG_NB_TAGS` | registry-ui | true | Show tag counts on the catalog |
| `CATALOG_ELEMENTS_LIMIT` | registry-ui | 1000 | Maximum repositories fetched |
| `CATALOG_DEFAULT_EXPANDED` | registry-ui | 1 | Expand repository groups by default |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'sed -i "s/^worker_processes.*/worker_processes 2;/" /etc/nginx/nginx.conf; set -- $(grep -m1 ^nameserver /etc/resolv.conf); if [ -z "$NGINX_RESOLVER" ] && [ -n "$2" ]; then case "$2" in *:*) NGINX_RESOLVER="[$2] valid=10s";; *) NGINX_RESOLVER="$2 valid=10s";; esac; fi; export NGINX_RESOLVER; case "$NGINX_PROXY_PASS_URL" in ""|http://:*) NGINX_PROXY_PASS_URL="http://registry.railway.internal:5000";; esac; export NGINX_PROXY_PASS_URL; echo "registry-ui: resolver=$NGINX_RESOLVER upstream=$NGINX_PROXY_PASS_URL"; exec /docker-entrypoint.sh nginx -g "daemon off;"'`
- **Healthcheck:** `/`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/private-docker-registry)
