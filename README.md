# Week 1 – MindX Fullstack App

This repository contains the Week 1 setup for a full-stack JavaScript/TypeScript application.

The project is now fully working in **three environments**:

* **Local (dev)**
* **Docker**
* **Cloud (Azure + AKS & Vercel)**

---

## What’s Done

### Core App

* Backend API (Node.js + TypeScript)
* Frontend Web App (React + TypeScript + Vite)
* Frontend ↔ API communication
* Health endpoint (`/health`)
* Test API endpoint (`/protected`)

### Local & Docker

* Backend and frontend Dockerized
* Local testing completed (Node + Vite)
* Docker containers working for both services

### Cloud (Two Deployments)

#### 1) Vercel + Azure App Service

* Frontend deployed to **Vercel**
* Backend deployed to **Azure App Service**
* Frontend uses cloud API URL
* CI from GitHub working

#### 2) Azure Kubernetes Service (AKS)

* Azure Container Registry (ACR)
* AKS cluster running
* Backend & frontend deployed to AKS
* NGINX Ingress installed
* Ingress routing:

  * `/` → frontend
  * `/health` → API
  * `/protected` → API
* Frontend and API communicate through ingress IP

---

## Project Structure

```
.
├── week1-api/     # Backend API
├── week1-web/     # Frontend React app
└── k8s/           # Kubernetes manifests (AKS)
```

---

## Run Locally (No Docker)

### Backend

```bash
cd week1-api
npm install
npm run dev
```

### Frontend

```bash
cd week1-web
npm install
npm run dev
```

---

## Run with Docker

### Backend

```bash
cd week1-api
docker build -t week1-api .
docker run -p 8080:8080 week1-api
```

### Frontend

```bash
cd week1-web
docker build -t week1-web .
docker run -p 3000:80 week1-web
```

---

## Cloud Environments

### Vercel + App Service

* Frontend: Vercel
* API: Azure App Service
* API URL set via environment variable

### AKS

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get ingress
```

Ingress LoadBalancer IP is used as the base URL for both frontend and API.

---

## Authentication (Current)

> **Not implemented yet (fake test only).**
> Real authentication will be added in Step 5.

---

## Next Steps

* Step 5: Real authentication (OpenID or custom JWT)
* HTTPS with domain + cert
* Secrets via Kubernetes
* CI/CD pipeline
* Environment configs
