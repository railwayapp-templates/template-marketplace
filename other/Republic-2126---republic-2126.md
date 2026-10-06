# Deploy Republic 2126 on Railway

Nation-building mass game for National Education, Secondary 3-4.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/republic-2126)

## About

Republic 2126 is a nation-building game for National Education, built for Secondary 3-4. Groups of five run a country as its ministers. They build it in class, then the whole cohort meets in the hall to face crises together. The winner is the most well-rounded country, not the richest.

One small Node.js server runs the whole game: the student app, the teacher console, the hall projector screen and the admin page. When you deploy, Railway asks for two passwords: an admin password for creating class rooms, and a hall key for running the cohort event. The site is ready as soon as the build finishes. Rooms are saved to a volume at /data, so they survive restarts and redeploys. There are no student accounts and no personal data. Keep it at one replica, because rooms live in the server's memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| republic-2126 | [ctss-joetay/republic-2126](https://github.com/ctss-joetay/republic-2126) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the server listens on. Leave as it is. |
| `HALL_KEY` | - | Hall key. Opens a hall room for the whole cohort. Give it to whoever runs the event. At least 8 characters, different from the admin password. |
| `ADMIN_KEY` | - | Admin password. Opens /admin, where you create class rooms. Keep it to yourself. At least 16 characters. |
| `SETUP_CODE` | - | Backup only. Leave as it is. Used by the /setup page if a password above was too short. |
| `ROOM_TTL_DAYS` | 14 | Days an untouched room is kept before it is cleared. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, HTML, Procfile

[View on Railway →](https://railway.com/deploy/republic-2126)
