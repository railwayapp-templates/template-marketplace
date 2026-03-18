# Deploy Prometheus Blackbox Exporter on Railway

Prometheus Blackbox Exporter — probe HTTP, TCP, DNS endpoints

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prometheus-blackbox-exporter)

## About

Prometheus Blackbox Exporter actively probes HTTP, HTTPS, TCP, DNS, and ICMP endpoints
  from the outside and exposes results as Prometheus metrics. It answers "is this
  reachable?" — enabling uptime monitoring, SSL certificate expiry alerts, and latency
  tracking without modifying application code.

  ## About Hosting Prometheus Blackbox Exporter

  Hosting the Blackbox Exporter requires running a long-lived HTTP service that
  Prometheus scrapes on demand. Each scrape triggers a live probe against a target URL or
   host, so the exporter must have outbound internet access and a stable, reachable
  endpoint for your Prometheus instance to query. Configuration is managed through a YAML
   file defining probe modules (HTTP, TCP, DNS, etc.). On Railway, the service runs as a
  single stateless container — no volumes, no databases, no sidecars required. Railway
  handles TLS termination, port assignment, and health checking automatically, making it
  one of the simplest services to operate.

  ## Common Use Cases

  - **Uptime and availability monitoring** — continuously probe production URLs and fire
  alerts when `probe_success` drops to 0
  - **SSL certificate expiry alerting** — track `probe_ssl_earliest_cert_expiry` and
  alert weeks before a cert expires
  - **TCP port reachability checks** — verify that databases, message brokers, or SSH
  hosts are accepting connections from outside your private network

  ## Dependencies for Prometheus Blackbox Exporter Hosting

  - **Prometheus** — a running Prometheus instance to scrape the `/probe` endpoint and
  evaluate alerting rules
  - **Alertmanager** *(optional)* — routes firing alerts to PagerDuty, Slack, or email
  when probes fail or certs near expiry

  ### Deployment Dependencies

  - [Prometheus Blackbox Exporter —
  GitHub](https://github.com/prometheus/blackbox_exporter)
  - [Full module configuration reference](https://github.com/prometheus/blackbox_exporter
  /blob/master/CONFIGURATION.md)
  - [Prometheus scrape configuration docs](https://prometheus.io/docs/prometheus/latest/c
  onfiguration/configuration/#scrape_config)
  - [Awesome Prometheus alerting rules
  (blackbox)](https://github.com/samber/awesome-prometheus-alerts)

  ### Implementation Details

  Trigger a probe by passing `target` and `module` as query parameters:

  GET /probe?target=https://example.com&amp;module=http_2xx

  Prometheus scrape config to wire this service into your existing Prometheus instance:

  ```yaml
  scrape_configs:
    - job_name: blackbox
      metrics_path: /probe
      params:
        module: [http_2xx]
      static_configs:
        - targets:
            - https://example.com
            - https://your-api.com/health
      relabel_configs:
        - source_labels: [__address__]
          target_label: __param_target
        - source_labels: [__param_target]
          target_label: instance
        - target_label: __address__
          replacement: :443

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blackbox-exporter-railway | [zuchka/blackbox-exporter-railway](https://github.com/zuchka/blackbox-exporter-railway) | Worker |

## Configuration

- **Healthcheck:** `/metrics`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/prometheus-blackbox-exporter)
