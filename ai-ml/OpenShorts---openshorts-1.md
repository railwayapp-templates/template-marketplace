# Deploy OpenShorts on Railway

AI short generator from your long form video

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openshorts-1)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

This template runs as a single container with a persistent volume for generated videos and uploaded source files. The dashboard, the JSON API, the healthcheck and the video files are all served by one FastAPI process on `$PORT`. There is no external database to manage — clips are written directly to the attached volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openshorts | [INAPP-Mobile/openshorts-fresh](https://github.com/INAPP-Mobile/openshorts-fresh) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_REGION` | eu-west-3 | Optional. AWS region for the S3 bucket used for clip uploads. |
| `APIFY_TOKEN` | (secret) | Optional. Apify token for YouTube downloads. Apify runs on residential IPs, bypassing YouTube's datacenter-IP bot checks. Free tier includes $5/month usage. Sign up at https://apify.com. If not set, falls back to yt-dlp (may fail on Railway's AWS/GCP IPs). |
| `AWS_S3_BUCKET` | - | Optional. S3 bucket name where generated clips are uploaded. |
| `GEMINI_API_KEY` | (secret) | REQUIRED. Google Gemini API key for AI clip analysis, titles/thumbnails and voice-over. Get one at https://aistudio.google.com/apikey. Can also be passed per request via the X-Gemini-Key header. |
| `AWS_ACCESS_KEY_ID` | - | Optional. AWS access key for S3 upload of generated clips. |
| `MAX_CONCURRENT_JOBS` | 2 | Maximum number of video jobs processed in parallel. Each job is CPU/RAM intensive; lower keeps small Railway plans stable. |
| `AWS_S3_PUBLIC_BUCKET` | - | Optional. Public S3 bucket name whose objects get public URLs in generated pages. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Optional. AWS secret key paired with AWS_ACCESS_KEY_ID. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Python, TypeScript, HTML, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/openshorts-1)
