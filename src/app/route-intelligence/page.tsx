'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Route as RouteIcon, 
  Bus, 
  Clock, 
  AlertTriangle, 
  Gauge, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw,
  Layers,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { RoutePerformanceItem } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function RouteIntelligencePage() {
  const { isTamil } = useLanguage();
  const [routes, setRoutes] = useState<RoutePerformanceItem[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RoutePerformanceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRoutes = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/routes');
      const json = await res.json();
      if (json.success && json.data) {
        setRoutes(json.data);
        if (!selectedRoute && json.data.length > 0) {
          setSelectedRoute(json.data[0]);
        } else if (selectedRoute) {
          const updated = json.data.find((r: RoutePerformanceItem) => r.routeCode === selectedRoute.routeCode);
          if (updated) setSelectedRoute(updated);
        }
      }
    } catch (e) {
      console.error('Failed to load route intelligence', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
    const interval = setInterval(fetchRoutes, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: RoutePerformanceItem['congestionStatus']) => {
    switch (status) {
      case 'HEAVY_CONGESTION':
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-mono">HEAVY DELAY</Badge>;
      case 'MODERATE_DELAY':
        return <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-mono">MODERATE DELAY</Badge>;
      default:
        return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono">ON TIME</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-navy-500">
            <Link href="/urban-command" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              UrbanSense Command
            </Link>
            <span>/</span>
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Route Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <RouteIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            Transit Route Performance & Delay Corridors
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Correlating mobile bus telemetry with scheduled timetables to detect road-induced transit delays, frequent bottleneck junctions, and corridor reliability scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRoutes}
            disabled={isRefreshing}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-emerald-600")} />
            {isRefreshing ? 'Syncing...' : 'Live Refresh'}
          </Button>
          <Link href="/fleet">
            <Button size="sm" className="text-xs bg-navy-900 text-white hover:bg-navy-800">
              Live Fleet View
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Route List & Deep Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Routes List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {routes.map((route) => {
            const isSelected = selectedRoute?.routeCode === route.routeCode;
            return (
              <div
                key={route.routeCode}
                onClick={() => setSelectedRoute(route)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer space-y-2.5",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500"
                    : "border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900/80 hover:border-navy-300 dark:hover:border-navy-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono font-bold text-sm bg-navy-900 text-white dark:bg-emerald-600">
                      {route.routeCode}
                    </Badge>
                    <span className="text-xs font-bold text-navy-950 dark:text-white">
                      {route.routeName}
                    </span>
                  </div>
                  {getStatusBadge(route.congestionStatus)}
                </div>

                <div className="flex items-center justify-between text-xs text-navy-600 dark:text-navy-300">
                  <span>Distance: {route.lengthKm} km</span>
                  <span className="font-mono">
                    Delay: <strong className={route.delayMin > 10 ? "text-red-600" : "text-emerald-600"}>+{route.delayMin} min</strong>
                  </span>
                </div>

                {/* Reliability Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-navy-500">
                    <span>Reliability Score</span>
                    <span className="font-bold text-navy-950 dark:text-white">{route.reliabilityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        route.reliabilityScore > 85 ? "bg-emerald-500" : route.reliabilityScore > 65 ? "bg-amber-500" : "bg-red-500"
                      )}
                      style={{ width: `${route.reliabilityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Route Bottleneck Deep Analyzer (7 cols) */}
        <div className="lg:col-span-7">
          {selectedRoute ? (
            <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
              <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-white font-mono font-bold text-sm">
                        Route {selectedRoute.routeCode}
                      </span>
                      <h2 className="text-lg font-bold text-white">
                        {selectedRoute.routeName}
                      </h2>
                    </div>
                    <p className="text-xs text-navy-300 mt-1 flex items-center gap-1.5">
                      <span>{selectedRoute.origin}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>{selectedRoute.destination}</span>
                      <span>&bull; {selectedRoute.lengthKm} km Total Distance</span>
                    </p>
                  </div>
                  {getStatusBadge(selectedRoute.congestionStatus)}
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-6">
                
                {/* Travel Time Comparison */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                    <span className="text-xs text-navy-500 block">Scheduled Time</span>
                    <span className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                      {selectedRoute.expectedDurationMin} mins
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                    <span className="text-xs text-navy-500 block">Current Avg Time</span>
                    <span className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                      {selectedRoute.currentAvgDurationMin} mins
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                    <span className="text-xs text-navy-500 block">Delay Anomaly</span>
                    <span className="text-xl font-bold font-mono text-red-600 dark:text-red-400">
                      +{selectedRoute.delayMin} mins
                    </span>
                  </div>
                </div>

                {/* Sensed Bottlenecks on this Route */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    AI-Identified Recurring Bottleneck Segments
                  </h3>

                  <div className="space-y-2">
                    {selectedRoute.frequentBottlenecks.map((bottleneck, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-navy-950 dark:text-white">
                            {bottleneck}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono text-amber-700 border-amber-300 dark:text-amber-400">
                          Speed Drop: -42%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fleet Deployment on this route */}
                <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bus className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-navy-950 dark:text-white block">
                        {selectedRoute.totalBuses} Mobile Sensing Buses Assigned
                      </span>
                      <span className="text-xs text-navy-500">
                        Scanning road surface and corridor density every 8 seconds.
                      </span>
                    </div>
                  </div>

                  <Link href="/fleet">
                    <Button size="sm" variant="outline" className="text-xs">
                      Inspect Fleet Buses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
