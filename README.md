# iFunds - Investment Management Dashboard

A modern React TypeScript application inspired by the Manulife Investment Management dashboard design. This project provides a comprehensive fund display system with interactive portfolio visualization.

## Features

- **Portfolio Dashboard**: Interactive dashboard showing portfolio allocation with pie charts
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **Modern UI**: Clean, professional design with Manulife-inspired green theme
- **Real-time Data**: Mock data structure ready for real API integration
- **Navigation**: Sidebar navigation with multiple sections (Portfolio, Transactions, Profile, etc.)
- **Wealth Specialist**: Contact information and quick actions for financial advisors

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Responsive chart library for data visualization
- **Heroicons** - Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ifunds
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── PortfolioDashboard.tsx  # Main dashboard
├── data/               # Mock data and API utilities
│   └── mockData.ts     # Sample portfolio data
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Design System

### Colors
- **Primary Green**: #22c55e (Manulife brand color)
- **Dark Green**: #15803d
- **Light Green**: #86efac
- **Sidebar Background**: #1f2937
- **Background**: #f8fafc

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## Features Overview

### Portfolio Dashboard
- Total portfolio value display
- Unrealized profit/loss tracking
- Risk profile indicator
- Interactive allocation pie chart
- Detailed breakdown of investments

### Investment Allocation
- Equity (85.89%)
- Bonds (6.13%)  
- Multi-asset (7.08%)
- Money market (0.90%)

### Action Center
- Subscribe to new funds
- Switch between funds
- Redeem investments
- View pending transactions

### Wealth Specialist
- Contact information
- Email and call actions
- Advisor details

## Development

### Adding New Components
1. Create component in `src/components/`
2. Add proper TypeScript interfaces
3. Use Tailwind classes for styling
4. Follow existing naming conventions

### Data Integration
The app uses mock data in `src/data/mockData.ts`. To integrate with real APIs:
1. Replace mock data with API calls
2. Update interfaces in `src/types/index.ts` as needed
3. Add error handling and loading states

### Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing (4px grid)
- Use semantic color names from the theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Manulife Investment Management
- Built with modern React best practices
- Uses industry-standard financial UI patterns
