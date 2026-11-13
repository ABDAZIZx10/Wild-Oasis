# The Wild Oasis

Hotel admin dashboard built with React, TanStack Query, Supabase, and React Router.

## TypeScript migration (incremental)

This project is being migrated to TypeScript feature-by-feature.

### Already in TypeScript
- Domain types (`src/types`)
- Supabase client + API services (`apiCabins`, `apiAuth`, `apiBookings`, `apiSettings`)
- Utils (`helpers`, `constants`)
- Cabin & auth React Query hooks
- Cabins feature UI, Login page/form, and `ProtectedRoute`
- Shared UI used by those features (`Button`, `Input`, `Form`, `Menus`, etc.)
- App entry (`main.tsx`) + Vite TS config (`allowJs` for remaining JS files)

### Still JavaScript
- Remaining pages/features (bookings UI, dashboard charts, settings forms, some `ui/` primitives)

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Create a `.env` with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_KEY=...
```
