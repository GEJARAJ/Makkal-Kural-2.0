'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { Representative } from '@/types/database';
import { INDIAN_STATES_AND_UTS } from '@/lib/constants/locations';
import { Card, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Search, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  PlusCircle,
  Landmark,
  Crown
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function RepresentativesDirectoryPage() {
  const { t, isTamil, isHindi, language } = useLanguage();
  const [reps, setReps] = useState<Representative[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    async function loadReps() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (stateFilter !== 'all') query.set('state', stateFilter);
        if (levelFilter !== 'all') query.set('level', levelFilter);
        if (search) query.set('search', search);

        const res = await fetch(`/api/representatives?${query.toString()}`);
        const json = await res.json();
        if (res.ok && json.success) {
          setReps(json.data);
        }
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    loadReps();
  }, [stateFilter, levelFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-navy-200 dark:border-navy-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {isTamil ? 'மத்திய அரசு & நாடாளுமன்ற அதிகாரிகள் பட்டியல்' : (isHindi ? 'केंद्रीय मंत्रालय व सांसद निर्देशिका' : 'Union Ministers & MPs Public Directory')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white tracking-tight">
            {isTamil ? 'மத்திய அமைச்சர்கள் & நாடாளுமன்ற மக்கள் பிரதிநிதிகள்' : (isHindi ? 'केंद्रीय मंत्री, मंत्रालय एवं सांसद विवरण' : 'Union Cabinet Ministers, Central Portfolios & MPs')}
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 mt-1 max-w-2xl">
            {isTamil
              ? 'இந்திய மத்திய அமைச்சகங்கள், தேசிய பொதுத்துறை நிறுவனங்கள் மற்றும் மக்களவை உறுப்பினர்களின் அதிகாரப்பூர்வ தொடர்பு விவரங்கள்.'
              : 'Verified directory of Union Cabinet Ministers, National Authorities (MoRTH/NHAI, Railways, Jal Shakti, MoHUA, DoT, CPCB), and Members of Parliament.'}
          </p>
        </div>

        <Link href="/raise-complaint">
          <Button variant="civic" className="font-semibold shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white">
            <PlusCircle className="w-4 h-4 mr-1.5" />
            {t.nav.raiseComplaint}
          </Button>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <Card className="border-navy-200 dark:border-navy-800 shadow-xs">
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-navy-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder={isTamil ? 'அமைச்சர், துறை, எம்பி தேடுக...' : (isHindi ? 'मंत्री, मंत्रालय या सांसद खोजें...' : 'Search Minister, Ministry, or MP...')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full pl-9 pr-3 rounded-lg border border-navy-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs text-navy-950 dark:text-white shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>

            {/* State Filter */}
            <div>
              <Select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
              >
                <option value="all">
                  {isTamil ? 'அனைத்து மாநிலங்கள் / அகில இந்தியா' : (isHindi ? 'सभी राज्य / अखिल भारतीय' : 'All States & Union Territories')}
                </option>
                {INDIAN_STATES_AND_UTS.map((s) => (
                  <option key={s.id} value={s.nameEn}>
                    {s.nameEn}
                  </option>
                ))}
              </Select>
            </div>

            {/* Level Filter */}
            <div>
              <Select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">
                  {isTamil ? 'அனைத்து நிலைகள் (கேபினட் / எம்பி)' : (isHindi ? 'सभी स्तर (कैबिनेट / सांसद)' : 'All Levels (Cabinet / MPs / Agencies)')}
                </option>
                <option value="CABINET_MINISTER">Union Cabinet Ministers</option>
                <option value="LOK_SABHA_MP">Lok Sabha MPs</option>
                <option value="CENTRAL_AGENCY">Central Agencies & CPGRAMS</option>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Directory Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-navy-500">
          <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span>Loading official Union directory...</span>
        </div>
      ) : reps.length === 0 ? (
        <div className="p-12 rounded-2xl border border-navy-200 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-900/50 text-center space-y-3">
          <Landmark className="w-8 h-8 text-navy-400 mx-auto" />
          <h3 className="font-bold text-sm text-navy-950 dark:text-white">
            No representatives found for this filter
          </h3>
          <p className="text-xs text-navy-500 max-w-sm mx-auto">
            Try resetting your search query or selecting &quot;All States &amp; Union Territories&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setStateFilter('all'); setLevelFilter('all'); setSearch(''); }}
            className="text-xs"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reps.map((rep) => {
            const isCabinet = rep.level === 'CABINET_MINISTER';
            const isMP = rep.level === 'LOK_SABHA_MP';

            return (
              <Card
                key={rep.id}
                className="border-navy-200/90 dark:border-navy-800 hover:border-emerald-500 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Role & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-lg ${isCabinet ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400'} flex items-center justify-center shrink-0`}>
                        {isCabinet ? <Crown className="w-5 h-5" /> : <Landmark className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                          {rep.ministry || rep.organization}
                        </span>
                        <h3 className="font-bold text-sm text-navy-950 dark:text-white leading-tight">
                          {rep.name}
                        </h3>
                      </div>
                    </div>
                    <Badge verification="VERIFIED" className="text-[10px] py-0.5 shrink-0">
                      VERIFIED
                    </Badge>
                  </div>

                  <p className="text-xs text-navy-600 dark:text-navy-300 font-medium">
                    {rep.role}
                  </p>

                  {/* Jurisdiction Details */}
                  <div className="space-y-1.5 text-xs text-navy-600 dark:text-navy-400 bg-navy-50/70 dark:bg-navy-800/70 p-3 rounded-lg border border-navy-100 dark:border-navy-700">
                    <div className="flex items-center justify-between">
                      <span className="text-navy-500">State / Region:</span>
                      <span className="font-semibold text-navy-950 dark:text-white">{rep.state}</span>
                    </div>
                    {rep.constituency && (
                      <div className="flex items-center justify-between">
                        <span className="text-navy-500">Constituency:</span>
                        <span className="font-semibold text-navy-950 dark:text-white">{rep.constituency}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1 border-t border-navy-200 dark:border-navy-700">
                      <span className="text-navy-500">Email:</span>
                      <span className="font-mono text-[11px] text-navy-900 dark:text-navy-200 truncate max-w-[170px]">{rep.email}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-4 mt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between text-xs">
                  <a
                    href={rep.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-navy-500 hover:text-navy-800 dark:hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link href={`/raise-complaint`}>
                    <Button variant="outline" size="sm" className="text-[11px] py-1 h-7">
                      File Grievance
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
