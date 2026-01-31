# MindX Engineer Onboarding – Week 1 Final Project

## Overview

This project is the final result of **Week 1 of the MindX Engineer Onboarding program**.
The goal was to go from **nothing** to a **fully deployed, authenticated, cloud-hosted full-stack system** using real production tools and architecture.

By the end of this project, we built:

* A containerized Node.js backend API
* A React frontend application
* Azure Container Registry (ACR) for images
* Azure Kubernetes Service (AKS) to run the system
* An Ingress Controller for public routing
* Full frontend ↔ backend communication
* Secure authentication using MindX OpenID
* A production HTTPS deployment

This is not a demo.
It is a **real-world cloud architecture**, simplified for learning.

---

## What This System Does

This application is a **secure full-stack web system** made up of:

* A **Node.js API** for authentication, business logic, and protected routes
* A **React frontend** for user interaction
* A **central OpenID provider (MindX)** for login
* **Azure Kubernetes Service (AKS)** for orchestration
* **Ingress routing** to expose everything through one public entry point

The system follows a modern cloud authentication flow:

1. A user opens the web app.
2. Clicking “Login” redirects them to MindX OpenID.
3. MindX authenticates the user.
4. The user is redirected back to the API.
5. The API exchanges the authorization code for a token.
6. The API issues its own JWT.
7. The user is redirected back to the frontend.
8. The frontend stores the token and unlocks protected pages.

---

## Architecture at a Glance

* The **Ingress Controller** is the public gateway.
* It routes:

  * `/` → React frontend
  * `/api/*` → Node API
* All authentication and protected requests pass through the backend.
* JWT tokens secure all sensitive routes.

---

## Step-by-Step Journey

### Step 1 – From Local Code to Azure Containers

We started with a simple Node.js API and packaged it into a Docker container.
The container was pushed to **Azure Container Registry (ACR)** and run in Azure.

This introduced:

* Containerization
* Cloud image storage
* Cloud-hosted applications

---

### Step 2 – Running the API in Kubernetes (AKS)

The API was deployed into **Azure Kubernetes Service (AKS)** using:

* Deployments
* Services
* Cluster networking

Now the app ran inside a real Kubernetes environment.

---

### Step 3 – Exposing the API with Ingress

An **NGINX Ingress Controller** was installed in AKS.

This created a single public gateway that could route traffic into the cluster.
The API became accessible from the internet through clean, controlled routing.

---

### Step 4 – Adding the React Web App

The React frontend was:

* Built into a container
* Stored in ACR
* Deployed to AKS

Ingress rules were updated so:

* `/` → frontend
* `/api` → backend

This created a **true full-stack cloud system**.

---

### Step 5 – Authentication with MindX OpenID

Instead of a fake login system, we integrated **real OpenID authentication**.

The backend now:

* Redirects users to MindX
* Handles the callback
* Exchanges codes for tokens
* Issues its own JWT
* Protects private routes

The frontend now:

* Detects login success
* Stores JWT tokens
* Protects pages like Dashboard
* Logs users out correctly

This turned the system into a **secure, real-world application**.

---

### Step 6 – Production Readiness with Cloud HTTPS Hosting

To make the system production-ready, it was deployed using managed cloud platforms with **automatic HTTPS and domain handling**.

#### Frontend on Vercel

The React app was deployed to **Vercel**, which provides:

* Automatic HTTPS
* Secure domains
* Global CDN
* Encrypted traffic

#### Backend on Azure Web App Service

The Node.js API was deployed to **Azure Web App Service**, which provides:

* Built-in TLS
* Secure environment variables
* Scalable infrastructure
* Public HTTPS endpoints

This removed the need for manual TLS configuration and made the system safe for real users.

---

## Key Skills Gained

* Docker & containers
* Azure cloud services
* Kubernetes orchestration
* Ingress routing
* JWT authentication
* OpenID integration
* Secrets management
* Secure deployments
* Full-stack cloud architecture

---

## Why This Matters

This project is not about a website.
It is about understanding **how real cloud systems are built**.

The same technologies used here are used by modern companies worldwide.

This week proves the ability to:

* Design
* Deploy
* Secure
* And operate real systems

---

## Final Result

At the end of Week 1, this project delivers:

* A real cloud application
* Secure authentication
* Protected APIs
* Scalable architecture
* Production HTTPS hosting
* A strong foundation for future work
