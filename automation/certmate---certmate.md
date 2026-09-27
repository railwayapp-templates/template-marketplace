# Deploy certmate on Railway

SSL certificate management system with a web UI and REST API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/certmate)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/certmate)

### Deploy and Host CertMate on Railway

**CertMate** is a modern, lightweight web application and REST API for automating SSL/TLS certificate generation, renewal, and management using Let's Encrypt and DNS providers like Cloudflare. This Railway template deploys `fabriziosalmi/certmate:2.21.3` as a containerized service with persistent storage for issued certificates, keys, and ACME configurations.

---

#### About Hosting CertMate

Hosting CertMate on Railway runs a single container instance using `fabriziosalmi/certmate:2.21.3`. A persistent volume is mounted at `/app/certificates` to ensure all issued SSL/TLS certificate files, private keys, and ACME account metadata survive container redeployments and restarts. The service listens on port `8000` with an active health check on `/health` and is publicly exposed via Railway's automatically configured HTTPS domain.

---

#### Common Use Cases

* **Automated Let's Encrypt SSL/TLS management**: Issue and renew wildcard and standard SSL certificates using ACME and Cloudflare DNS-01 challenges.
* **Centralized certificate distribution**: Provide a secure REST API endpoint for microservices, reverse proxies, and edge servers to fetch valid TLS certificates.
* **Certificate dashboard & monitoring**: Monitor certificate validity, expiration dates, and domain coverage through an intuitive web interface.
* **Cloudflare DNS integration**: Automate domain verification and challenge response without exposing internal web servers to public HTTP-01 verification.

---

#### Dependencies for CertMate Hosting

* **CertMate image:** `fabriziosalmi/certmate:2.21.3`
* **One persistent volume** mounted at `/app/certificates`
* **Railway public domain** mapped to port `8000`
* **Auto-generated secrets:** `SECRET_KEY` (32 chars) and `API_BEARER_TOKEN`
* **Optional external integrations:** Cloudflare API token (`CLOUDFLARE_TOKEN`) and Let's Encrypt contact email (`LETSENCRYPT_EMAIL`)

**Upstream:** [GitHub (fabriziosalmi/certmate)](https://github.com/fabriziosalmi/certmate) · [Docker Hub](https://hub.docker.com/r/fabriziosalmi/certmate)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `fabriziosalmi/certmate:2.21.3` |
| **Web UI & API Port** | `8000` |
| **Health Check Path** | `/health` |
| **Storage / Volume** | `/app/certificates` |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **certmate** | Certificate Manager + REST API | `/app/certificates` | Yes (Port `8000`) | Single container instance with `/health` monitor |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **certmate** | `/app/certificates` | Issued SSL/TLS certificates, private keys, ACME account credentials, and state files |

> **Warning:** Do **not** remove or detach the `/app/certificates` volume — deleting this volume will permanently erase all generated private keys, active SSL certificates, and ACME account history during redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Open the **certmate** service → **Variables** tab and set your `CLOUDFLARE_TOKEN` (for DNS-01 validation) and `LETSENCRYPT_EMAIL` (for expiration notices).
4. Retrieve your auto-generated `API_BEARER_TOKEN` (or `SECRET_KEY`) from the Variables tab to authenticate API requests.
5. Open the **certmate** service → **Settings** → **Networking** and click the generated public domain URL.
6. Access the CertMate dashboard or verify API availability at `https://${{RAILWAY_PUBLIC_DOMAIN}}/health`.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `FLASK_ENV` | `production` | Execution environment mode for the Flask server |
| `SECRET_KEY` | Auto-generated secret (32 chars) | Cryptographic key for session security and API signing |
| `API_BEARER_TOKEN` | `${{certmate.SECRET_KEY}}` | Bearer token required for authenticating REST API endpoints |
| `BEHIND_PROXY` | `true` | Enables Flask reverse proxy header handling (X-Forwarded-For / X-Forwarded-Proto) |
| `CLOUDFLARE_TOKEN` | *(empty)* | Cloudflare API token with DNS edit permissions for DNS-01 challenges |
| `LETSENCRYPT_EMAIL` | *(empty)* | Email address for Let's Encrypt registration and renewal alerts |
| `LOG_LEVEL` | `INFO` | Application log verbosity (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |
| `PORT` | `8000` | Internal port the Flask application listens on |

##### Custom Domain

1. Open the **certmate** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically for the CertMate interface.
4. Access the CertMate API and dashboard at `https://your.custom.domain`.

---

#### Updating CertMate

1. Open the **certmate** service → **Settings** → **Source**.
2. Update the image tag (e.g., `fabriziosalmi/certmate:2.21.3` to a newer version tag).
3. Click **Redeploy**.

All certificates, private keys, and ACME configuration files remain preserved inside the `/app/certificates` volume.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/app/certificates` Volume** — If the `/app/certificates` mount path is omitted or detached, all generated certificates and private keys will be lost on redeploy, potentially hitting Let's Encrypt rate limits when re-issuing.
* **Missing or Invalid `CLOUDFLARE_TOKEN`** — Automated DNS-01 ACME challenges will fail if `CLOUDFLARE_TOKEN` lacks `Zone.DNS:Edit` permissions or is left blank while requesting DNS-validated certificates.
* **Let's Encrypt Rate Limits without `LETSENCRYPT_EMAIL`** — Failing to supply a valid `LETSENCRYPT_EMAIL` may prevent critical expiration warnings or cause registration issues with ACME servers.
* **`BEHIND_PROXY` Misconfiguration** — Railway terminates TLS at the edge. `BEHIND_PROXY` must remain set to `true` so CertMate correctly processes incoming client IPs and HTTPS headers.

---

#### Why Deploy CertMate on Railway?

Railway delivers a seamless environment for running utility microservices. Hosting CertMate on Railway gives you an automated, secure certificate management node with persistent disk storage, instant HTTPS edge proxying, and automated container health checks.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| certmate | `fabriziosalmi/certmate:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port the app listens on inside the container |
| `FLASK_ENV` | production | Flask environment mode; disables debug mode and enables production settings |
| `LOG_LEVEL` | INFO | Verbosity of application logging |
| `SECRET_KEY` | (secret) | Auto-generated secret used for signing sessions/tokens (Flask) |
| `BEHIND_PROXY` | true | Tells the app it's running behind a reverse proxy, so it trusts forwarded headers (X-Forwarded-For, etc.) |
| `API_BEARER_TOKEN` | (secret) | Bearer token for authenticating API requests, mirrored from the "certmate" service's SECRET_KEY |
| `CLOUDFLARE_TOKEN` | (secret) | API token for Cloudflare, used to manage DNS records for certificate issuance/validation |
| `LETSENCRYPT_EMAIL` | - | Email address used for Let's Encrypt account registration and expiry notices |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/certificates`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/certmate)
