# Deploy NSFW Detection API on Railway

FastAPI NSFW Detection API powered by Hugging Face.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Tlmof_)

## About

NSFW Detection API

This template provides a complete, production-ready solution for integrating NSFW image detection into your web or mobile projects. Built with FastAPI, PyTorch, and Hugging Face’s Falconsai/nsfw_image_detection model, it offers automated content moderation with a customizable threshold. Note that this deployment is designed for image-based moderation only—features like video analysis or multi-modal content detection are not supported in this version.

Highlights
	•	FastAPI-based, asynchronous API for rapid image classification
	•	Hugging Face NSFW model for robust, AI-powered content filtering
	•	Customizable threshold for fine-tuning moderation sensitivity
	•	Dockerized and Railway-ready for seamless deployment
	•	Production-ready code with comprehensive documentation and examples

Usage

Deploy this template by cloning the repository and following the provided instructions. You can run it locally with Uvicorn or deploy it to Railway using the included Dockerfile. Simply send POST requests to the /detect endpoint with your image file and an optional threshold value to get real-time NSFW classification.

License

This template is licensed under the MIT License.

Helpful Resources
	•	GitHub Repository: https://github.com/JarJarMadeIt/nsfw-detection-api
	•	Hugging Face Model: Falconsai/nsfw_image_detection
	•	FastAPI Documentation: https://fastapi.tiangolo.com/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nsfw-detection-api | [JarJarMadeIt/nsfw-detection-api](https://github.com/JarJarMadeIt/nsfw-detection-api) | Worker |

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/Tlmof_)
