# Deploy MollySocket on Railway

MollySocket allows getting signal notifications via UnifiedPush.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QhKRXF)

## About

<img src="https://molly.im/author/molly/avatar_huf94a2fd78ceb4148e0a28cd6efbae53a_18855_270x270_fill_lanczos_center_3.png" alt="drawing" width="140">

# MollySocket

MollySocket allows getting signal notifications via [UnifiedPush](https://unifiedpush.org/). It works like a linked device, which doesn't have an encryption key, connected to the Signal server. Everytime it receives an encrypted event, it notifies your mobile via UnifiedPush.

## Vapid Key

You can generate a private vapid key [here](https://tools.reactpwa.com/vapid) or [here](https://d3v.one/vapid-key-generator/). Copy the "privateKey" and use it for the MOLLY_VAPID_PRIVKEY variable. 

## Android Setup

- You need the right flavor of Molly to use UnifiedPush: https://github.com/mollyim/mollyim-android-unifiedpush.

- A [distributor app](https://unifiedpush.org/users/distributors/) (easiest is [ntfy](https://f-droid.org/en/packages/io.heckel.ntfy/))

Complete the setup in the Molly app; go to Settings &gt; Notifications &gt; Push Strategy &gt; Unified Push and enter the Server URL `https://your-project.up.railway.app` or your custom domain.

---

[MollySocket - GitHub](https://github.com/mollyim/mollysocket)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MollySocket | `ghcr.io/mollyim/mollysocket` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8020 | - |
| `MOLLY_DB` | /data/mollysocket.db | - |
| `RUST_LOG` | info | - |
| `MOLLY_HOST` | 0.0.0.0 | - |
| `MOLLY_PORT` | 8020 | - |
| `MOLLY_ALLOWED_UUIDS` | ["*"] | - |
| `MOLLY_VAPID_PRIVKEY` | - | Private Vapid Key. See template description on how to generate one. |
| `MOLLY_ALLOWED_ENDPOINTS` | ["*"] | - |

## Configuration

- **Start command:** `mollysocket`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/QhKRXF)
