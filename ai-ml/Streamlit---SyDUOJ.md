# Deploy Streamlit on Railway

A minimal Streamlit application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/SyDUOJ)

## About

This is a [Streamlit](https://docs.streamlit.io/) app that serves a simple hello world page on Railway. 

This example is set up to use Nixpacks to build and run the app on [Railway Platform](https://railway.com?referralCode=kanban).

## ✨ Features

- Python
- Streamlit
- Nixpacks

## 💁‍♀️ How to use

- Install Python requirements `pip install -r requirements.txt`
- Run locally using `streamlit run main.py`


## 📝 Notes
- To edit the python runtime verson, edit the `.python-version` file
- `nixpacks.toml` is set to use `8080` as the default port
- To learn about how to use Streamlit with most of its features, you can visit the [Streamlit Documentation](https://docs.streamlit.io/)
- To learn about Nixpacks and how to configure it, read their [Documentation](https://nixpacks.com/docs/providers/python)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Streamlit | [markgzhou/railway-streamlit](https://github.com/markgzhou/railway-streamlit) | Web service |

## Configuration

- **Start command:** `streamlit run main.py --server.address 0.0.0.0 --server.port 8080 --client.showErrorDetails false --server.fileWatcherType none --browser.gatherUsageStats false --client.toolbarMode minimal`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/SyDUOJ)
