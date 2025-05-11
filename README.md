# MedVision Healthcare Platform

<img width="940" alt="shot1" src="https://github.com/user-attachments/assets/ae12d3d8-020b-417a-97fe-f76e75845e9c" />


<!-- Replace with actual logo URL -->

**HealthSync** is a comprehensive healthcare platform developed by **StratX**, designed to enhance medical service interactions. It offers secure authentication, personalized dashboards, appointment booking, real-time chatting, video conferencing, and AI-based health consultancy for Patients and Doctors.

📅 **Date**: May 11, 2025  
📍 **Repository**: [GitHub](#) <!-- Replace with actual repo URL -->

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

## Overview
HealthSync streamlines healthcare for **Patients** (manage profiles, book appointments, access consultancy) and **Doctors** (provide consultations, communicate via chat/video). It uses the **MERN stack** for authentication and **Spring Boot** for dashboard, chatting, and video conferencing.

Full details are in [HealthSync_Documentation.pdf](./HealthSync_Documentation.pdf).

## Key Features
- **Secure Authentication**: Email/password/role-based sign-up/login (MERN stack).
- **OTP Verification**: Email OTP for Doctors.
- **Personalized Dashboard**: Health status, appointment history, AI suggestions (Spring Boot + React).
- **Appointment Booking**: Schedule doctor appointments.
- **Chatting**: Real-time text communication.
- **Video Conferencing**: Secure video consultations.
- **Health Consultancy**: Expert guidance with AI suggestions.
- **Premium Plans**: Basic, Advanced, Business plans with Razorpay.
- **Responsive UI**: White-and-blue theme with Framer Motion animations.

## Tech Stack
### MERN Stack (Authentication)
- **MongoDB**: User credentials and OTPs.
- **Express.js**: Authentication APIs.
- **React**: Login/verification UI.
- **Node.js**: Backend runtime.

### Spring Boot (Dashboard, Chatting, Video)
- **Java/Spring Boot**: Core backend.
- **MongoDB**: Data storage.
- **WebSocket**: Chatting (STOMP over SockJS).
- **WebRTC/Twilio**: Video conferencing.

### Frontend
- **React + Vite**: Fast-build frontend.
- **Tailwind CSS**: Responsive styling.
- **Framer Motion**: Animations.
- **Font Awesome/Lucide React**: Icons.

### Third-Party Services
- **Razorpay**: Payments.
- **SendGrid/Spring Mail**: OTP emails.
- **Twilio/Zoom SDK**: Video.

## Setup Instructions
### Prerequisites
- Node.js (v20.12.0+)
- Java (JDK 17+)
- MongoDB (local or MongoDB Atlas)
- Razorpay API keys
- SendGrid API key (or similar)
- Twilio API keys (or similar)

### MERN Stack (Authentication)

```bash
git clone <repository-url>
cd server/auth
npm install
```

Create .env:
PORT=4000
MONGODB_URI=<your-mongodb-uri>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
EMAIL_SERVICE_API_KEY=<your-email-service-key>

Run:
npm run dev

Spring Boot (Dashboard, Chatting, Video)
cd server/dashboard

Configure src/main/resources/application.properties:
spring.data.mongodb.uri=<your-mongodb-uri>
server.port=8080
razorpay.key.id=<your-razorpay-key-id>
razorpay.key.secret=<your-razorpay-key-secret>
spring.mail.host=smtp.<your-email-service>.com
spring.mail.username=<your-email-username>
spring.mail.password=<your-email-password>
video.service.api.key=<your-video-service-key>
=0
Run:
```bash
mvn spring-boot:run

Frontend
cd client
npm install

Create .env:
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
VITE_AUTH_BACKEND_URL=http://localhost:4000
VITE_DASHBOARD_BACKEND_URL=http://localhost:8080

Run:
npm run dev

Testing

Access frontend at http://localhost:5173.
Test login, OTP, dashboard, booking, chatting, and video.
Check logs for errors (e.g., ERR_HTTP_HEADERS_SENT).

Troubleshooting

ERR_HTTP_HEADERS_SENT:
Issue: Multiple responses.
Fix: Use return with res.json in userController.js (e.g., getUserData).


Razorpay:
Issue: Script fails.
Fix: Verify VITE_RAZORPAY_KEY_ID and connectivity.


Spring Boot:
Issue: Dashboard/chat/video fails.
Fix: Check MongoDB, WebSocket, and API keys in application.properties.



Documentation
See HealthSync_Documentation.pdf for user flows, architecture, and flowcharts.
Future Enhancements

JWT authentication.
Real-time notifications.
Video conferencing with screen sharing/recording.
Advanced AI suggestions with ML.

Contact
Email: support@healthsync.com

License: MIT Contributing: See CONTRIBUTING.md ```
