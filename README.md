<div align="center">

# FixFlow

**Tenant-maintenance coordination platform for property managers and residents.**

![Next.js](https://img.shields.io/badge/Next.js-333?style=flat-square) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-333?style=flat-square) ![AWS S3](https://img.shields.io/badge/AWS%20S3-333?style=flat-square) ![Twilio](https://img.shields.io/badge/Twilio-333?style=flat-square)
![Utility Tool](https://img.shields.io/badge/Utility-Tool-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-SaaS%20Platform-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-14%2F14-brightgreen?style=flat-square)

</div>

---

## Problem

Maintenance requests get lost in emails and texts, causing delayed repairs and tenant dissatisfaction.

## Who Is This For?

Property managers, landlords, and tenants in multi-unit buildings.

## Features

- **Add/edit/delete maintenance tickets with photo documentation and priority classifications**
- **Submit repair request forms with category-specific questionnaires and contractor availability slots**
- **Track repair progress through status pipelines from submitted to completed with notifications**
- **Calculate estimated repair costs and contractor dispatch fees based on issue complexity**

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js | Core dependency |
| PostgreSQL | Core dependency |
| AWS S3 | Core dependency |
| Twilio | Core dependency |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmuhammadsaadshafiq-dev/mvp-fixflow.git
cd mvp-fixflow
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Core Workflows

**1. Add/edit/delete maintenance tickets with photo documentation and priority classifications**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**2. Submit repair request forms with category-specific questionnaires and contractor availability slots**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**3. Track repair progress through status pipelines from submitted to completed with notifications**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time


## Quality Assurance

| Test | Status |
|------|--------|
| Has state management | ✅ Pass |
| Has form/input handling | ✅ Pass |
| Has click handlers (2+) | ✅ Pass |
| Has demo data | ✅ Pass |
| Has loading states | ✅ Pass |
| Has user feedback | ✅ Pass |
| No placeholder text | ✅ Pass |
| Has CRUD operations | ✅ Pass |
| Has empty states | ✅ Pass |
| Has responsive layout | ✅ Pass |
| Has search/filter | ✅ Pass |
| Has tab navigation | ✅ Pass |
| Has data persistence | ✅ Pass |
| No dead links | ✅ Pass |

**Overall Score: 14/14**

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable UI components
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — use freely for personal and commercial projects.

---

<div align="center">

**Built autonomously by [Openclaw MVP Factory](https://github.com/malikmuhammadsaadshafiq-dev/Openclaw)** — an AI-powered system that discovers real user needs and ships working software.

</div>
