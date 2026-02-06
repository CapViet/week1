
# MindX Engineer Onboarding – Week 2 Metrics Setup

## Overview

This document describes the observability and analytics setup for the Week 1 application.

The goal of this phase was to ensure the system is:

* Monitorable in production
* Measurable from a product perspective
* Capable of automatic alerting

Two platforms are used:

1. **Azure Application Insights** – for production metrics
2. **Google Analytics 4** – for product metrics

This provides both operational visibility and user behavior tracking.

---

## 1. Production Metrics – Azure Application Insights

### 1.1 Backend Monitoring

The Node.js backend API is instrumented with **Azure Application Insights**.

It automatically collects:

* Incoming HTTP requests
* Response times and latency
* Exceptions and failures
* Dependency performance
* Live server health metrics

This allows real-time monitoring and troubleshooting in production.

---

### 1.2 Access

The Application Insights resource is hosted in the MindX Azure subscription.

Mentors and reviewers already have access through the shared Azure account.

To view the metrics:

1. Go to **Azure Portal**
2. Open **Application Insights**
3. Select the resource: `webapp-insights`

---

### 1.3 Monitoring Areas

| Goal                 | Azure Section         |
| -------------------- | --------------------- |
| View API calls       | Requests              |
| View errors          | Failures → Exceptions |
| View slow endpoints  | Performance           |
| Monitor live traffic | Live Metrics          |

---

### 1.4 Alerting

Three alert rules are configured to automatically notify when the system is unhealthy.

| Alert                  | Trigger                         | Purpose                   |
| ---------------------- | ------------------------------- | ------------------------- |
| api-exceptions-alert   | Any exception detected          | Detect crashes            |
| api-latency-alert      | Average response time > 2000 ms | Detect performance issues |
| api-availability-alert | Availability < 100%             | Detect downtime           |

When triggered, alerts send email notifications.

---

## 2. Product Metrics – Google Analytics

### 2.1 Frontend Tracking

The React frontend is integrated with **Google Analytics 4 (GA4)**.

It tracks:

* Page views (on route change)
* User sessions
* Custom user events (e.g. login clicks)

This provides insight into how users interact with the application.

---

### 2.2 Access

Google Analytics access is managed separately from Azure.

If you do not currently have access to the GA property, please contact me to be added as a viewer.

To view analytics data:

1. Go to **[https://analytics.google.com](https://analytics.google.com)**
2. Select the project property
3. Open **Realtime** or **Reports**

---

### 2.3 Key Reports

| Metric       | Location                      |
| ------------ | ----------------------------- |
| Active users | Realtime                      |
| Page views   | Reports → Engagement → Pages  |
| Events       | Reports → Engagement → Events |
| Sessions     | Reports → Engagement          |

---

## 3. Example Event Tracking

A custom event is implemented to track user interaction.

```
Category: User  
Action: Login Clicked
```

This confirms that user actions are recorded in addition to page views.

---

## Final Notes

This metrics setup provides:

* Real-time production monitoring
* Automated failure detection
* Performance visibility
* User behavior analytics

Together, these systems ensure the application is observable, measurable, and production-ready.