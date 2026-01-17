# SehatJiwa - Mental Health Education Platform

## Overview

SehatJiwa is a digital mental health education platform designed to be inclusive, accurate, and user-friendly. The application provides educational articles, videos, self-assessment tests, and resource directories for mental health services in Indonesian. It aims to build awareness and resilience around mental health topics in the digital era.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and scroll animations
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js
- **API Pattern**: RESTful API with structured route definitions in `shared/routes.ts`
- **Type Safety**: Zod schemas for request/response validation, shared between client and server

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema migrations (`npm run db:push`)
- **Tables**: articles, videos, resources, testQuestions

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route pages
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared types and schemas
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API route contracts
└── migrations/       # Database migrations
```

### Key Design Patterns
- **Shared Schema**: Database schemas and API contracts are defined in `shared/` and imported by both client and server
- **Type-Safe API**: Route definitions include Zod schemas for automatic validation
- **Storage Abstraction**: `IStorage` interface in `storage.ts` abstracts database operations
- **Component Library**: Pre-built shadcn/ui components in `client/src/components/ui/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe SQL query builder and schema management
- **connect-pg-simple**: PostgreSQL session store (if sessions are needed)

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **Radix UI primitives**: Accessible UI components (via shadcn/ui)
- **react-hook-form** + **zod**: Form handling with validation

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development mode indicator