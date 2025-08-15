# Manulife Investment Management Dashboard

A modern React TypeScript application inspired by the Manulife Investment Management dashboard design. This project provides a comprehensive fund display system with interactive portfolio visualization.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Main Features](#main-features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Router Configuration](#router-configuration)
- [Component Structure](#component-structure)
- [Getting Started](#getting-started)
- [Development Tips](#development-tips)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Project Overview
This repository contains a full-stack investment dashboard, featuring a modern React frontend and a NestJS backend. The frontend provides interactive portfolio management, while the backend is designed for scalable API integration and data management.

---

## Main Features
### React Frontend
- **Portfolio Dashboard**: Visualizes portfolio allocation, total value, and performance with interactive charts.
- **Responsive Design**: Mobile-friendly, adapts to all screen sizes.
- **Modern UI**: Manulife-inspired green theme, clean layouts, and intuitive navigation.
- **Real-time Data**: Mock data structure, ready for API integration.
- **Sidebar Navigation**: Quick access to Portfolio, Transactions, Profile, and more.
- **Wealth Specialist**: Advisor contact info and quick actions.
- **Action Center**: Subscribe, switch, redeem funds, and view pending transactions.

### NestJS Backend
- **RESTful API**: Provides endpoints for portfolio, transactions, and user data.
- **Mock Data**: Easily replaceable with real database integration.
- **Scalable Structure**: Modular controllers, services, and DTOs for maintainability.

---

## Tech Stack
- **React 18** (TypeScript, Vite)
- **NestJS** (TypeScript, Express)
- **Tailwind CSS**
- **Recharts**
- **Heroicons**

---

## File Structure
```
copilot-frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Sidebar/        # Sidebar navigation and items
│   │   ├── Logo.tsx        # Manulife logo
│   │   ├── Router.tsx      # App router configuration
│   │   └── PortfolioDashboard.tsx  # Main dashboard UI
│   ├── pages/              # Page-level components
│   │   ├── Dashboard/      # Portfolio dashboard page
│   │   ├── FundList/       # Fund list page
│   │   └── TransactionHistory/  # Transaction history page
│   ├── routes/             # Route definitions
│   ├── data/               # Mock data and API utilities
│   │   └── mockData.ts     # Sample portfolio data
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # Shared types
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── package.json            # Project metadata
└── README.md               # Documentation

copilot-backend/
├── src/
│   ├── app.controller.ts   # Main controller
│   ├── app.service.ts      # Main service
│   ├── main.ts             # Entry point
│   ├── modules/            # Feature modules (portfolio, transactions, user)
│   └── dto/                # Data transfer objects
├── test/                   # Test files
├── package.json            # Backend metadata
└── README.md               # Backend documentation
```

### Key Files Explained
- **App.tsx**: Root React component, sets up layout and router.
- **main.tsx**: Entry point, renders App to DOM.
- **Router.tsx**: Defines routes and navigation logic.
- **mockData.ts**: Contains sample data for development.
- **Sidebar/**: Navigation UI, links to main sections.
- **PortfolioDashboard.tsx**: Displays portfolio summary and charts.
- **NestJS main.ts**: Bootstraps backend server.
- **app.controller.ts**: Handles API requests.

---

## Router Configuration
Routing is managed in `src/components/Router.tsx` using React Router (or similar). Example structure:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import FundList from '../pages/FundList';
import TransactionHistory from '../pages/TransactionHistory';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/funds" element={<FundList />} />
    <Route path="/transactions" element={<TransactionHistory />} />
    {/* Add more routes as needed */}
  </Routes>
</BrowserRouter>
```
- **Sidebar** links correspond to these routes for seamless navigation.
- **Route components** are organized in `src/pages/` for clarity.

---

## Component Structure
- **Sidebar/**: Contains navigation, logo, and quick links.
- **PortfolioDashboard.tsx**: Main dashboard, pie chart, value display, risk profile.
- **FundList/**: Lists available funds, details, and actions.
- **TransactionHistory/**: Shows transaction records and statuses.
- **WealthSpecialist/**: Advisor contact and info.
- **ActionCenter/**: Fund actions (subscribe, switch, redeem).
- **Shared Components**: Buttons, cards, modals, etc. for UI consistency.

Each component uses TypeScript interfaces from `src/types/` and Tailwind CSS for styling. Data flows via props and context for maintainability.

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/JoyMHuang/copilot-frontend.git
cd copilot-frontend
```

### 2. Install dependencies (Frontend)
```bash
npm install
```

### 3. Start the React development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`

### 4. Start the NestJS backend
```bash
cd ../copilot-backend
npm install
npm run start:dev
```
Backend runs at `http://localhost:3000` (default).

### 5. Connect Frontend to Backend
- Update API endpoints in frontend data utilities (e.g., `src/data/`)
- Replace mock data with real API calls as needed

---

## Development Tips
- **Component Reuse**: Build UI as small, reusable components.
- **Type Safety**: Use TypeScript interfaces for all props and data.
- **Styling**: Use Tailwind classes, keep styles consistent.
- **Routing**: Organize routes in `Router.tsx` and keep pages in `src/pages/`.
- **API Integration**: Start with mock data, then connect to backend endpoints.
- **Error Handling**: Add loading and error states for all API calls.
- **Testing**: Add unit tests for key logic and components.
- **Documentation**: Update README and code comments for maintainability.

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
- Built with modern React and NestJS best practices
- Uses industry-standard financial UI patterns

---
