# Store Essentials

A portfolio-ready Next.js MERN storefront built with a reusable React component design and a Node/Express backend. Includes product listing, a shopping cart, and checkout flow with MongoDB persistence and Playwright + Vitest test suites.

## Features
- Next.js frontend with client-side product browsing and cart management
- Express and MongoDB backend for products and orders
- Clean UI with responsive cards and navigation
- Playwright end-to-end tests and Vitest + React Testing Library unit tests

## Setup
1. Copy `.env.example` to `.env.local`.
2. Install dependencies: `npm install`.
3. Start services: `npm run dev`.
4. Open `http://localhost:3000`.

## Scripts
- `npm run dev` - starts frontend and backend together
- `npm run build` - builds the Next.js app
- `npm run start` - starts the Next.js production server
- `npm run test:unit` - runs Vitest unit tests
- `npm run test:e2e` - runs Playwright tests
