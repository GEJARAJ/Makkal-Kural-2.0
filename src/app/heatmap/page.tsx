'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Complaint } from '@/types/database';

const NationalCivicHeatmap = dynamic(
  () => import('@/components/maps/national-civic-heatmap').then((mod) => mod.NationalCivicHeatmap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] rounded-2xl bg-navy-900 flex items-center justify-center text-navy-400">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading National GIS Radar...</span>
        </div>
      </div>
    ),
  }
);
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Layers, 
  Flame, 
  PlusCircle, 
  ShieldAlert, 
  TrendingUp,
  Search,
  Building2
} from 'lucide-react';

export default function NationalHeatmapPage() {
  const { isTamil, language } = useLanguage();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/analytics/heatmap');
        const json = await res.json();
        if (json.success && json.data) {
          setComplaints(json.data);
        }
      } catch (err) {
        console.error('Failed to load heatmap data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const urgentCount = complaints.filter((c) => c.severity === 'URGENT').length;
  const inProgressCount = complaints.filter((c) => c.status === 'IN_PROGRESS').length;
  const resolvedCount = complaints.filter((c) => c.status === 'RESOLVED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              Live GIS Radar
            </span>
            <span className="text-xs font-semibold text-navy-500">Pan-India Central Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-1 font-tamil">
            {isTamil
              ? 'தேசிய குடிமக்கள் குறைதீர்ப்பு வரைபடம் (Heatmap)'
              : language === 'hi'
              ? 'राष्ट्रीय नागरिक शिकायत मानचित्र (हीटमैप)'
              : 'National Civic Grievance Heatmap'}
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 mt-1 max-w-2xl">
            {isTamil
              ? 'இந்தியா முழுவதும் உள்ள தேசிய நெடுஞ்சாலைகள், ரயில்வே, குடிநீர் மற்றும் மின்சார குறைபாடுகளை வரைபடத்தில் நேரலையாக காண்க.'
              : 'Real-time geographic distribution of Union Ministry grievances, hazardous infrastructure hotspots, and civic escalations across all 28 States & 8 UTs.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/raise-complaint">
            <Button className="text-xs bg-emerald-600 text-white hover:bg-emerald-700">
              <PlusCircle className="w-4 h-4 mr-1.5" />
              {isTamil ? 'புதிய புகார் பதிவு செய்க' : 'Report Local Issue'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-navy-200 bg-white shadow-2xs">
          <CardContent className="p-4">
            <span className="text-xs text-navy-500 font-semibold block">Total Mapped Hotspots</span>
            <div className="text-2xl font-bold text-navy-950 font-mono mt-1">{complaints.length}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50 shadow-2xs">
          <CardContent className="p-4">
            <span className="text-xs text-red-700 font-semibold block">Urgent Hazards</span>
            <div className="text-2xl font-bold text-red-900 font-mono mt-1">{urgentCount}</div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50 shadow-2xs">
          <CardContent className="p-4">
            <span className="text-xs text-amber-800 font-semibold block">Active Field Work</span>
            <div className="text-2xl font-bold text-amber-950 font-mono mt-1">{inProgressCount}</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-2xs">
          <CardContent className="p-4">
            <span className="text-xs text-emerald-800 font-semibold block">Verified Resolved</span>
            <div className="text-2xl font-bold text-emerald-950 font-mono mt-1">{resolvedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card className="border-navy-200 shadow-sm overflow-hidden p-2 bg-navy-50/30">
        <NationalCivicHeatmap complaints={complaints} height={620} />
      </Card>
    </div>
  );
}
