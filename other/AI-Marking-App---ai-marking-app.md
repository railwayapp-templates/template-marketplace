# Deploy AI Marking App on Railway

This is a assignment review app for educators to mark in bulk or standalone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-marking-app)

## About

AI Marking App is an AI-powered tool that helps teachers mark student scripts   
  using vision AI. Upload scanned handwritten papers with an answer key or
  rubrics, and get detailed per-question feedback, marks, and downloadable PDF    
  reports. Supports multiple AI providers (Anthropic, OpenAI, Qwen) and both
  single and bulk class marking.         

  ## About Hosting AI Marking App                                                 
   
  Hosting AI Marking App on Railway gives you a ready-to-use marking tool         
  accessible from any browser. The app runs as a single Python Flask service with
  no database required — all processing happens in-memory. You'll need at least   
  one AI provider API key (Anthropic, OpenAI, or Qwen) to power the marking. Set
  `PROVIDE_KEYS=TRUE` to use server-side keys for a demo, or `FALSE` to let users
  bring their own keys. An access code gate protects the app from unauthorized
  use.

  ## Common Use Cases

  - **Formal assessment marking** — Upload question papers, answer keys, and      
  scanned student scripts to generate consistent, detailed feedback across an
  entire level                                                                    
  - **Essay evaluation with rubrics** — Upload band descriptor rubrics for
  essay-type assignments; AI places students in correct bands and identifies      
  line-by-line errors
  - **Bulk class marking** — Scan all student scripts into one PDF, upload a class
   list CSV, and download individual PDF reports for every student in a ZIP file
                                         
  ## Dependencies for AI Marking App Hosting

  - Python 3.10+ (auto-detected by Railway's Nixpacks builder)                    
  - At least one AI provider API key: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or
  `QWEN_API_KEY`                                                                  
                                                                          
  ### Deployment Dependencies            

  - [Anthropic API](https://docs.anthropic.com/) — Claude models for marking      
  - [OpenAI API](https://platform.openai.com/) — GPT models for marking
  - [Qwen API](https://help.aliyun.com/zh/model-studio/developer-reference/use-qwe
  n-by-calling-api) — Qwen models via DashScope                                   
                                         
  ### Implementation Details                                                      
                                                                          
  Set these environment variables in your Railway service:

  | Variable | Required | Description |
  |---|---|---|
  | `ACCESS_CODE` | Yes | Gate code users enter to access the app |
  | `PROVIDE_KEYS` | No | `TRUE` (default) uses server keys; `FALSE` requires
  users to input their own |                                                      
  | `ANTHROPIC_API_KEY` | No* | Enables Anthropic Claude provider |
  | `OPENAI_API_KEY` | No* | Enables OpenAI GPT provider |                        
  | `QWEN_API_KEY` | No* | Enables Qwen provider |                                
  | `FLASK_SECRET_KEY` | No | Session encryption key (auto-generated if not set) |
                                                                                  
  *At least one API key is required when `PROVIDE_KEYS=TRUE`.                     
                                         
  ## Why Deploy AI Marking App on Railway?                                        
                                                                          
  Railway is a singular platform to deploy your infrastructure stack. Railway will
   host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying AI Marking App on Railway, you are one step closer to supporting a 
  complete full-stack application with minimal burden. Host your servers,
  databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ai-marking-prototype | [twahidin/ai-marking-prototype](https://github.com/twahidin/ai-marking-prototype) | Worker |

**Category:** Other · **Languages:** HTML, Python, Procfile

[View on Railway →](https://railway.com/deploy/ai-marking-app)
