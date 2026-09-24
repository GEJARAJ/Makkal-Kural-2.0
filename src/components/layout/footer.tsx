'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Landmark, PhoneCall, ExternalLink, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Neutrality Statement */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center text-white">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                {t.brand.name}
              </span>
            </div>
            <p className="text-xs text-navy-400 leading-relaxed">
              {t.brand.shortDesc}
            </p>
            <div className="p-3 bg-navy-900/80 rounded-lg border border-navy-800 text-[11px] text-navy-300">
              <span className="font-semibold text-emerald-400 block mb-1">
                Central Civic Transparency
              </span>
              Independent, politically neutral civic routing platform aligning citizen petitions with Government of India ministries and Members of Parliament.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-navy-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-navy-400">
              <li>
                <Link href="/raise-complaint" className="hover:text-emerald-400 transition-colors">
                  {t.nav.raiseComplaint}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-emerald-400 transition-colors">
                  {t.nav.track}
                </Link>
              </li>
              <li>
                <Link href="/representatives" className="hover:text-emerald-400 transition-colors">
                  {t.nav.representatives}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                  {t.nav.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* National Portals & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-navy-300">
              Central Portals
            </h4>
            <ul className="space-y-2 text-xs text-navy-400">
              <li>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>CPGRAMS (Public Grievance Portal)</span>
                  <ExternalLink className="w-3 h-3 text-navy-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sansad.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Sansad (Parliament of India)</span>
                  <ExternalLink className="w-3 h-3 text-navy-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-navy-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://railmadad.indianrailways.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>RailMadad Grievance</span>
                  <ExternalLink className="w-3 h-3 text-navy-500" />
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & National Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-navy-300 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              National Helplines
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-navy-900 border border-navy-800">
                <span className="text-red-400 font-bold block">112 — National Emergency</span>
                <span className="text-navy-400 text-[11px]">All-in-One Emergency (Police, Fire, Ambulance)</span>
              </div>
              <div className="p-2.5 rounded bg-navy-900 border border-navy-800">
                <span className="text-emerald-400 font-bold block">1915 — National Consumer Helpline</span>
                <span className="text-navy-400 text-[11px]">Consumer Grievances & Product Redressal</span>
              </div>
              <div className="p-2.5 rounded bg-navy-900 border border-navy-800">
                <span className="text-cyan-400 font-bold block">139 — RailMadad Railway Helpline</span>
                <span className="text-navy-400 text-[11px]">Passenger Security & Train Assistance</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-navy-500 gap-4">
          <p>© {new Date().getFullYear()} Makkal Kural 2.0 (மக்கள் குரல் 2.0 / जन आवाज 2.0). All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>National Public Grievance Routing System Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
