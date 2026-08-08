# Deploy VoicePro on Railway

AI toolkit for voice cloning, TTS, and translation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/voicepro)

## About

Voice-Pro is an advanced AI-powered web application for multimedia content creation. It integrates speech recognition, zero-shot voice cloning, text-to-speech, YouTube audio extraction, and real-time multilingual translation into a unified Gradio interface. It is designed for content creators, podcasters, researchers, and developers needing a robust audio processing toolkit.

Hosting Voice-Pro on Railway provides a streamlined infrastructure for running resource-intensive AI models without manual server provisioning. Railway automatically handles the build process and dependency management, wrapping the Gradio application in an isolated container. Because Voice-Pro downloads substantial AI models, such as Whisper and CosyVoice, on its first run, Railway's persistent volume support ensures this data is securely cached, drastically reducing subsequent startup times and bandwidth usage. Railway manages all external networking, automatically routing traffic to the internal port and provisioning secure HTTPS endpoints out of the box. Given the heavy computational requirements of speech processing, Railway allows you to easily adjust vertical resources, ensuring the application has the necessary RAM and CPU allocated to handle audio translation, cloning, and synthesis efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| voice-pro | [arloodots/voice-pro](https://github.com/arloodots/voice-pro) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7870 | - |
| `GPU_CHOICE` | C | - |
| `AZURE_SPEECH_KEY` | - | "your_azure_speech_key_here" |
| `AZURE_SPEECH_REGION` | - | "eastus" |
| `AZURE_TRANSLATOR_KEY` | - | "your_azure_translator_key_here" |
| `AZURE_TRANSLATOR_REGION` | - | "eastus" |
| `AZURE_TRANSLATOR_ENDPOINT` | - | "https://your-translator-resource.cognitiveservices.azure.com/" |

## Configuration

- **Start command:** `bash start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/`

**Category:** AI/ML · **Languages:** Python, CSS, JavaScript, Batchfile, Shell

[View on Railway →](https://railway.com/deploy/voicepro)
