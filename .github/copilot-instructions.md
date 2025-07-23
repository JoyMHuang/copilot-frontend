# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React TypeScript fund display system inspired by the Manulife Investment Management dashboard. The project uses:

- **React 18** with TypeScript for component development
- **Vite** for fast development and building
- **Tailwind CSS** for styling with a green theme matching Manulife's branding
- **Recharts** for data visualization (portfolio allocation charts)
- **Heroicons** for consistent iconography

## Design Guidelines
- Follow the Manulife green theme (primary color: #22c55e)
- Use dark sidebar with light main content area
- Maintain consistent spacing and typography
- Use shadow-sm for subtle elevation
- Follow responsive design principles

## Component Structure
- `Sidebar`: Navigation component with logo and menu items
- `PortfolioDashboard`: Main dashboard showing portfolio data and charts
- `types/index.ts`: TypeScript interfaces for data structures
- `data/mockData.ts`: Mock data for development

## Code Conventions
- Use TypeScript interfaces for all data structures
- Use type imports with `import type` syntax
- Follow React hooks best practices
- Use Tailwind utility classes for styling
- Maintain consistent file naming (PascalCase for components)
