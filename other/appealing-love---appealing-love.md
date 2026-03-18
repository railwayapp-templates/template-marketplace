# Deploy appealing-love on Railway

The best Tinfoil store that scrapes for you

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appealing-love)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tinfoil-ultranx-scraper | [Thiago-Heleno/tinfoil-ultranx-scraper](https://github.com/Thiago-Heleno/tinfoil-ultranx-scraper) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Cache TTL in milliseconds (default: 5 minutes) |
| `REFERRER` | - | Enable request logging (true/false) |
| `MAX_PAGES` | 10 | Auth token for API downloads (get from browser after login) |
| `AUTH_TOKEN` | (secret) | Referrer URL for hotlink protection (optional) |
| `BATCH_SIZE` | 5 | Multi-page loading (pages to fetch at once) |
| `CACHE_TTL_MS` | 300000 | Maximum pages to fetch in multi-page mode |
| `LOG_REQUESTS` | true | Batch size for parallel game detail fetches |
| `MULTI_PAGE_COUNT` | 3 | - |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/appealing-love)
