# 🍲 Zarfo – AI-Powered Food Redistribution Platform

**Zarfo** is a community-driven platform that reduces food waste by connecting **hotels & restaurants** with **customers**, **volunteers (Night Robins)**, and **needy workers (Night Workers)**.  
It uses **AI-powered decision making** to decide whether surplus food should be **sold at discount** or **donated**, and coordinates smart logistics through volunteers.

---

## 🚀 Features

### 🌍 Role-Based Platform

* **Admin Dashboard**
  * Monitor hotels, users, Night Robins & Night Workers.
  * Analytics: meals saved, food wasted, CO₂ reduced.
  * Approvals, reporting, CSR certificates.

* **Hotel Portal**
  * Post surplus food (with photo, expiry time, price).
  * AI suggests price & donation fallback.
  * View CSR & impact reports.

* **Customer App**
  * Browse nearby **flash deals** on surplus food.
  * Pay & track order in real-time.
  * Rate and review food.

* **Night Robin (Volunteer/Delivery Agent)**
  * Accept delivery routes suggested by AI.
  * Pick up from hotels & deliver to Night Workers.
  * Earn gamified points, badges, and certificates.

* **Night Worker App**
  * Request food with a single tap.
  * Receive delivery updates via app/WhatsApp.
  * Confirm receipt & rate quality.

* **AI Agent**
  * Smart decision engine for **sell vs donate**.
  * Optimizes routes for Night Robins.
  * Predicts demand and prevents wastage.

---

## 🛠 Tech Stack

**Frontend**
- Web (Admin + Hotel): Next.js / React, TailwindCSS, shadcn/ui  
- Mobile Apps (Customer, Robin, Worker): Flutter  

**Backend**
- Node.js + NestJS (or Python FastAPI)  
- PostgreSQL (core database)  
- Redis (caching, queues)  
- Prisma/TypeORM ORM  

**AI Engine**
- Python (FastAPI microservice)  
- scikit-learn (baseline ML models)  
- OR-Tools (routing optimization)  

**Integrations**
- Google Maps API (routing, distance)  
- WhatsApp Business API (Twilio/Meta)  
- Razorpay/Stripe (payments)  
- AWS S3 / Cloud Storage (images)  

---

## 📂 Folder Structure
```
zarfo/
├── apps/
│ ├── admin-web/ # Admin dashboard
│ ├── hotel-web/ # Hotel portal
│ ├── customer-app/ # Mobile app for users
│ ├── robin-app/ # Night Robin app
│ └── worker-app/ # Night Worker app
├── backend/ # API Gateway & services
├── ai-engine/ # AI decisioning service
├── docs/ # Documentation & diagrams
└── README.md
```
---

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)  
- [pnpm](https://pnpm.io/) package manager  
- [PostgreSQL](https://www.postgresql.org/)  
- [Redis](https://redis.io/)  

### Installation
1. **Clone the repository:**
    ```sh
    git clone https://github.com/farhat-1203/Zarfo.git
    cd Zarfo/shadcn-ui
    ```
2. **Install dependencies:**
    ```sh
    pnpm install
    ```
3. **Running the Development Server**
    ```sh
    pnpm run dev
    ```
