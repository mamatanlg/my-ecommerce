My Ecommerce Store

A modern headless ecommerce application built with **Next.js** and **Vendure**. It provides an online shopping experience with product browsing, shopping cart management, checkout, and order processing.

Project Information

- **Developer:** Louis Gabriel A. Mamatan
- **Course/Section:** BSIT-3T2

Features

- Product catalog and product details
- Product pricing in Philippine Peso (PHP)
- Shopping cart
- Customer contact information
- Shipping address management
- Shipping method selection
- Checkout and order placement
- Order confirmation
- Order management through the Vendure Dashboard

Technologies Used

Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

Backend
- Vendure 3.8.1
- Node.js
- GraphQL API

Database
- PostgreSQL
- Neon Database

Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- GitHub – Source code management

Project Structure

```text
my-ecommerce/
├── frontend/       # Next.js storefront
├── backend/        # Vendure backend
└── README.md       # Project documentation
```

Live Application

- Storefront:https://my-ecommerce-storefront-rosy.vercel.app/en
- Vendure Dashboard:https://my-ecommerce-backend-j4eb.onrender.com/dashboard
- **Shop API:https://my-ecommerce-backend-j4eb.onrender.com/shop-api

Local Development

Requirements

- Node.js
- npm
- PostgreSQL database

Backend

```bash
cd backend
npm install
npm run dev
```

Configure the backend environment variables before starting the application.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend environment variables to connect to the Vendure Shop API.

Database and Configuration

The backend uses PostgreSQL. Environment variables are used to configure database connections, API settings, and application secrets.

**Important:** Never commit `.env` files, passwords, API keys, or other private credentials to GitHub.

Deployment

- The frontend is deployed through Vercel.
- The Vendure backend is deployed through Render.
- The PostgreSQL database is hosted on Neon.
- GitHub's `main` branch is connected to the deployment workflow.

Project Status

The application has a working product catalog, shopping cart, checkout, and order creation flow. Further improvements and testing are ongoing.

License

This project is intended for educational and development purposes.cart, checkout, and order creation flow. Further improvements and testing are ongoing.



\License



This project is intended for educational and development purposes.

