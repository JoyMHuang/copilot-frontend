# Manulife Investment Management Dashboard

This repository contains a modern full-stack application with a React + TypeScript front-end and a NestJS back-end. The project is inspired by the Manulife Investment Management dashboard and is designed for rapid development, maintainability, and extensibility.

---

## Table of Contents
- [Manulife Investment Management Dashboard](#manulife-investment-management-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
    - [Frontend (React)](#frontend-react)
    - [Backend (NestJS)](#backend-nestjs)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Backend (NestJS)](#backend-nestjs-1)
    - [Frontend (React)](#frontend-react-1)
  - [Project Structure](#project-structure)
  - [Main Files and Their Roles](#main-files-and-their-roles)
  - [Router Configuration](#router-configuration)
  - [React Component Structure](#react-component-structure)
  - [Development Tips](#development-tips)

---

## Project Overview
This system provides a comprehensive fund display and management dashboard. It includes interactive portfolio visualization, fund list, transaction history, and detailed fund information. The backend is a mock API server using NestJS, while the frontend is a responsive React SPA styled with Tailwind CSS.

## Features
### Frontend (React)
- **Portfolio Dashboard**: Interactive dashboard with allocation pie charts, portfolio value, risk profile, and advisor info.
- **Fund List**: Searchable and filterable list of funds with real-time data (mocked for development).
- **Transaction History**: View all transactions with filtering and status indicators.
- **Fund Detail**: Detailed view for each fund, including performance and allocation.
- **Sidebar Navigation**: Persistent sidebar with icons and active state highlighting.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Modern UI**: Clean, professional look with Manulife-inspired green theme.

### Backend (NestJS)
- **Mock API Endpoints**: Provides mock data for customers, funds, and transactions.
- **Swagger Documentation**: Auto-generated API docs at `/api/docs`.
- **DTO and Type Safety**: All mock data follows strict DTO/type definitions.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Recharts, Heroicons
- **Backend**: NestJS 10, TypeScript, Swagger, class-validator, class-transformer

---

## Getting Started

### Backend (NestJS)
1. **Install dependencies**
   ```bash
   cd copilot-backend
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run start:dev
   ```
3. **API Documentation**
   - Visit [http://localhost:8000/api/docs](http://localhost:8000/api/docs) for Swagger UI.

### Frontend (React)
1. **Install dependencies**
   ```bash
   cd copilot-frontend
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. **Open the app**
   - Visit [http://localhost:3001](http://localhost:3001) (or the port shown in the terminal).

---

## Project Structure

```
copilot-backend/
  src/
    app.controller.ts         # Main API controller
    app.module.ts             # Root module
    app.service.ts            # App-level services
    main.ts                   # Entry point, sets up NestJS, Swagger, CORS
    customer/                 # Customer module (controller, service, DTOs)
    fund/                     # Fund module (controller, service, DTOs)
    transaction/              # Transaction module (controller, service, DTOs)
    mock-data/                # All mock data and interfaces
      customer.mock.ts        # Customer mock data
      fund.mock.ts            # Fund mock data
      transaction.mock.ts     # Transaction mock data
      interfaces/             # TypeScript interfaces for all mock data

copilot-frontend/
  src/
    App.tsx                   # Main React app with router and layout
    main.tsx                  # React entry point
    index.css                 # Global styles (Tailwind)
    components/
      Sidebar/                # Sidebar navigation components
        Sidebar.tsx           # Sidebar UI and navigation logic
        SidebarContainer.tsx  # Sidebar wrapper
      Logo.tsx                # Manulife logo SVG
      PortfolioDashboard.tsx  # Main dashboard content
    pages/
      Dashboard/              # Dashboard page
      FundList/               # Fund list page
      FundDetail/             # Fund detail page
      TransactionHistory/     # Transaction history page
    routes/
      index.ts                # Route definitions and navigation logic
    data/
      mockData.ts             # Mock data for frontend
    types/
      index.ts                # TypeScript interfaces
    services/
      fundApi.ts              # API service for funds
      customerApi.ts          # API service for customers
    utils/
      env.ts                  # Utility for environment variables
```

---

## Main Files and Their Roles
- **App.tsx**: Sets up the main layout, sidebar, and React Router routes for all pages.
- **main.tsx**: React entry point, renders the app and applies StrictMode in production.
- **Sidebar/Sidebar.tsx**: Renders the navigation sidebar, highlights the active route, and maps route icons.
- **routes/index.ts**: Centralized route configuration for all main pages, including icon mapping and navigation item generation.
- **PortfolioDashboard.tsx**: Displays portfolio summary, allocation chart, and advisor info.
- **FundList.tsx**: Displays a searchable/filterable table of funds.
- **FundDetail.tsx**: Shows detailed information for a selected fund.
- **TransactionHistory.tsx**: Lists all transactions with status and filtering.
- **mockData.ts**: Provides mock data for development and UI testing.
- **env.ts**: Handles environment variable access for API URLs and timeouts.

---

## Router Configuration
- All routes are defined in `src/routes/index.ts` as an array of objects with `id`, `path`, `component`, `name`, and `icon`.
- The main routes are:
  - `/dashboard` → Dashboard page
  - `/fund-list` → Fund list page
  - `/transaction-history` → Transaction history page
  - `/fund-detail` → Fund detail page
- The sidebar uses this configuration to render navigation links and icons, and to determine the active route.
- Navigation items are generated dynamically from the route config for consistency.

---

## React Component Structure
- **Sidebar**: Persistent navigation on the left, dark background, uses Heroicons for icons, highlights the current route.
- **PortfolioDashboard**: Main dashboard content, includes allocation pie chart (Recharts), summary cards, and advisor info.
- **FundList**: Table of funds with search and currency filter, clicking a fund navigates to detail.
- **FundDetail**: Detailed view for a single fund, including performance and allocation breakdown.
- **TransactionHistory**: Table of all transactions, with status and filtering.
- **Logo**: SVG logo component for Manulife branding.

---

## Development Tips
- **Type Safety**: All data structures use TypeScript interfaces, defined in `src/types` (frontend) and `src/mock-data/interfaces` (backend).
- **Styling**: Use Tailwind CSS utility classes for all styling. The color palette is extended in `tailwind.config.js` to match Manulife branding.
- **Mock Data**: Both frontend and backend use mock data for rapid UI and API development. Replace with real API calls as needed.
- **Testing**: Use Jest and React Testing Library for unit and integration tests. See `src/pages/FundList/FundList.test.tsx` for an example.
- **API Integration**: To connect frontend to real backend, update API URLs in `src/utils/env.ts` and ensure CORS is enabled in the backend (`main.ts`).
- **Extensibility**: Add new pages by updating `routes/index.ts` and creating new components/pages as needed.
- **Documentation**: Keep this README and code comments up to date as the project evolves.

---

For any questions or contributions, please refer to the guidelines in this README or open an issue/pull request.
