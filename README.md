# Dandle Sales System — Legacy Demo

> **Status: legacy / demo artifact. Not an authenticated production system.**
>
> This repository is retained for historical reference. Its PIN screen is implemented entirely in the browser and must not be treated as an authentication or authorization boundary. Do not use this build with real customer, employee, sales, finance, or operational data.
>
> As of 2026-10-07, repository evidence does **not** establish that the configured Cloudflare Pages deployment is currently active. This repository is also **not evidence of lineage to the newer DANDLE / NOUR work**.

A bilingual sales-dashboard prototype originally prepared for static deployment.

## Local Development

```bash
npm install
npm run dev
```

## Historical deployment configuration

The repository contains historical Cloudflare Pages / Wrangler configuration for a project named `dandle-sales-system`. That configuration is not proof of a currently active production deployment.

If this prototype is ever revived as a real application, authentication must be implemented behind a server-validated boundary before production use. Client-side PIN/user maps and browser-persisted user objects are demo-only patterns and are not suitable for production access control.

## Demo-only features

- Arabic-first bilingual interface (RTL support)
- Client-side role simulation for Sales, Ops, Finance, and Leadership
- Order-management prototype with commission calculations
- Interactive quizzes and sales wiki
- QR-code generation for payments
- Responsive dashboard with KPIs

## Security note

The UI may expose demo role selectors / PINs because the entire application is public client code. Those values are **not credentials** and grant no trusted identity. Never add real secrets, production credentials, or sensitive datasets to this repository or its static bundle.

## Historical environment

- Framework: React 18 + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Historical deployment target: Cloudflare Pages
