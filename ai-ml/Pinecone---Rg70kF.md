# Deploy Pinecone on Railway

Sample Pinecone apps for document summarization and question-answering.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Rg70kF)

## About

### Template
This template deploys sample Streamlit web apps for document summarization and generative question-answering using LangChain and Pinecone.

### Highlights
[LangChain](https://langchain.readthedocs.io/en/latest) is an open-source framework created to aid the development of applications leveraging the power of large language models (LLMs). It can be used for chatbots, text summarisation, data generation, code understanding, question answering, evaluation, and more. [Pinecone](https://www.pinecone.io/), on the other hand, is a fully managed vector database, making it easy to build high-performance vector search applications without infrastructure hassles. Once you have generated the vector embeddings using a service like [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings), you can store, manage and search through them in Pinecone to power semantic search, recommendations, and other information retrieval use cases. See [this post](https://alphasec.io/langchain-decoded-part-2-embeddings/) on LangChain Embeddings for a primer on embeddings and sample use cases.

## Learn More
* [Summarize Documents with LangChain and Pinecone](https://alphasec.io/summarize-documents-with-langchain-and-pinecone/)
* [langchain-pinecone-summary](https://github.com/alphasecio/langchain-examples/tree/main/pinecone-summary) GitHub repo
* [Generative Question-Answering with LangChain and Pinecone](https://alphasec.io/generative-question-answering-with-langchain-and-pinecone/)
* [langchain-pinecone-qa](https://github.com/alphasecio/langchain-examples/tree/main/pinecone-qa) GitHub repo

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langchain-pinecone-summary | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /pinecone-summary) | Web service |
| langchain-pinecone-qa | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /pinecone-qa) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | langchain-pinecone-summary | 8501 |
| `PORT` | langchain-pinecone-qa | 8501 |

## Configuration

- **Start command:** `streamlit run streamlit_app.py`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Jupyter Notebook

[View on Railway →](https://railway.com/deploy/Rg70kF)
