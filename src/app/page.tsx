'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/language-provider';
import { CIVIC_CATEGORIES } from '@/lib/constants/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Search, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  FileText, 
  Road, 
  Train, 
  Droplets, 
  Zap, 
  Building, 
  Radio, 
  Trees, 
  Cross, 
  Coins, 
  ShoppingBag, 
  Plane, 
  Wheat, 
  HelpCircle,
  Database,
  Landmark
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Road,
  Train,
  Droplets,
  Zap,
  Building2: Building,
  Radio,
  Trees,
  Cross,
  Coins,
  ShoppingBag,
  Plane,
  Wheat,
  HelpCircle,
};

export default function LandingPage() {
  const { t, isTamil, isHindi } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-20 bg-gradient-to-b from-navy-100/70 via-white to-navy-50/50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 border-b border-navy-200/80 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Col: Hero Text & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Central Government Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-900 border border-navy-200/90 dark:border-navy-700 shadow-2xs text-xs font-semibold text-navy-800 dark:text-navy-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Landmark className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {isTamil 
                    ? 'மத்திய அரசு & நாடாளுமன்ற மக்கள் பிரதிநிதிகள் இணைப்பு தளம்' 
                    : (isHindi ? 'भारत सरकार एवं संसद सदस्य (सांसद) जन शिकायत पोर्टल' : 'Government of India Ministries & Parliamentary Redressal Portal')}
                </span>
              </div>

              {/* Main Headlines */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
                  {t.brand.name}
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-800 dark:text-navy-200 tracking-tight">
                  {t.hero.titlePrefix} <span className="text-emerald-700 dark:text-emerald-400">{t.hero.titleHighlight}</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>

              {/* Hero Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link href="/raise-complaint" className="w-full sm:w-auto">
                  <Button variant="civic" size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-emerald-700/20 text-sm bg-emerald-600 hover:bg-emerald-700 text-white">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    {t.hero.raiseBtn}
                  </Button>
                </Link>

                <Link href="/track" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto text-sm font-semibold">
                    <Search className="w-4 h-4 mr-2 text-emerald-400" />
                    {t.hero.trackBtn}
                  </Button>
                </Link>

                <Link href="/representatives" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm font-semibold bg-white dark:bg-navy-900">
                    <Building2 className="w-4 h-4 mr-2 text-navy-600 dark:text-navy-400" />
                    {t.hero.dirBtn}
                  </Button>
                </Link>
              </div>

              {/* Emergency Helpline Disclaimer */}
              <div className="pt-2">
                <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2.5 max-w-xl mx-auto lg:mx-0">
                  <PhoneCall className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                  <span>{t.hero.emergencyDisclaimer}</span>
                </div>
              </div>

            </div>

            {/* Right Col: Featured National Civic Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                
                {/* Decorative Tricolor Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-600 rounded-3xl blur-md opacity-30 animate-pulse" />
                
                {/* Image Container Card */}
                <div className="relative rounded-2xl bg-white dark:bg-navy-900 p-4 shadow-2xl border border-navy-200 dark:border-navy-800 overflow-hidden space-y-4">
                  
                  {/* Central Portal Header */}
                  <div className="flex items-center justify-between border-b border-navy-100 dark:border-navy-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-navy-950 dark:bg-navy-800 flex items-center justify-center text-amber-400 font-bold text-xs">
                        GOI
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy-950 dark:text-white">Central Grievance Engine</div>
                        <div className="text-[10px] text-navy-500 font-mono">CPGRAMS &bull; SANSAD DIRECT</div>
                      </div>
                    </div>
                    <Badge verification="VERIFIED" className="text-[10px] py-0.5">VERIFIED</Badge>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 text-xs text-navy-700 dark:text-navy-300">
                    <div className="p-2.5 rounded-lg bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-between">
                      <span className="font-medium">Union Ministries Connected</span>
                      <span className="font-bold text-navy-950 dark:text-white font-mono">54+ Ministries</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-between">
                      <span className="font-medium">Lok Sabha Constituencies</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">543 MPs</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-between">
                      <span className="font-medium">AI Petition Drafting</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">Active (GPT-4o)</span>
                    </div>
                  </div>

                  {/* Trust Footer */}
                  <div className="pt-2 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-navy-500">
                    <span>Direct Authority Routing</span>
                    <span className="text-emerald-600 font-semibold">100% Transparent</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. LIVE NATIONAL IMPACT METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="border-navy-200/80 dark:border-navy-800 p-6 text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white font-mono">14,800+</div>
            <div className="text-xs font-semibold text-navy-600 dark:text-navy-400">{t.stats.complaintsSubmitted}</div>
          </Card>

          <Card className="border-navy-200/80 dark:border-navy-800 p-6 text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">543+</div>
            <div className="text-xs font-semibold text-navy-600 dark:text-navy-400">{t.stats.verifiedReps}</div>
          </Card>

          <Card className="border-navy-200/80 dark:border-navy-800 p-6 text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white font-mono">28 States & 8 UTs</div>
            <div className="text-xs font-semibold text-navy-600 dark:text-navy-400">{t.stats.districtsCovered}</div>
          </Card>

          <Card className="border-navy-200/80 dark:border-navy-800 p-6 text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">94.2%</div>
            <div className="text-xs font-semibold text-navy-600 dark:text-navy-400">{t.stats.resolutionRate}</div>
          </Card>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Card className="border-navy-200 dark:border-navy-800 p-6 space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-navy-950 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              {t.howItWorks.step1Title}
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
              {t.howItWorks.step1Desc}
            </p>
          </Card>

          <Card className="border-navy-200 dark:border-navy-800 p-6 space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-navy-950 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              {t.howItWorks.step2Title}
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
              {t.howItWorks.step2Desc}
            </p>
          </Card>

          <Card className="border-navy-200 dark:border-navy-800 p-6 space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              {t.howItWorks.step3Title}
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
              {t.howItWorks.step3Desc}
            </p>
          </Card>

          <Card className="border-navy-200 dark:border-navy-800 p-6 space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-navy-950 text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              {t.howItWorks.step4Title}
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
              {t.howItWorks.step4Desc}
            </p>
          </Card>

        </div>
      </section>

      {/* 4. CIVIC CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white tracking-tight">
              {t.categories.title}
            </h2>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 mt-1">
              {t.categories.subtitle}
            </p>
          </div>
          <Link href="/raise-complaint">
            <Button variant="ghost" size="sm" className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              <span>{t.categories.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {CIVIC_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || HelpCircle;
            const catName = isTamil ? cat.nameTa : (isHindi ? cat.nameHi : cat.nameEn);
            const catDesc = isTamil ? cat.descriptionTa : (isHindi ? cat.descriptionHi : cat.descriptionEn);
            const minName = isTamil ? cat.ministryTa : (isHindi ? cat.ministryHi : cat.ministryEn);

            return (
              <Link key={cat.id} href={`/raise-complaint`} className="group">
                <Card className="h-full border-navy-200/90 dark:border-navy-800 hover:border-emerald-600 hover:shadow-md transition-all p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-800 text-navy-800 dark:text-navy-200 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 truncate max-w-[150px]">
                        {minName}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                        {catName}
                      </h4>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-2 mt-1">
                        {catDesc}
                      </p>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 pt-3">
                    <span>{isTamil ? 'மனு தாக்கல் செய்க' : (isHindi ? 'शिकायत दर्ज करें' : 'File Grievance')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. VERIFIED RESOLUTION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge verification="VERIFIED" className="text-xs py-0.5">
            TRANSPARENT CENTRAL CIVIC ACCOUNTABILITY
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white tracking-tight">
            {isTamil ? 'தீர்வு கண்ட சமீபத்திய தேசிய மனுக்கள்' : (isHindi ? 'सफल केंद्रीय लोक शिकायत निवारण' : 'Recent Verified National Grievance Actions')}
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            {isTamil 
              ? 'மத்திய அமைச்சகங்கள் மற்றும் தேசிய துறைகள் மூலம் நடவடிக்கை எடுக்கப்பட்ட சமீபத்திய பொதுப் புகார்கள்.' 
              : 'Real examples of community and infrastructure grievances addressed by Union Ministries and local MPs.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-navy-200 dark:border-navy-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                MK2-2026-NH48-001
              </span>
              <Badge status="IN_PROGRESS">IN_PROGRESS</Badge>
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              Severe asphalt damage on NH-48 Expressway Corridor (Kanchipuram stretch)
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-400">
              National Highways Authority of India (NHAI Regional Office) project director initiated cold-mix resurfacing and bridge joint replacement.
            </p>
            <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between text-xs text-navy-500">
              <span>MoRTH &bull; Sriperumbudur, Tamil Nadu</span>
              <Link href="/track/MK2-2026-NH48-001" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                <span>View Timeline</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>

          <Card className="border-navy-200 dark:border-navy-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                MK2-2026-RAIL-002
              </span>
              <Badge status="ACKNOWLEDGED">ACKNOWLEDGED</Badge>
            </div>
            <h3 className="font-bold text-base text-navy-950 dark:text-white">
              Platform wheelchair ramps & elevator non-operational at New Delhi Railway Station
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-400">
              Northern Railway Division Grievance Cell dispatched maintenance crew to service elevators on Platforms 1-6.
            </p>
            <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between text-xs text-navy-500">
              <span>Ministry of Railways &bull; New Delhi</span>
              <Link href="/track/MK2-2026-RAIL-002" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                <span>View Timeline</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border border-navy-900 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {isTamil ? 'உங்கள் பகுதி குறையை மத்திய அரசிடம் இன்றே பதிவிடுங்கள்' : (isHindi ? 'अपनी समस्या सीधे केंद्रीय मंत्रालय तक पहुंचाएं' : 'Voice Your Public Grievance to Union Ministries & MPs')}
            </h2>
            <p className="text-xs sm:text-sm text-navy-300">
              {isTamil
                ? 'உங்கள் மனு முறைப்படி சம்பந்தப்பட்ட மத்திய அமைச்சகம் மற்றும் தொகுதி நாடாளுமன்ற உறுப்பினருக்கு அனுப்பி வைக்கப்படும்.'
                : 'Free, transparent, and directly routed to officially verified Central Government Ministries and Members of Parliament.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/raise-complaint">
              <Button variant="civic" size="lg" className="font-bold text-sm shadow-md shadow-emerald-600/30 bg-emerald-600 hover:bg-emerald-700 text-white">
                <PlusCircle className="w-4 h-4 mr-2" />
                {t.hero.raiseBtn}
              </Button>
            </Link>
            <Link href="/track">
              <Button variant="outline" size="lg" className="text-sm font-semibold border-navy-700 text-white hover:bg-navy-900">
                <Search className="w-4 h-4 mr-2 text-emerald-400" />
                {t.hero.trackBtn}
              </Button>
            </Link>
            <Link href="/admin/database">
              <Button variant="secondary" size="lg" className="text-sm font-semibold bg-navy-800 text-white hover:bg-navy-700 border border-navy-700">
                <Database className="w-4 h-4 mr-2 text-emerald-400" />
                {isTamil ? 'மத்திய தரவுத்தளம்' : 'Union Registry DB'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
