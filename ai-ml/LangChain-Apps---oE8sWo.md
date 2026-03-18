# Deploy LangChain Apps on Railway

Sample LangChain apps for search, text, document, URL, and news summaries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oE8sWo)

## About

### Template
This template deploys a collection of Streamlit apps that utilize the LangChain framework for interacting with large language models (LLMs).

### Search (langchain-search)
A sample Streamlit web application for live Google search queries using LangChain and SerpApi. Read more below:
* [GitHub repo](https://github.com/alphasecio/langchain-examples/blob/main/search)
* [Google Colab notebook](https://colab.research.google.com/github/alphasecio/langchain-examples/blob/main/search/langchain_search.ipynb)

### Search with Tavily API (langchain-search-tavily)
A sample Streamlit web application for live Google search queries using LangChain and Tavily Search API. Read more below:
* [GitHub repo](https://github.com/alphasecio/langchain-examples/blob/main/search-tavily)

### Text Summary (langchain-text-summary)
A sample Streamlit web application for summarizing text using LangChain and OpenAI. Read more below:
* [Summarize Text with LangChain and OpenAI](https://alphasec.io/summarize-text-with-langchain-and-openai/)
* [GitHub repo](https://github.com/alphasecio/langchain-examples/blob/main/text-summary)
* [Google Colab notebook](https://colab.research.google.com/github/alphasecio/langchain-examples/blob/main/text-summary/langchain_text_summarizer.ipynb)

### Document Summary (langchain-doc-summary)
A sample Streamlit web application for summarizing documents using LangChain and Chroma. Read more below:
* [Summarize Documents with LangChain and Chroma](https://alphasec.io/summarize-documents-with-langchain-and-chroma/)
* [GitHub repo](https://github.com/alphasecio/langchain-examples/blob/main/chroma-summary)
* [Google Colab notebook](https://colab.research.google.com/github/alphasecio/langchain-examples/blob/main/chroma-summary/langchain_doc_summarizer.ipynb)

### URL Summary (langchain-url-summary)
A sample Streamlit application for URL summaries using LangChain and OpenAI. Read more below:
* [GitHub repo](https://github.com/alphasecio/langchain-examples/tree/main/url-summary)

### News Search & Summary (langchain-news-summary)
A sample Streamlit application for Google news search and summaries using LangChain and Serper API. Read more below:
* [Summarize Google News Results with LangChain and Serper API](https://alphasec.io/summarize-google-news-results-with-langchain-and-serper-api)
* [GitHub repo](https://github.com/alphasecio/langchain-examples/tree/main/news-summary)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langchain-text-summary | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /text-summary) | Web service |
| langchain-search | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /search) | Web service |
| langchain-search-tavily | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /search-tavily) | Web service |
| langchain-doc-summary | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /chroma-summary) | Web service |
| langchain-news-summary | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /news-summary) | Web service |
| langchain-url-summary | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /url-summary) | Web service |
| langchain-gemini-chat-pdf | [alphasecio/langchain-examples](https://github.com/alphasecio/langchain-examples) (root: /gemini-chat-pdf) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | langchain-text-summary | 8501 |
| `PORT` | langchain-search | 8501 |
| `PORT` | langchain-search-tavily | 8501 |
| `PORT` | langchain-doc-summary | 8501 |
| `PORT` | langchain-news-summary | 8501 |
| `PORT` | langchain-url-summary | 8501 |
| `PORT` | langchain-gemini-chat-pdf | 8501 |

## Configuration

- **Start command:** `streamlit run streamlit_app.py`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/chroma_db`

**Category:** AI/ML · **Languages:** Python, Jupyter Notebook

[View on Railway →](https://railway.com/deploy/oE8sWo)
