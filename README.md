# Week 1 – MindX Fullstack App

This repository contains the Week 1 setup for a full-stack JavaScript/TypeScript application.

At the moment, the project is fully working **locally** and **dockerized**. Cloud deployment will be done once Azure access is available.

---

## What’s Done

* Backend API (Node.js + TypeScript)
* Frontend Web App (React + TypeScript + Vite)
* Basic authentication (fake login)
* Protected routes on the frontend
* Token stored in localStorage
* Backend and frontend Dockerized
* Local testing completed

---

## Project Structure

```
.
├── week1-api/     # Backend API
└── week1-web/     # Frontend React app
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
docker run -p 3000:3000 week1-api
```

### Frontend

```bash
cd week1-web
docker build -t week1-web .
docker run -p 8080:80 week1-web
```

---

## Authentication (Current)

* Fake login/logout
* Token stored in `localStorage`
* Protected routes redirect unauthenticated users
* Auth state persists after refresh

---

## Next Steps

Pending Azure permissions:

* Azure Container Registry (ACR)
* AKS deployment
* Ingress + HTTPS
* OpenID integration (`id-dev.mindx.edu.vn`)
* Prepare Kubernetes YAMLs ahead of time, or
* Clean up code before deployment
