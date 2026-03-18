# Deploy Jenkins on Railway

Jenkins is an automation tool for CI/CD in software projects. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0ygwi8)

## About

## **What is Jenkins?**  

**Jenkins** is an open-source automation server used for **Continuous Integration (CI)** and **Continuous Deployment (CD)**. It automates software development workflows, allowing developers to build, test, and deploy applications efficiently. With a rich plugin ecosystem, Jenkins integrates seamlessly with tools like Git, Docker, and Kubernetes, making it ideal for DevOps teams.  

### **Access Credentials**  
- **Username:** `admin` (default, can be changed via 
- **Password:** `admin` (default, can be changed via environment variables)  

### **Environment Variables for Custom Credentials**  
To set custom credentials, define the following environment variables:  
- `JENKINS_USER` → Your desired username  
- `JENKINS_PASS` → Your desired password  

### **Key Features**  
✔ Automates software builds, testing, and deployment  
✔ Supports a vast range of plugins for enhanced functionality  
✔ Easily integrates with version control and cloud platforms  
✔ Web-based UI for managing pipelines and configurations  

📖 **Official Documentation:** [Jenkins Documentation](https://www.jenkins.io/doc/)  

🚀 **Jenkins is the go-to solution for automating CI/CD pipelines!**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jenkins | [rudemex/railway-jenkins](https://github.com/rudemex/railway-jenkins) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `JENKINS_PASS` | admin |
| `JENKINS_USER` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/0ygwi8)
