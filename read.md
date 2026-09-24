# 🇮🇳 Makkal Kural 2.0 — மக்கள் குரல் 2.0 / जन आवाज 2.0

### AI-Powered National Public Grievance Redressal & Central Representative Routing Platform

**Makkal Kural 2.0** is an open, politically neutral, AI-driven civic grievance platform that empowers citizens across all **28 States and 8 Union Territories** of India to submit, format, and route public issues directly to the appropriate **Union Government Ministries**, **Central Public Sector Authorities (NHAI, Railways, Jal Shakti, MoHUA, DoT, CPCB, EPFO, AIIMS)**, and **Members of Parliament (Lok Sabha & Rajya Sabha MPs)**.

---

## 🚀 Key Features

* 🏛️ **Central Ministry & MP Directory**: Complete verified registry of Union Cabinet Ministers, Central Departments, and Lok Sabha MPs.
* 🗺️ **Pan-India Administrative Routing**: Covers all 28 States & 8 Union Territories with dynamic State, District, and Parliamentary Constituency matching.
* 🤖 **AI-Powered Grievance Drafter**: Transforms colloquial complaints into legally structured, formal petitions with clear clauses and official headers.
* 📍 **Geocoded Map Pinning**: OpenStreetMap / Leaflet integration for geotagging infrastructure defects (national highways, railway platforms, water supply).
* 📄 **Official PDF Petition Generation**: Generates standard Government of India Public Grievance Dossier PDFs with timestamps and verification credentials.
* 🔎 **Transparent Grievance Tracking**: Public reference tracking (`MK2-2026-XXXX`) with stage-by-stage timelines (Submitted ➔ In Review ➔ Dispatched ➔ Resolved) with submitter PII auto-masking.
* 🌐 **Trilingual Support**: Full English, Hindi (हिन्दी), and Tamil (தமிழ்) localization.
* 🔐 **Secure Backend with Supabase**: PostgreSQL schema with Row Level Security (RLS), full audit logs, and an offline mock-store fallback.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
* **Icons & Animation**: Lucide React, GSAP
* **Maps & Geolocation**: Leaflet, React-Leaflet, OpenStreetMap Nominatim
* **Document Export**: jsPDF, html2canvas
* **AI Engine**: OpenAI API (`gpt-4o-mini` / `gpt-3.5-turbo`)
* **Backend & Database**: Supabase PostgreSQL + Fallback Mock Store
* **Security**: Row Level Security (RLS), Rate Limiting, PII Data Masking

---

## 📋 Central Grievance Sectors Covered

1. **National Highways & Expressways** — *Ministry of Road Transport and Highways (MoRTH / NHAI)*
2. **Indian Railways & Trains** — *Ministry of Railways (Railway Board / RailMadad)*
3. **Water Resources & Drinking Water** — *Ministry of Jal Shakti (Jal Jeevan Mission)*
4. **National Power Grid & Energy** — *Ministry of Power & MNRE (PM Surya Ghar)*
5. **Urban Development & Housing** — *Ministry of Housing and Urban Affairs (MoHUA / PMAY / Smart Cities)*
6. **Telecom, Postal & Digital Services** — *Ministry of Communications & MeitY (DoT / India Post / BSNL)*
7. **Environment, Forests & Pollution** — *Ministry of Environment, Forest and Climate Change (CPCB)*
8. **National Health & Hospitals** — *Ministry of Health and Family Welfare (AIIMS / CGHS / Ayushman Bharat)*
9. **Banking, EPFO, Pension & Taxes** — *Ministry of Finance & Ministry of Labour (EPFO / Banking Ombudsman)*
10. **Consumer Affairs & Food Distribution** — *Ministry of Consumer Affairs (National Consumer Helpline / NFSA)*
11. **Civil Aviation & Regional Airports** — *Ministry of Civil Aviation (DGCA / AAI / AirSewa)*
12. **Agriculture, PM-KISAN & Rural Roads** — *Ministry of Agriculture & Ministry of Rural Development (PMGSY)*

---

## 🗄️ Supabase Database Setup

To run Makkal Kural 2.0 with a live Supabase backend:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy and run the contents of [`supabase-schema.sql`](file:///supabase-schema.sql).
4. Copy and run the contents of [`supabase-ministers.sql`](file:///supabase-ministers.sql) to seed Union Ministers, Central Portfolios, and Lok Sabha MPs.
5. Create a `.env.local` file with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional OpenAI integration for AI grievance polishing
OPENAI_API_KEY=your-openai-api-key

# Admin Secret
ADMIN_SECRET_KEY=makkal_kural_admin_2026
```

> **Note**: If Supabase credentials are not provided, Makkal Kural 2.0 automatically uses its built-in in-memory mock store so all grievance filing, routing, tracking, and directory features work seamlessly out-of-the-box!

---

## 🏃 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🏛️ Aligned with Central Grievance Redressal Norms

Makkal Kural 2.0 is an independent civic initiative designed to align with principles set forth under the **Department of Administrative Reforms and Public Grievances (DARPG)** and the **Central Public Grievance Redress and Monitoring System (CPGRAMS)** of the Government of India.
