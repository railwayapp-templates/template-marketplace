# Deploy PageIndex on Railway

No vector DB, no chunking. LLM reasoning-based RAG with 98.7% accuracy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pageindex)

## About

![PageIndex](https://github.com/user-attachments/assets/46201e72-675b-43bc-bfbd-081cc6b65a1d)

**PageIndex** is an open-source, vectorless RAG (Retrieval-Augmented Generation) framework by VectifyAI. Instead of vector databases and similarity search, it builds a hierarchical tree index from your documents and uses LLM reasoning to retrieve the most relevant sections — the way a domain expert would navigate a document, not a search engine.

**No Vector DB. No Chunking. Just Reasoning.**

Traditional RAG approximates relevance through embedding distance. PageIndex uses agentic tree search — navigating your document the way a domain expert would — making it ideal for financial reports, legal filings, academic papers, and any long-form professional document where similarity ≠ relevance. Inspired by AlphaGo, PageIndex performs retrieval in two steps: (1) generate a hierarchical "Table-of-Contents" tree index from your document, and (2) perform reasoning-based retrieval through LLM-guided tree search. It achieves state-of-the-art **98.7% accuracy on FinanceBench**, outperforming all vector-based RAG baselines.

This Railway template wraps PageIndex in a production-ready HTTP API. Bring your OpenAI (or any LiteLLM-compatible) API key, and Railway handles the rest. Upload a PDF or Markdown file, get back a structured JSON tree — ready to plug into your RAG pipeline, agentic workflow, or MCP client. No vector database setup, no embedding pipelines, no chunking configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PageIndex | [sahilrupani/pageindex-railway](https://github.com/sahilrupani/pageindex-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Passed to LiteLLM, works with OpenAI. Required for all indexing |

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/pageindex)
