# Deploy TrendRadar — Automated News Monitoring & Daily Intelligence on Railway

Automated news crawling, daily summaries, RSS tracking, and web reports.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trendradar-automated-news-monitoring-and)

## About

**TrendRadar** is an automated news monitoring system that crawls multiple sources, deduplicates content, stores daily datasets in S3-compatible storage, and generates readable HTML intelligence reports. It is designed for continuous monitoring, historical tracking, and AI-assisted analysis.

This template deploys TrendRadar as a cron-based service on Railway. It periodically collects trending news and RSS feeds, processes and deduplicates them, and stores results in a Railway Bucket using S3-compatible APIs. Optional services include an MCP server for AI/agent access and a web-based S3 manager, both typically exposed through authenticated gateways. All data persists across restarts and deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trendradar-mcp | `wantcat/trendradar-mcp:3.1` | Worker |
| mcp-gateway | [XavTo/caddy-zero-trust](https://github.com/XavTo/caddy-zero-trust) | Web service |
| trendradar | `wantcat/trendradar:5.0` | Database |
| S3-gateway | [XavTo/caddy-zero-trust](https://github.com/XavTo/caddy-zero-trust) | Web service |
| s3manager | `cloudlena/s3manager` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | trendradar-mcp | 3333 | Port exposed by the service (used by the HTTP server) |
| `S3_REGION` | trendradar-mcp | - | S3 region of the Railway bucket |
| `AI_PROMPT_FILE` | trendradar-mcp | - | Customizes the AI analysis prompt. This tells the LLM how to summarize news, detect sentiment, and identify emerging trends from the raw data collected by the crawler. |
| `S3_BUCKET_NAME` | trendradar-mcp | - | Name of the Railway S3 bucket |
| `S3_ENDPOINT_URL` | trendradar-mcp | - | S3-compatible endpoint URL (Railway storage) |
| `STORAGE_BACKEND` | trendradar-mcp | remote | Storage backend mode (remote = S3) |
| `CONFIG_YAML_FILE` | trendradar-mcp | - | Overwrites the default config.yaml settings. It controls core system behaviors such as crawl depth, request intervals, storage paths, and integration settings for various news sources. |
| `S3_ACCESS_KEY_ID` | trendradar-mcp | - | S3 access key for bucket authentication |
| `FREQUENCY_WORDS_FILE` | trendradar-mcp | - | Defines the list of keywords and filtering rules. Use this to specify which topics you want to track (e.g., "AI", "Nvidia") and which words to exclude (e.g., "clickbait"). It supports regex and group aliasing. |
| `S3_SECRET_ACCESS_KEY` | trendradar-mcp | (secret) | S3 secret key for bucket authentication |
| `AUTH_PASS` | mcp-gateway | - | Password for HTTP basic authentication |
| `AUTH_USER` | mcp-gateway | (secret) | Username for HTTP basic authentication |
| `DOMAIN_NAME` | mcp-gateway | - | Public domain exposed by Railway |
| `UPSTREAM_URL` | mcp-gateway | - | Internal upstream service (TrendRadar MCP) |
| `RUN_MODE` | trendradar | cron | Execution mode (cron = scheduled runs) |
| `S3_REGION` | trendradar | - | Railway S3 region |
| `REPORT_MODE` | trendradar | daily | Report generation mode (daily summary) |
| `DISPLAY_MODE` | trendradar | keyword | Report display mode (keyword-based filtering) |
| `CRON_SCHEDULE` | trendradar | */30 * * * * | Cron schedule for TrendRadar execution, every 30 min |
| `IMMEDIATE_RUN` | trendradar | true | Run immediately on container startup |
| `AI_PROMPT_FILE` | trendradar | - | Customizes the AI analysis prompt. This tells the LLM how to summarize news, detect sentiment, and identify emerging trends from the raw data collected by the crawler. |
| `ENABLE_CRAWLER` | trendradar | true | Enable news and platform crawling |
| `S3_BUCKET_NAME` | trendradar | - | Railway S3 bucket name |
| `S3_ENDPOINT_URL` | trendradar | - | Railway S3 endpoint URL |
| `STORAGE_BACKEND` | trendradar | remote | Use remote storage backend (S3-compatible) |
| `CONFIG_YAML_FILE` | trendradar | - | Overwrites the default config.yaml settings. It controls core system behaviors such as crawl depth, request intervals, storage paths, and integration settings for various news sources. |
| `ENABLE_WEBSERVER` | trendradar | false | Disable built-in local web server (bucket-based access used) |
| `S3_ACCESS_KEY_ID` | trendradar | - | S3 access key |
| `ENABLE_NOTIFICATION` | trendradar | true | Enable notifications (requires channels to be configured) |
| `FREQUENCY_WORDS_FILE` | trendradar | - | Defines the list of keywords and filtering rules. Use this to specify which topics you want to track (e.g., "AI", "Nvidia") and which words to exclude (e.g., "clickbait"). It supports regex and group aliasing. |
| `S3_SECRET_ACCESS_KEY` | trendradar | (secret) | S3 secret key |
| `AUTH_PASS` | S3-gateway | - | Password for HTTP basic authentication |
| `AUTH_USER` | S3-gateway | (secret) | Username for HTTP basic authentication |
| `DOMAIN_NAME` | S3-gateway | - | Public domain exposed by Railway |
| `UPSTREAM_URL` | S3-gateway | - | Internal upstream service (S3 manager / bucket proxy) |
| `PORT` | s3manager | 8080 | Port exposed by the S3 gateway service |
| `REGION` | s3manager | auto | S3 region (auto-detected by Railway) |
| `USE_SSL` | s3manager | true | Enable SSL/TLS for S3 connections |
| `ENDPOINT` | s3manager | storage.railway.app | Railway S3-compatible storage endpoint, without "http://" |
| `ACCESS_KEY_ID` | s3manager | - | S3 access key for authentication |
| `SECRET_ACCESS_KEY` | s3manager | (secret) | S3 secret key for authentication |

## Configuration

- **Start command:** `/bin/sh -lc 'set -eux; sync_f() { t="$1"; u="$2"; c="${3:-}"; mkdir -p "$(dirname "$t")"; if [ -n "$c" ]; then echo "$c" > "$t"; else python3 -c "import urllib.request as u; u.urlretrieve(\"$u\", \"$t\")"; fi; }; sync_f "/app/config/config.yaml" "https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/config.yaml" "${CONFIG_YAML_FILE:-}"; sync_f "/app/config/frequency_words.txt" "https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/frequency_words.txt" "${FREQUENCY_WORDS_FILE:-}"; sync_f "/app/config/ai_analysis_prompt.txt" "https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/ai_analysis_prompt.txt" "${AI_PROMPT_FILE:-}"; cd /app && python3 -m mcp_server.server --transport http --port 3333'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -lc 'set -eux; mkdir -p /app/config; sync_f() { target="$1"; url="$2"; content="${3:-}"; if [ -n "$content" ]; then echo "$content" > "$target"; echo "Config $target chargee depuis variable."; else wget -qO "$target" "$url" || python3 -c "import urllib.request as u; u.urlretrieve(\"$url\", \"$target\")"; echo "Config $target telechargee depuis GitHub."; fi; }; sync_f "/app/config/config.yaml" "https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/config.yaml" "${CONFIG_YAML_FILE:-}"; sync_f "/app/config/frequency_words.txt" "https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/frequency_words.txt" "${FREQUENCY_WORDS_FILE:-}"; sync_f "/app/config/ai_analysis_prompt.txt" "https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/ai_analysis_prompt.txt" "${AI_PROMPT_FILE:-}"; printf "import os,time,pathlib,mimetypes,boto3\nfrom botocore.config import Config\nb=pathlib.Path(\"/app/output\")\nallow={\".html\",\".css\",\".js\",\".json\",\".png\",\".jpg\",\".txt\"}\nbkt=os.environ.get(\"S3_BUCKET_NAME\")\npref=os.environ.get(\"S3_REPORT_PREFIX\",\"web\").strip(\"/\")+\"/\"\ns3=boto3.client(\"s3\",endpoint_url=os.environ.get(\"S3_ENDPOINT_URL\"),region_name=os.environ.get(\"S3_REGION\"),aws_access_key_id=os.environ.get(\"S3_ACCESS_KEY_ID\"),aws_secret_access_key=os.environ.get(\"S3_SECRET_ACCESS_KEY\"),config=Config(signature_version=\"s3v4\"))\nwhile True:\n try:\n  if b.exists():\n   for p in b.rglob(\"*\"):\n    if p.is_file() and p.suffix.lower() in allow:\n     k=pref+p.relative_to(b).as_posix();ct,_=mimetypes.guess_type(p.name)\n     if p.suffix==\".html\":ct=\"text/html;charset=utf-8\"\n     e={\"ContentType\":ct} if ct else None\n     s3.upload_file(str(p),bkt,k,ExtraArgs=e)\n  time.sleep(60)\n except Exception as e:print(e);time.sleep(60)" > /app/upload_s3.py; python3 /app/upload_s3.py & exec /entrypoint.sh'`
- **Volume:** `/app/config`

**Category:** AI/ML · **Languages:** CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/trendradar-automated-news-monitoring-and)
