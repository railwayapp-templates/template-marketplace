# Deploy JupyterLab | Use Open Source Models in Notebooks Directly on Railway

[Apr '26] Host any LLM Model using Ollama & Use in Jupyter Notebooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-jupyter-lab-or-run-local-llms-fro)

## About

Ollama + Jupyter Lab lets you run **local large language models (LLMs)** and interact with them directly from Jupyter notebooks. This template deploys Ollama as a model server and JupyterLab as a notebook environment, connected via private networking and backed by persistent storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jupyter | `jupyter/all-spark-notebook` | Web service |
| Ollama | `ollama/ollama` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Jupyter | 8888 | Port Jupyter listens on |
| `RESTARTABLE` | Jupyter | yes | Allows Jupyter to auto-restart if it crashes. |
| `OLLAMA_BASE_URL` | Jupyter | - | Internally connect with ollama |
| `JUPYTER_PASSWORD` | Jupyter | (secret) | login password - generated automatically |
| `EXTRA_PIP_PACKAGES` | Jupyter | ollama openai | Space-separated list of pip packages to auto-install at startup |
| `JUPYTER_ENABLE_LAB` | Jupyter | yes | Enables JupyterLab interface instead of the classic notebook. |
| `OLLAMA_ORIGINS` | Ollama | * | Comma-separated list of allowed origins for CORS. |
| `OLLAMA_DEFAULT_MODELS` | Ollama | deepseek-r1:1.5b | You can specify the deepseek model to download at boot time (from https://ollama.com/library). Default is deepseek-r1. You can also specify in the jupyter notebook. Please look at overview of this template for more info. |

## Configuration

- **Start command:** `/bin/sh -c " \     if [ -n \"${EXTRA_PIP_PACKAGES}\" ]; then \         echo \"Installing extra pip packages: ${EXTRA_PIP_PACKAGES}\"; \         pip install --no-cache-dir ${EXTRA_PIP_PACKAGES}; \     else \         echo \"No extra pip packages to install\"; \     fi && \     (echo ${JUPYTER_PASSWORD}; echo ${JUPYTER_PASSWORD}) | jupyter server password 2>&1 && \     chown ${NB_UID} /home/jovyan/.jupyter/jupyter_server_config.json && \     rm -rf ${RAILWAY_VOLUME_MOUNT_PATH}/lost+found && \     chown -R ${NB_UID} ${RAILWAY_VOLUME_MOUNT_PATH} && \     start.sh run-one-constantly jupyter lab 2>&1 \ "`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan/work`
- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-jupyter-lab-or-run-local-llms-fro)
