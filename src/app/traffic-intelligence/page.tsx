'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Bike, 
  Bus, 
  Truck, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Navigation, 
  RefreshCw, 
  Flame, 
  ArrowRight, 
  Users, 
  Compass, 
  BarChart3,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { TrafficIntelligenceData, OriginDestinationFlow, CongestionLevel } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function TrafficIntelligencePage() {
  const { isTamil } = useLanguage();
  const [corridors, setCorridors] = useState<TrafficIntelligenceData[]>([]);
  const [odFlows, setOdFlows] = useState<OriginDestinationFlow[]>([]);
  const [selectedCorridor, setSelectedCorridor] = useState<TrafficIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'corridors' | 'od_flows'>('corridors');

  const fetchTrafficData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/traffic');
      const json = await res.json();
      if (json.success) {
        setCorridors(json.corridors || []);
        setOdFlows(json.originDestinationFlows || []);
        if (!selectedCorridor && json.corridors?.length > 0) {
          setSelectedCorridor(json.corridors[0]);
        } else if (selectedCorridor) {
          const updated = json.corridors?.find((c: TrafficIntelligenceData) => c.corridorId === selectedCorridor.corridorId);
          if (updated) setSelectedCorridor(updated);
        }
      }
    } catch (e) {
      console.error('Failed to load traffic intelligence', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getCongestionBadge = (level: CongestionLevel) => {
    switch (level) {
      case 'SEVERE_BOTTLENECK':
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-mono">SEVERE BOTTLENECK</Badge>;
      case 'HEAVY':
        return <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-mono">HEAVY TRAFFIC</Badge>;
      case 'MODERATE':
        return <Badge className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono">MODERATE FLOW</Badge>;
      default:
        return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono">FREE FLOW</Badge>;
    }
  };

  const totalVehiclesCount = corridors.reduce((acc, c) => acc + c.totalCount, 0);
  const avgSpeed = corridors.length > 0 
    ? (corridors.reduce((acc, c) => acc + c.avgSpeedKmH, 0) / corridors.length).toFixed(1)
    : '0';

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
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Traffic Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
            AI Vehicle Classification & Corridor OD Flows
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Real-time traffic density calculation, 6-class vehicular classification, and automated Origin-Destination movement flows sensed continuously by mobile transit cameras.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTrafficData}
            disabled={isRefreshing}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-emerald-600")} />
            {isRefreshing ? 'Syncing...' : 'Live Refresh'}
          </Button>
          <Link href="/route-intelligence">
            <Button size="sm" className="text-xs bg-navy-900 text-white hover:bg-navy-800">
              Route Bottleneck Analyzer
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Monitored Corridors</p>
              <p className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                {corridors.length} <span className="text-xs font-normal text-navy-400">Main Arteries</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Classified Vehicles / min</p>
              <p className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                {totalVehiclesCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Avg Fleet Speed</p>
              <p className="text-xl font-bold font-mono text-navy-950 dark:text-white">
                {avgSpeed} <span className="text-xs font-normal text-navy-400">km/h</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-navy-500 dark:text-navy-400 font-medium">Active Bottlenecks</p>
              <p className="text-xl font-bold font-mono text-red-600 dark:text-red-400">
                {corridors.filter((c) => c.congestionLevel === 'SEVERE_BOTTLENECK' || c.congestionLevel === 'HEAVY').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Switcher: Corridor Vehicle Breakdown vs Origin-Destination Flows */}
      <div className="flex items-center gap-2 border-b border-navy-200 dark:border-navy-800 pb-2">
        <button
          onClick={() => setActiveTab('corridors')}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === 'corridors'
              ? "bg-navy-950 text-white dark:bg-emerald-600"
              : "text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
          )}
        >
          Corridor Vehicle Classification ({corridors.length})
        </button>
        <button
          onClick={() => setActiveTab('od_flows')}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === 'od_flows'
              ? "bg-navy-950 text-white dark:bg-emerald-600"
              : "text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
          )}
        >
          Origin-Destination (OD) Travel Flows ({odFlows.length})
        </button>
      </div>

      {activeTab === 'corridors' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Corridor Selection List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {corridors.map((c) => {
              const isSelected = selectedCorridor?.corridorId === c.corridorId;
              return (
                <div
                  key={c.corridorId}
                  onClick={() => setSelectedCorridor(c)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer space-y-3",
                    isSelected
                      ? "border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/20 shadow-xs ring-1 ring-cyan-500"
                      : "border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900/80 hover:border-navy-300 dark:hover:border-navy-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-navy-950 dark:text-white">
                      {c.corridorName}
                    </h3>
                    {getCongestionBadge(c.congestionLevel)}
                  </div>

                  {/* Density Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-navy-500 dark:text-navy-400">Density Index</span>
                      <span className="font-mono font-bold text-navy-950 dark:text-white">{c.densityIndex}/100</span>
                    </div>
                    <div className="w-full h-2 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          c.densityIndex > 80 ? "bg-red-500" : c.densityIndex > 60 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${c.densityIndex}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-navy-500 dark:text-navy-400 pt-1 border-t border-navy-100 dark:border-navy-800">
                    <span>Speed: {c.avgSpeedKmH} km/h</span>
                    <span>Flow: {c.flowRateVehiclesPerMin} veh/min</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Vehicle Classification Visualizer (7 cols) */}
          <div className="lg:col-span-7">
            {selectedCorridor ? (
              <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
                <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        {selectedCorridor.corridorName}
                      </h2>
                      <p className="text-xs text-navy-300">
                        GPS: {selectedCorridor.lat.toFixed(4)}°N, {selectedCorridor.lng.toFixed(4)}°E &bull; Live Telemetry Feed
                      </p>
                    </div>
                    {getCongestionBadge(selectedCorridor.congestionLevel)}
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-6">
                  
                  {/* Alert Banner if present */}
                  {selectedCorridor.bottleneckAlert && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-start gap-2.5 text-xs text-red-800 dark:text-red-300">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Active Bottleneck Alert: </span>
                        {selectedCorridor.bottleneckAlert}
                      </div>
                    </div>
                  )}

                  {/* 6-Class Vehicle Breakdown Grid */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-3 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-cyan-600" />
                      Real-Time AI Vehicle Classification Breakdown
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                        <div className="flex items-center justify-between text-navy-500">
                          <span className="text-xs font-medium">Cars / Sedans / SUVs</span>
                          <Car className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xl font-bold font-mono text-navy-950 dark:text-white mt-1">
                          {selectedCorridor.vehiclesCount.cars}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                        <div className="flex items-center justify-between text-navy-500">
                          <span className="text-xs font-medium">Two-Wheelers / Bikes</span>
                          <Bike className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-xl font-bold font-mono text-navy-950 dark:text-white mt-1">
                          {selectedCorridor.vehiclesCount.bikes}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                        <div className="flex items-center justify-between text-navy-500">
                          <span className="text-xs font-medium">Transit Buses</span>
                          <Bus className="w-4 h-4 text-amber-600" />
                        </div>
                        <p className="text-xl font-bold font-mono text-navy-950 dark:text-white mt-1">
                          {selectedCorridor.vehiclesCount.buses}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                        <div className="flex items-center justify-between text-navy-500">
                          <span className="text-xs font-medium">Commercial Trucks</span>
                          <Truck className="w-4 h-4 text-purple-600" />
                        </div>
                        <p className="text-xl font-bold font-mono text-navy-950 dark:text-white mt-1">
                          {selectedCorridor.vehiclesCount.trucks}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                        <div className="flex items-center justify-between text-navy-500">
                          <span className="text-xs font-medium">Auto-Rickshaws</span>
                          <Car className="w-4 h-4 text-yellow-500" />
                        </div>
                        <p className="text-xl font-bold font-mono text-navy-950 dark:text-white mt-1">
                          {selectedCorridor.vehiclesCount.autos}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800">
                        <div className="flex items-center justify-between text-navy-500">
                          <span className="text-xs font-medium">Pedestrians Detected</span>
                          <Users className="w-4 h-4 text-rose-500" />
                        </div>
                        <p className="text-xl font-bold font-mono text-navy-950 dark:text-white mt-1">
                          {selectedCorridor.vehiclesCount.pedestrians}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Rate & Congestion Metrics */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950">
                      <span className="text-navy-500 block">Corridor Flow Rate</span>
                      <span className="text-base font-bold font-mono text-navy-950 dark:text-white">
                        {selectedCorridor.flowRateVehiclesPerMin} vehicles / min
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950">
                      <span className="text-navy-500 block">Average Arterial Speed</span>
                      <span className="text-base font-bold font-mono text-navy-950 dark:text-white">
                        {selectedCorridor.avgSpeedKmH} km/h
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      ) : (
        /* Origin-Destination Flows Tab */
        <div className="space-y-4">
          <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm">
            <CardHeader className="p-4 border-b border-navy-100 dark:border-navy-800">
              <CardTitle className="text-base font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-600" />
                Origin-Destination (OD) Travel Corridors & Delay Matrix
              </CardTitle>
              <CardDescription className="text-xs text-navy-500">
                Sensed travel times, estimated delays, and volume per hour across key metropolitan transit corridors.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-navy-50 dark:bg-navy-950 text-navy-600 dark:text-navy-400 font-semibold border-b border-navy-100 dark:border-navy-800">
                    <tr>
                      <th className="p-3.5">Corridor Route</th>
                      <th className="p-3.5">Peak Period</th>
                      <th className="p-3.5">Volume / Hour</th>
                      <th className="p-3.5">Expected Time</th>
                      <th className="p-3.5">Actual Travel Time</th>
                      <th className="p-3.5">Delay Anomaly</th>
                      <th className="p-3.5">Congestion Index</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100 dark:divide-navy-800">
                    {odFlows.map((flow) => (
                      <tr key={flow.id} className="hover:bg-navy-50/50 dark:hover:bg-navy-950/50 transition-colors">
                        <td className="p-3.5 font-bold text-navy-950 dark:text-white flex items-center gap-1.5">
                          <span>{flow.origin}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-navy-400" />
                          <span>{flow.destination}</span>
                        </td>
                        <td className="p-3.5 font-mono text-navy-600 dark:text-navy-400">{flow.peakPeriod}</td>
                        <td className="p-3.5 font-mono font-bold text-navy-950 dark:text-white">{flow.volumePerHour} veh/h</td>
                        <td className="p-3.5 font-mono text-navy-500">{flow.expectedTimeMin} mins</td>
                        <td className="p-3.5 font-mono font-bold text-navy-950 dark:text-white">{flow.avgTravelTimeMin} mins</td>
                        <td className="p-3.5">
                          <span className={cn(
                            "px-2 py-0.5 rounded font-mono font-bold text-[11px]",
                            flow.delayMin > 10 ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          )}>
                            +{flow.delayMin} mins
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold">{flow.congestionIndex}/100</span>
                            <div className="w-16 h-1.5 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  flow.congestionIndex > 75 ? "bg-red-500" : flow.congestionIndex > 50 ? "bg-amber-500" : "bg-emerald-500"
                                )}
                                style={{ width: `${flow.congestionIndex}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
