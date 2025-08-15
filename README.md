# Manulife Investment Management Dashboard

A modern React TypeScript application inspired by the Manulife Investment Management dashboard design. This project provides a comprehensive fund display system with interactive portfolio visualization, featuring real-time data integration with a backend API.

## 🌟 Features

### Frontend Features
- **📊 Portfolio Dashboard**: Interactive dashboard showing portfolio allocation with pie charts and real-time data
- **💎 Fund Management**: Complete fund listing with search, filtering, and detailed fund information
- **📱 Responsive Design**: Mobile-friendly interface that works across all devices  
- **🎨 Modern UI**: Clean, professional design with Manulife-inspired green theme (#22c55e)
- **🔄 Real-time Data**: Live API integration with caching for optimal performance
- **🧭 Navigation**: Sidebar navigation with multiple sections (Dashboard, Fund List, Transaction History)
- **👤 Wealth Specialist**: Contact information and quick actions for financial advisors
- **⚡ Performance**: Optimized with React hooks, TypeScript, and efficient data caching

### Backend Integration
- **🔌 API Services**: RESTful API integration for customer data, portfolio information, and fund details
- **💾 Data Caching**: In-memory caching system for improved performance (5-minute cache TTL)
- **🔄 Error Handling**: Comprehensive error handling with fallback to mock data
- **🎯 TypeScript Support**: Fully typed API responses and data structures

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with comprehensive interfaces
- **Vite** - Lightning-fast development and building
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing with dynamic navigation
- **Recharts** - Responsive chart library for data visualization
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Axios** - HTTP client for API communication

### Backend API (Expected)
- **Expected Backend**: NestJS or similar Node.js framework
- **API Base URL**: `http://localhost:8000/api` (configurable via environment variables)
- **Data Format**: JSON REST API with TypeScript DTO interfaces

## 🚀 Getting Started

### Prerequisites
- **Node.js 16+** (Recommended: 18+ for optimal React 18 support)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:8000` (optional - falls back to mock data)

### Frontend Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/JoyMHuang/copilot-frontend.git
cd copilot-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

### Backend Setup (Expected NestJS Server)

The frontend expects a NestJS backend running on `http://localhost:8000`. The expected backend should provide these endpoints:

```bash
# Customer API Endpoints
GET /api/customer/{customerId}/dashboard
GET /api/customer/{customerId}/portfolio
GET /api/customer/{customerId}/wealth-specialist
GET /api/customer/{customerId}/transactions

# Fund API Endpoints
GET /api/fund
GET /api/fund/{fundId}
```

**Note**: If no backend is available, the application will automatically fall back to mock data for development and testing.

## 📋 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests with Vitest
- `npm run test:run` - Run tests once without watch mode
- `npm run test:coverage` - Generate test coverage reports

## 📁 Project Structure

```
src/
├── components/             # Reusable React components
│   ├── Sidebar/           # Navigation sidebar components
│   │   ├── Sidebar.tsx           # Main sidebar component with navigation
│   │   ├── SidebarContainer.tsx  # Container with navigation state management
│   │   ├── navigationConfig.ts   # Navigation items configuration
│   │   └── index.ts              # Export barrel file
│   ├── Logo.tsx                  # Manulife logo component with variants
│   └── PortfolioDashboard.tsx    # Main portfolio dashboard component
├── pages/                 # Page-level components (Route components)
│   ├── Dashboard/         # Portfolio dashboard page
│   │   ├── Dashboard.tsx         # Dashboard page with API integration
│   │   ├── Dashboard.css         # Dashboard-specific styles
│   │   └── index.ts              # Export barrel file
│   ├── FundList/          # Fund listing and search page
│   │   ├── FundList.tsx          # Fund list with search and filters
│   │   ├── FundList.css          # Fund list styles
│   │   ├── FundList.test.tsx     # Unit tests for fund list
│   │   └── index.ts              # Export barrel file
│   ├── FundDetail/        # Individual fund detail page
│   │   ├── FundDetail.tsx        # Detailed fund information
│   │   ├── FundDetail.css        # Fund detail styles
│   │   └── index.ts              # Export barrel file
│   ├── TransactionHistory/# Transaction history page
│   │   ├── TransactionHistory.tsx # Transaction list and filters
│   │   ├── TransactionHistory.css # Transaction styles
│   │   └── index.ts              # Export barrel file
│   ├── ApiTest.tsx        # API testing utilities (development)
│   ├── SeparateApiTest.tsx# Individual API endpoint testing
│   └── index.ts           # Page exports barrel file
├── routes/                # Route configuration and management
│   └── index.ts           # Route definitions and navigation generation
├── services/              # API service layer
│   ├── customerApi.ts     # Customer-related API calls (portfolio, wealth specialist)
│   └── fundApi.ts         # Fund-related API calls (fund list, details)
├── hooks/                 # Custom React hooks
│   └── useCustomerData.ts # Data fetching hooks for customer information
├── data/                  # Mock data and constants
│   └── mockData.ts        # Sample data for development and fallbacks
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared interfaces and type definitions
├── utils/                 # Utility functions and helpers
│   └── cache.ts           # In-memory caching implementation
├── test/                  # Test configuration and utilities
│   ├── setup.ts           # Test environment setup
│   ├── mocks/             # Mock implementations for testing
│   └── utils/             # Test utility functions
├── App.tsx                # Main application component with routing
├── main.tsx               # Application entry point
├── index.css              # Global styles and Tailwind imports
└── vite-env.d.ts          # Vite environment type definitions
```

### 🏗️ Architecture Overview

#### Component Hierarchy
```
App.tsx (BrowserRouter)
├── Sidebar.tsx (Navigation)
└── Route Components
    ├── Dashboard/ (Portfolio overview)
    ├── FundList/ (Fund search and listing)  
    ├── FundDetail/ (Individual fund details)
    └── TransactionHistory/ (Transaction management)
```

#### Data Flow
1. **API Services** (`services/`) handle HTTP requests with caching
2. **Custom Hooks** (`hooks/`) manage state and API integration
3. **Page Components** (`pages/`) consume hooks and render UI
4. **Reusable Components** (`components/`) provide shared functionality

## 🧭 Router Configuration & Navigation

### Route Structure
The application uses **React Router v7** with the following route configuration:

```typescript
// src/routes/index.ts
export const routes: Route[] = [
  {
    id: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    icon: 'chart-pie',
  },
  {
    id: 'fund-list', 
    path: '/fund-list',
    component: FundList,
    name: 'Fund List',
    icon: 'trending-up',
  },
  {
    id: 'transaction-history',
    path: '/transaction-history', 
    component: TransactionHistory,
    name: 'Transaction History',
    icon: 'clock',
  }
];
```

### Navigation System
- **Dynamic Navigation**: Routes automatically generate sidebar navigation items
- **Active State Management**: Current route highlighting with visual indicators
- **Icon Integration**: Heroicons integration with string-to-component mapping
- **Responsive Design**: Mobile-friendly navigation with collapsible sidebar

### Route Guards & Navigation
```typescript
// Main App routing setup
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/fund-list" element={<FundList />} />
  <Route path="/fund-detail/:fundId" element={<FundDetail />} />
  <Route path="/transaction-history" element={<TransactionHistory />} />
</Routes>
```

## 🧩 Component Structure & Details

### Core Components

#### 1. **Sidebar Navigation** (`components/Sidebar/`)
- **Purpose**: Main navigation component with route-based menu generation
- **Features**: Active state management, icon mapping, responsive design
- **State Management**: Navigation state handled by `SidebarContainer`
- **Key Props**: Navigation items, current route, navigation change handlers

#### 2. **PortfolioDashboard** (`components/PortfolioDashboard.tsx`)
- **Purpose**: Main dashboard displaying portfolio allocation and wealth specialist info
- **Features**: 
  - Interactive pie charts (Recharts)
  - Portfolio value display with formatting
  - Action buttons (Subscribe, Switch, Redeem, View Transactions)
  - Wealth specialist contact integration
- **Data Sources**: Portfolio API + Wealth Specialist API
- **Currency Formatting**: Philippine Peso (PHP) with Intl.NumberFormat

#### 3. **Page Components** (`pages/`)

##### Dashboard (`pages/Dashboard/`)
```typescript
// Real-time data integration with error handling
const { portfolioData, loading: portfolioLoading, error: portfolioError } = usePortfolio(customerId);
const { wealthSpecialist, loading: specialistLoading, error: specialistError } = useWealthSpecialist(customerId);
```
- **API Integration**: Real-time portfolio and wealth specialist data
- **Error Handling**: Graceful fallback to mock data on API failures
- **Loading States**: Comprehensive loading indicators

##### FundList (`pages/FundList/`)
- **Search Functionality**: Real-time fund name and code search
- **Currency Filtering**: Multi-currency support with dynamic filters  
- **Performance Display**: Daily changes with color-coded indicators
- **Navigation**: Direct links to fund detail pages
- **Responsive Grid**: Adaptive layout for different screen sizes

##### FundDetail (`pages/FundDetail/`)
- **Comprehensive Fund Info**: Complete fund details including performance, holdings, fees
- **Risk Metrics**: Sharpe ratio, volatility, beta, risk level indicators
- **Manager Information**: Fund manager profiles and experience
- **Fee Structure**: Transparent fee breakdown

##### TransactionHistory (`pages/TransactionHistory/`)
- **Transaction Listing**: Complete transaction history with status indicators
- **Filtering Options**: Filter by transaction type, status, date range
- **Status Management**: Pending, completed, failed transaction states

## 🔗 API Integration & Services

### Service Architecture

#### CustomerApiService (`services/customerApi.ts`)
```typescript
// Main API endpoints for customer data
export class CustomerApiService {
  static async getDashboardData(customerId: string): Promise<DashboardData>
  static async getPortfolioData(customerId: string): Promise<PortfolioData>  
  static async getWealthSpecialist(customerId: string): Promise<WealthSpecialist>
  static async getTransactions(customerId: string): Promise<Transaction[]>
}
```

#### FundApiService (`services/fundApi.ts`)
```typescript
// Fund-related API endpoints
export class FundApiService {
  static async getFundList(): Promise<Fund[]>
  static async getFundDetail(id: string): Promise<FundDetail>
}
```

### Data Caching System
- **Memory Cache**: 5-minute TTL for all API responses
- **Cache Keys**: Structured keys for different data types (`portfolio_${customerId}`, `fund_detail_${id}`)
- **Performance**: Reduces redundant API calls and improves user experience

### Error Handling Strategy
1. **API Failure**: Automatic fallback to mock data
2. **Loading States**: User-friendly loading indicators
3. **Error Display**: Clear error messages with retry options
4. **Request Cancellation**: AbortController for cleanup on component unmount

## 🎨 Design System & UI Guidelines

### Color Palette
```css
/* Primary Colors */
--manulife-green: #22c55e      /* Primary brand color */
--manulife-dark-green: #15803d /* Hover states */
--manulife-light-green: #86efac /* Accents */

/* Layout Colors */
--sidebar-bg: #1f2937          /* Dark sidebar background */
--sidebar-hover: #374151       /* Sidebar hover state */
--background: #f8fafc          /* Main content background */

/* Status Colors */
--success: #10b981             /* Positive changes */
--error: #ef4444               /* Negative changes */
--warning: #f59e0b             /* Pending states */
```

### Typography
- **Font Family**: Inter (Google Fonts) - Modern, readable sans-serif
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Responsive Scaling**: Mobile-first approach with `rem` units

### Component Design Patterns
- **Cards**: `bg-white rounded-lg shadow-sm` for content containers
- **Buttons**: Manulife green with hover states and transitions
- **Form Elements**: Consistent focus states with green accent
- **Loading States**: Animated spinners with branded colors

### Investment Allocation Display
- **Equity**: 85.89% (Primary green #22c55e)
- **Bonds**: 6.13% (Neutral gray #374151)  
- **Multi-asset**: 7.08% (Blue accent #3b82f6)
- **Money market**: 0.90% (Red accent #ef4444)

## 🔧 Custom Hooks & State Management

### Data Fetching Hooks (`hooks/useCustomerData.ts`)

#### usePortfolio Hook
```typescript
export const usePortfolio = (customerId: string) => {
  // Features: Automatic refetching, error handling, request cancellation
  return { portfolioData, loading, error };
};
```

#### useWealthSpecialist Hook  
```typescript
export const useWealthSpecialist = (customerId: string) => {
  // Features: Cached data, loading states, error boundaries
  return { wealthSpecialist, loading, error };
};
```

#### useDashboard Hook
```typescript
export const useDashboard = (customerId: string) => {
  // Features: Combined data fetching, unified error handling
  return { data, loading, error, refetch };
};
```

### Hook Features
- **Request Cancellation**: AbortController integration prevents memory leaks
- **Automatic Caching**: Intelligent cache management with TTL
- **Error Boundaries**: Graceful error handling with fallback data
- **Loading States**: Comprehensive loading state management
- **TypeScript Integration**: Fully typed hook returns and parameters

## 💾 Data Types & Interfaces

### Core Data Structures (`types/index.ts`)

```typescript
export interface PortfolioData {
  id: string;
  name: string;
  cifNumber: string;                    // Customer identification
  totalValue: number;                   // Total portfolio value in PHP
  unrealizedProfitLoss: number;         // Current P&L
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  lastUpdated: string;                  // Data freshness indicator
  allocations: FundAllocation[];        // Asset allocation breakdown
}

export interface FundAllocation {
  name: string;                         // Asset class name
  percentage: number;                   // Allocation percentage
  amount: number;                       // Allocation value in PHP
  color: string;                        // Chart color hex code
}

export interface WealthSpecialist {
  name: string;                         // Advisor full name
  email: string;                        // Contact email
  phone: string;                        // Contact phone number
}

export interface Fund {
  id: string;                           // Unique fund identifier
  fundName: string;                     // Official fund name
  code: string;                         // Fund code/symbol
  unitPrice: number;                    // Current unit price
  currencyCode: string;                 // Currency (USD, PHP, etc.)
  priceDate: string;                    // Price date (ISO format)
  navChange: number;                    // Daily NAV change
  navChangePercent: number;             // Daily percentage change
}
```

## 🧪 Development & Testing

### Testing Strategy
- **Unit Tests**: Vitest with React Testing Library
- **Component Testing**: Individual component behavior validation  
- **API Testing**: Mock API responses and error scenarios
- **Coverage Reports**: Comprehensive test coverage tracking

### Development Tools
- **ESLint**: Code quality and consistency enforcement
- **TypeScript**: Compile-time error detection and IntelliSense
- **Vite**: Fast development with hot module replacement
- **Tailwind CSS**: Utility-first styling with PurgeCSS optimization

### Mock Data System
- **Development Fallback**: Automatic fallback when backend unavailable
- **Realistic Data**: Production-like data structures for testing
- **Easy Switching**: Environment-based API/mock data selection

## 🚀 Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Route-based component lazy loading
- **Caching Strategy**: 5-minute API response caching
- **Image Optimization**: SVG icons and optimized assets
- **Bundle Optimization**: Vite's built-in optimization and tree shaking

### API Optimizations  
- **Request Deduplication**: Prevent multiple identical API calls
- **Memory Cache**: Reduce server load with intelligent caching
- **Request Cancellation**: Clean up abandoned requests
- **Error Recovery**: Graceful fallback to cached/mock data

## 🔧 Development Tips & Best Practices

### Getting Started as a New Developer

#### 1. **Understanding the Codebase**
```bash
# Start by exploring the main application entry point
src/main.tsx → src/App.tsx → src/pages/Dashboard/

# Key files to understand:
- src/types/index.ts          # Data structures and interfaces
- src/routes/index.ts         # Route configuration
- src/services/customerApi.ts # API integration patterns
- src/hooks/useCustomerData.ts # Data fetching patterns
```

#### 2. **Development Workflow**
```bash
# 1. Start development server
npm run dev

# 2. Run tests in watch mode (optional)
npm run test

# 3. Check code quality
npm run lint

# 4. Build for production (verify before deployment)
npm run build
```

#### 3. **Common Development Tasks**

##### Adding a New Page/Route
```typescript
// 1. Create page component in src/pages/
// 2. Add route to src/routes/index.ts
export const routes: Route[] = [
  // ...existing routes
  {
    id: 'new-page',
    path: '/new-page',
    component: NewPage,
    name: 'New Page',
    icon: 'icon-name',
  }
];

// 3. Add route to App.tsx
<Route path="/new-page" element={<NewPage />} />
```

##### Adding API Integration
```typescript
// 1. Define types in src/types/index.ts
export interface NewDataType {
  id: string;
  name: string;
}

// 2. Create service method in src/services/
static async getNewData(): Promise<NewDataType[]> {
  const response = await api.get('/new-endpoint');
  return response.data;
}

// 3. Create custom hook in src/hooks/
export const useNewData = () => {
  const [data, setData] = useState<NewDataType[]>([]);
  // ... implementation
};
```

### Code Style & Conventions

#### TypeScript Best Practices
```typescript
// ✅ Use type imports for types-only imports
import type { PortfolioData } from '../types';

// ✅ Define interfaces for all data structures
interface ComponentProps {
  data: PortfolioData;
  onUpdate?: (data: PortfolioData) => void;
}

// ✅ Use proper generic types
const [funds, setFunds] = useState<Fund[]>([]);

// ✅ Export interfaces for reusability
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

#### Component Patterns
```typescript
// ✅ Functional components with proper typing
interface DashboardProps {
  customerId: string;
}

export default function Dashboard({ customerId }: DashboardProps) {
  // Component implementation
}

// ✅ Custom hooks for data fetching
const { data, loading, error } = usePortfolio(customerId);

// ✅ Conditional rendering with loading states
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <SuccessComponent data={data} />;
```

#### Styling Guidelines
```typescript
// ✅ Use Tailwind utility classes
<div className="bg-white rounded-lg shadow-sm p-6">

// ✅ Consistent color usage
<button className="bg-manulife-green hover:bg-manulife-dark-green">

// ✅ Responsive design patterns  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Debugging & Troubleshooting

#### Common Issues & Solutions

##### 1. **API Connection Issues**
```typescript
// Check environment variables
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Verify API service configuration
// File: src/services/customerApi.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
});
```

##### 2. **Data Not Loading**
```typescript
// Check hook implementation and error states
const { data, loading, error } = usePortfolio(customerId);

// Debug API calls
console.log('API Response:', data);
console.log('Loading state:', loading);
console.log('Error state:', error);
```

##### 3. **Routing Issues**
```typescript
// Verify route configuration
// File: src/routes/index.ts
export const routes: Route[] = [
  // Ensure path matches route definition
];

// Check App.tsx route setup
<Route path="/dashboard" element={<Dashboard />} />
```

##### 4. **TypeScript Errors**
```bash
# Clear TypeScript cache
rm -rf node_modules/.vite
npm run dev

# Check type definitions
# File: src/types/index.ts - ensure all interfaces are properly exported
```

### Performance Tips

#### Optimization Strategies
```typescript
// ✅ Use React.memo for expensive components
export default React.memo(function ExpensiveComponent() {
  // Component implementation
});

// ✅ Implement proper dependency arrays
useEffect(() => {
  fetchData();
}, [customerId]); // Only re-run when customerId changes

// ✅ Use AbortController for cleanup
useEffect(() => {
  const abortController = new AbortController();
  
  return () => {
    abortController.abort(); // Cleanup on unmount
  };
}, []);
```

#### Bundle Size Optimization
```bash
# Analyze bundle size
npm run build
npm run preview

# Check for unused dependencies
npx depcheck

# Review Vite build output for optimization opportunities
```

### Testing Guidelines

#### Unit Testing with Vitest
```typescript
// Example test structure
// File: src/components/__tests__/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  it('renders portfolio data correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText('Portfolio Dashboard')).toBeInTheDocument();
  });
});
```

#### API Testing
```typescript
// Mock API responses for testing
// File: src/test/mocks/fundApiMock.ts
export const mockFundList: Fund[] = [
  {
    id: '1',
    fundName: 'Test Fund',
    code: 'TEST001',
    // ... other properties
  }
];
```

### Deployment Preparation

#### Pre-deployment Checklist
```bash
# 1. Run all tests
npm run test:run

# 2. Check linting
npm run lint

# 3. Build for production
npm run build

# 4. Test production build
npm run preview

# 5. Verify environment variables
# Check .env configuration for production
```

#### Environment Configuration
```bash
# Production environment variables
VITE_API_BASE_URL=https://your-production-api.com/api
VITE_API_TIMEOUT=15000
```

## 🤝 Contributing Guidelines

### Code Review Process
1. **Feature Branch**: Create feature branches from `main`
2. **Pull Request**: Submit PR with descriptive title and description
3. **Testing**: Ensure all tests pass and coverage is maintained
4. **Code Style**: Follow existing patterns and ESLint rules
5. **Documentation**: Update README.md for significant changes

### Commit Message Format
```bash
# Use conventional commit format
feat: add fund detail page with performance metrics
fix: resolve portfolio data loading issue
docs: update API integration guide
style: improve responsive design for mobile devices
test: add unit tests for fund list component
```

## 📚 Additional Resources

### Learning Resources
- **React 18 Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vite Guide**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/
- **Recharts Documentation**: https://recharts.org/

### Development Tools
- **VS Code Extensions**: 
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Auto Rename Tag
- **Browser Extensions**:
  - React Developer Tools
  - Redux DevTools (if using Redux)

### API Documentation
When integrating with the backend, refer to:
- **Customer API**: Endpoints for portfolio and wealth specialist data
- **Fund API**: Endpoints for fund listing and details
- **Authentication**: JWT token handling (if implemented)
- **Error Codes**: Standard HTTP status codes and error handling

## 📞 Support & Maintenance

### Getting Help
- **Technical Issues**: Check existing GitHub issues or create new ones
- **Development Questions**: Review this documentation or team knowledge base
- **API Integration**: Consult backend team for API specifications

### Maintenance Tasks
- **Dependencies**: Regular updates using `npm audit` and `npm update`
- **Security**: Monitor for security vulnerabilities and apply patches
- **Performance**: Regular performance audits and optimization
- **Testing**: Maintain test coverage above 80%

### Monitoring & Analytics
- **Error Tracking**: Implement error boundary components
- **Performance Monitoring**: Use browser dev tools for performance analysis
- **User Analytics**: Consider implementing user behavior tracking (if required)

---

**Happy Coding! 🚀**

This README provides comprehensive guidance for understanding, developing, and maintaining the Manulife Investment Management Dashboard. For additional questions or improvements to this documentation, please contribute via pull requests or reach out to the development team.
