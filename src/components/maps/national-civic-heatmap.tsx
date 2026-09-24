'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Complaint, SeverityLevel } from '@/types/database';
import { CENTRAL_CATEGORIES } from '@/lib/constants/categories';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Layers, 
  Filter, 
  ExternalLink, 
  ThumbsUp, 
  Flame, 
  ShieldAlert,
  Search,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Leaflet icon setup
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface HeatmapProps {
  complaints: Complaint[];
  height?: number | string;
}

export function NationalCivicHeatmap({ complaints, height = '700px' }: HeatmapProps) {
  const { isTamil, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // Must have coordinates
      if (!c.latitude || !c.longitude) return false;

      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedSeverity !== 'all' && c.severity !== selectedSeverity) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          c.title?.toLowerCase().includes(q) ||
          c.reference_number?.toLowerCase().includes(q) ||
          c.district?.toLowerCase().includes(q) ||
          c.state?.toLowerCase().includes(q) ||
          c.locality?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [complaints, selectedCategory, selectedSeverity, searchQuery]);

  const getMarkerColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'URGENT':
        return '#dc2626'; // Red
      case 'HIGH':
        return '#ea580c'; // Orange
      case 'MEDIUM':
        return '#2563eb'; // Blue
      default:
        return '#16a34a'; // Green
    }
  };

  if (!mounted) {
    return (
      <div
        className="w-full rounded-2xl bg-navy-900 border border-navy-800 flex items-center justify-center text-navy-400"
        style={{ height }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading National Civic Heatmap...</span>
        </div>
      </div>
    );
  }

  // India centroid: 22.5937° N, 78.9629° E
  const indiaCenter: [number, number] = [21.8, 79.5];

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-white border border-navy-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-navy-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isTamil ? 'மாவட்டம், மாநிலம், எண்...' : 'Search city, state, ref...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-navy-200 bg-navy-50/50 text-navy-900 focus:outline-emerald-600 w-44 sm:w-56"
            />
          </div>

          {/* Ministry / Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-navy-200 bg-navy-50/50 text-navy-900 focus:outline-emerald-600"
          >
            <option value="all">{isTamil ? 'அனைத்து துறைகள்' : 'All Union Portfolios'}</option>
            {CENTRAL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameEn}
              </option>
            ))}
          </select>

          {/* Severity */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-navy-200 bg-navy-50/50 text-navy-900 focus:outline-emerald-600"
          >
            <option value="all">{isTamil ? 'அனைத்து அவசர நிலைகள்' : 'All Severities'}</option>
            <option value="URGENT">🔴 Urgent Hazard</option>
            <option value="HIGH">🟠 High Priority</option>
            <option value="MEDIUM">🔵 Medium Priority</option>
            <option value="LOW">🟢 Low Priority</option>
          </select>

          {(selectedCategory !== 'all' || selectedSeverity !== 'all' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSeverity('all');
                setSearchQuery('');
              }}
              className="text-xs h-8 border-navy-200"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {/* Live Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-navy-700">
            {isTamil ? `காண்பிக்கப்படும் புகார்கள்: ` : `Active Grievance Clusters: `}
            <strong className="text-emerald-700 font-mono text-sm">{filteredComplaints.length}</strong>
          </span>
        </div>
      </div>

      {/* Map Card */}
      <div className="relative rounded-2xl overflow-hidden border border-navy-200 shadow-md">
        <MapContainer
          center={indiaCenter}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height, width: '100%', zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredComplaints.map((c) => {
            const color = getMarkerColor(c.severity);
            const radius = c.severity === 'URGENT' ? 14 : c.severity === 'HIGH' ? 12 : 9;

            return (
              <CircleMarker
                key={c.id}
                center={[c.latitude!, c.longitude!]}
                radius={radius}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.7,
                  weight: 2,
                }}
              >
                <Popup className="custom-civic-popup">
                  <div className="p-1 space-y-2 min-w-[220px] max-w-[280px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-navy-600">
                        {c.reference_number}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase"
                        style={{ backgroundColor: color }}
                      >
                        {c.severity}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-navy-950 line-clamp-2">
                      {c.ai_improved_title || c.title}
                    </h4>

                    <p className="text-[11px] text-navy-600">
                      📍 {c.locality || c.city}, {c.district}, {c.state}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-navy-100 text-[11px]">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {c.upvotes_count || 1} endorsed
                      </span>
                      <Link
                        href={`/track/${c.reference_number}`}
                        className="font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                      >
                        <span>View Dossier</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Floating Legend */}
        <div className="absolute bottom-4 right-4 z-20 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-navy-200 shadow-md text-[11px] space-y-1.5">
          <div className="font-bold text-navy-950 uppercase tracking-wider text-[10px]">
            Grievance Hotspot Severity
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <span className="text-navy-700">Urgent Hazard (Immediate Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-navy-700">High Priority (Severe Issue)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-navy-700">Medium (Standard Maintenance)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-navy-700">Resolved / Low Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
