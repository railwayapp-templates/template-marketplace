# Deploy cloudflare-ddns on Railway

A small, feature-rich, and robust Cloudflare DDNS updater.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudflare-ddns)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/cloudflare-ddns)

### Deploy and Host Cloudflare DDNS on Railway

**Cloudflare DDNS** (by Favonia) is a lightweight, reliable Dynamic DNS daemon that automatically updates your Cloudflare DNS records when your public IP address changes. This Railway template deploys `favonia/cloudflare-ddns:1` as an always-on background service to keep your custom domains pointing to your dynamic infrastructure seamlessly.

---

#### About Hosting Cloudflare DDNS

Hosting Cloudflare DDNS on Railway runs a single stateless container using the official `favonia/cloudflare-ddns:1` image. The container periodically checks the external IPv4 (and optionally IPv6) address of your egress connection and updates your specified domain records via the Cloudflare API. It requires a Cloudflare API Token with DNS edit permissions (`CLOUDFLARE_API_TOKEN`) and a list of target domains (`DOMAINS`).

---

#### Common Use Cases

* **Dynamic IP synchronization**: Automatically keep apex domains and subdomains synchronized with dynamic IP addresses without manual DNS edits.
* **Cloudflare CDN proxy management**: Toggle Cloudflare's proxy shield (`PROXIED=true`) on or off directly through environment variables.
* **Multi-domain DNS automation**: Manage A records across multiple domains and hostnames (`example.org`, `www.example.org`, `example.io`) in a single container deployment.
* **Self-hosted service routing**: Keep external DNS entries aligned with cloud or home-lab infrastructure.

---

#### Dependencies for Cloudflare DDNS Hosting

* **Cloudflare DDNS image:** `favonia/cloudflare-ddns:1`
* **Cloudflare API Token:** API token with `Zone - DNS - Edit` permissions created in the Cloudflare Dashboard
* **Target Domain(s):** Active Cloudflare DNS zones corresponding to `DOMAINS`

**Upstream:** [GitHub (favonia/cloudflare-ddns)](https://github.com/favonia/cloudflare-ddns) · [Docker Hub](https://hub.docker.com/r/favonia/cloudflare-ddns)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `favonia/cloudflare-ddns:1` |
| **Type** | Background Daemon / Service |
| **Storage / Volume** | None (Stateless) |
| **Primary Auth** | Cloudflare API Token (`CLOUDFLARE_API_TOKEN`) |
| **Network** | Outbound HTTP/HTTPS to Cloudflare API |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **cloudflare-ddns** | Dynamic DNS Updater Daemon | None | Optional | Background process monitoring egress IP |

###### Volumes (drives) — what to mount

This service is **stateless** and does not require persistent volume mounts. Configuration state and API credentials are read entirely from environment variables.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account).
3. Create a Cloudflare API Token:
   * Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens).
   * Click **Create Token** → Select **Edit zone DNS** template.
   * Under **Permissions**, ensure `Zone - DNS - Edit` is selected.
   * Select your target zones under **Zone Resources** and create the token.
4. Fill in the required environment variables during Railway deployment:
   * `CLOUDFLARE_API_TOKEN`: Paste your Cloudflare API token.
   * `DOMAINS`: Enter your comma-separated domains (e.g., `example.org,www.example.org,sub.example.io`).
5. Click **Deploy**.
6. Monitor the service deployment logs in Railway to confirm successful IP detection and Cloudflare record updates.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `CLOUDFLARE_API_TOKEN` | `` | Cloudflare API token with `Zone.DNS` edit privileges |
| `DOMAINS` | `example.org,www.example.org,example.io` | Comma-separated list of domains and subdomains to update |
| `PROXIED` | `false` | Enable (`true`) or disable (`false`) Cloudflare's orange-cloud proxying |
| `IP6_PROVIDER` | `none` | IPv6 provider mode (`none` to disable IPv6, or `autodetect`) |

##### Proxying &amp; IPv6 Settings

* **Cloudflare Proxy Shield (`PROXIED`)**: Set to `true` if you want Cloudflare to proxy HTTP traffic (hiding your origin IP and applying Cloudflare WAF/CDN). Set to `false` for direct DNS resolution (e.g. for non-HTTP services or direct connections).
* **IPv6 Support (`IP6_PROVIDER`)**: By default, `IP6_PROVIDER=none` restricts updates to IPv4 (A records). If your deployment environment supports IPv6 and you wish to update AAAA records, set `IP6_PROVIDER=autodetect`.

---

#### Updating Cloudflare DDNS

1. Open the **cloudflare-ddns** service → **Settings** → **Source**.
2. Update the image tag (e.g., `favonia/cloudflare-ddns:1` to a specific release tag).
3. Click **Redeploy**.

---

#### Traps

**Common pitfalls and failure modes:**

* **Invalid or Inadequate API Token Permissions** — Ensure your token uses `Zone - DNS - Edit` permissions. Using a Global API Key or a token scoped to the wrong zone will result in `401 Unauthorized` or `403 Forbidden` API errors in container logs.
* **Missing Initial DNS Records in Cloudflare** — Cloudflare DDNS updates *existing* A or AAAA records. Make sure the record (even with a placeholder IP) exists in your Cloudflare DNS dashboard before the daemon runs.
* **Egress IP vs Origin Server IP** — Railway containers route outbound traffic through Railway infrastructure egress IPs. If you intended to update DNS for a home router behind dynamic residential ISP IP, note that this container detects the *Railway runner's* egress IP address.
* **Placeholder Domain Values** — Forgetting to replace the default `example.org,www.example.org,example.io` string will cause API update failures for non-existent zones.

---

#### Why Deploy Cloudflare DDNS on Railway?

Railway provides zero-downtime, always-on container execution. Deploying Cloudflare DDNS on Railway ensures your DNS records are monitored and refreshed around the clock without needing to run local background scripts or cron jobs on personal machines.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudflare-ddns | `favonia/cloudflare-ddns:1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DOMAINS` | - | Comma-separated list of domains to manage through Cloudflare, for example: example.org,www.example.org,example.io. |
| `PROXIED` | - | Whether Cloudflare proxying should be enabled for the configured domains. Set to true or false. |
| `IP6_PROVIDER` | - | IPv6 provider to use for DNS configuration. Set to none if IPv6 is not required. |
| `CLOUDFLARE_API_TOKEN` | (secret) | Cloudflare API token used to authenticate and manage the configured DNS records. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/cloudflare-ddns)
