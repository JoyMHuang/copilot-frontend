# Manulife Investment Management Dashboard (React + Vite + Tailwind)

A modern React TypeScript application inspired by the Manulife Investment Management dashboard. It provides a fund display system with an interactive portfolio dashboard and a simple REST contract for a NestJS backend.

Contents:
- Quick start (frontend and backend)
- App features
- Project structure and key files
- Routing configuration
- Component architecture
- Data layer and caching
- Theming and styling
- Testing notes
- Tips for maintenance and extension
- Troubleshooting

---

## 1) Quick Start

Prerequisites:
- Node.js 18+ (LTS recommended)
- npm 9+ (or pnpm/yarn)

Environment variables (frontend):
- Create a `.env` file in the project root. Defaults are shown below.

Example `.env` (development):
```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
```

Frontend (React + Vite):
1) Install dependencies
```bash
npm install
```
2) Start the dev server (Vite is configured for port 3000)
```bash
npm run dev
# Open http://localhost:3000
```
3) Lint, build, and preview
```bash
npm run lint
npm run build
npm run preview
# Preview default: http://localhost:4173
```

Backend (NestJS, example):
- The frontend expects REST endpoints under `VITE_API_BASE_URL` (default `http://localhost:8000/api`).
- Endpoints used by the app:
  - GET /api/customer/:customerId/dashboard
  - GET /api/customer/:customerId/portfolio
  - GET /api/customer/:customerId/wealth-specialist
  - GET /api/customer/:customerId/transactions
  - GET /api/transaction-history

Minimal NestJS controller (example):
```ts
@Controller('api')
export class ApiController {
  @Get('customer/:id/dashboard')
  getDashboard(@Param('id') id: string) {/* return DashboardData */}

  @Get('customer/:id/portfolio')
  getPortfolio(@Param('id') id: string) {/* return PortfolioData */}

  @Get('customer/:id/wealth-specialist')
  getWealth(@Param('id') id: string) {/* return WealthSpecialist */}

  @Get('customer/:id/transactions')
  getTransactions(@Param('id') id: string) {/* return Transaction[] */}

  @Get('transaction-history')
  getTransactionList() {/* return TransactionListItem[] */}
}
```
Enable CORS in `main.ts` for local dev:
```ts
app.enableCors({ origin: 'http://localhost:3000', credentials: true });
```
Run NestJS on port 8000:
```bash
# inside your NestJS project
npm install
npm run start:dev
# Ensure it listens on http://localhost:8000
```
If your backend base URL differs, update `.env` in this repo.

---

## 2) App Features

- Sidebar navigation with Manulife-inspired branding and icons
- Dashboard with portfolio KPIs, allocation pie chart, and wealth specialist card
- Fund List placeholder page ready for expansion
- Transaction History with search and status filtering (Pending/Completed/Failed)
- API-driven data fetching with lightweight in-memory caching and graceful fallbacks to mock data

---

## 3) Project Structure

Top-level:
```
.
├─ .env                            # Frontend runtime config (API base URL, timeouts)
├─ package.json                    # Scripts: dev/build/preview/lint
├─ vite.config.ts                  # Vite server config (port 3000)
├─ tailwind.config.js              # Tailwind theme and scanning paths
├─ postcss.config.js
├─ index.html                      # Vite HTML entry
└─ src/
   ├─ main.tsx                     # App entry, mounts App
   ├─ App.tsx                      # Router + layout (Sidebar + content area)
   ├─ index.css                    # Global styles + Tailwind layers
   ├─ components/
   │  ├─ Logo.tsx                  # Logo SVG component
   │  ├─ PortfolioDashboard.tsx    # Dashboard UI, KPIs, Recharts pie, actions
   │  └─ Sidebar/
   │     ├─ Sidebar.tsx            # Sidebar UI, route-driven nav
   │     ├─ SidebarContainer.tsx   # Example/legacy container (not used by router)
   │     ├─ navigationConfig.ts    # Example/legacy nav config
   │     └─ index.ts
   ├─ pages/
   │  ├─ Dashboard/
   │  │  ├─ Dashboard.tsx          # Fetches data via hooks, renders PortfolioDashboard
   │  │  └─ Dashboard.css
   │  ├─ FundList/
   │  │  ├─ FundList.tsx           # Placeholder page
   │  │  └─ FundList.css
   │  └─ TransactionHistory/
   │     ├─ TransactionHistory.tsx # Fetch list, client-side search + status filter
   │     ├─ TransactionHistory.css
   │     └─ TransactionHistory.test.tsx # Example test (Vitest/RTL)
   ├─ routes/
   │  └─ index.ts                  # Central route registry
   ├─ hooks/
   │  └─ useCustomerData.ts        # useDashboard/usePortfolio/useWealthSpecialist/useTransactions
   ├─ services/
   │  ├─ customerApi.ts            # Customer endpoints + caching (axios)
   │  └─ transactionApi.ts         # Transaction list service
   ├─ utils/
   │  └─ cache.ts                  # Simple in-memory TTL cache
   ├─ data/
   │  └─ mockData.ts               # Mock portfolio + specialist fallbacks
   └─ types/
      └─ index.ts                  # Shared interfaces
```

Key files overview:
- `src/App.tsx`: Sets up `BrowserRouter`, renders `Sidebar`, defines page routes and redirect `/` → `/dashboard`.
- `src/routes/index.ts`: Declarative route list (id, path, component, name, icon) and helpers to generate navigation.
- `src/components/Sidebar/Sidebar.tsx`: Reads `routes` to render navigation links and highlight the current path.
- `src/components/PortfolioDashboard.tsx`: KPIs, allocation chart (Recharts), and quick actions.
- `src/hooks/useCustomerData.ts`: Data hooks using AbortController and shared error/loading logic; includes dashboard, portfolio, specialist, and transactions hooks.
- `src/services/customerApi.ts`: Axios client using `VITE_API_BASE_URL`; provides `getDashboardData`, `getPortfolioData`, `getWealthSpecialist`, `getTransactions`; caches read-mostly endpoints for 5 minutes.
- `src/services/transactionApi.ts`: Axios client for `/transaction-history`; defines `TransactionStatus` and `TransactionListItem` shape.
- `src/utils/cache.ts`: Tiny in-memory cache with TTL for frontend requests.
- `src/data/mockData.ts`: Fallback mock data aligned to `types` for resilient UX.

---

## 4) Routing Configuration

Central route config: `src/routes/index.ts`
- Route shape: `{ id, path, component, name, icon }`.
- Current routes:
  - `dashboard` → `/dashboard` → `Dashboard`
  - `fund-list` → `/fund-list` → `FundList`
  - `transaction-history` → `/transaction-history` → `TransactionHistory`

Runtime usage in `src/App.tsx`:
- `BrowserRouter` wraps the app.
- Redirect: `/` → `/dashboard`.
- `<Route path="/dashboard" element={<Dashboard />} />` and others.

Navigation:
- `src/components/Sidebar/Sidebar.tsx` maps over `routes` to render links and icons (from Heroicons via a local `iconMap`). The active link is determined by `useLocation()`.

Add a new page:
1) Create `src/pages/MyPage/MyPage.tsx` and export a component.
2) Register it in `src/routes/index.ts` with a unique `id`, `path`, `name`, and `icon`.
3) Import the page into `src/pages/index.ts` if you centralize exports.
4) The Sidebar will include it automatically from `routes`.

---

## 5) Component Architecture

- Sidebar (`src/components/Sidebar/Sidebar.tsx`)
  - Brand header with `Logo` and route-driven navigation.
  - Uses Tailwind for a dark sidebar; highlights the current route.

- PortfolioDashboard (`src/components/PortfolioDashboard.tsx`)
  - Displays total market value, unrealized P/L, risk profile, and allocation pie chart.
  - Action buttons (Subscribe, Switch, Redeem, View pending transactions). The "pending" action can route to `/transaction-history`.

- Dashboard page (`src/pages/Dashboard/Dashboard.tsx`)
  - Fetches data via `usePortfolio` and `useWealthSpecialist` for a fixed sample `customerId`.
  - Shows loading, error (falls back to `mockData`), or success state.

- Fund List page (`src/pages/FundList/FundList.tsx`)
  - Placeholder layout for future filters, search, and table.

- Transaction History page (`src/pages/TransactionHistory/TransactionHistory.tsx`)
  - Loads list via `TransactionApiService.getTransactionList()`.
  - Client-side search by name and status filtering (Pending/Completed/Failed).

---

## 6) Data Layer and Caching

Axios clients use `VITE_API_BASE_URL` and `VITE_API_TIMEOUT`.
- `CustomerApiService` (`src/services/customerApi.ts`)
  - `getDashboardData(customerId)` returns `{ portfolioData, wealthSpecialist, transactions }`.
  - `getPortfolioData(customerId)` returns `PortfolioData`.
  - `getWealthSpecialist(customerId)` returns `WealthSpecialist`.
  - `getTransactions(customerId)` returns `Transaction[]`.
  - Read-mostly calls use `memoryCache` with a 5-minute TTL.

- `TransactionApiService` (`src/services/transactionApi.ts`)
  - `getTransactionList()` returns an array of `TransactionListItem` with a `status` of `Pending | Completed | Failed`.

Types live in `src/types/index.ts`. Keep backend DTOs aligned with these shapes.

---

## 7) Theming and Styling

- Tailwind config (`tailwind.config.js`) extends a Manulife green palette:
  - Primary green: `#22c55e` with darker/lighter steps
  - Sidebar colors under `theme.extend.colors.sidebar`
- Global styles in `src/index.css`.
- Components use Tailwind utility classes; keep spacing and typography consistent.

---

## 8) Testing Notes

- Example test: `src/pages/TransactionHistory/TransactionHistory.test.tsx` (Vitest + React Testing Library).
- If test tooling is not installed, add:
```bash
npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom
```
Run tests:
```bash
npx vitest
```

---

## 9) Tips for Maintenance and Extension

- Routes: Add and modify in `src/routes/index.ts`; the Sidebar reads from `routes`.
- Hooks: Reuse hooks in `src/hooks/useCustomerData.ts` for consistent loading/error/abort handling.
- Caching: `memoryCache` improves perceived performance. Invalidate after write actions if needed.
- Error strategy: Dashboard falls back to `mockData` to keep the UI functional during outages.
- Env config: Use `.env.development`, `.env.production` where appropriate. Keep `VITE_API_BASE_URL` in sync with the backend.
- Icons: When adding routes, map the `icon` string to a Heroicon in `Sidebar.tsx`'s `iconMap`.
- Performance: Memoize expensive UI and avoid unnecessary re-renders; Recharts is responsive by default.
- Code conventions: TypeScript throughout, prefer `import type` for type-only imports, and React hooks best practices.

---

## 10) Troubleshooting

- API errors (404/500)
  - Verify backend endpoints and `VITE_API_BASE_URL`.
  - Ensure CORS allows `http://localhost:3000` in development.
- Blank charts or empty data
  - Confirm DTOs match `src/types/index.ts`.
- Sidebar highlight incorrect
  - Ensure route `path` in `src/routes/index.ts` matches the `<Route path>` in `src/App.tsx`.
- Env vars not applied
  - Restart `npm run dev` after editing `.env`.
- Port conflicts
  - Update `server.port` in `vite.config.ts` or stop the conflicting process.
