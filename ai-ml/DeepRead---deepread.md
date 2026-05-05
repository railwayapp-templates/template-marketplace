# Deploy DeepRead on Railway

AI document processing — OCR, form fill, PII redaction. Free 2k pages/mo.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepread)

## About

DeepRead is an AI-native document processing API with 97%+ accuracy using multi-model consensus (GPT + Gemini + dual OCR). This template deploys a web UI showcasing all four DeepRead capabilities: OCR text extraction, structured JSON extraction with custom schemas, AI-powered PDF form filling, and PII redaction (14 types, irreversible).                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                           
  ## About Hosting DeepRead                                                                                                                                                                                                                                                                                                                                                                                                                
                                                            
  This template deploys a Flask web app that connects to the DeepRead API. After deploying, set your DEEPREAD_API_KEY environment variable (get a free key at deepread.tech/dashboard — 2,000 pages/month, no credit card). The app runs on gunicorn and exposes a simple drag-and-drop interface with four modes: OCR Extract, Structured JSON, Form Fill, and PII Redact. No database, no additional services needed — just the single   
  web service and your API key. The health endpoint at /health confirms the app is running and the API key is configured.
                                                                                                                                                                                                                                                                                                                                                                                                                                           
  ## Why Deploy DeepRead on Railway                                                                                                                                                                                                                                                                                                                                                                                                        
   
  Railway makes it simple to deploy and share this demo — one click, no Docker setup, no infrastructure management. Railway auto-detects the Python app, installs dependencies, and runs the server. Environment variables keep your API key secure. You get a public URL instantly to share with your team or clients. Railway's free tier is enough to run the demo, and you can scale up if you build on top of it.                     
                                                            
  ## Common Use Cases                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                            
  - Invoice and receipt processing — extract vendor, totals, line items, due dates                                                                                                                                                                                                                                                                                                                                                         
  - Medical record extraction — pull diagnoses, medications, vitals, lab results (with HIPAA-compliant PII redaction)
  - Legal contract analysis — extract parties, clauses, dates, obligations                                                                                                                                                                                                                                                                                                                                                                 
  - Insurance claims processing — extract claim data, redact claimant PII                                                                                                                                                                                                                                                                                                                                                                  
  - PDF form filling — fill W-4, I-9, government forms with AI vision                                                                                                                                                                                                                                                                                                                                                                      
  - Training data prep — de-identify documents before feeding to LLMs                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                           
  ## Dependencies for DeepRead                                                                                                                                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                           
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
| deepread-webapp | [deepread-tech/deepread-webapp](https://github.com/deepread-tech/deepread-webapp) | Worker |

**Category:** AI/ML · **Languages:** HTML, Python, Procfile

[View on Railway →](https://railway.com/deploy/deepread)
