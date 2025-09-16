# Overview

This is a Freshdesk ticket dashboard application that allows users to search for and view detailed ticket information from a Freshdesk helpdesk system. The application fetches ticket data directly from the Freshdesk API and presents it in an organized, user-friendly interface with multiple information sections including customer details, delivery information, timeline, and system metadata.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with single endpoint `/api/tickets/:ticketId`
- **Data Fetching**: Direct integration with Freshdesk API using fetch
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot module replacement with Vite middleware integration

## Data Storage Solutions
- **Primary Data Source**: Freshdesk API (no local database storage)
- **Database Configuration**: Drizzle ORM configured for PostgreSQL (currently unused)
- **Session Management**: Placeholder for connect-pg-simple (not actively used)
- **Caching**: Client-side caching through TanStack Query

## Authentication and Authorization
- **API Authentication**: Basic authentication with Freshdesk API credentials
- **Client Authentication**: None implemented (read-only public dashboard)
- **Security**: API credentials stored as environment variables

## Component Architecture
- **Design System**: Modular component library based on Radix UI primitives
- **Layout Strategy**: Card-based layout with responsive grid system
- **Data Presentation**: Specialized components for different ticket information types:
  - `TicketHeader`: Status, priority, and basic info
  - `CustomerInfo`: Customer contact details parsed from description
  - `DeliveryInfo`: Shipping and service information
  - `Timeline`: Date/time tracking and milestones
  - `SystemInfo`: Technical metadata and IDs
  - `TicketDescription`: Raw ticket content display

## Data Flow Pattern
1. User enters ticket ID in search component
2. React Query triggers API call to Express server
3. Server authenticates with Freshdesk API and fetches ticket data
4. Response data is validated against Zod schemas
5. Client receives structured data and updates UI components
6. Error states are handled with user-friendly messages

# External Dependencies

## Third-Party Services
- **Freshdesk API**: Primary data source for ticket information
  - Endpoint: `https://westminsterlegalisationse.freshdesk.com/api/v2/tickets`
  - Authentication: Basic auth with API key
  - Rate limiting and error handling implemented

## Database Services
- **PostgreSQL**: Configured via Drizzle but not currently utilized
- **Neon Database**: Referenced in package dependencies for serverless PostgreSQL

## Development Tools
- **Replit Integration**: Custom Vite plugins for development environment
- **Build Tools**: ESBuild for server bundling, Vite for client bundling
- **Type Safety**: TypeScript throughout the entire stack

## UI and Styling Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

## Utility Libraries
- **Date Handling**: date-fns for date formatting and manipulation
- **Form Validation**: Zod for runtime type validation
- **HTTP Client**: Native fetch API for server requests
- **Development**: tsx for TypeScript execution in development