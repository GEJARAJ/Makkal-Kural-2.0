'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Bus, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Clock, 
  Layers, 
  ArrowRight, 
  ShieldCheck,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { MaintenancePriorityItem, DefectSeverity } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function MaintenancePrioritiesPage() {
  const { isTamil } = useLanguage();
  const [priorities, setPriorities] = useState<MaintenancePriorityItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MaintenancePriorityItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [issuingOrderFor, setIssuingOrderFor] = useState<string | null>(null);
  const [orderIssuedMap, setOrderIssuedMap] = useState<{ [id: string]: string }>({});

  const fetchPriorities = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/maintenance');
      const json = await res.json();
      if (json.success && json.data) {
        setPriorities(json.data);
        if (!selectedItem && json.data.length > 0) {
          setSelectedItem(json.data[0]);
        } else if (selectedItem) {
          const updated = json.data.find((p: MaintenancePriorityItem) => p.id === selectedItem.id);
          if (updated) setSelectedItem(updated);
        }
      }
    } catch (e) {
      console.error('Failed to load maintenance priorities', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPriorities();
    const interval = setInterval(fetchPriorities, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleIssueWorkOrder = async (item: MaintenancePriorityItem) => {
    setIssuingOrderFor(item.id);
    try {
      const res = await fetch('/api/urban/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ISSUE_WORK_ORDER',
          priorityId: item.id,
        }),
      });
      const json = await res.json();
      if (json.success && json.workOrder) {
        setOrderIssuedMap((prev) => ({
          ...prev,
          [item.id]: json.workOrder.orderNumber,
        }));
        setPriorities((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, status: 'WORK_ORDER_ISSUED' } : p
          )
        );
        if (selectedItem?.id === item.id) {
          setSelectedItem((prev) => prev ? { ...prev, status: 'WORK_ORDER_ISSUED' } : null);
        }
      }
    } catch (e) {
      console.error('Failed to issue work order', e);
    } finally {
      setIssuingOrderFor(null);
    }
  };

  const getSeverityBadge = (severity: DefectSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-mono">CRITICAL HAZARD</Badge>;
      case 'HIGH':
        return <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-mono">HIGH RISK</Badge>;
      default:
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-mono">MEDIUM</Badge>;
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
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Maintenance Prioritization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-7 h-7 text-amber-500" />
            Multi-Source Mobile Sensing & Maintenance Fusion
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Synthesizes repeated detections from multiple independent buses, weighting defect severity against corridor commuter volumes to automatically dispatch road repair work orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPriorities}
            disabled={isRefreshing}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-emerald-600")} />
            {isRefreshing ? 'Syncing...' : 'Live Refresh'}
          </Button>
          <Link href="/road-intelligence">
            <Button size="sm" className="text-xs bg-navy-900 text-white hover:bg-navy-800">
              AI Road Defects Feed
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Priority Ranking Table & Work Order Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Priority Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {priorities.map((item, idx) => {
            const isSelected = selectedItem?.id === item.id;
            const hasOrder = item.status === 'WORK_ORDER_ISSUED' || orderIssuedMap[item.id];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer space-y-2.5",
                  isSelected
                    ? "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs ring-1 ring-amber-500"
                    : "border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900/80 hover:border-navy-300 dark:hover:border-navy-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-navy-950 text-white text-xs font-mono font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="text-sm font-bold text-navy-950 dark:text-white">
                      {item.title}
                    </span>
                  </div>
                  {getSeverityBadge(item.severity)}
                </div>

                <div className="flex items-center justify-between text-xs text-navy-600 dark:text-navy-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-navy-400" />
                    {item.locality}, {item.district}
                  </span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    Score: {item.suggestedPriorityScore}/100
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-navy-500 dark:text-navy-400 pt-1.5 border-t border-navy-100 dark:border-navy-800">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Bus className="w-3 h-3" />
                    {item.detectionFrequency} Verified Bus Passes
                  </span>
                  {hasOrder ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Work Order Active
                    </span>
                  ) : (
                    <span className="text-amber-600">Action Required</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Work Order Dispatch Terminal (7 cols) */}
        <div className="lg:col-span-7">
          {selectedItem ? (
            <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
              <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-t-xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(selectedItem.severity)}
                      <span className="text-xs font-mono font-bold text-amber-400">
                        PRIORITY INDEX: {selectedItem.suggestedPriorityScore}/100
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1.5">
                      {selectedItem.title}
                    </h2>
                    <p className="text-xs text-navy-300 mt-0.5">
                      {selectedItem.locality}, {selectedItem.district} &bull; GPS: {selectedItem.lat.toFixed(5)}°N, {selectedItem.lng.toFixed(5)}°E
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-5">
                
                {/* Multi-Bus Cross-Verification Evidence Box */}
                <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 flex items-center gap-1.5">
                    <Bus className="w-4 h-4 text-emerald-600" />
                    Multi-Bus Telemetry Cross-Verification
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 block">Total Detections</span>
                      <span className="text-sm font-bold font-mono text-navy-950 dark:text-white">
                        {selectedItem.detectionFrequency} Autonomous Passes
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 block">Corridor Daily Commuters</span>
                      <span className="text-sm font-bold font-mono text-navy-950 dark:text-white">
                        {selectedItem.nearbyBusVolumeDaily.toLocaleString()} Passengers/day
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                      <span className="text-[10px] text-navy-500 block">Impacted Bus Routes</span>
                      <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        {selectedItem.affectedBusRoutes.join(', ')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-navy-600 dark:text-navy-300 pt-1">
                    <strong>Reporting Buses:</strong> {selectedItem.busesReporting.join(', ')}
                  </p>
                </div>

                {/* Recommended Engineering Action */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                    <Wrench className="w-4 h-4 text-amber-600" />
                    Recommended Engineering Intervention
                  </div>
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    {selectedItem.recommendedAction}
                  </p>
                </div>

                {/* Work Order Dispatch & Citizen Grievance Linking */}
                <div className="pt-2">
                  {selectedItem.status === 'WORK_ORDER_ISSUED' || orderIssuedMap[selectedItem.id] ? (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Official Highway Maintenance Work Order Dispatched
                      </div>
                      <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                        Work Order #{orderIssuedMap[selectedItem.id] || 'WO-2026-CH-0941'} &bull; Assigned to National Highways & State PWD Division
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleIssueWorkOrder(selectedItem)}
                      disabled={issuingOrderFor === selectedItem.id}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-5 shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
                    >
                      <Zap className={cn("w-4 h-4", issuingOrderFor === selectedItem.id && "animate-spin")} />
                      {issuingOrderFor === selectedItem.id
                        ? 'Dispatching PWD Engineering Work Order...'
                        : 'Dispatch Highway Repair Work Order & Link Grievance'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
