# Copilot Agent Instructions for copilot-frontend

## Project Overview
This is a modern React + TypeScript dashboard for fund and portfolio management, inspired by Manulife Investment Management. It features interactive data visualization, sidebar navigation, and a green-themed UI. The codebase is structured for modularity and rapid development using Vite and Tailwind CSS.

## Architecture & Data Flow
- **Entry Point**: `src/main.tsx` mounts the main `App.tsx`.
- **Routing**: Managed via `src/routes/` and page components in `src/pages/`.
- **Components**: UI is split into reusable components under `src/components/`, with sidebar navigation in `src/components/Sidebar/` and dashboard logic in `src/components/PortfolioDashboard.tsx`.
- **Data**: Uses mock data from `src/data/mockData.ts`. Replace with real API calls for production; update types in `src/types/index.ts`.
- **State & Hooks**: Custom hooks (e.g., `src/hooks/useCustomerData.ts`) encapsulate data logic.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (Vite, port 5173)
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`
- **Tests**: Example test in `src/pages/FundList/__tests__/FundList.test.tsx` (Jest/React Testing Library conventions)

## Project-Specific Patterns
- **Styling**: Use Tailwind CSS utility classes. Stick to semantic color names and mobile-first responsive design.
- **Type Safety**: All components and data structures use TypeScript interfaces from `src/types/index.ts`.
- **Navigation**: Sidebar config in `src/components/Sidebar/navigationConfig.ts`.
- **Data Visualization**: Charts via Recharts (see dashboard components).
- **Mock Data**: All demo data in `src/data/mockData.ts`.

## Integration Points
- **API Integration**: Replace mock data with API calls in service files (e.g., `src/services/customerApi.ts`).
- **External Libraries**: Tailwind CSS, Recharts, Heroicons, Vite.

## Conventions & Examples
- **Component Naming**: PascalCase for components, camelCase for functions/variables.
- **File Structure**: Group by feature (e.g., `pages/Dashboard/`, `components/Sidebar/`).
- **Testing**: Place tests in `__tests__` folders next to the code under test.
- **Type Definitions**: Centralized in `src/types/index.ts`.

## Key Files
- `src/App.tsx`, `src/main.tsx`: App entry and root component
- `src/components/PortfolioDashboard.tsx`: Main dashboard logic
- `src/components/Sidebar/Sidebar.tsx`: Sidebar navigation
- `src/data/mockData.ts`: Portfolio and fund mock data
- `src/types/index.ts`: Shared TypeScript interfaces
- `src/pages/FundList/FundList.tsx`: Fund list page example

## Example: Adding a New Page
1. Create a folder in `src/pages/` (e.g., `NewFeature/`).
2. Add your component and route config.
3. Update sidebar navigation if needed.
4. Use TypeScript interfaces and Tailwind for styling.

---
For questions or unclear conventions, review `README.md` or ask for clarification.
