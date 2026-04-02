# Deploy fair-warm on Railway

Document AI API — OCR, form fill, PII redaction. Free 2,000 pages/month.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fair-warm)

## About

DeepRead is an AI-native document processing API that extracts structured data from PDFs and images with 97%+ accuracy. Upload a document through the web UI and get back extracted text, structured JSON with confidence scores, or a PII-redacted copy. Powered by multi-model consensus (GPT + Gemini + dual OCR).                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                                                
  ## About Hosting DeepRead Demo                                                                                                                                                                                                                                                                                                                                                                                                                
                  
  This template deploys a Flask web app that connects to the DeepRead API. After deploying, set your DEEPREAD_API_KEY environment variable (get a free key at deepread.tech/dashboard — 2,000 pages/month, no credit card). The app runs on gunicorn and exposes a simple drag-and-drop interface with three modes: OCR text extraction, structured JSON extraction with custom schemas, and PII redaction. No database, no additional services 
  needed — just the single web service and your API key. The health endpoint at /health confirms the app is running and the API key is configured.
                                                                                                                                                                                                                                                                                                                                                                                                                                                
  ## Why Deploy DeepRead Demo on Railway                                                                                                                                                                                                                                                                                                                                                                                                        
  
  Railway makes it simple to deploy and share this demo — one click, no Docker setup, no infrastructure management. Railway auto-detects the Python app, installs dependencies, and runs the server. Environment variables keep your API key secure. You get a public URL instantly to share with your team or clients. Railway's free tier is enough to run the demo, and you can scale up if you build on top of it.                          
                  
  ## Common Use Cases                                                                                                                                                                                                                                                                                                                                                                                                                           
                  
  - Invoice and receipt processing — extract vendor, totals, line items, due dates                                                                                                                                                                                                                                                                                                                                                              
  - Medical record extraction — pull diagnoses, medications, vitals, lab results
  - PII redaction before sharing — strip names, SSNs, credit cards for HIPAA/GDPR compliance                                                                                                                                                                                                                                                                                                                                                    
  - Legal document analysis — extract clauses, parties, dates from contracts
  - Training data prep — de-identify documents before feeding to LLMs
                                                                                                                                                                                                                                                                                                                                                                                                                                                
  ## Dependencies for DeepRead Demo
                                                                                                                                                                                                                                                                                                                                                                                                                                                
  The app requires a DeepRead API key (free at deepread.tech/dashboard, 2,000 pages/month). No database or external services needed beyond the DeepRead API.                                                                                                                                                                                                                                                                                    
   
  ### Deployment Dependencies                                                                                                                                                                                                                                                                                                                                                                                                                   
                  
  - Python 3.10+
  - Flask (web framework)
  - Gunicorn (production server)
  - Requests (HTTP client for DeepRead API)
  - DEEPREAD_API_KEY environment variable

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deepread-demo | [deepread-tech/deepread-demo](https://github.com/deepread-tech/deepread-demo) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DEEPREAD_API_KEY` | (secret) |

**Category:** AI/ML · **Languages:** Python, HTML, JavaScript, Shell, Procfile

[View on Railway →](https://railway.com/deploy/fair-warm)
