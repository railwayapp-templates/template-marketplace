# Deploy Streamlit Portal on Railway

Deploy and Host Streamlit Portal with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/streamlit-portal)

## About

Streamlit Portal is a web app where student groups log in with a code and upload their Python files, or paste a Google
  Colab link. It checks the code is safe, then saves it to GitHub, which automatically deploys each group's project as
  its own live Streamlit app.

  ## About Hosting Streamlit Portal
  
  Streamlit Portal runs as a single lightweight FastAPI service, so hosting is simple. When students upload code, the
  portal validates it for safety, builds a clean dependency list, and commits the files to your GitHub repository using
  an access token. There is no database to manage — it starts instantly and needs no extra infrastructure. Railway
  builds the service automatically from the included `railway.json`, runs a `/healthz` health check, and restarts it on
  failure. You only set three environment variables and deploy, then hand the portal's URL to your students.

  ## Common Use Cases

  - Let students deploy Streamlit apps without touching Git, tokens, or the command line
  - Collect team submissions at a hackathon or coding club, each with its own live URL
  - Safely accept student-written Python behind built-in code-safety checks

  ## Dependencies for Streamlit Portal Hosting

  - A GitHub token with `repo` access, so the portal can save uploads
  - A GitHub repository to store and auto-deploy the uploaded apps
  
  ### Deployment Dependencies

  - Source repo: https://github.com/twahidin/ctss-streamlit-portal
  - Create a GitHub token: https://github.com/settings/tokens
  - Streamlit docs: https://docs.streamlit.io

  ### Implementation Details

  Set these three environment variables on the service before deploying:
  
  - `GITHUB_TOKEN` — GitHub token with `repo` access
  - `GITHUB_REPO` — where uploads are saved, e.g. `your-org/ctss-streamlit-projects`
  - `GROUP_CODES` — JSON list of group login codes

  ## Why Deploy Streamlit Portal on Railway?

  
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't
  have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Streamlit Portal on Railway, you are one step closer to supporting a complete full-stack application with
  minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ctss-streamlit-portal | [twahidin/ctss-streamlit-portal](https://github.com/twahidin/ctss-streamlit-portal) | Worker |

**Category:** Other · **Languages:** Python, HTML, CSS

[View on Railway →](https://railway.com/deploy/streamlit-portal)
