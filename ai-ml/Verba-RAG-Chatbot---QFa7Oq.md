# Deploy Verba (RAG Chatbot) on Railway

Retrieval Augmented Generation (RAG) chatbot powered by Weaviate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QFa7Oq)

## About

Verba, developed by Weaviate, is an open-source Retrieval-Augmented Generation (RAG) application designed to provide personalized, AI-driven answers using your own data. Its modular architecture allows for easy customization and integration with various AI models and data sources.

Key Features:
	•	Data Ingestion: Verba supports importing various data formats, including text files, PDFs, and GitHub repositories. It utilizes tools like UnstructuredIO for seamless data ingestion.
	•	Data Chunking: The application offers multiple chunking strategies, such as token-based and sentence-based chunking, to segment documents into manageable pieces for efficient processing. 
	•	Embedding and Retrieval: Verba integrates with embedding models from providers like OpenAI, Cohere, and Hugging Face. It uses Weaviate’s vector database for storing and retrieving data based on semantic relevance. ￼
	•	Answer Generation: The platform supports various language models, including GPT-4o to generate accurate and contextually relevant answers.
	•	User Interface: Verba features a user-friendly web interface that allows for easy data upload, management, and interaction. Users can view sources directly in the UI, with highlighted chunks for transparency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Verba | [chinpeerapat/Verba](https://github.com/chinpeerapat/Verba) | Web service |
| Weaviate | `semitechnologies/weaviate:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `GITHUB_TOKEN` | Verba | (secret) |
| `OPENAI_API_KEY` | Verba | (secret) |
| `PORT` | Weaviate | 8080 |
| `ENABLE_MODULES` | Weaviate | text2vec-cohere,text2vec-huggingface,text2vec-palm,text2vec-openai,generative-openai,generative-cohere,generative-palm,ref2vec-centroid,reranker-cohere,qna-openai |
| `CLUSTER_HOSTNAME` | Weaviate | node1 |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/weaviate`

**Category:** AI/ML · **Languages:** TypeScript, Python, HTML, GLSL, JavaScript, Dockerfile, CSS, Shell

[View on Railway →](https://railway.com/template/QFa7Oq)
