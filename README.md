# Fund Display System

## Overview
This repository contains a React TypeScript frontend inspired by the Manulife Investment Management dashboard and a NestJS backend. The system displays fund portfolios, allocation charts, and related data with a modern, responsive UI.

### Main Features (React App)
- **Portfolio Dashboard:** Visualizes fund allocations and performance using interactive charts (Recharts).
- **Sidebar Navigation:** Quick access to dashboard sections with a dark-themed sidebar.
- **Responsive Design:** Optimized for desktop and mobile.
- **Mock Data Support:** Easily switch between mock and live data for development.
- **Type Safety:** All data structures use TypeScript interfaces.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repo-url>
cd copilot-frontend
```

### 2. Install Dependencies
#### React Frontend
```bash
cd copilot-frontend
npm install
```
#### NestJS Backend
```bash
cd ../copilot-backend
npm install
```

### 3. Run the Applications
#### Start the Backend (NestJS)
```bash
cd ../copilot-backend
npm run start:dev
```
The backend will start on [http://localhost:3000](http://localhost:3000).

#### Start the Frontend (React)
```bash
cd ../copilot-frontend
npm run dev
```
The frontend will start on [http://localhost:5173](http://localhost:5173).

## Project Structure
```
copilot-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── PortfolioDashboard.tsx
│   │   └── ...
│   ├── data/
│   │   └── mockData.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── router/
│   │   └── index.tsx
│   └── setupTests.ts
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── ...
```

### Main Files
- **src/components/Sidebar.tsx:** Sidebar navigation with logo and menu.
- **src/components/PortfolioDashboard.tsx:** Main dashboard with charts and portfolio data.
- **src/data/mockData.ts:** Mock data for development/testing.
- **src/types/index.ts:** TypeScript interfaces for all data structures.
- **src/router/index.tsx:** React Router configuration.
- **src/App.tsx:** Main app component, sets up layout and routing.

## Router Configuration
- Uses **React Router v6+** for client-side routing.
- Main routes are defined in `src/router/index.tsx`:
  - `/` → PortfolioDashboard
  - Additional routes can be added for more features (e.g., fund details, settings).
- Example:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioDashboard from '../components/PortfolioDashboard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioDashboard />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}
```

## React Component Structure
- **Sidebar:** Handles navigation, uses Heroicons for icons, styled with Tailwind.
- **PortfolioDashboard:** Fetches and displays portfolio data, renders charts (Recharts), uses TypeScript interfaces for props/data.
- **Other Components:** Can be added for fund details, user settings, etc.
- **Styling:** Tailwind CSS with a green theme (`#22c55e`), dark sidebar, light content area.

## Tips for Developers
- Use `import type` for all TypeScript type imports.
- Follow the Manulife green theme and design guidelines (see `copilot-instructions.md`).
- Use mock data for rapid development; switch to backend API for production.
- Maintain consistent file naming (PascalCase for components).
- Run tests with `npm test` (Jest configured for TypeScript).
- Keep dependencies updated and review Tailwind config for customizations.

## Maintenance
- Update TypeScript interfaces in `src/types/index.ts` when data structures change.
- Add new routes/components as features expand.
- Review and update mock data as needed for development.

---
For more details, see inline comments and the [copilot-instructions.md](./copilot-instructions.md) file.
