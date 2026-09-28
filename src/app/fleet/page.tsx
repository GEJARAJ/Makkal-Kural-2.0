'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bus, 
  Video, 
  Cpu, 
  Wifi, 
  MapPin, 
  Activity, 
  Gauge, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Eye, 
  Radio, 
  ArrowLeft,
  Search,
  Filter,
  Layers,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { BusFleetItem } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function BusFleetPage() {
  const { isTamil, language } = useLanguage();
  const [fleet, setFleet] = useState<BusFleetItem[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusFleetItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ONLINE' | 'OFFLINE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeCameraFeed, setActiveCameraFeed] = useState<'front' | 'rear' | 'leftSide' | 'rightSide' | 'cabin'>('front');

  const fetchFleet = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/fleet');
      const json = await res.json();
      if (json.success && json.data) {
        setFleet(json.data);
        if (!selectedBus && json.data.length > 0) {
          setSelectedBus(json.data[0]);
        } else if (selectedBus) {
          // Update selected bus reference
          const updated = json.data.find((b: BusFleetItem) => b.id === selectedBus.id);
          if (updated) setSelectedBus(updated);
        }
      }
    } catch (e) {
      console.error('Failed to fetch fleet telemetry', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFleet();
    const interval = setInterval(fetchFleet, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredFleet = fleet.filter((bus) => {
    const matchesStatus = filterStatus === 'ALL' || bus.status === filterStatus;
    const matchesSearch = 
      bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.routeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const onlineCount = fleet.filter((b) => b.status === 'ONLINE').length;
  const totalCameras = fleet.reduce((acc, b) => {
    const active = Object.values(b.cameras).filter((c) => c === 'ACTIVE').length;
    return acc + active;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-navy-500">
            <Link href="/urban-command" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              UrbanSense Command
            </Link>
            <span>/</span>
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Bus Fleet Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <Bus className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            AI Mobile Sensing Bus Fleet
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Each public transit bus functions as an autonomous, multi-camera edge computing unit scanning road conditions, vehicle densities, and infrastructure defects in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchFleet}
            disabled={isRefreshing}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-emerald-600")} />
            {isRefreshing ? 'Syncing...' : 'Live Refresh'}
          </Button>
          <Link href="/urban-command">
            <Button size="sm" className="text-xs bg-navy-900 text-white hover:bg-navy-800">
              Command Center
            </Button>
          </Link>
        </div>
      </div>

      {/* Fleet KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Buses Online</p>
              <p className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                {onlineCount} <span className="text-xs font-normal text-navy-400">/ {fleet.length}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Active HD Cameras</p>
              <p className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                {totalCameras} <span className="text-xs font-normal text-navy-400">/ {fleet.length * 5}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Edge NPU Status</p>
              <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                100% HEALTHY
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Avg Bandwidth Saved</p>
              <p className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                98.6%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Layout: Fleet List & Live Bus Telemetry Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Fleet List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm">
            <CardHeader className="p-4 border-b border-navy-100 dark:border-navy-800">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base font-bold text-navy-950 dark:text-white">
                  Active Bus Fleet ({filteredFleet.length})
                </CardTitle>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setFilterStatus('ALL')}
                    className={cn(
                      "px-2 py-1 text-xs rounded font-medium transition-colors",
                      filterStatus === 'ALL' ? "bg-navy-950 text-white dark:bg-emerald-600" : "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300"
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('ONLINE')}
                    className={cn(
                      "px-2 py-1 text-xs rounded font-medium transition-colors",
                      filterStatus === 'ONLINE' ? "bg-emerald-600 text-white" : "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300"
                    )}
                  >
                    Online
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mt-3">
                <Search className="w-4 h-4 text-navy-400 absolute left-3 top-2.5" />
                <Input
                  placeholder="Search bus no, route (e.g. 21G, 114), driver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs h-9"
                />
              </div>
            </CardHeader>

            <CardContent className="p-2 space-y-2 max-h-[640px] overflow-y-auto">
              {filteredFleet.length === 0 ? (
                <div className="p-8 text-center text-xs text-navy-500">
                  No matching buses found.
                </div>
              ) : (
                filteredFleet.map((bus) => {
                  const isSelected = selectedBus?.id === bus.id;
                  const activeCamsCount = Object.values(bus.cameras).filter((c) => c === 'ACTIVE').length;
                  return (
                    <div
                      key={bus.id}
                      onClick={() => setSelectedBus(bus)}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2",
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500"
                          : "border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900/60 hover:border-navy-300 dark:hover:border-navy-700"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-navy-950 dark:text-white">
                            {bus.busNumber}
                          </span>
                          <Badge variant="outline" className="text-[10px] font-bold bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200">
                            {bus.routeCode}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            bus.status === 'ONLINE' ? "bg-emerald-500 animate-pulse" : "bg-navy-400"
                          )} />
                          <span className={cn(
                            "text-[10px] font-mono font-bold",
                            bus.status === 'ONLINE' ? "text-emerald-700 dark:text-emerald-400" : "text-navy-500"
                          )}>
                            {bus.status}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-navy-600 dark:text-navy-300 truncate">
                        {bus.routeName}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-navy-500 dark:text-navy-400 pt-1 border-t border-navy-100 dark:border-navy-800">
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3.5 h-3.5 text-navy-400" />
                          {bus.speedKmH} km/h
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-cyan-500" />
                          {activeCamsCount}/5 Cams
                        </span>
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Cpu className="w-3.5 h-3.5" />
                          {bus.edgeAI.fps} FPS
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Selected Bus Deep Inspection & Multi-Camera Telemetry (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedBus ? (
            <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
              <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-t-xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-mono font-extrabold text-white">
                        {selectedBus.busNumber}
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                        Route {selectedBus.routeCode}
                      </span>
                      <span className="text-xs text-navy-300 font-mono">
                        Depot: {selectedBus.depot}
                      </span>
                    </div>
                    <p className="text-xs text-navy-300 mt-1">
                      {selectedBus.routeName} &bull; Driver: <span className="text-white font-medium">{selectedBus.driverName}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-navy-800 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
                      5G Connected
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-5">
                
                {/* 5-Camera Grid Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-emerald-600" />
                      On-Board 5-Camera Multi-View System
                    </span>
                    <span className="text-[11px] text-navy-500 font-mono">
                      FMCW / 1080p60 HDR Low-Latency
                    </span>
                  </div>

                  {/* Camera Tabs */}
                  <div className="grid grid-cols-5 gap-1.5 p-1 bg-navy-100 dark:bg-navy-950 rounded-lg">
                    {[
                      { key: 'front', label: 'Front Road' },
                      { key: 'rear', label: 'Rear Traffic' },
                      { key: 'leftSide', label: 'Left Kerb' },
                      { key: 'rightSide', label: 'Right Lane' },
                      { key: 'cabin', label: 'Cabin Safety' },
                    ].map((cam) => (
                      <button
                        key={cam.key}
                        onClick={() => setActiveCameraFeed(cam.key as any)}
                        className={cn(
                          "py-1.5 px-2 text-xs font-medium rounded-md transition-all flex flex-col items-center gap-0.5",
                          activeCameraFeed === cam.key
                            ? "bg-white dark:bg-navy-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs"
                            : "text-navy-600 dark:text-navy-400 hover:text-navy-950"
                        )}
                      >
                        <span>{cam.label}</span>
                        <span className="text-[9px] font-mono text-emerald-500">
                          {selectedBus.cameras[cam.key as keyof typeof selectedBus.cameras]}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Live Simulated Edge Video Feed Display */}
                  <div className="mt-3 relative rounded-xl overflow-hidden bg-navy-950 border border-navy-800 aspect-video flex flex-col justify-between p-3 text-white">
                    
                    {/* Camera Overlay HUD */}
                    <div className="flex items-center justify-between text-[11px] font-mono bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                        LIVE STREAM: CAM-{activeCameraFeed.toUpperCase()}
                      </span>
                      <span>FPS: {selectedBus.edgeAI.fps} &bull; 1080p @ 60Hz</span>
                    </div>

                    {/* Visual AI Bounding Box Simulation HUD */}
                    <div className="my-auto flex flex-col items-center justify-center p-4">
                      <div className="relative border-2 border-emerald-400 bg-emerald-500/10 rounded-lg p-3 text-center max-w-xs shadow-lg animate-pulse">
                        <span className="absolute -top-3 left-2 bg-emerald-600 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded text-white">
                          EDGE-YOLOv8 &bull; 96.8%
                        </span>
                        <p className="text-xs font-mono font-bold text-white mt-1">
                          {activeCameraFeed === 'front' && 'ROAD SURFACE SCAN: OPTIMAL'}
                          {activeCameraFeed === 'rear' && 'TRAFFIC FLOW MONITORING: 18 VEHICLES'}
                          {activeCameraFeed === 'leftSide' && 'PEDESTRIAN & KERB DETECTOR: CLEAR'}
                          {activeCameraFeed === 'rightSide' && 'LANE OVERTAKE DETECTION: ACTIVE'}
                          {activeCameraFeed === 'cabin' && 'CABIN CAPACITY OCCUPANCY: 72%'}
                        </p>
                        <p className="text-[10px] text-emerald-200 mt-1">
                          Location: {selectedBus.lat.toFixed(5)} N, {selectedBus.lng.toFixed(5)} E
                        </p>
                      </div>
                    </div>

                    {/* Bottom HUD */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-navy-300 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      <span>Speed: {selectedBus.speedKmH} km/h</span>
                      <span>NPU: {selectedBus.edgeAI.npuUsagePct}% | Temp: {selectedBus.edgeAI.gpuTempC}°C</span>
                      <span className="text-emerald-400">Bandwidth Saved: {selectedBus.edgeAI.bandwidthSavedPct}%</span>
                    </div>
                  </div>
                </div>

                {/* Edge AI Device Diagnostics Card */}
                <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-950 dark:text-white flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      On-Bus Edge AI Processing Module
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {selectedBus.edgeAI.model}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 dark:text-navy-400 block">NPU Utilization</span>
                      <span className="text-sm font-bold font-mono text-navy-950 dark:text-white">
                        {selectedBus.edgeAI.npuUsagePct}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 dark:text-navy-400 block">Processor Temp</span>
                      <span className="text-sm font-bold font-mono text-navy-950 dark:text-white">
                        {selectedBus.edgeAI.gpuTempC}°C
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 dark:text-navy-400 block">Events Processed</span>
                      <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        {selectedBus.edgeAI.eventsProcessedToday}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 dark:text-navy-400 block">Network Data Stream</span>
                      <span className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                        {selectedBus.connectivity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Navigation */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Link href="/road-intelligence">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Detected Road Defects
                    </Button>
                  </Link>
                  <Link href="/traffic-intelligence">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Corridor Traffic
                    </Button>
                  </Link>
                  <Link href="/edge-ai">
                    <Button variant="outline" size="sm" className="text-xs">
                      Edge AI Architecture Visualizer
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-navy-200 dark:border-navy-800 p-8 text-center text-navy-500">
              Select a bus from the left fleet list to view live multi-camera telemetry and edge NPU diagnostics.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
