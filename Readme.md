# Disaster Management & SOS Requests Platform

A web application for monitoring disaster zones across India **and allowing users to send SOS requests**.  
Built with **React**, **Tailwind CSS**, **Leaflet**, and **Recharts** on the frontend, with a **Java Spring Boot + PostreSQL backend**.

---

## Features

### User Features
- **Send SOS Requests**  
  - Users can submit SOS requests with message, location, and disaster type.
  - Request automatically linked to the corresponding disaster zone.

- **Track Request Status**  
  - Users can view their submitted requests and see their status (Pending, In Progress, Resolved).

### Admin / Monitoring Features
- **Interactive Map Overview**  
  - View all SOS requests across India.  
  - Marker colors indicate request status.  
  - Clicking a marker shows details: message, user, zone, disaster type, risk, and last updated.

- **Filters & Pagination**  
  - Filter SOS requests by **disaster type** and **status**.  
  - Paginated list of requests (5 per page).  
  - Update request status directly from the UI (admin functionality).

- **Analytics & Insights**  
  - Top zones by number of requests.  
  - Charts showing requests by status and disaster type.  
  - Badges for quick identification of risk and disaster type.

- **Responsive & Dark Theme**  
  - Works on laptops and desktops.  
  - Dark mode for better visibility.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Leaflet.js, Recharts, Lucide React  
- **Backend**: Java Spring Boot, PostgreSQL, JPA/Hibernate  

---

## Backend APIs

The backend provides endpoints for:

- `/api/sos-requests` – CRUD operations for SOS requests  
- `/api/disaster-zones` – List and manage disaster zones  
- `/api/safety-tips` – Fetch safety tips by zone and type  