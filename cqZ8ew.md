# Deploy asciinema on Railway

Record and share your terminal sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cqZ8ew)

## About

# asciinema

__asciinema__ (aka asciinema CLI or asciinema recorder) is a command-line tool
for recording terminal sessions.

Unlike typical _screen_ recording software, which records visual output of a
screen into a heavyweight video files (`.mp4`, `.mov`), asciinema recorder runs
_inside a terminal_, capturing terminal session output into a lightweight
recording files in the
[asciicast](https://docs.asciinema.org/manual/asciicast/v2/) format (`.cast`).

The recordings can be replayed in a terminal, embedded on a web page with the
[asciinema player](https://docs.asciinema.org/manual/player/), or published to
an [asciinema server](https://docs.asciinema.org/manual/server/), such as
[asciinema.org](https://asciinema.org), for further sharing.

[![asciinema CLI
demo](https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.svg)](https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH?autoplay=1)

Notable features:

* [recording](https://docs.asciinema.org/manual/cli/usage/#asciinema-rec-filename)
  and
  [replaying](https://docs.asciinema.org/manual/cli/usage/#asciinema-play-filename)
  of sessions inside a terminal,
* live streaming of terminal sessions, with local HTTP server mode, and a relay
  forwarding mode,
* [light-weight recording
  format](https://docs.asciinema.org/manual/asciicast/v2/), which is highly
  compressible (down to 15% of the original size e.g. with `zstd` or `gzip`),
* integration with [asciinema
  server](https://docs.asciinema.org/manual/server/), e.g.
  [asciinema.org](https://asciinema.org), for easy recording hosting.

# asciinema server

__asciinema server__ is a server-side component of the asciinema ecosystem.

It implements a hosting platform for terminal session recordings. This includes
an API endpoint for uploading recordings, which is used by the [asciinema
CLI](https://docs.asciinema.org/manual/cli/), and offers a familiar web
interface for viewing, browsing, sharing and managing recordings.

The server is built with [Elixir language](https://elixir-lang.org/) and
[Phoenix framework](https://www.phoenixframework.org/), and embeds asciinema's
virtual terminal, [avt](https://github.com/asciinema/avt), to perform tasks such
as preview generation and recording analysis.

[asciinema.org](https://asciinema.org) is a public asciinema server instance
managed by the asciinema team, offering free hosting for terminal recordings,
available to everyone. Check [asciinema.org/about](https://asciinema.org/about)
to learn more about this instance.

You can easily [self-host asciinema
server](https://docs.asciinema.org/manual/server/self-hosting/) and use the
[asciinema CLI](https://docs.asciinema.org/manual/cli/) with your own instance.
If you're not comfortable with uploading your terminal sessions to
asciinema.org, if your company policy prevents you from doing so, or if you
simply prefer self-hosting everything, then asciinema has you covered.

Notable features:

- hosting of terminal session recordings in
  [asciicast](https://docs.asciinema.org/manual/asciicast/v2/) format,
- perfectly integrated [asciinema
  player](https://docs.asciinema.org/manual/player/) for best viewing experience,
- easy [sharing](https://docs.asciinema.org/manual/server/sharing/) of
  recordings via secret links,
- easy [embedding](https://docs.asciinema.org/manual/server/embedding/) of the
  player, or linking via preview images (SVG),
- privacy friendly - no tracking, no ads,
- visibility control for recordings: unlisted (secret) or public,
- editable recording metadata like title or long description (Markdown),
- configurable terminal themes and font families,
- ability to download plain text version (`.txt`) of a recording.

Refer to [asciinema server docs](https://docs.asciinema.org/manual/server/) for
further details.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| asciicinema | `ghcr.io/asciinema/asciinema-server:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/asciinema`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/cqZ8ew)
