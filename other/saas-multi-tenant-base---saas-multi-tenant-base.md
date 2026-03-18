# Deploy saas-multi-tenant-base on Railway

Deploy and Host saas-multi-tenant-base with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saas-multi-tenant-base)

## About

# 🚀 Complete Setup Guide - Next.js + FastAPI SaaS Template

**Deploy your complete SaaS application to Railway in minutes with full feature configuration.**

---

## 🎯 **What You Get**

- ✅ **Next.js 14** Frontend with App Router
- ✅ **FastAPI** Backend with async/await
- ✅ **PostgreSQL** Database with migrations
- ✅ **Multi-tenant** Organization system
- ✅ **Authentication** with JWT + OAuth
- ✅ **Billing** with Stripe integration
- ✅ **Security** with reCAPTCHA v3
- ✅ **Email** notifications
- ✅ **File uploads** with AWS S3
- ✅ **Analytics** with Google Analytics
- ✅ **Monitoring** with Sentry

---

## ⚡ **Quick Start (5 Minutes)**

### **1. Deploy Template**
1. Click **"Deploy Now"** above
2. Connect your GitHub account
3. Choose repository name
4. Click **"Deploy"**

### **2. Core Configuration (Required)**
Only these variables are required for basic functionality:

**Backend Service:**
```bash
SECRET_KEY="${{secret(32)}}"              # ✅ Auto-generated
DATABASE_URL="${{Postgres.DATABASE_URL}}" # ✅ Auto-configured
ALLOWED_ORIGINS="https://${{frontend.RAILWAY_STATIC_URL}}" # ✅ Auto-configured
```

**Frontend Service:**
```bash
NODE_ENV="production"                                    # ✅ Pre-configured
NEXT_PUBLIC_API_URL="https://${{backend.RAILWAY_STATIC_URL}}" # ✅ Auto-configured
```

### **3. Test Your Application**
- Frontend: `https://your-frontend.railway.app`
- Backend API: `https://your-backend.railway.app/docs`
- Health Check: `https://your-backend.railway.app/health`

**🎉 Your SaaS is now live with basic functionality!**

---

## 🔧 **Feature Configuration (Optional)**

Enable additional features by configuring external services:

---

### 🔐 **Authentication & Security**

#### **Google OAuth (Optional)**
Enable social login with Google.

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set **Authorized redirect URIs**:
   - `https://your-frontend.railway.app/auth/callback/google`
6. Copy Client ID and Secret

**Backend Variables:**
```bash
GOOGLE_CLIENT_ID="123456789-abcdefghijk.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-secret-here"
```

**Frontend Variables:**
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID="123456789-abcdefghijk.apps.googleusercontent.com"
NEXT_PUBLIC_ENABLE_OAUTH="true"
```

#### **reCAPTCHA v3 (Recommended)**
Protect against bots and spam.

**Setup:**
1. Go to [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Click **"+"** to create new site
3. Choose **reCAPTCHA v3**
4. Add domains: `your-frontend.railway.app`
5. Copy Site Key and Secret Key

**Backend Variables:**
```bash
RECAPTCHA_ENABLED="true"
RECAPTCHA_SITE_KEY="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
RECAPTCHA_SECRET_KEY="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
RECAPTCHA_THRESHOLD="0.5"
```

**Frontend Variables:**
```bash
NEXT_PUBLIC_RECAPTCHA_ENABLED="true"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
```

---

### 💳 **Billing & Payments**

#### **Stripe Integration**
Enable subscription billing and payments.

**Setup:**
1. Create [Stripe Account](https://dashboard.stripe.com/register)
2. Go to **Developers** → **API Keys**
3. Copy **Publishable Key** and **Secret Key**
4. Go to **Developers** → **Webhooks**
5. Add endpoint: `https://your-backend.railway.app/webhooks/stripe`
6. Select events: `customer.*`, `invoice.*`, `subscription.*`
7. Copy **Webhook Secret**

**Backend Variables:**
```bash
STRIPE_SECRET_KEY="sk_live_51ABCDEFghijklmnop..."
STRIPE_WEBHOOK_SECRET="whsec_1ABCDEFghijklmnop..."
```

**Frontend Variables:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_51ABCDEFghijklmnop..."
NEXT_PUBLIC_ENABLE_BILLING="true"
```

**Test Mode:**
Use `sk_test_` and `pk_test_` keys for development.

---

### 📧 **Email Notifications**

#### **SendGrid (Recommended)**
Send transactional emails (welcome, password reset, etc.).

**Setup:**
1. Create [SendGrid Account](https://signup.sendgrid.com/)
2. Go to **Settings** → **API Keys**
3. Create new API key with **Full Access**
4. Verify sender email in **Settings** → **Sender Authentication**

**Backend Variables:**
```bash
EMAIL_ENABLED="true"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="SG.your-api-key-here"
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_VERIFICATION_REQUIRED="true"
```

#### **Alternative: Gmail SMTP**
**Setup:**
1. Enable 2-factor authentication on Gmail
2. Generate **App Password**: Account → Security → App passwords
3. Use app password as SMTP password

**Backend Variables:**
```bash
EMAIL_ENABLED="true"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

---

### 📁 **File Storage**

#### **AWS S3**
Store user uploads and files.

**Setup:**
1. Create [AWS Account](https://aws.amazon.com/)
2. Go to **S3** → **Create Bucket**
3. Set bucket name and region
4. Go to **IAM** → **Users** → **Add User**
5. Attach policy: `AmazonS3FullAccess`
6. Copy **Access Key ID** and **Secret**

**Backend Variables:**
```bash
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_S3_BUCKET="your-bucket-name"
AWS_REGION="us-east-1"
```

---

### 📊 **Analytics & Monitoring**

#### **Google Analytics 4**
Track user behavior and conversions.

**Setup:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create new **GA4 Property**
3. Add **Web Stream** with your domain
4. Copy **Measurement ID** (starts with G-)

**Frontend Variables:**
```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
```

#### **Hotjar (Optional)**
User session recordings and heatmaps.

**Setup:**
1. Create [Hotjar Account](https://www.hotjar.com/)
2. Add new site with your domain
3. Copy **Site ID**

**Frontend Variables:**
```bash
NEXT_PUBLIC_HOTJAR_ID="1234567"
```

#### **Sentry**
Error tracking and performance monitoring.

**Setup:**
1. Create [Sentry Account](https://sentry.io/)
2. Create new project (React + Python)
3. Copy **DSN** from project settings

**Backend Variables:**
```bash
SENTRY_DSN="https://abc123@o123456.ingest.sentry.io/123456"
```

**Frontend Variables:**
```bash
NEXT_PUBLIC_SENTRY_DSN="https://abc123@o123456.ingest.sentry.io/123456"
```

---

### 💬 **Chat & Support (Optional)**

Enable these if you plan to add chat functionality later.

**Frontend Variables:**
```bash
NEXT_PUBLIC_ENABLE_CHAT="false"  # Set to "true" when ready
```

---

## 🌍 **Localization**

**Frontend Variables:**
```bash
NEXT_PUBLIC_DEFAULT_LOCALE="en-US"           # or "pt-BR"
NEXT_PUBLIC_SUPPORTED_LOCALES="en-US,pt-BR"  # Add more as needed
```

---

## 🛠️ **Advanced Configuration**

### **Subscription Plans**
Customize your billing plans:

**Backend Variables:**
```bash
BILLING_PLANS="BASIC,PRO,EXPERT"
PLAN_BASIC_NAME="Basic"
PLAN_BASIC_PRICE="0"
PLAN_BASIC_FEATURES="user_management,basic_dashboard"
PLAN_PRO_NAME="Professional"
PLAN_PRO_PRICE="2900"  # $29.00 in cents
PLAN_PRO_FEATURES="user_management,basic_dashboard,advanced_reports"
PLAN_EXPERT_NAME="Expert"
PLAN_EXPERT_PRICE="4900"  # $49.00 in cents
PLAN_EXPERT_FEATURES="user_management,basic_dashboard,advanced_reports,analytics,priority_support"
```

### **Security Settings**
**Backend Variables:**
```bash
JWT_ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES="15"
REFRESH_TOKEN_EXPIRE_DAYS="7"
```

### **Application Info**
**Backend Variables:**
```bash
APP_NAME="Your SaaS Name"
APP_VERSION="1.0.0"
ENVIRONMENT="production"
DEBUG="false"
```

**Frontend Variables:**
```bash
NEXT_PUBLIC_APP_NAME="Your SaaS Name"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_ENVIRONMENT="production"
```

---

## 🔍 **Testing Your Configuration**

### **Health Check**
Visit: `https://your-backend.railway.app/health`

Should show:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-XX...",
  "services": {
    "database": "connected",
    "redis": "connected",
    "email": "configured",
    "stripe": "configured",
    "recaptcha": "enabled"
  }
}
```

### **Authentication Test**
1. Go to your frontend: `https://your-frontend.railway.app`
2. Try to register a new account
3. Check email for verification (if enabled)
4. Test login functionality

### **API Documentation**
Visit: `https://your-backend.railway.app/docs`
- Interactive Swagger UI
- Test all endpoints
- View request/response schemas

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **❌ 405 Method Not Allowed**
**Problem:** Frontend getting 405 on `/api/auth/login`
**Solution:** Check `NEXT_PUBLIC_API_URL` points to **backend** URL:
```bash
NEXT_PUBLIC_API_URL="https://your-backend.railway.app"  # ✅ Correct
NEXT_PUBLIC_API_URL="https://your-frontend.railway.app" # ❌ Wrong
```

#### **❌ Database Connection Error**
**Problem:** Backend can't connect to database
**Solution:** Verify `DATABASE_URL` is set correctly:
```bash
DATABASE_URL="${{Postgres.DATABASE_URL}}"  # ✅ Auto-configured by Railway
```

#### **❌ Email Not Sending**
**Problem:** Password reset emails not working
**Solution:** Check email configuration:
```bash
EMAIL_ENABLED="true"
SMTP_HOST="smtp.sendgrid.net"
SMTP_USER="apikey"
SMTP_PASSWORD="SG.your-actual-api-key"
EMAIL_FROM="noreply@yourdomain.com"
```

#### **❌ Stripe Webhooks Failing**
**Problem:** Subscription updates not working
**Solution:** 
1. Check webhook URL: `https://your-backend.railway.app/webhooks/stripe`
2. Verify webhook secret matches: `STRIPE_WEBHOOK_SECRET="whsec_..."`
3. Ensure selected events include: `customer.*`, `subscription.*`

#### **❌ OAuth Login Not Working**
**Problem:** Google login redirects fail
**Solution:** Update authorized redirect URIs:
```
https://your-frontend.railway.app/auth/callback/google
```

---

## 📚 **Next Steps**

### **1. Custom Domain (Optional)**
1. Go to Railway project → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Update all OAuth redirect URIs to use new domain

### **2. Environment Variables**
- **Development:** Use test keys (Stripe test mode, etc.)
- **Production:** Use live keys with proper security

### **3. Monitoring Setup**
- Enable Sentry for error tracking
- Set up Google Analytics for user insights
- Configure Hotjar for user experience analysis

### **4. Content & Branding**
- Update `APP_NAME` and `NEXT_PUBLIC_APP_NAME`
- Customize email templates
- Add your logo and branding

---

## ✅ **Configuration Checklist**

### **Essential (Required for basic functionality)**
- [ ] `SECRET_KEY` (auto-generated)
- [ ] `DATABASE_URL` (auto-configured)
- [ ] `NEXT_PUBLIC_API_URL` (auto-configured)

### **Authentication**
- [ ] Google OAuth keys
- [ ] reCAPTCHA keys (recommended)

### **Billing**
- [ ] Stripe keys (if billing enabled)
- [ ] Webhook endpoint configured

### **Email**
- [ ] SMTP configuration (SendGrid/Gmail)
- [ ] Sender email verified

### **Storage**
- [ ] AWS S3 credentials (if file uploads needed)

### **Analytics**
- [ ] Google Analytics ID
- [ ] Sentry DSN (recommended)

---

## 🆘 **Support**

- **Documentation:** Check project README.md
- **Issues:** Create GitHub issue in your deployed repository
- **Community:** Railway Discord server
- **Updates:** Watch repository for template updates

---

**🚀 Ready to launch your SaaS? Your application is now fully configured and production-ready!**

---

*Template Version: 2025.1 | Last Updated: January 2025*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| backend | [paulohenriquevn/nextjs-python-saas-starter](https://github.com/paulohenriquevn/nextjs-python-saas-starter) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| frontend | [paulohenriquevn/nextjs-python-saas-starter](https://github.com/paulohenriquevn/nextjs-python-saas-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `DEBUG` | backend | false | - |
| `APP_NAME` | backend | SaaS Starter | - |
| `SMTP_PORT` | backend | 587 | - |
| `SMTP_USER` | backend | (secret) | - |
| `AWS_REGION` | backend | us-east-1 | - |
| `EMAIL_FROM` | backend | xx | - |
| `SECRET_KEY` | backend | (secret) | - |
| `APP_VERSION` | backend | 1.0.0 | - |
| `ENVIRONMENT` | backend | production | - |
| `BILLING_PLANS` | backend | BASIC,PRO,EXPERT | - |
| `EMAIL_ENABLED` | backend | false | - |
| `JWT_ALGORITHM` | backend | HS256 | - |
| `PLAN_PRO_NAME` | backend | Profissional | - |
| `SMTP_PASSWORD` | backend | (secret) | - |
| `PLAN_PRO_PRICE` | backend | 2900 | - |
| `DOCKERFILE_PATH` | backend | Dockerfile | - |
| `PLAN_BASIC_NAME` | backend | Básico | - |
| `GOOGLE_CLIENT_ID` | backend | xx | - |
| `PLAN_BASIC_PRICE` | backend | 0 | - |
| `PLAN_EXPERT_NAME` | backend | Expert | - |
| `PLAN_EXPERT_PRICE` | backend | 4900 | - |
| `PLAN_PRO_FEATURES` | backend | user_management,basic_dashboard,advanced_reports | - |
| `RECAPTCHA_ENABLED` | backend | true | - |
| `STRIPE_SECRET_KEY` | backend | (secret) | - |
| `RECAPTCHA_SITE_KEY` | backend | xxxxx | - |
| `PLAN_BASIC_FEATURES` | backend | user_management,basic_dashboard | - |
| `RECAPTCHA_THRESHOLD` | backend | 0.5 | - |
| `GOOGLE_CLIENT_SECRET` | backend | (secret) | - |
| `PLAN_EXPERT_FEATURES` | backend | user_management,basic_dashboard,advanced_reports,analytics,priority_support | - |
| `RECAPTCHA_SECRET_KEY` | backend | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | backend | (secret) | - |
| `STRIPE_WEBHOOK_SECRET` | backend | (secret) | - |
| `STRIPE_PUBLISHABLE_KEY` | backend | xx | - |
| `REFRESH_TOKEN_EXPIRE_DAYS` | backend | (secret) | - |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | backend | (secret) | - |
| `EMAIL_VERIFICATION_REQUIRED` | backend | false | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `NODE_ENV` | frontend | production | - |
| `DOCKERFILE_PATH` | frontend | Dockerfile.frontend | - |
| `NEXT_PUBLIC_APP_NAME` | frontend | SaaS Starter | - |
| `NEXT_PUBLIC_APP_VERSION` | frontend | 1.0.0 | - |
| `NEXT_PUBLIC_ENABLE_CHAT` | frontend | false | - |
| `NEXT_PUBLIC_ENVIRONMENT` | frontend | production | - |
| `NEXT_PUBLIC_ENABLE_OAUTH` | frontend | true | - |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | frontend | pt-BR | - |
| `NEXT_PUBLIC_ENABLE_BILLING` | frontend | true | - |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | frontend | false | - |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | frontend | xx | - |
| `NEXT_PUBLIC_RECAPTCHA_ENABLED` | frontend | true | - |
| `NEXT_PUBLIC_SUPPORTED_LOCALES` | frontend | pt-BR,en-US | - |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | frontend | xx | - |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | frontend | xx | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/saas-multi-tenant-base)
