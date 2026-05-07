# Deploy PageIndex on Railway

No vector DB, no chunking. LLM reasoning-based RAG with 98.7% accuracy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pageindex)

## About

**PageIndex** is an open-source, vectorless RAG (Retrieval-Augmented Generation) framework by VectifyAI. Instead of relying on vector databases and semantic similarity search, PageIndex builds a hierarchical tree index from your documents and uses LLM reasoning to retrieve the most relevant sections — just like a human expert would.

**No Vector DB. No Chunking. Just Reasoning.**

Traditional RAG systems approximate relevance through vector similarity. PageIndex uses an agentic, in-context tree search that navigates documents the way domain experts do — making it ideal for financial reports, legal filings, academic papers, technical manuals, and any long-form professional document.

Inspired by AlphaGo, PageIndex performs retrieval in two steps: (1) generate a hierarchical "Table-of-Contents" tree index from your document, and (2) perform reasoning-based retrieval through LLM-guided tree search. It achieves state-of-the-art **98.7% accuracy on FinanceBench**, outperforming all vector-based RAG baselines.

This Railway template deploys a self-hosted PageIndex instance with everything pre-configured. You bring your LLM API key (OpenAI, Anthropic, or any LiteLLM-compatible provider), and Railway handles the infrastructure. Once deployed, you can generate PageIndex tree structures from any PDF document and run reasoning-based retrieval queries — no vector database setup, no embedding pipelines, no chunking configuration required. The template is ready for both standalone use and integration with agentic frameworks like OpenAI Agents SDK.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PageIndex | [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Worker |

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/pageindex)
