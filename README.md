# Dandle Sales System - Cloudflare Pages

A bilingual sales dashboard for Dandle, deployed on Cloudflare Pages.

## Local Development
```bash
npm install
npm run dev
```

## Deployment Options

### Method 1: Git Integration (Recommended)
1. Push to GitHub/GitLab
2. Go to Cloudflare Dashboard → Pages
3. Connect your repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`

### Method 2: Direct Upload
```bash
npm run build
npx wrangler pages deploy dist --project-name=dandle-sales-system
```

### Method 3: Wrangler CLI
```bash
npm install -g wrangler
wrangler pages publish dist --project-name=dandle-sales-system
```

## Features
- Arabic-first bilingual interface (RTL support)
- Role-based authentication (Sales, Ops, Finance, Leadership)  
- Order management with commission tracking
- Interactive quizzes and sales wiki
- QR code generation for payments
- Responsive dashboard with KPIs

## Demo Login PINs
- 456789 (Sales Representative)
- 234567 (Operations Manager)  
- 345678 (Finance Officer)
- 567890 (Leadership Role)

## Environment
- Framework: React 18 + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Deployment: Cloudflare Pages

