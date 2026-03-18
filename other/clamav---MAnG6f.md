# Deploy clamav on Railway

Open-source antivirus engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/MAnG6f)

## About

ClamAV is an open-source antivirus engine for detecting trojans, viruses,
malware, and other malicious threats. Visit [https://docs.clamav.net/](https://docs.clamav.net/)
for more information.

This template deploys ClamAV to [Railway](https://railway.app/). It uses the
[official ClamAV Docker image](https://hub.docker.com/r/clamav/clamav/), and
modifies it to support configuration via environment variables.

To configure ClamAV via environment variables, set
`CLAMD_CONF_${CONFIGURATION_KEY}=${VALUE}` where `CONFIGURATION_KEY` is the
name of the configuration specified in [`clamd.conf`](https://linux.die.net/man/5/clamd.conf)
and `VALUE` is the value you want to set.

[`freshclam.conf`](https://linux.die.net/man/5/freshclam.conf) can also be
configured this way using `FRESHCLAM_CONF_${CONFIGURATION_KEY}=${VALUE}`.

Example(s):

- To set `StreamMaxLength=100M` in `clamd.conf`, set `CLAMD_CONF_StreamMaxLength=100M` in the environment
- To set `ConnectTimeout=30` in `freshclam.conf`, set `FRESHCLAM_CONF_ConnectTimeout=30` in the environment

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-clamav | [half0wl/railway-clamav](https://github.com/half0wl/railway-clamav) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLAMAV_NO_MILTERD` | true | Enable or disable clamav-milter, a mail scanning engine. This MUST be disabled on Railway as it is unsupported. |
| `CLAMD_CONF_TCPAddr` | ::1 | Default TCP listening address. |
| `CLAMD_CONF_StreamMaxLength` | 10M | Maximum (file) size over remote TCP connections. Defaults to 10M. |

## Configuration

- **TCP Proxies:** 3310

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/MAnG6f)
