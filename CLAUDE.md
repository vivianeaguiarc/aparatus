- SEMPRE use TODAS as regras que estão em @.cursor/rules:

- @.cursor/rules/general.mdc
- @.cursor/rules/typescript.mdc

<!-- # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aparatus** is a SaaS booking platform for barbershops where users can select a barbershop, service, date, and make appointments.

## Tech Stack

- **Package Manager:** pnpm (always use pnpm, never npm or yarn)
- **Framework:** Next.js 16.1 with App Router
- **React:** 19.2
- **Database:** PostgreSQL with Prisma ORM 7.1
- **UI Components:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Toasts:** Sonner
- **Auth:** Better Auth (planned)
- **Server Actions:** next-safe-action (when implemented)

## Development Commands

```bash
pnpm dev      # Start development server on http://localhost:3000
pnpm build    # Build for production (checks types and builds)
pnpm start    # Start production server
pnpm lint     # Run ESLint (always fix errors before committing)
```

## Database Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio to view/edit data
npx prisma studio
```

## Architecture Patterns

### Data Layer Pattern

**CRITICAL:** Never call Prisma directly from components or pages. Always create data functions in `data/` folder.

```typescript
// ✅ CORRECT: data/barbershops.ts
import { prisma } from "@/lib/prisma";

export const getBarbershopById = async (id: string) => {
  try {
    const barbershop = await prisma.barbershop.findUnique({
      where: { id },
      include: { services: true }
    });
    return barbershop;
  } catch (error) {
    console.error("Error fetching barbershop:", error);
    return null;
  }
}

// ✅ CORRECT: app/barbershops/[id]/page.tsx
import { getBarbershopById } from "@/data/barbershops";

export default async function Page({ params }) {
  const barbershop = await getBarbershopById(params.id);
  // ...
}
```

### Prisma Configuration

The project uses:
- **Custom client output:** `@/generated/prisma/client` (not default `@prisma/client`)
- **PostgreSQL adapter:** `@prisma/adapter-pg` with connection pooling
- **Singleton pattern:** Prisma client reuse in development (see `lib/prisma.ts`)

Always import Prisma client from: `@/generated/prisma/client`

### Server Actions Pattern (Planned)

When implementing server actions:
- Create in `actions/` folder
- Use `next-safe-action` library
- Use `useAction` hook to call actions
- Reference `actions/create-booking.ts` as template
- Use `protectedActionClient` from `lib/action-client.ts` for protected actions
- Always validate authorization/authentication

### Page Layout Components

Use standardized layout components from `components/ui/page.tsx`:

```typescript
import {
  PageConatiner,        // Main page wrapper with spacing
  PageSectiionTitle,    // Section titles (uppercase, small, bold)
  PageSectionContent,   // Section content wrapper
  PageSectionScroller,  // Horizontal scrolling container
} from "@/components/ui/page";
```

### Component Architecture

- **Server Components:** Default for pages and data-fetching components
- **Client Components:** Only when needed for interactivity (`"use client"`)
- **Separation:** Extract interactive parts into small Client Components
- **Example:** Page is Server Component, buttons/forms are Client Components

## Styling Guidelines

### Theme Colors

**NEVER use hard-coded Tailwind colors.** Only use theme variables from `app/globals.css`:

```typescript
// ❌ WRONG
<div className="bg-green-500 text-white">

// ✅ CORRECT
<div className="bg-primary text-primary-foreground">
```

Available theme colors:
- `background` / `foreground`
- `card` / `card-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border` / `input` / `ring`

### Units

**Always use rem, never px:**

```typescript
// ❌ WRONG
<div className="h-[250px]">

// ✅ CORRECT (if custom value needed)
<div className="h-[15.625rem]">

// ✅ BETTER (use Tailwind classes when possible)
<div className="h-64">
```

### Component Library

1. **Always check shadcn/ui first** before creating custom components
2. Use lucide-react for all icons
3. Use Next.js `<Image>` component for all images

## Code Style

### File Naming

- Use kebab-case: `barbershop-item.tsx`, `create-booking.ts`
- Folders also kebab-case: `barbershops/`, `quick-search/`

### TypeScript

- Always use TypeScript (never JavaScript)
- Use descriptive variable names: `isLoading`, `hasError`
- Follow SOLID and Clean Code principles
- DRY: Create reusable functions/components to avoid duplication

### Comments

**Never write comments in code.** Code should be self-documenting with clear naming.

### Footer Handling

**Before adding Footer component**, check `layout.tsx` - it may already be rendered globally.

### Sheet Components

Never manually create close button for Sheet components - they include it automatically.

## Database Schema

### Models

**Barbershop:**
- `id`: UUID (primary key)
- `name`: String
- `address`: String
- `description`: String
- `imageUrl`: String
- `phones`: String[] (array)
- `services`: BarbershopService[] (relation)

**BarbershopService:**
- `id`: UUID (primary key)
- `name`: String
- `description`: String
- `imageUrl`: String
- `priceInCents`: Int (prices stored as cents)
- `barbershopId`: String (foreign key)
- `barbershop`: Barbershop (relation with cascade delete)

### Price Handling

Prices are stored as integers in cents. Always convert for display:

```typescript
const formatPrice = (priceInCents: number) => {
  return (priceInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};
```

## Environment Setup

Required environment variables (see `.env.example`):
- `DATABASE_URL`: PostgreSQL connection string

## Project Context

This is a Brazilian barbershop booking SaaS, so:
- Use Portuguese (pt-BR) for user-facing text
- Format currency as BRL (R$)
- Use Brazilian phone number formats
- Context7 MCP should be used for documentation lookups

## Key Implementation Details

### Toast Notifications

Sonner is configured globally in `app/layout.tsx`. Use anywhere in Client Components:

```typescript
import { toast } from "sonner";

toast.success("Success message");
toast.error("Error message");
```

### Image Optimization

Always use Next.js Image component with proper sizing:

```typescript
import Image from "next/image";

<Image
  src={imageUrl}
  alt="Description"
  fill // or width/height
  className="object-cover"
/>
```

### Route Structure

- `app/` - App Router pages
- `app/barbershops/[id]/` - Dynamic barbershop detail pages
- Server Components by default, add `"use client"` only when needed -->