# Deploy GoToSocial (SQLite) on Railway

A fast, fun, and small ActivityPub server for the Fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QZn_BX)

## About

With GoToSocial, you can keep in touch with your friends, post, read, and share images and articles. All without being tracked or advertised to!

Source: https://codeberg.org/superseriousbusiness/gotosocial

I created this template to enable easy one click deployment of GoToSocial on Railway. *You need to fill-in just two variables*. This deployment uses SQLite for database.

### Variables

`GTS_HOST`: Domain you want to run GoToSocial on [doc](https://docs.gotosocial.org/en/v0.19.1/getting_started/installation/container/#host).

e.g. gotosocial.example.com (Please fill-in the actual domain as once deployed, the domain can't be changed).

`TZ` : Timezone  [doc](https://docs.gotosocial.org/en/v0.19.1/getting_started/installation/container/#server-timezone-optional-but-recommended).

e.g. Asia/Kolkata

Note: After you deploy, setup the domain you enter in `GTS_HOST` in Railway settings under `Custom Domain`. 

If you have any queries regarding this template in specific then reach out to me through any [Mastodon client](https://gotosocial.abishekmuthian.com/@abishek_muthian).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gts | `abishekmuthian/deploy-gts-to-railway` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Timezone |
| `GTS_HOST` | - | Domain you are running GoToSocial on |
| `GTS_DB_TYPE` | sqlite | - |
| `GTS_log_level` | debug | - |
| `GTS_DB_ADDRESS` | /data/storage/sqlite.db | - |
| `GTS_WEB_ASSET_BASE_DIR` | /gotosocial/web/assets/ | - |
| `GTS_WEB_TEMPLATE_BASE_DIR` | /gotosocial/web/template/ | - |
| `GTS_STORAGE_LOCAL_BASE_PATH` | /data/storage | - |
| `GTS_WAZERO_COMPILATION_CACHE` | /data/.cachev | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/template/QZn_BX)
