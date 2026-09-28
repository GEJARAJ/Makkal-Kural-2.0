'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShieldAlert, 
  Car, 
  Search, 
  AlertTriangle, 
  Camera, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Radio, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  FileText,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { IncidentRecord, ANPRItem, IncidentSeverity } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function IncidentsAndANPRPage() {
  const { isTamil } = useLanguage();
  const [incidents, setIncidents] = useState<IncidentRecord[]>([]);
  const [anprDetections, setAnprDetections] = useState<ANPRItem[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(null);
  const [searchPlate, setSearchPlate] = useState('');
  const [activeTab, setActiveTab] = useState<'incidents' | 'anpr_search' | 'pipeline'>('incidents');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/incidents');
      const json = await res.json();
      if (json.success) {
        setIncidents(json.incidents || []);
        setAnprDetections(json.anprDetections || []);
        if (!selectedIncident && json.incidents?.length > 0) {
          setSelectedIncident(json.incidents[0]);
        } else if (selectedIncident) {
          const updated = json.incidents?.find((i: IncidentRecord) => i.id === selectedIncident.id);
          if (updated) setSelectedIncident(updated);
        }
      }
    } catch (e) {
      console.error('Failed to load incident data', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityBadge = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-mono">CRITICAL SAFETY</Badge>;
      case 'HIGH':
        return <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-mono">HIGH RISK</Badge>;
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-navy-950 font-mono">MEDIUM</Badge>;
    }
  };

  const filteredANPR = anprDetections.filter((item) =>
    item.licensePlate.toLowerCase().includes(searchPlate.toLowerCase()) ||
    item.vehicleType.toLowerCase().includes(searchPlate.toLowerCase()) ||
    item.locality.toLowerCase().includes(searchPlate.toLowerCase()) ||
    item.makeModel.toLowerCase().includes(searchPlate.toLowerCase())
  );

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
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Incident Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-rose-600" />
            Safety Incident Detection & ANPR Vehicle OCR
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Autonomous multi-bus tracking pipeline: On-device YOLO object detection, ByteTrack re-identification, automatic license plate recognition (ANPR), and safety incident triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={isRefreshing}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-emerald-600")} />
            {isRefreshing ? 'Syncing...' : 'Live Refresh'}
          </Button>
          <Link href="/edge-ai">
            <Button size="sm" className="text-xs bg-navy-900 text-white hover:bg-navy-800">
              Edge AI Architecture
            </Button>
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-navy-200 dark:border-navy-800 pb-2">
        <button
          onClick={() => setActiveTab('incidents')}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === 'incidents'
              ? "bg-navy-950 text-white dark:bg-emerald-600"
              : "text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
          )}
        >
          Active Safety Incidents ({incidents.length})
        </button>
        <button
          onClick={() => setActiveTab('anpr_search')}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === 'anpr_search'
              ? "bg-navy-950 text-white dark:bg-emerald-600"
              : "text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
          )}
        >
          ANPR License Plate Search ({anprDetections.length})
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === 'pipeline'
              ? "bg-navy-950 text-white dark:bg-emerald-600"
              : "text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
          )}
        >
          5-Stage AI Tracking Pipeline Visualizer
        </button>
      </div>

      {/* Tab 1: Safety Incidents Feed */}
      {activeTab === 'incidents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Incident List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {incidents.map((inc) => {
              const isSelected = selectedIncident?.id === inc.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer space-y-2.5",
                    isSelected
                      ? "border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 shadow-xs ring-1 ring-rose-500"
                      : "border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900/80 hover:border-navy-300 dark:hover:border-navy-700"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getSeverityBadge(inc.severity)}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                          {inc.confidence}% Confidence
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-navy-950 dark:text-white">
                        {inc.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-navy-600 dark:text-navy-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                    <span className="truncate">{inc.locality}, {inc.district}</span>
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-navy-500 dark:text-navy-400 pt-1.5 border-t border-navy-100 dark:border-navy-800">
                    <span>Bus: {inc.busId} (Route {inc.busRoute})</span>
                    {inc.licensePlate && (
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        Plate: {inc.licensePlate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Incident Inspector (7 cols) */}
          <div className="lg:col-span-7">
            {selectedIncident ? (
              <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
                <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-t-xl">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(selectedIncident.severity)}
                        <span className="text-xs font-mono font-bold text-rose-400">
                          STATUS: {selectedIncident.status}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-white mt-1">
                        {selectedIncident.title}
                      </h2>
                      <p className="text-xs text-navy-300 mt-0.5">
                        {selectedIncident.locality}, {selectedIncident.district} &bull; Recorded by Bus {selectedIncident.busId}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-5">
                  
                  {/* Simulated Evidence HUD */}
                  <div className="relative rounded-xl overflow-hidden border border-navy-800 bg-navy-950 aspect-video flex flex-col justify-between p-3 text-white">
                    <div className="flex items-center justify-between text-[11px] font-mono bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      <span className="text-rose-400 flex items-center gap-1">
                        <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                        5-SECOND EVENT VIDEO SNIPPET CAPTURE
                      </span>
                      <span>Camera: {selectedIncident.cameraPosition}</span>
                    </div>

                    {/* Bounding Box Visual Simulation */}
                    <div className="my-auto mx-auto w-full max-w-sm p-4 border-2 border-dashed border-rose-500 bg-rose-500/10 rounded-xl relative text-center">
                      <span className="absolute -top-3 left-3 bg-rose-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                        ANPR TRACK #{selectedIncident.trackingId || 'TRK-904'}
                      </span>
                      <p className="text-xs font-mono font-bold text-white mt-1">
                        {selectedIncident.description}
                      </p>
                      {selectedIncident.licensePlate && (
                        <div className="mt-2 inline-block px-3 py-1 bg-yellow-400 text-navy-950 font-mono font-extrabold text-sm rounded border border-yellow-600 shadow">
                          {selectedIncident.licensePlate}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-navy-300 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      <span>Vehicle: {selectedIncident.vehicleMakeModel || selectedIncident.vehicleType}</span>
                      <span>Speed: {selectedIncident.speedRecordedKmH || 48} km/h</span>
                      <span>OCR Accuracy: {selectedIncident.ocrConfidence || 98}%</span>
                    </div>
                  </div>

                  {/* Incident Specs */}
                  <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300">
                      Vehicle & Incident Telemetry Breakdown
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                        <span className="text-[10px] text-navy-500 block">Vehicle Classification</span>
                        <span className="font-bold text-navy-950 dark:text-white">{selectedIncident.vehicleType || 'Car / Sedan'}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                        <span className="text-[10px] text-navy-500 block">Estimated Speed</span>
                        <span className="font-bold text-navy-950 dark:text-white font-mono">{selectedIncident.speedRecordedKmH || 48} km/h</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800">
                        <span className="text-[10px] text-navy-500 block">Identified Plate</span>
                        <span className="font-bold font-mono text-rose-600 dark:text-rose-400">{selectedIncident.licensePlate || 'TN-09-CB-4891'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      )}

      {/* Tab 2: Searchable ANPR Database */}
      {activeTab === 'anpr_search' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-navy-400 absolute left-3 top-2.5" />
              <Input
                placeholder="Search plate number (e.g. TN-09-CB-4891, TN-07), vehicle model, or location..."
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
                className="pl-9 text-xs h-9"
              />
            </div>
          </div>

          <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm">
            <CardHeader className="p-4 border-b border-navy-100 dark:border-navy-800">
              <CardTitle className="text-base font-bold text-navy-950 dark:text-white">
                ANPR License Plate Detections Log ({filteredANPR.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-navy-50 dark:bg-navy-950 text-navy-600 dark:text-navy-400 font-semibold border-b border-navy-100 dark:border-navy-800">
                    <tr>
                      <th className="p-3.5">Plate Number</th>
                      <th className="p-3.5">Vehicle Type & Model</th>
                      <th className="p-3.5">Color</th>
                      <th className="p-3.5">Sensed Speed</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">OCR Confidence</th>
                      <th className="p-3.5">Safety Violation Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100 dark:divide-navy-800">
                    {filteredANPR.map((item) => (
                      <tr key={item.id} className="hover:bg-navy-50/50 dark:hover:bg-navy-950/50">
                        <td className="p-3.5 font-mono font-extrabold text-navy-950 dark:text-white">
                          <span className="px-2 py-0.5 rounded bg-yellow-300 dark:bg-yellow-400 text-navy-950 border border-yellow-500">
                            {item.licensePlate}
                          </span>
                        </td>
                        <td className="p-3.5 font-medium text-navy-900 dark:text-navy-200">
                          {item.makeModel} <span className="text-navy-400">({item.vehicleType})</span>
                        </td>
                        <td className="p-3.5 capitalize text-navy-600 dark:text-navy-300">{item.color}</td>
                        <td className="p-3.5 font-mono text-navy-950 dark:text-white">{item.speedKmH} km/h</td>
                        <td className="p-3.5 text-navy-600 dark:text-navy-300">{item.locality}</td>
                        <td className="p-3.5 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{item.ocrConfidence}%</td>
                        <td className="p-3.5">
                          {item.violationFlag ? (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-mono text-[10px]">
                              {item.violationFlag}
                            </Badge>
                          ) : (
                            <span className="text-emerald-600 text-[11px] font-medium">Clear</span>
                          )}
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

      {/* Tab 3: Visual Tracking Pipeline Architecture */}
      {activeTab === 'pipeline' && (
        <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
          <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800">
            <CardTitle className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600" />
              Autonomous On-Bus Computer Vision & ANPR Pipeline
            </CardTitle>
            <CardDescription className="text-xs text-navy-500">
              Step-by-step visual execution flow running at 30 FPS on embedded bus NPUs.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              
              <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-mono font-bold flex items-center justify-center">1</span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">1080p Video Ingestion</h4>
                <p className="text-[11px] text-navy-600 dark:text-navy-400">
                  Front, rear, and side HDR wide-angle cameras capture continuous roadway feeds at 60Hz.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-center">2</span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">YOLOv8 Detection</h4>
                <p className="text-[11px] text-navy-600 dark:text-navy-400">
                  Real-time object localization detects vehicles, road defects, and traffic anomalies at 30 FPS.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-mono font-bold flex items-center justify-center">3</span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">ByteTrack Re-ID</h4>
                <p className="text-[11px] text-navy-600 dark:text-navy-400">
                  Tracks moving vehicles across sequential frames to calculate velocity and detect rash maneuvers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-mono font-bold flex items-center justify-center">4</span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Bounding Box Crop & ANPR</h4>
                <p className="text-[11px] text-navy-600 dark:text-navy-400">
                  Crops high-resolution plate region and runs on-device CRNN / TrOCR for instant character extraction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-mono font-bold flex items-center justify-center">5</span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">5s Snippet & Cloud Sync</h4>
                <p className="text-[11px] text-navy-600 dark:text-navy-400">
                  Only 5-second event clips & lightweight JSON metadata are uploaded over 5G, saving 98.6% bandwidth.
                </p>
              </div>

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
