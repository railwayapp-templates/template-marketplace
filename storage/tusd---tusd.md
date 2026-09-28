# Deploy tusd on Railway

tusd 2.10: resumable file uploads over the tus protocol, token-protected.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tusd)

## About

tusd is the official reference server for tus, the open protocol for resumable file uploads. Clients upload in chunks and can resume after a dropped connection instead of starting over. Client libraries exist for browsers, iOS, Android, Node.js, Python and more, including Uppy, a popular upload widget.

This template runs the official `tusproject/tusd:v2.10.1` image with its upload endpoint at `/files/` on a public HTTPS domain. Finished and partial uploads are stored on a Railway volume. By default, a pre-create hook accepts new uploads only when the request carries `Authorization: Bearer `. To decide per user instead, set `TUSD_HOOKS_HTTP` to an endpoint in your own backend, and tusd will ask it before accepting each upload. Uploads are capped at 1 GiB each by default. A finished upload can be downloaded from its unguessable URL. tusd runs as an unprivileged user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tusd | `tusproject/tusd:v2.10.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `TUSD_MAX_SIZE` | 1073741824 |
| `TUSD_UPLOAD_TOKEN` | (secret) |

## Configuration

- **Start command:** `sh -c 'mkdir -p /tmp/hooks /srv/tusd-data/data; chown tusd:tusd /srv/tusd-data /srv/tusd-data/data; printf "%s\n" "#!/bin/sh" "jq -e --arg t \"Bearer \$TUSD_UPLOAD_TOKEN\" \".Event.HTTPRequest.Header.Authorization[0] == \\\$t\" >/dev/null && exit 0" "jq -nc \"{RejectUpload:true,HTTPResponse:{StatusCode:401}}\"" > /tmp/hooks/pre-create; chmod 755 /tmp/hooks/pre-create; if [ -n "${TUSD_HOOKS_HTTP:-}" ]; then set -- -hooks-http "$TUSD_HOOKS_HTTP" -hooks-http-forward-headers Authorization,Cookie; else set -- -hooks-dir /tmp/hooks; fi; exec su -s /bin/sh -c "exec \"\$0\" \"\$@\"" -- tusd /usr/local/share/docker-entrypoint.sh -host "" -port 8080 -base-path /files/ -behind-proxy -upload-dir /srv/tusd-data/data -hooks-enabled-events pre-create -max-size "${TUSD_MAX_SIZE:-0}" "$@"'`
- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/tusd-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/tusd)
