# MindX Engineer Onboarding – Week 1 Final Project

## Overview

This project is the final result of Week 1 of the MindX Engineer Onboarding program.

The goal of this week was to design and deploy a real full-stack cloud system using modern production tools: containers, Kubernetes, cloud infrastructure, and secure authentication.

By the end of this project, I built:

* A containerized Node.js backend API
* A containerized React frontend
* An Azure Container Registry (ACR) to store Docker images
* An Azure Kubernetes Service (AKS) cluster to run the system
* An Ingress Controller to expose services publicly
* A JWT-based authentication system
* A real OpenID authentication integration (MindX)
* A production-style cloud deployment pipeline

Because OpenID requires HTTPS, the project runs in two environments:

1. AKS + Ingress environment (HTTP, test JWT authentication)
2. Production HTTPS environment (real MindX OpenID authentication)

   * Backend: Azure Web App Service
   * Frontend: Vercel

This allows both infrastructure learning and real authentication to be demonstrated.

---

## System Overview

This is a full-stack authenticated web application consisting of:

* A React frontend for user interaction
* A Node.js API for business logic and security
* MindX OpenID as the identity provider
* JWT tokens for session management
* Azure cloud infrastructure for deployment

---

## Architecture Flow

1. User opens the web application.
2. User clicks Login with MindX.
3. Frontend redirects the user to the backend login endpoint.
4. Backend redirects the user to MindX OpenID.
5. User logs in at MindX.
6. MindX redirects back to the backend callback URL.
7. Backend exchanges the authorization code for an ID token.
8. Backend creates its own JWT for the application.
9. Backend redirects the user back to the frontend with this JWT.
10. Frontend stores the token and unlocks protected routes.
11. All protected API calls require this JWT.

---

## Step-by-Step Implementation

### Step 1 – Containerizing the Backend

A Node.js API was built and structured for production use.
It was packaged into a Docker image and pushed to Azure Container Registry.

---

### Step 2 – Running the API in Kubernetes (AKS)

The backend was deployed into Azure Kubernetes Service using:

* Kubernetes Deployments
* Kubernetes Services

The API now ran inside a real container orchestration system.

---

### Step 3 – Exposing the API with Ingress

An NGINX Ingress Controller was installed in the cluster.

This created a single public IP that routes traffic into the cluster.

---

### Step 4 – Adding the React Frontend

The React frontend was containerized and deployed into the same AKS cluster.

Ingress routing was configured so:

* The frontend is accessible from the public IP
* The backend health check is accessible via /health

This proves that both services are running and reachable through the same ingress:

* Frontend: [http://20.239.116.30](http://20.239.116.30)
* Backend: [http://20.239.116.30/health](http://20.239.116.30/health)

---

### Step 5 – Authentication

Two authentication systems were implemented.

A. Test JWT Authentication (AKS)

Used for testing protected routes inside AKS:

* Backend signs JWT tokens
* Frontend stores the token
* Middleware verifies the token
* Protected endpoints require authentication

This demonstrates full JWT security flow.

B. Real OpenID Authentication (MindX)

To support secure login, real OpenID was integrated using MindX.

Backend responsibilities:

1. Redirect users to MindX login
2. Receive authorization callback
3. Exchange code for ID token
4. Decode user identity
5. Create app JWT
6. Redirect back to frontend with token

Frontend responsibilities:

1. Redirect to backend login
2. Detect login success
3. Store JWT
4. Protect routes
5. Logout on token expiry

---

### Step 6 – Production HTTPS Deployment

OpenID requires HTTPS, so a production environment was created:

* Backend hosted on Azure Web App Service
* Frontend hosted on Vercel

This version supports:

* HTTPS
* MindX OpenID
* Secure cookies and tokens
* Real-world deployment standards

---

## Key Skills Demonstrated

* Docker and containerization
* Azure cloud services
* Kubernetes (AKS)
* Ingress routing
* JWT security
* OpenID authentication
* Secrets management
* Frontend to backend security
* Production deployments

---

## Final Result

This project demonstrates a complete real-world cloud architecture that is secure, scalable, authenticated, and production-ready.

It shows the full journey from local code to cloud-native infrastructure.

---
