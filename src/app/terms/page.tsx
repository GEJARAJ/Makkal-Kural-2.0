'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { ShieldCheck, Landmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  const { isTamil, isHindi } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      <div className="space-y-3 pb-6 border-b border-navy-200 dark:border-navy-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-navy-700 dark:text-emerald-400" />
          {isTamil ? 'பயன்பாட்டு விதிமுறைகள்' : (isHindi ? 'सेवा की शर्तें' : 'National Terms of Civic Use')}
        </div>
        <h1 className="text-3xl font-bold text-navy-950 dark:text-white tracking-tight">
          {isTamil ? 'பயன்பாட்டு விதிமுறைகள் & வழிகாட்டுதல்கள்' : (isHindi ? 'नागरिक उपयोग दिशानिर्देश एवं नियम' : 'Civic Usage Guidelines & Terms of Service')}
        </h1>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
          Makkal Kural 2.0 (மக்கள் குரல் 2.0 / जन आवाज 2.0) &bull; National Public Grievance Network
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-navy-800 dark:text-navy-200 space-y-6 leading-relaxed text-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-950 dark:text-white">1. Truthful Submissions & Non-Abuse Policy</h2>
          <p>
            Citizens using Makkal Kural 2.0 agree to submit factual, genuine civic and public infrastructure issues. Submitting intentionally fabricated grievances, defamatory accusations, commercially motivated claims, or abusive content is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-950 dark:text-white">2. Emergency Disclaimer</h2>
          <p>
            Makkal Kural 2.0 is a civic grievance routing platform for Central Government infrastructure and public services (National Highways, Railways, Jal Shakti, Urban Housing, Telecom, Power, EPFO). For immediate life-threatening emergencies (crime, medical emergencies, active fires, national disasters), citizens must immediately call National Emergency 112.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-950 dark:text-white">3. Non-Partisan & Independent Operation</h2>
          <p>
            This platform operates independently and neutrally across all 28 States and 8 Union Territories. We do not endorse any political party, campaign, or candidate. All routing is conducted based on official Union Ministry portfolios and Parliamentary Constituency jurisdictions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-950 dark:text-white">4. Open Civic Accountability</h2>
          <p>
            Grievances logged with reference IDs (MK2-2026-XXXX) may be publicly trackable to promote transparent governance and resolution speed, with citizen personal contact details safely masked.
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-navy-200 dark:border-navy-800">
        <Link href="/">
          <Button variant="outline" size="sm">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
