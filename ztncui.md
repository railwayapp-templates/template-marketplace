# Deploy ztncui on Railway

ZeroTier with a network controller [based on official image]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ztncui)

## About

ZeroTier with ztncui, based on the official image.

THIS IS NOT A PLANET, NOR A MOON. This is just a controller.

THIS INSTANCE CANNOT KEEP PANEL'S USER DATA, so if you created a user in the panel, it will disappear when the container redeployed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ztncui | `keynetworks/ztncui` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HTTP_PORT` | 3443 | Just leave it here. |
| `ZTNCUI_PASSWD` | - | You only need to change it here since all users will be reset when the container is redeployed. This is because we do not have another volume to store the panel's data. |
| `HTTP_ALL_INTERFACES` | true | Set it to true or you won't able to access the panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/zerotier-one`

**Category:** Other

[View on Railway →](https://railway.com/template/ztncui)
