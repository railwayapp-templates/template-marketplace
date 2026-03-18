# Deploy zooming-contentment on Railway

AI Coach that helps to improve pronunciation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-98HdG)

## About

# AI Pronunciation Coach

This template deploys an AI-powered pronunciation tutor web service. The backend is built with Flask and integrates with Azure Speech and OpenAI APIs to provide real-time pronunciation feedback, grammar correction, and conversational practice.

## Features
- Real-time speech-to-text and pronunciation assessment using Azure Speech Services
- Grammar correction and conversational AI using OpenAI GPT
- Audio feedback and pronunciation tips
- REST API endpoints for easy frontend integration

## Deployment Instructions
1. Click "Deploy" to launch the service.
2. Set the following environment variables in the dashboard:
   - `OPENAI_API_KEY` (your OpenAI API key)
   - `AZURE_SPEECH_KEY` (your Azure Speech API key)
   - `AZURE_SPEECH_REGION` (your Azure Speech region, e.g., `eastus`)
3. The service will be available at the provided public URL (e.g., `https://your-app.up.railway.app`).

## Getting Started
- Use the `/api/start_conversation` endpoint to begin a session.
- Use `/api/generate_speech` and `/api/process_speech` for speech synthesis and assessment.
- Integrate with your frontend by pointing API requests to the backend URL.

## System Requirements
- The deployment uses a Dockerfile to ensure all system dependencies (libsndfile1, libssl-dev, libasound2) are installed.

## Notes
- Make sure your API keys are valid and have sufficient quota.
- For best results, use a platform that supports Docker-based deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pronunciation-Backend | [vatsal4545/Pronunciation-Backend](https://github.com/vatsal4545/Pronunciation-Backend) | Worker |

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/-98HdG)
