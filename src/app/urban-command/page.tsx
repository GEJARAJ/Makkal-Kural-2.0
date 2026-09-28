'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bus, 
  Cpu, 
  Video, 
  AlertTriangle, 
  Flame, 
  Activity, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Route as RouteIcon, 
  Wrench, 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  Radio, 
  Sparkles,
  Car,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function UrbanCommandCenterPage() {
  const { isTamil, language } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'defects' | 'incidents' | 'traffic'>('overview');

  const fetchCommandData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/command');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error('Failed to load command data', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCommandData();
    const interval = setInterval(fetchCommandData, 10000); // 10s live pulse
    return () => clearInterval(interval);
  }, []);

  const summary = data?.summary || {
    onlineBuses: 5,
    totalBuses: 6,
    activeCameras: 28,
    totalCameras: 30,
    totalAIEventsToday: 7420,
    totalDefects: 5,
    potholesCount: 1,
    waterloggingCount: 1,
    totalIncidents: 3,
    anprDetectionsCount: 5,
    activeBottlenecksCount: 2,
    avgBandwidthSavedPct: '98.6',
    unresolvedMaintenanceIssues: 3,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* 1. Header Banner & Status Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-emerald-950 text-white shadow-xl border border-navy-800">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 border border-emerald-500/30">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              LIVE TELEMETRY STREAMING
            </span>
            <span className="text-xs text-navy-300 font-mono">
              GOI &bull; SMART URBAN MOBILITY &bull; SENSING FLEET
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Makkal Kural <span className="text-emerald-400">UrbanSense</span> Command Center
          </h1>
          <p className="text-xs sm:text-sm text-navy-300 max-w-3xl">
            {isTamil
              ? 'பொதுப் போக்குவரத்து பேருந்துகள் மூலம் தானியங்கி சாலை சேதங்கள், போக்குவரத்து நெரிசல் மற்றும் விபத்து எச்சரிக்கைகளை நேரலையாக கண்காணிக்கும் தளம்.'
              : 'Transforming municipal bus fleets into edge-AI sensing units for real-time road defect detection, traffic congestion analysis, and rapid civic maintenance routing.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCommandData}
            disabled={isRefreshing}
            className="text-xs bg-navy-900/60 border-navy-700 text-white hover:bg-navy-800"
          >
            <RefreshCw className={cn('w-3.5 h-3.5 mr-1.5', isRefreshing && 'animate-spin')} />
            {isTamil ? 'புதுப்பிக்க' : 'Refresh Feed'}
          </Button>

          <Link href="/fleet">
            <Button variant="civic" size="sm" className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              <Bus className="w-3.5 h-3.5 mr-1.5" />
              {isTamil ? 'பேருந்து ஜி.ஐ.எஸ்' : 'Live Fleet Radar'}
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Telemetry KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Buses Online */}
        <Card className="border-navy-200 dark:border-navy-800 p-4 space-y-2 bg-white dark:bg-navy-900 shadow-sm">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Fleet Online</span>
            <Bus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white font-mono">{summary.onlineBuses}</span>
            <span className="text-xs text-navy-500 font-semibold">/ {summary.totalBuses}</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">● 91.6% Active</span>
        </Card>

        {/* Cameras Active */}
        <Card className="border-navy-200 dark:border-navy-800 p-4 space-y-2 bg-white dark:bg-navy-900 shadow-sm">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Edge Cameras</span>
            <Video className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white font-mono">{summary.activeCameras}</span>
            <span className="text-xs text-navy-500 font-semibold">/ {summary.totalCameras}</span>
          </div>
          <span className="text-[10px] text-sky-600 font-bold block">30 FPS Edge YOLOv11</span>
        </Card>

        {/* AI Events Today */}
        <Card className="border-navy-200 dark:border-navy-800 p-4 space-y-2 bg-white dark:bg-navy-900 shadow-sm">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">AI Events Today</span>
            <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white font-mono">
            {summary.totalAIEventsToday.toLocaleString()}
          </div>
          <span className="text-[10px] text-purple-600 font-bold block">+{summary.avgBandwidthSavedPct}% Bandwidth Saved</span>
        </Card>

        {/* Road Defects */}
        <Card className="border-navy-200 dark:border-navy-800 p-4 space-y-2 bg-white dark:bg-navy-900 shadow-sm">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Road Defects</span>
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
            {summary.totalDefects}
          </div>
          <span className="text-[10px] text-navy-500 font-medium block">Potholes & Waterlogging</span>
        </Card>

        {/* Safety Incidents */}
        <Card className="border-navy-200 dark:border-navy-800 p-4 space-y-2 bg-white dark:bg-navy-900 shadow-sm">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Safety Incidents</span>
            <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 font-mono">
            {summary.totalIncidents}
          </div>
          <span className="text-[10px] text-red-600 font-bold block">Rash Driving & ANPR</span>
        </Card>

        {/* Unresolved Maintenance */}
        <Card className="border-navy-200 dark:border-navy-800 p-4 space-y-2 bg-white dark:bg-navy-900 shadow-sm">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Maintenance</span>
            <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
            {summary.unresolvedMaintenanceIssues}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">Fused Multi-Bus Orders</span>
        </Card>

      </div>

      {/* 3. Navigation Hub to Specialized Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Fleet Monitoring */}
        <Link href="/fleet" className="group">
          <Card className="border-navy-200/80 dark:border-navy-800 p-5 bg-white dark:bg-navy-900 group-hover:border-emerald-500 transition-all shadow-xs h-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Bus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-navy-950 dark:text-white group-hover:text-emerald-600 transition-colors">
                Live Bus Fleet Radar
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400">
                Monitor mobile camera units, 5-channel camera health, GPS speeds, and live edge model telemetry.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Inspect Fleet &rarr;</span>
            </div>
          </Card>
        </Link>

        {/* Road Intelligence */}
        <Link href="/road-intelligence" className="group">
          <Card className="border-navy-200/80 dark:border-navy-800 p-5 bg-white dark:bg-navy-900 group-hover:border-amber-500 transition-all shadow-xs h-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-navy-950 dark:text-white group-hover:text-amber-600 transition-colors">
                AI Road Defect Engine
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400">
                Potholes, waterlogging, missing dividers, and damaged signs with 1-click grievance escalation.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Defects &rarr;</span>
            </div>
          </Card>
        </Link>

        {/* Traffic Intelligence */}
        <Link href="/traffic-intelligence" className="group">
          <Card className="border-navy-200/80 dark:border-navy-800 p-5 bg-white dark:bg-navy-900 group-hover:border-sky-500 transition-all shadow-xs h-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-navy-950 dark:text-white group-hover:text-sky-600 transition-colors">
                Traffic & OD Flow AI
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400">
                6-class vehicle counting, lane density index, and Origin-Destination passenger corridor analytics.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-sky-700 dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Traffic AI &rarr;</span>
            </div>
          </Card>
        </Link>

        {/* Incidents & ANPR */}
        <Link href="/incidents" className="group">
          <Card className="border-navy-200/80 dark:border-navy-800 p-5 bg-white dark:bg-navy-900 group-hover:border-red-500 transition-all shadow-xs h-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-navy-950 dark:text-white group-hover:text-red-600 transition-colors">
                Incidents & ANPR OCR
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400">
                Hit-and-run detection, rash driving vehicle tracking, school-zone safety, and license plate recognition.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-red-700 dark:text-red-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Investigate Incidents &rarr;</span>
            </div>
          </Card>
        </Link>

      </div>

      {/* 4. Live Multi-Source Feed & Incident Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Detected Road Defects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Real-Time Edge Road Hazard Detections</span>
            </h2>
            <Link href="/road-intelligence" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              View All Defects &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentDefects?.map((defect: any) => (
              <Card key={defect.id} className="border-navy-200/80 dark:border-navy-800 p-4 bg-white dark:bg-navy-900 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider',
                        defect.severity === 'CRITICAL' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300' :
                        defect.severity === 'HIGH' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300' :
                        'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300'
                      )}>
                        {defect.defectType.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {defect.confidence}% AI Confidence
                      </span>
                      <span className="text-[10px] text-navy-500">
                        &bull; Repeated by {defect.repeatedDetections} buses
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                      {defect.title}
                    </h4>
                    
                    <p className="text-xs text-navy-600 dark:text-navy-400">
                      📍 {defect.locality}, {defect.district} &bull; Sensed by Bus <strong className="text-navy-800 dark:text-navy-200">{defect.busId}</strong> ({defect.cameraPosition} Cam)
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2">
                    {defect.convertedGrievanceRef ? (
                      <Link href={`/track/${defect.convertedGrievanceRef}`}>
                        <Button size="sm" variant="outline" className="text-xs border-emerald-500 text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Track Grievance
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/road-intelligence">
                        <Button size="sm" variant="civic" className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Sparkles className="w-3.5 h-3.5 mr-1" />
                          Escalate to Grievance
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Col: Active Congestion & Edge Health */}
        <div className="space-y-6">
          
          {/* Active Congestion Zones */}
          <Card className="border-navy-200/80 dark:border-navy-800 p-5 bg-white dark:bg-navy-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-navy-100 dark:border-navy-800 pb-3">
              <h3 className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-600" />
                <span>Corridor Congestion Hotspots</span>
              </h3>
              <Link href="/traffic-intelligence" className="text-xs text-sky-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              {data?.trafficSummary?.map((corr: any) => (
                <div key={corr.corridorId} className="p-3 rounded-xl bg-navy-50/70 dark:bg-navy-950/70 border border-navy-200/80 dark:border-navy-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950 dark:text-white">{corr.corridorName.split('(')[0]}</span>
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-bold font-mono',
                      corr.congestionLevel === 'SEVERE_BOTTLENECK' ? 'bg-red-100 text-red-700' :
                      corr.congestionLevel === 'HEAVY' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    )}>
                      {corr.congestionLevel.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-navy-600 dark:text-navy-400 text-[11px]">
                    <span>Avg Speed: <strong className="text-navy-900 dark:text-white">{corr.avgSpeedKmH} km/h</strong></span>
                    <span>Density: <strong className="text-navy-900 dark:text-white">{corr.densityIndex}%</strong></span>
                    <span>Vehicles: <strong className="text-navy-900 dark:text-white">{corr.totalCount}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Edge AI Bandwidth Visualizer Banner */}
          <Link href="/edge-ai">
            <Card className="border-purple-300 dark:border-purple-900 bg-gradient-to-br from-purple-950 via-navy-950 to-navy-900 text-white p-5 shadow-md hover:scale-[1.01] transition-transform space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase">
                  Edge AI Architecture
                </span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-bold text-sm">
                98.6% Bandwidth Saved Through On-Bus Local Inference
              </h4>
              <p className="text-[11px] text-purple-200 leading-relaxed">
                Raw 30 FPS video is processed locally on bus NPUs. Only 5–10 second verified incident snippets travel to the cloud.
              </p>
              <div className="text-xs font-bold text-purple-300 flex items-center gap-1">
                <span>Inspect Edge Pipeline &rarr;</span>
              </div>
            </Card>
          </Link>

        </div>

      </div>

    </div>
  );
}
