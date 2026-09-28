'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  Wifi, 
  Video, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  HardDrive, 
  Layers, 
  Server, 
  Cloud, 
  ArrowRight, 
  RefreshCw,
  Gauge,
  Radio,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { EdgeAIModelItem } from '@/types/urban-intelligence';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function EdgeAIVisualizerPage() {
  const { isTamil } = useLanguage();
  const [edgeData, setEdgeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchEdgeData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/urban/edge-ai');
      const json = await res.json();
      if (json.success) {
        setEdgeData(json);
      }
    } catch (e) {
      console.error('Failed to load edge AI telemetry', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEdgeData();
    const interval = setInterval(fetchEdgeData, 10000);
    return () => clearInterval(interval);
  }, []);

  const models: EdgeAIModelItem[] = edgeData?.deployedModels || [];
  const metrics = edgeData?.bandwidthMetrics || {
    rawStreamingPerBusGbPerHour: 4.8,
    edgeMetadataOnlyPerBusMbPerHour: 65,
    bandwidthSavingsPercentage: '98.6',
    fleetDailySavingsGb: 681.84,
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
            <span className="text-navy-900 dark:text-navy-200 font-semibold">Edge AI Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-7 h-7 text-purple-600" />
            On-Bus Edge AI Architecture & Bandwidth Optimization
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-3xl">
            Embedded deep neural network inference directly on transit buses. 30 FPS multi-camera processing with 98.6% cellular bandwidth reduction via event-driven metadata sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchEdgeData}
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

      {/* Bandwidth Savings Impact Card */}
      <Card className="border-navy-200 dark:border-navy-800 bg-gradient-to-r from-navy-950 via-purple-950 to-navy-900 text-white shadow-xl">
        <CardHeader className="p-6 pb-3 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <CardTitle className="text-lg font-bold text-white">
                Bandwidth & Cellular Transmission Efficiency
              </CardTitle>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
              {metrics.bandwidthSavingsPercentage}% BANDWIDTH REDUCTION
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs text-rose-400 uppercase font-mono font-semibold">Traditional Cloud Streaming</span>
              <p className="text-3xl font-extrabold font-mono text-white">
                {metrics.rawStreamingPerBusGbPerHour} <span className="text-sm font-normal text-navy-300">GB / hr / bus</span>
              </p>
              <p className="text-[11px] text-navy-400">
                Continuous 1080p raw video transmission causes network congestion and extreme cellular data costs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 uppercase font-mono font-semibold">UrbanSense Edge AI Solution</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-300">
                {metrics.edgeMetadataOnlyPerBusMbPerHour} <span className="text-sm font-normal text-emerald-400">MB / hr / bus</span>
              </p>
              <p className="text-[11px] text-emerald-200">
                On-device 30 FPS inference uploads only JSON bounding boxes & 5s triggered event clips.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
              <span className="text-xs text-cyan-400 uppercase font-mono font-semibold">Fleet Daily Data Savings</span>
              <p className="text-3xl font-extrabold font-mono text-cyan-300">
                {metrics.fleetDailySavingsGb} <span className="text-sm font-normal text-cyan-400">GB / day</span>
              </p>
              <p className="text-[11px] text-cyan-200">
                Massive cellular bandwidth savings enable 100% real-time pan-city deployment at fractional cost.
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Embedded Hardware & Compute Pipeline Architecture Diagram */}
      <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
        <CardHeader className="p-5 border-b border-navy-100 dark:border-navy-800">
          <CardTitle className="text-base font-bold text-navy-950 dark:text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-purple-600" />
            Hardware & Edge Software Topology
          </CardTitle>
          <CardDescription className="text-xs text-navy-500">
            Physical layout inside each Makkal Kural Sensing Transit Bus.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950 space-y-2">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-600" />
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Sensor Array</h4>
              </div>
              <ul className="text-[11px] text-navy-600 dark:text-navy-400 space-y-1 list-disc list-inside">
                <li>5x IP67 HDR 1080p60 Cameras</li>
                <li>Dual-Band RTK-GPS (&lt;10cm accuracy)</li>
                <li>6-Axis MEMS Road Vibration IMU</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950 space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-600" />
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Edge NPU Host</h4>
              </div>
              <ul className="text-[11px] text-navy-600 dark:text-navy-400 space-y-1 list-disc list-inside">
                <li>NVIDIA Jetson Orin Nano / Hailo-8</li>
                <li>TensorRT FP16 Optimized Inference</li>
                <li>Under-seat ruggedized fanless enclosure</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950 space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Event Trigger Engine</h4>
              </div>
              <ul className="text-[11px] text-navy-600 dark:text-navy-400 space-y-1 list-disc list-inside">
                <li>Real-time bounding box extraction</li>
                <li>Dynamic confidence thresholding (&gt;85%)</li>
                <li>Rolling 5-second circular memory buffer</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950 space-y-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Cloud Fusion Sync</h4>
              </div>
              <ul className="text-[11px] text-navy-600 dark:text-navy-400 space-y-1 list-disc list-inside">
                <li>5G low-latency MQTT / WebSocket telemetry</li>
                <li>Multi-bus spatial deduplication</li>
                <li>Automated Makkal Kural grievance routing</li>
              </ul>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Deployed AI Models Status Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Active Edge Computer Vision Models
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <Card key={model.id} className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-2xs space-y-3">
              <CardHeader className="p-4 pb-2 border-b border-navy-100 dark:border-navy-800">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {model.category}
                  </Badge>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {model.status}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold text-navy-950 dark:text-white mt-1">
                  {model.name}
                </CardTitle>
                <CardDescription className="text-xs text-navy-500">
                  {model.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-navy-600 dark:text-navy-300">
                  <span>Inference Rate:</span>
                  <strong className="text-navy-950 dark:text-white">{model.fps} FPS</strong>
                </div>
                <div className="flex items-center justify-between font-mono text-navy-600 dark:text-navy-300">
                  <span>Confidence Cutoff:</span>
                  <strong className="text-navy-950 dark:text-white">&ge;{model.confidenceThresholdPct}%</strong>
                </div>
                <div className="flex items-center justify-between font-mono text-navy-600 dark:text-navy-300">
                  <span>Detections Today:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{model.detectionsToday.toLocaleString()}</strong>
                </div>
                <div className="flex items-center justify-between font-mono text-navy-600 dark:text-navy-300">
                  <span>RAM Footprint:</span>
                  <strong className="text-navy-950 dark:text-white">{model.memoryMb} MB</strong>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
