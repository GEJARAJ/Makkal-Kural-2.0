'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Landmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  const { isTamil, isHindi } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      <div className="space-y-3 pb-6 border-b border-navy-200 dark:border-navy-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          {isTamil ? 'குடிமக்கள் தனியுரிமைக் கொள்கை' : (isHindi ? 'नागरिक गोपनीयता नीति' : 'National Citizen Privacy Charter')}
        </div>
        <h1 className="text-3xl font-bold text-navy-950 dark:text-white tracking-tight">
          {isTamil ? 'தனியுரிமைக் கொள்கை & தரவு பாதுகாப்பு' : (isHindi ? 'गोपनीयता नीति एवं सार्वजनिक पारदर्शिता' : 'Privacy Policy & Public Transparency')}
        </h1>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
          Last Updated: 2026 &bull; Makkal Kural 2.0 National Public Grievance Network
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-navy-800 dark:text-navy-200 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy-950 dark:text-white">1. Core Civic Purpose</h2>
          <p className="text-xs text-navy-700 dark:text-navy-300">
            Makkal Kural 2.0 (மக்கள் குரல் 2.0 / जन आवाज 2.0) is an independent, politically neutral civic-tech platform created to facilitate direct, accountable grievance redressal between citizens across India and verified Union Government Ministries, Central Departments (MoRTH, Railways, Jal Shakti, MoHUA, MeitY, EPFO, AIIMS), and Members of Parliament (MPs). We do not sell data, engage in profiling, or distribute citizen information for commercial or partisan campaign purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy-950 dark:text-white">2. Information We Collect</h2>
          <p className="text-xs text-navy-700 dark:text-navy-300">
            When you file a public grievance, we collect:
          </p>
          <ul className="list-disc pl-5 text-xs text-navy-700 dark:text-navy-300 space-y-1">
            <li><strong>Grievance Details:</strong> Central sector/category, description, State/UT, District, Parliamentary Constituency, highway stretch or locality landmark, and optional photo/document evidence.</li>
            <li><strong>Submitter Contact Details:</strong> Name, mobile phone number, email address, and language preference. (Exact private house numbers are not required).</li>
            <li><strong>Technical Telemetry:</strong> Optional browser GPS coordinates (only when explicitly requested by citizen) and reference tracking logs.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy-950 dark:text-white">3. How Your Information Is Routed</h2>
          <p className="text-xs text-navy-700 dark:text-navy-300">
            Your grievance petition and contact details are shared <strong>strictly with the designated Union Ministry nodal officer, central agency project director, or Member of Parliament office</strong> assigned to investigate your complaint so that they can conduct field inspections, coordinate repairs, or provide formal status updates.
          </p>
        </section>

        <section className="space-y-2 p-5 bg-navy-50 dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800">
          <h2 className="text-base font-bold text-navy-950 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>4. Public Tracking Portal Privacy Masking</span>
          </h2>
          <p className="text-xs text-navy-700 dark:text-navy-300">
            On the public tracking portal (accessible via reference number like MK2-2026-XXXX), submitter personally identifiable information (PII) is automatically masked (e.g. `v***@example.com`, `+91 98*** 23456`) to protect citizen confidentiality while preserving full public accountability on government performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy-950 dark:text-white">5. Alignment with Central Grievance Norms</h2>
          <p className="text-xs text-navy-700 dark:text-navy-300">
            The platform adheres to digital governance and public grievance principles established under the Department of Administrative Reforms and Public Grievances (DARPG) and the Central Public Grievance Redress and Monitoring System (CPGRAMS).
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-navy-200 dark:border-navy-800 flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm" className="text-xs">
            Return to Home
          </Button>
        </Link>
        <Link href="/raise-complaint">
          <Button variant="civic" size="sm" className="text-xs bg-emerald-600 text-white">
            File a Grievance
          </Button>
        </Link>
      </div>
    </div>
  );
}
