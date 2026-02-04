## Staffing Engine Overview

This staffing engine ranks employees for a given project using deterministic rules and weighted scoring. It filters out unqualified candidates and produces a shortlist of the top 5 best fits.

---

## How it works

The engine runs in two phases:

### 1. Hard filters (eligibility checks)

Employees are removed if they:

- exceed the allowed CL level range
- don’t have enough available hours
- fail location/remote constraints

Only eligible candidates move to scoring.

---

### 2. Weighted scoring

Each remaining candidate is scored on a 0–100 scale across four dimensions:

- CL match (25%)
  How close their seniority is to the required level

- Skill match (45%)
  Coverage of required project skills

- Availability (15%)
  How comfortably their hours meet project needs

- Performance (15%)
  Historical rating normalized to 100

The final score is a weighted combination of these factors.

---

## Output

The engine returns a sorted shortlist of the top 5 candidates:

- ranked by total score
- includes a breakdown of each scoring dimension
- designed for downstream AI reasoning or UI display

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


- This repo won't run, since there is no frontend yet. Only API is created, will be adding soon.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

