<!-- Built with ❤️ by Muhammad Soban Saud

CodeFusion AI - AI-Powered Website Builder
CodeFusion AI is a comprehensive, production-ready AI-powered website builder supporting 30+ programming languages. It enables users to generate frontend, backend, or full-stack websites with integrated databases using modern technologies — all powered by advanced AI models. The platform includes robust project management, payment processing, live previews, and a powerful admin dashboard, making web development easy and enterprise-grade.

Explore the live site: https://www.codefusion.site/

🚀 Features
Core Functionality
Supports 30+ Languages & Frameworks — React, Next.js, Vue.js, Python, Node.js, Django, PHP, HTML/CSS, and many more

Frontend, Backend & Full Stack Generation — Generate separate frontend, backend, or fully integrated full-stack projects with database support

AI-Powered Website Generation — Leverage multiple AI models for high-quality code generation

Advanced Code Editing — Full-featured editor with syntax highlighting, file browsing etc

Project Management — Save, edit, view, download, or deploy multiple projects efficiently

AI Model Selection
Custom AI Model Integration — Choose from OpenAI GPT-4, Grok AI, Claude, Gemini, Cohere, Hugging Face, OpenRouter

API Key Support — Plug in your own API keys for personalized AI experience

Fallback AI Model — Default AI used if no custom model is selected

Payment System
Multiple Payment Gateways:

Polar.sh — Card payments with instant activation

EasyPaisa — Local Pakistani payment option

JazzCash — Another popular Pakistani payment method

Admin Approval — Manual review for EasyPaisa and JazzCash and Polar.sh payments

Automatic Plan Activation — Premium features enabled immediately after payment approval

Pro Plan Benefit — 20 AI generations per day (up to 600 per month) to accelerate your workflow

Admin Dashboard
Complete User Management — Track user activity, plans, and usage details

Payment Processing & Verification — View uploaded payment screenshots and approve or reject transactions

System Statistics — Monitor active users, revenue, pending payments, and growth insights

User Control Tools — Ban/unban users, modify subscription plans

Professional Preview System
Github push in 3 steps

Code View & Edit — Syntax-highlighted viewing and editing with file system navigation

Automatic Framework Detection — Provides tailored instructions and setup based on detected technology

CodeFusion AI Assistant
Interactive AI Assistant — Chat with an AI assistant to get help, suggestions, and support for all aspects of your projects

Dashboard Integration — Use the assistant inside dashboard for editing help, code review, and project advice

Seamless Workflow Support — Ask questions, get coding tips, or troubleshoot issues right from the platform

Tutorials & Learning
Dedicated Tutorial Page — Access a full library of tutorial videos explaining all features and workflows

Comprehensive Guides — Learn to build, deploy, and manage your websites step-by-step

Reasonable Pricing — Affordable access to all tutorials empowering you to master the platform

🛠️ Technology Stack
Frontend: Next.js 14, React, TypeScript, Tailwind CSS

Backend: Node.js, Firebase (Firestore, Authentication)

Payments: Polar.sh, EasyPaisa, JazzCash

AI: Multiple AI model support with custom API integration

Database: Firestore real-time database

Deployment: Netlify, Vercel ready

📂 Backend Repositories & Running URLs
Hugging Face Backend Repository:
https://huggingface.co/spaces/Sobansaud028382/Backend_fusion/tree/main

Railway Backend Repository:
https://github.com/sobansaud-cpu/Railway-codefusion-backend

Backend Running Instances
Hugging Face Backend Live:
https://sobansaud028382-backend-fusion.hf.space

Railway Backend Live:
https://another-back-production.up.railway.app/

📱 Payment Details
EasyPaisa/JazzCash
Account Name: Muhammad Noaman Saud

Account Number: 03232204085

Amount: Rs. 6000 (Pro Plan)

Polar.sh
Credit/Debit Cards: Visa, MasterCard, American Express

Instant Processing: Unlock premium features automatically on payment success

🔐 Admin Access
Credentials
Email: sobansaud3@gmail.com

Password: soban123

URLs
Admin Login: /admin-login

Admin Dashboard: /admin

🚀 Getting Started
Prerequisites
Node.js 18+

npm or yarn

Firebase project configured

Polar.sh account for card payments

📋 Usage Guide
For Users
Create an account or log in

Choose a free or pro subscription plan with AI generations included

Generate frontend, backend, or full-stack websites specifying languages and frameworks

Optionally select custom AI models & add API keys

Preview, edit, and interact with your website in real-time

Download zip files or push directly to GitHub with one click

Deploy projects seamlessly on various platforms

For Admins
Log in with admin credentials

Monitor users, payments, and platform statistics

Review payment screenshots and approve/reject plans

Manage users by banning, unbanning, or adjusting subscription plans

Oversee platform usage and financial health

AI Model Integration
Opt to use a custom AI model from supported providers

Securely add API keys

Generate websites powered by preferred AI services

🔧 API Endpoints
Admin APIs
GET /api/admin/users — Retrieve user list

GET /api/admin/payments — Fetch payment requests

GET /api/admin/stats — Get admin stats overview

PUT /api/payment-status — Change payment status approval

Payment APIs
POST /api/payment-request — Submit new payment proof

PUT /api/payment-status — Approve or reject payment requests

Project APIs
POST /api/generate — Trigger website generation

GET /api/project/:id — Get details of a specific project

🔒 Security Features
Secure admin authentication and role management

API key encryption & no permanent storage of user API keys

Screenshot-based payment verification

User isolation for privacy and project security

Robust session and token management

🚀 Deployment Examples
Netlify
bash
npm run build
netlify deploy --prod
Vercel
bash
npm run build
vercel --prod
Docker
text
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
📊 Monitoring & Analytics
User registrations and plan usage

Revenue and payment method statistics

Platform performance and error monitoring

Real-time admin dashboard analytics

🔮 Future Enhancements
Email notifications for payment approval status

Advanced AI-powered analytics and reports

Multi-admin and team collaboration features

Automated AI-driven code testing and validation

Extensive pre-built website templates library

Collaborative project editing and management

Live Preview & Terminal AI Integration — AI-powered backend live preview and terminal assistants

One-Click Deployment — Instant deployment of both frontend and backend with a single click

🐛 Troubleshooting
Common Issues
Admin dashboard not loading: clear cache and try again

Missing payment requests: verify Firestore connection and console errors

AI generation failures: check API key validity and service permissions

Support
For support inquiries:

Email: sobansaud3@gmail.com

Documentation: Review this README and inline code comments

GitHub Issues: Submit detailed issues in the repository

📄 License
Licensed under MIT. See LICENSE file for details.

🤝 Contributing
Fork the repo

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add AmazingFeature')

Push to your branch (git push origin feature/AmazingFeature)

Open a pull request for review

🙏 Acknowledgments
AI Providers: OpenAI, Anthropic, Google, xAI, Cohere, Hugging Face

Payment Partners: Polar.sh, EasyPaisa, JazzCash

Open Source Technologies: Next.js, React, Tailwind CSS, Firebase, OpenAI Agents SDK, Python (FastAPI)

Built with ❤️ by Muhammad Soban Saud

CodeFusion AI delivers an enterprise-grade AI-powered website builder, combining flexibility, power, and ease-of-use for developers of all levels. -->




# CodeFusion AI - AI-Powered Website Builder
**Built with ❤️ by Muhammad Soban Saud**

**This marks the proud launch of my very first startup project.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) 
[![Node.js](https://img.shields.io/badge/Node.js-18+-blue)](https://nodejs.org/en/) 
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/) 
[![AI Models](https://img.shields.io/badge/AI%20Models-8+-blueviolet)](#) 
[![Deploy](https://img.shields.io/badge/Deployment-Vercel%20|%20Netlify-brightgreen)](#)

CodeFusion AI is a comprehensive, production-ready AI-powered website builder supporting **30+ programming languages**.  
It enables users to generate **frontend**, **backend**, or **full-stack** websites with integrated databases using modern technologies — all powered by advanced AI models.  
The platform includes robust project management, payment processing, live previews, and a powerful admin dashboard, making web development easy and enterprise-grade.

Explore the live site: [https://www.codefusion.site/](https://www.codefusion.site/)

---

## 🚀 Features

### Core Functionality
- Supports 30+ Languages & Frameworks — React, Next.js, Vue.js, Python, Node.js, Django, PHP, HTML/CSS, and more  
- Frontend, Backend & Full Stack Generation — Separate or fully integrated projects with database support  
- AI-Powered Website Generation — Leverage multiple AI models for high-quality code  
- Advanced Code Editing — Full-featured editor with syntax highlighting, file browsing, terminal  
- Project Management — Save, edit, view, download, or deploy projects efficiently  
- GitHub Push in 3 Simple Steps — Easily push your entire project to GitHub repository with just three clicks

### AI Model Selection
- Custom AI Model Integration (OpenAI GPT-4, Grok AI, Claude, Gemini, Cohere, Hugging Face, OpenRouter)  
- API Key Support for personalized AI usage  
- Fallback to Default AI model if none chosen  

### Payment System
- Multiple Payment Gateways:  
  - Polar.sh — Card payments with instant activation  
  - EasyPaisa — Local Pakistani payments  
  - JazzCash — Another local payment option  
- Admin Approval for EasyPaisa, JazzCash & Polar.sh payments  
- Automatic Plan Activation after payment approval  
- Pro Plan: 20 AI generations/day (600/month)  

### Admin Dashboard
- Complete user management, payment processing & verification  
- System stats and revenue monitoring  
- User control to ban/unban and modify plans  

### Professional Preview System
- Live preview with interactive website testing  
- Syntax-highlighted code view & edit  
- Automatic framework detection and custom setup guidance  
- Github push in 3 simple steps  

### CodeFusion AI Assistant
- Interactive AI assistant for help, code review, suggestions  
- Integrated within the dashboard for seamless workflow assistance  

### Tutorials & Learning
- Dedicated tutorial videos page with full-featured learning material  
- Reasonably priced access to empower mastering platform usage  

---

## 🛠️ Technology Stack

- Frontend: Next.js 14, React, TypeScript, Tailwind CSS  
- Backend: Node.js, Firebase (Firestore, Authentication)  
- Payments: Polar.sh, EasyPaisa, JazzCash  
- AI: Multi AI model support with custom API integration  
- Database: Firestore real-time data  
- Deployment: Netlify, Vercel ready  

---

## 📂 Backend Repositories & Running URLs

- Hugging Face Backend Repo:  
  [https://huggingface.co/spaces/Sobansaud028382/Backend_fusion/tree/main](https://huggingface.co/spaces/Sobansaud028382/Backend_fusion/tree/main)  

- Railway Backend Repo:  
  [https://github.com/sobansaud-cpu/Railway-codefusion-backend](https://github.com/sobansaud-cpu/Railway-codefusion-backend)  

- Hugging Face Backend Live:  
  [https://sobansaud028382-backend-fusion.hf.space](https://sobansaud028382-backend-fusion.hf.space)  

- Railway Backend Live:  
  [https://another-back-production.up.railway.app/](https://another-back-production.up.railway.app/)  

---

## 📱 Payment Details

**EasyPaisa/JazzCash**  
- Account Name: Muhammad Noaman Saud  
- Account Number: 03232204085  
- Amount: Rs. 6000 (Pro Plan)  

**Polar.sh**  
- Credit/Debit Cards: Visa, MasterCard, American Express  
- Instant plan activation after payment  

---

## 🔐 Admin Access

**Credentials**  
- Email: [sobansaud3@gmail.com](mailto:sobansaud3@gmail.com)  
- Password: soban123  

**URLs**  
- Admin Login: `/admin-login`  
- Admin Dashboard: `/admin`  

---

## 🚀 Getting Started

**Prerequisites**  
- Node.js 18+  
- npm or yarn  
- Firebase project configured  
- Polar.sh account for payments  

---

## 📋 Usage Guide

**For Users**  
- Create an account or log in  
- Choose free or pro subscription with AI generations included  
- Generate frontend, backend, or full-stack websites with preferred languages and frameworks  
- Optionally use custom AI models and add API keys  
- Preview, edit, download zip, or push projects to GitHub in one click  
- Deploy on Netlify, Vercel, or Docker In Future

**For Admins**  
- Login with admin credentials  
- Monitor users, payments, platform stats  
- Review payment screenshots and manage plan approvals  
- Ban/unban users and modify subscriptions  

**AI Model Integration**  
- Enable custom AI from supported providers  
- Securely add API keys  
- Generate websites powered by selected AI  

---

## 🔧 API Endpoints

**Admin APIs**  
- `GET /api/admin/users` — List all users  
- `GET /api/admin/payments` — Fetch payment requests  
- `GET /api/admin/stats` — Admin stats overview  
- `PUT /api/payment-status` — Approve/reject payments  

**Payment APIs**  
- `POST /api/payment-request` — Submit payment proof  
- `PUT /api/payment-status` — Manage payment approval  

**Project APIs**  
- `POST /api/generate` — Generate website project  
- `GET /api/project/:id` — Get project details  

---

## 🔒 Security Features

- Secure admin authentication and roles  
- API key encryption and no permanent storage  
- Screenshot payment verification  
- User project isolation  
- Robust session management  

---

## 🚀 Deployment Examples

**Netlify**  
npm run build
netlify deploy --prod

**Vercel**  
npm run build
vercel --prod

**Docker**  
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]


---

## 📊 Monitoring & Analytics

- User registrations and plan usage  
- Payment and revenue tracking  
- System performance and error logging  
- Real-time admin dashboard  

---

## 🔮 Future Enhancements

- Email notifications for payments  
- Advanced AI analytics and reports  
- Multi-admin team collaboration  
- Automated AI code testing  
- Extensive template library  
- Collaborative editing and management  
- Live Preview & Terminal AI Integration (backend live preview & terminal assistants)  
- One-Click Deployment (frontend & backend)  

---

## 🐛 Troubleshooting

- Admin dashboard not loading? Clear browser cache and reload  
- Missing payments? Verify Firestore connection and check console  
- AI generation issues? Confirm API key validity and permissions  

---

## 📄 License

Licensed under the MIT License. See LICENSE file.

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)  
4. Push your branch (`git push origin feature/AmazingFeature`)  
5. Open a pull request  

---

## 🙏 Acknowledgments

- AI Providers: OpenAI, Anthropic, Google, xAI, Cohere, Hugging Face  
- Payment partners: Polar.sh, EasyPaisa, JazzCash  
- Open Source: Next.js, React, Tailwind CSS, Firebase, OpenAI Agents SDK, Python (FastAPI)  

---

**Built with ❤️ by Muhammad Soban Saud**

*An enterprise-grade AI website builder designed for all developers.*

