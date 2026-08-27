# Deploy Moodle | (Just Updated) LMS Whose Cron Actually Runs, Plugins Survive on Railway

Moodle LMS whose cron runs and whose plugins survive every redeploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-or-just-updated-lms-whose-cron-ac)

## About

Moodle is the open-source learning management system used by universities, schools and
corporate training teams: courses, enrolments, quizzes, assignments, grades, forums,
certificates and a plugin directory of thousands of add-ons. This template runs Moodle 5.2.2
with PostgreSQL, and is packaged so the two things every other Moodle listing on Railway gets
wrong actually work — the scheduled task runner, and persistence of anything you install or
upload after the first deploy.

Moodle is a PHP application that expects three things a container platform does not give it for
free. It needs its **cron** to run every minute: without it no email is ever sent, forum digests
and course-completion never process, scheduled backups never happen, and the notifications page
warns that the site is broken. It needs a **writable webroot** as well as a writable data
directory, because plugins installed from the admin UI are written into the code tree, not into
`moodledata`. And it needs to be told that TLS is terminated in front of it, or every generated
URL comes out as `http://` and browsers block the assets.

This image runs Moodle, nginx, PHP-FPM 8.3 and the Moodle cron worker under runit in a single
service, mounts one volume over `/var/www` so both the webroot and `moodledata` are durable,
repairs the volume's ownership on boot (Railway mounts volumes as uid 0 while the app runs
unprivileged), honours Railway's injected `$PORT`, derives the site URL and the SSL-proxy
setting from `RAILWAY_PUBLIC_DOMAIN`, and sizes PHP-FPM's worker pool and the opcache from the
container's own cgroup limits rather than a fixed guess. The admin password is generated per
deploy and re-applied on every boot, so a redeploy doubles as a working password reset — useful,
because a fresh Moodle has no mail server to send a reset link through.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moodle | `ghcr.io/bon5co/moodle-railway:5.2.2` | Web service |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MOODLE_PASSWORD` | moodle | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www`
- **Volume:** `/var/lib/postgresql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/moodle-or-just-updated-lms-whose-cron-ac)
