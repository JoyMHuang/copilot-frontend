# Manulife Investment Management Dashboard

A modern React TypeScript application inspired by the Manulife Investment Management dashboard design. This project provides a comprehensive fund display system with interactive portfolio visualization.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Frontend (React)](#frontend-react)
  - [Backend (NestJS)](#backend-nestjs)
- [Router Configuration](#router-configuration)
- [Component Structure](#component-structure)
- [Development Tips](#development-tips)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Project Overview

This repository contains a full-featured fund dashboard system:

- **Frontend:** React 18 + TypeScript, Vite, Tailwind CSS, Recharts, Heroicons
- **Backend:** NestJS (API server, not included in this repo—see setup below)

The dashboard displays portfolio allocation, fund lists, transaction history, and wealth specialist info, with a sidebar navigation and responsive design.

---

## Features

- **Portfolio Dashboard:** Interactive charts, allocation breakdown, risk profile, market value
- **Fund List:** Search and filter funds by name/code/currency, view details
- **Transaction History:** List of past transactions, status, and details
- **Wealth Specialist:** Contact info and quick actions
- **Sidebar Navigation:** Easy access to all sections
- **Responsive Design:** Works on all devices
- **API Integration:** Real backend support via NestJS (see below)

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Recharts, Heroicons
- **Backend:** NestJS (TypeScript, REST API)
- **Testing:** Vitest, React Testing Library

---

## File Structure

```
copilot-frontend/
├── .env
├── .github/
│   └── copilot-instructions.md
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx                # Main React app, router setup
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles (Tailwind)
│   ├── components/
│   │   ├── Sidebar/           # Sidebar navigation
│   │   │   ├── Sidebar.tsx    # Sidebar UI
│   │   │   ├── navigationConfig.ts # Sidebar nav config
│   │   │   └── SidebarContainer.tsx # Sidebar state manager
│   │   ├── PortfolioDashboard.tsx   # Main dashboard content
│   │   └── Logo.tsx           # Manulife logo SVG
│   ├── pages/
│   │   ├── Dashboard/         # Dashboard page
│   │   ├── FundList/          # Fund list page
│   │   ├── TransactionHistory/# Transaction history page
│   │   └── FundDetail.tsx     # Fund detail page
│   ├── routes/
│   │   └── index.ts           # Route definitions
│   ├── data/
│   │   └── mockData.ts        # Mock data for development
│   ├── services/
│   │   ├── customerApi.ts     # API calls for customer data
│   │   └── fundApi.ts         # API calls for fund data
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── hooks/
│   │   └── useCustomerData.ts # Custom hooks for API data
│   └── utils/
│       └── cache.ts           # Simple memory cache
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Frontend (React)

1. **Clone the repository**
   ```sh
   git clone https://github.com/JoyMHuang/copilot-frontend.git
   cd copilot-frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Edit `.env` for API base URL and timeout:
     ```
     VITE_API_BASE_URL=http://localhost:8000/api
     VITE_API_TIMEOUT=10000
     ```

4. **Start the development server**
   ```sh
   npm run dev
   ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend (NestJS)

> **Note:** The backend is not included in this repo. You need to set up a NestJS API server separately.

1. **Create a new NestJS project**
   ```sh
   npm i -g @nestjs/cli
   nest new backend
   cd backend
   ```

2. **Implement API endpoints**
   - `/api/fund` - List funds
   - `/api/fund/:code` - Fund details
   - `/api/customer/:customerId/dashboard` - Dashboard data
   - `/api/customer/:customerId/portfolio` - Portfolio data
   - `/api/customer/:customerId/wealth-specialist` - Wealth specialist info
   - `/api/customer/:customerId/transactions` - Transaction history

3. **Start the backend server**
   ```sh
   npm run start:dev
   ```
   - Ensure it runs at the URL specified in `.env` (`http://localhost:8000/api`).

---

## Main Functionality

- **Sidebar Navigation:** Persistent sidebar with logo and menu items, routes to main sections.
- **Dashboard:** Shows portfolio summary, allocation pie chart, risk profile, and wealth specialist card.
- **Fund List:** Searchable and filterable list of funds, click to view details.
- **Transaction History:** Displays user’s transaction records.
- **Fund Detail:** Shows detailed info for a selected fund.
- **API Integration:** Data is fetched from backend and cached for performance.

---

## Router Configuration

Routes are defined in [`src/routes/index.ts`](src/routes/index.ts):

- `/dashboard` → [`Dashboard`](src/pages/Dashboard/Dashboard.tsx)
- `/fund-list` → [`FundList`](src/pages/FundList/FundList.tsx)
- `/fund-detail/:code` → [`FundDetail`](src/pages/FundDetail.tsx)
- `/transaction-history` → [`TransactionHistory`](src/pages/TransactionHistory/TransactionHistory.tsx)

The main router is set up in [`src/App.tsx`](src/App.tsx):

```tsx
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/fund-list" element={<FundList />} />
  <Route path="/fund-detail/:code" element={<FundDetail />} />
  <Route path="/transaction-history" element={<TransactionHistory />} />
</Routes>
```

Sidebar navigation uses these routes for menu links.

---

## Component Structure

- **Sidebar:** [`Sidebar.tsx`](src/components/Sidebar/Sidebar.tsx)
  - Renders logo and navigation links
  - Highlights active route
- **PortfolioDashboard:** [`PortfolioDashboard.tsx`](src/components/PortfolioDashboard.tsx)
  - Displays portfolio summary, allocation chart, breakdown, action buttons, and wealth specialist info
- **Dashboard Page:** [`Dashboard.tsx`](src/pages/Dashboard/Dashboard.tsx)
  - Fetches portfolio and specialist data, handles loading/error states
- **FundList Page:** [`FundList.tsx`](src/pages/FundList/FundList.tsx)
  - Lists funds, supports search and currency filter, links to fund detail
- **FundDetail Page:** [`FundDetail.tsx`](src/pages/FundDetail.tsx)
  - Shows detailed info for a selected fund
- **TransactionHistory Page:** [`TransactionHistory.tsx`](src/pages/TransactionHistory/TransactionHistory.tsx)
  - Placeholder for transaction records

Custom hooks in [`hooks/useCustomerData.ts`](src/hooks/useCustomerData.ts) manage API calls and state.

---

## Development Tips

- **TypeScript:** All data structures use interfaces in [`types/index.ts`](src/types/index.ts).
- **Styling:** Use Tailwind utility classes for consistent design.
- **Mock Data:** Located in [`data/mockData.ts`](src/data/mockData.ts) for development/testing.
- **API Services:** All API calls are in [`services/customerApi.ts`](src/services/customerApi.ts) and [`services/fundApi.ts`](src/services/fundApi.ts).
- **Testing:** Use Vitest and React Testing Library. See [`FundList.test.tsx`](src/pages/FundList/FundList.test.tsx) for examples.
- **Responsive Design:** All components are mobile-friendly.
- **Caching:** Simple in-memory cache in [`utils/cache.ts`](src/utils/cache.ts) to reduce API calls.
- **Adding Pages:** Create a new component in `pages/`, add to `routes/index.ts`, and update sidebar config if needed.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- Design inspired by Manulife Investment Management
- Built with modern React best practices
- Uses industry-standard financial UI patterns
