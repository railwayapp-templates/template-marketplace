# Deploy Go Interview Practice on Railway

Deploy and Host go-interview-practice with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-interview-practice)

## About

Go Interview Practice is an interactive learning platform with 30+ coding challenges and framework tutorials for Echo, Gin, Fiber, Cobra, and GORM. Features AI-powered interview simulation, real-time leaderboards, and progress tracking. Try the live platform at [gointerview.dev](https://gointerview.dev) or explore the [GitHub repository](https://github.com/RezaSi/go-interview-practice).

Deploy your own private instance for teams, educational institutions, or organizations. Includes interactive code editor, automated testing, AI-powered code review, and competitive leaderboards with professional Railway hosting and automatic scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-interview-practice | [RezaSi/go-interview-practice](https://github.com/RezaSi/go-interview-practice) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `GO_ENV` | production |
| `CLAUDE_API_KEY` | (secret) |
| `GEMINI_API_KEY` | (secret) |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Start command:** `./web-ui`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, HTML, Shell, Python, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/go-interview-practice)
