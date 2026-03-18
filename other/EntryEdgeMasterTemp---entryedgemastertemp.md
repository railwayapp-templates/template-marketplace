# Deploy EntryEdge_MasterTemp on Railway

Entry Edge templates for all customers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/entryedgemastertemp)

## About

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend-service | [twine1993/EntryEdge](https://github.com/twine1993/EntryEdge) (root: /frontend) | Web service |
| backend-service | [twine1993/EntryEdge](https://github.com/twine1993/EntryEdge) (root: /backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CI` | frontend-service | - | Set this to false. It prevents the build from failing due to minor "Linting" warnings. |
| `VITE_CLIENT_ID` | frontend-service | - | A unique short code for the client (used for PostHog tracking groups). if empty, analytics will not be used |
| `VITE_BACKEND_URL` | frontend-service | https:// | The public URL of your backend. Use ${{backend.RAILWAY_PUBLIC_DOMAIN}}. |
| `VITE_CLIENT_NAME` | frontend-service | - | The display name for the frontend UI (matches CLIENT_NAME in backend). |
| `PORT` | backend-service | - | The internal port the server runs on. Railway usually defaults this to 8080. |
| `DB_NAME` | backend-service | - | The name of your MongoDB database (e.g., entryedge_db). |
| `LOGO_URL` | backend-service | - | A direct link to the client's logo (PNG/SVG) to be displayed on the site. |
| `MONGO_URL` | backend-service | - | The connection string for MongoDB. Use ${{MongoDB.MONGODB_URL}} to auto-link. |
| `ADMIN_PASS` | backend-service | The password used to access the /admin dashboard. | - |
| `ADMIN_USER` | backend-service | (secret) | The username used to access the /admin dashboard. |
| `JWT_SECRET` | backend-service | (secret) | A secure random string used to encrypt login sessions. |
| `TERMS_TEXT` | backend-service | Standard terms apply. | Text shown in the "I Accept" popup |
| `CLIENT_NAME` | backend-service | The business name displayed in the navigation bar and footer. | - |
| `COLOR_ACCENT` | backend-service | #facc15 | Buttons & Icons color  |
| `FRONTEND_URL` | backend-service | pending | - |
| `SENDER_EMAIL` | backend-service | The email address that sends out winner notifications (must be verified in Resend). | - |
| `COLOR_PRIMARY` | backend-service | #7c3aed | main bg colour |
| `NLCB_APPROVAL` | backend-service | This promotion is NLCB approved. | - |
| `CAMPAIGN_TITLE` | backend-service | PURCHASE & WIN! | Main header text on Home Page |
| `RESEND_API_KEY` | backend-service | (secret) | - |
| `TARGET_PRODUCT` | backend-service | - | The specific product (e.g., "Coca-Cola 2L") that users must have on their receipt. |
| `ALLOWED_ORIGINS` | backend-service | - | Security setting: Put your frontend URL here to allow it to talk to the backend. |
| `COLLECTION_NAME` | backend-service | - | The specific table name inside MongoDB where submissions are stored. |
| `COLOR_SECONDARY` | backend-service | #4f46e5 | Navbar background color |
| `PROMO_START_DATE` | backend-service | 2026-01-01 | - |
| `PARTICIPATING_STORES` | backend-service | Massy Stores,JTA Supermarkets,SuperPharm,PriceSmart | - |
| `PROMO_DURATION_MONTHS` | backend-service | 3 | how long the promo is |

## Configuration

- **Start command:** `npx serve -s build -l tcp://0.0.0.0:$PORT`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
- **Healthcheck:** `/api/config`
- **Volume:** `/app/uploads/receipts`

**Category:** Other

[View on Railway →](https://railway.com/deploy/entryedgemastertemp)
