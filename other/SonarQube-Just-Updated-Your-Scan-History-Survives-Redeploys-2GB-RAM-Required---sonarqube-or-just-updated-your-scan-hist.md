# Deploy SonarQube | (Just Updated) Your Scan History Survives Redeploys, 2GB RAM Required on Railway

Self-hosted code scanner. Postgres attached, scans survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sonarqube-or-just-updated-your-scan-hist)

## About

SonarQube is the self-hosted static analysis server that scans your code for bugs, security
vulnerabilities, code smells and duplication, tracks the result over time, and fails your CI build
when quality drops below a gate you define. This template runs the Community edition on Railway
with PostgreSQL attached, persistent storage, and an administrator login that is not the one
printed in the manual.

SonarQube is a Java server with an embedded Elasticsearch node inside it, and that combination is
what makes it awkward to host. The embedded search node runs Elasticsearch's production bootstrap
checks and refuses to start unless the host kernel's `vm.max_map_count` is at least `262144` — a
`sysctl` no container on a managed platform is allowed to make. This template removes the
requirement rather than the check, so the search node starts on an ordinary unprivileged container.

Two more things bite anyone hosting it by hand. SonarQube will not run a real instance on its
embedded database, so PostgreSQL has to be attached and given storage of its own or every scan you
have ever run disappears on the next deploy. And the server ships with a documented default
administrator login that it does not force you to change — it answers the API, mints admin tokens
and creates projects — so a fresh instance on a public URL belongs to whoever finds it first.

This template resolves all three. Postgres is attached with its own volume, the SonarQube service
has a volume carrying its plugins and search index, the image is pinned by digest, and the
administrator password is generated per deployment. The container refuses to start at all if that
password is missing, so there is no path on which this comes up with the default login.

**Memory: 2 GB minimum.** Measured on this image: OOM-killed at 1 GB after 21 seconds, healthy at
2 GB, steady at roughly 1.8 GiB resident. Railway's Free (0.5 GB) and Trial (1 GB) per-service
limits cannot run it — deploy on Hobby or above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sonarqube | `ghcr.io/bon5co/sonarqube-railway@sha256:bcf3e0b742aba79f7dd27243122f2bf038b58a5ae171a5b3d3e9bdd594e668b6` | Web service |
| postgres | `postgres:17-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SONAR_JDBC_PASSWORD` | sonarqube | (secret) |
| `SONAR_ADMIN_PASSWORD` | sonarqube | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/system/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/sonarqube/extensions`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sonarqube-or-just-updated-your-scan-hist)
