# Deploy bayesian-quiz on Railway

Quantified pub quiz from the PyData Helsinki meetup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bayesian-quiz)

## About

Bayesian Quiz is a real-time pub quiz app for data scientists where players estimate numerical answers with uncertainty. Instead of just guessing a number, participants submit a probability distribution (mean + standard deviation), and scoring uses CRPS to reward both accuracy and well-calibrated confidence.

Bayesian Quiz is a single Python service with no database — all game state lives in memory. It uses FastAPI with Server-Sent Events to push real-time state changes to all connected clients:
   the quizmaster control panel, the projector display, and player phones. Railway's public domain is automatically used for the QR code that players scan to join. The in-memory architecture means it must run on a single node (no horizontal scaling), but it has been load-tested with 100 concurrent players on one instance. Quiz questions are uploaded as environment variables — use `just upload-quiz ` with the Railway CLI to set a `QUIZ_` variable from a text file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bayesian-quiz | [jkseppan/bayesian-quiz](https://github.com/jkseppan/bayesian-quiz) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `QUIZMASTER_PASS` | - | Password for the quizmaster |
| `QUIZMASTER_USER` | (secret) | User name for the quizmaster |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML, Python, JavaScript, Just, Procfile

[View on Railway →](https://railway.com/deploy/bayesian-quiz)
