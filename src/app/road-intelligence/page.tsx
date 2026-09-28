'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  MapPin, 
  Bus, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Search, 
  Filter, 
  ExternalLink, 
  Clock, 
  Building2, 
  Radio, 
  RefreshCw,
  ShieldCheck,
  Zap,
  Flame,
  Droplets,
  ArrowLeft
} from 'lucide-react';
import { RoadDefectItem, DefectType, DefectSeverity } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function RoadIntelligencePage() {
  const { isTamil } = useLanguage();
  const [defects, setDefects] = useState<RoadDefectItem[]>([]);
  const [selectedDefect, setSelectedDefect] = useState<RoadDefectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [conversionResult, setConversionResult] = useState<{ [id: string]: { trackingNumber: string; complaintId: string } }>({});

  const fetchDefects = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/defects');
      const json = await res.json();
      if (json.success && json.data) {
        setDefects(json.data);
        if (!selectedDefect && json.data.length > 0) {
          setSelectedDefect(json.data[0]);
        } else if (selectedDefect) {
          const updated = json.data.find((d: RoadDefectItem) => d.id === selectedDefect.id);
          if (updated) setSelectedDefect(updated);
        }
      }
    } catch (e) {
      console.error('Failed to fetch road defects', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDefects();
    const interval = setInterval(fetchDefects, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleEscalateToGrievance = async (defect: RoadDefectItem) => {
    setConvertingId(defect.id);
    try {
      const res = await fetch('/api/urban/defects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CONVERT_TO_GRIEVANCE',
          defectId: defect.id,
        }),
      });
      const json = await res.json();
      if (json.success && json.grievance) {
        setConversionResult((prev) => ({
          ...prev,
          [defect.id]: {
            trackingNumber: json.grievance.trackingNumber,
            complaintId: json.grievance.id,
          },
        }));
        // Update local state
        setDefects((prev) =>
          prev.map((d) =>
            d.id === defect.id
              ? { ...d, status: 'CONVERTED_TO_GRIEVANCE', convertedGrievanceRef: json.grievance.trackingNumber }
              : d
          )
        );
        if (selectedDefect?.id === defect.id) {
          setSelectedDefect((prev) => prev ? {
            ...prev,
            status: 'CONVERTED_TO_GRIEVANCE',
            convertedGrievanceRef: json.grievance.trackingNumber
          } : null);
        }
      }
    } catch (e) {
      console.error('Failed to escalate defect', e);
    } finally {
      setConvertingId(null);
    }
  };

  const filteredDefects = defects.filter((item) => {
    const matchesType = filterType === 'ALL' || item.defectType === filterType;
    const matchesSeverity = filterSeverity === 'ALL' || item.severity === filterSeverity;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.busRoute.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (severity: DefectSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-mono">CRITICAL HAZARD</Badge>;
      case 'HIGH':
        return <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-mono">HIGH RISK</Badge>;
      case 'MEDIUM':
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-mono">MEDIUM</Badge>;
      default:
        return <Badge variant="secondary" className="font-mono">LOW</Badge>;
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
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Road Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
            AI Road Defect Detection & Verification
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Automated deep-learning vision models scanning road corridors for potholes, cracked pavements, missing dividers, and waterlogging. Convert verified hazards into official Makkal Kural grievances with 1 click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDefects}
            disabled={isRefreshing}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-emerald-600")} />
            {isRefreshing ? 'Syncing...' : 'Live Refresh'}
          </Button>
          <Link href="/maintenance">
            <Button size="sm" className="text-xs bg-navy-900 text-white hover:bg-navy-800">
              Maintenance Fusion Matrix
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-navy-400 absolute left-3 top-2.5" />
          <Input
            placeholder="Search defect type, road name, district, bus route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs h-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs h-9 px-3 rounded-md border border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950 text-navy-800 dark:text-navy-200"
          >
            <option value="ALL">All Defect Types</option>
            <option value="POTHOLE">Potholes</option>
            <option value="WATERLOGGING">Waterlogging</option>
            <option value="CRACK">Surface Cracks</option>
            <option value="MISSING_DIVIDER">Missing Dividers</option>
            <option value="DAMAGED_TRAFFIC_SIGN">Damaged Signs</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="text-xs h-9 px-3 rounded-md border border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950 text-navy-800 dark:text-navy-200"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MEDIUM">Medium Only</option>
          </select>
        </div>
      </div>

      {/* Main Grid: List of Defects & Live Bounding Box Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Defects List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
          {filteredDefects.length === 0 ? (
            <div className="p-8 text-center text-xs text-navy-500 bg-white dark:bg-navy-900 rounded-xl border border-navy-200 dark:border-navy-800">
              No road defects matching your criteria.
            </div>
          ) : (
            filteredDefects.map((item) => {
              const isSelected = selectedDefect?.id === item.id;
              const hasGrievance = item.status === 'CONVERTED_TO_GRIEVANCE' || item.convertedGrievanceRef || conversionResult[item.id];
              const grievanceRef = item.convertedGrievanceRef || conversionResult[item.id]?.trackingNumber;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDefect(item)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5",
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500"
                      : "border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900/80 hover:border-navy-300 dark:hover:border-navy-700"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getSeverityBadge(item.severity)}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                          {item.confidence}% AI Confidence
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-navy-950 dark:text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-navy-600 dark:text-navy-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                    <span className="truncate">{item.locality}, {item.district}</span>
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-navy-500 dark:text-navy-400 pt-1.5 border-t border-navy-100 dark:border-navy-800">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Bus className="w-3 h-3" />
                      Detected by {item.repeatedDetections} buses
                    </span>

                    {hasGrievance ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Grievance #{grievanceRef}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                        Awaiting Escalation
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Deep Defect Inspector & Automated Grievance Escalation Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedDefect ? (
            <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
              <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(selectedDefect.severity)}
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {selectedDefect.confidence}% INFERENCE ACCURACY
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-navy-950 dark:text-white mt-2">
                      {selectedDefect.title}
                    </CardTitle>
                    <CardDescription className="text-xs flex items-center gap-1 text-navy-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-navy-400" />
                      {selectedDefect.locality}, {selectedDefect.district}, {selectedDefect.state} &bull; Lat: {selectedDefect.lat.toFixed(5)}, Lng: {selectedDefect.lng.toFixed(5)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-5">
                
                {/* AI Visual Evidence Bounding Box Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy-800 dark:text-navy-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Edge YOLOv8 Bounding Box Evidence Snapshot
                    </span>
                    <span className="text-navy-500 font-mono text-[11px]">
                      Camera: {selectedDefect.cameraPosition} &bull; Bus: {selectedDefect.busId}
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-navy-800 bg-navy-950 aspect-video flex flex-col justify-between p-3 text-white">
                    {/* Visual simulated road surface with bounding box */}
                    <div className="flex items-center justify-between text-[11px] font-mono bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                        AI VISION CAPTURE VERIFIED
                      </span>
                      <span>Route: {selectedDefect.busRoute}</span>
                    </div>

                    {/* Interactive Simulated Bounding Box */}
                    <div className="my-auto mx-auto w-full max-w-sm p-4 border-2 border-dashed border-red-500 bg-red-500/10 rounded-xl relative shadow-2xl animate-pulse">
                      <div className="absolute -top-3 left-3 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {selectedDefect.defectType} &bull; {selectedDefect.confidence}%
                      </div>
                      <div className="text-center py-4 text-xs font-mono font-bold text-white">
                        [ HAZARD IDENTIFIED: {selectedDefect.title.toUpperCase()} ]
                      </div>
                      <div className="text-[10px] font-mono text-center text-red-200">
                        GPS: {selectedDefect.lat.toFixed(5)}°N, {selectedDefect.lng.toFixed(5)}°E
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-navy-300 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      <span>Multi-Bus Confirmation: {selectedDefect.repeatedDetections} Independent Buses</span>
                      <span>Buses: {selectedDefect.busesInvolved.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Responsible Ministry & Grievance Integration */}
                <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-950 dark:text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Responsible Jurisdiction & Escalation Route
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono bg-white dark:bg-navy-900">
                      {selectedDefect.ministryJurisdiction}
                    </Badge>
                  </div>

                  <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                    This defect has been confirmed through repeated mobile telemetry from public transit buses. Escalating converts this edge vision event into an official citizen grievance routed directly to the representative and civic nodal officer.
                  </p>

                  {/* Grievance Status or Escalation Action Button */}
                  {selectedDefect.status === 'CONVERTED_TO_GRIEVANCE' || selectedDefect.convertedGrievanceRef || conversionResult[selectedDefect.id] ? (
                    <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Escalated to Makkal Kural Grievance
                        </div>
                        <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                          Tracking ID: #{selectedDefect.convertedGrievanceRef || conversionResult[selectedDefect.id]?.trackingNumber}
                        </p>
                      </div>

                      <Link href={`/track/${selectedDefect.convertedGrievanceRef || conversionResult[selectedDefect.id]?.trackingNumber}`}>
                        <Button size="sm" variant="outline" className="text-xs border-emerald-500 text-emerald-700 dark:text-emerald-300">
                          Track Status <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleEscalateToGrievance(selectedDefect)}
                      disabled={convertingId === selectedDefect.id}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-5 shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                    >
                      <Zap className={cn("w-4 h-4", convertingId === selectedDefect.id && "animate-spin")} />
                      {convertingId === selectedDefect.id
                        ? 'Automating Grievance Registration & Routing...'
                        : 'Escalate to Makkal Kural Grievance (1-Click Routing)'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-navy-200 dark:border-navy-800 p-8 text-center text-navy-500">
              Select a defect from the left feed to view deep AI bounding box analysis and trigger 1-click grievance escalation.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
