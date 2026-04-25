# Pulse Agent — Client

Next.js 15 frontend for the Weekly Product Review Pulse dashboard.

## Tech Stack

- **Next.js 15** (App Router, static generation)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** (utility-first)
- **ShadCN/ui** (copy-paste components)
- **TanStack Query** (server state)

## Quick Start

```bash
npm install
npm run dev
```

## Structure

```
app/
├── (marketing)/     # Landing page (static)
├── (dashboard)/     # Dashboard, runs, products
│   ├── dashboard/
│   ├── runs/
│   └── products/
└── layout.tsx
components/
├── ui/              # ShadCN components
└── layout/          # App shell, nav, sidebar
lib/
└── utils.ts         # cn() helper
```

## Build

```bash
npm run build
```
